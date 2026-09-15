import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Room, 
  Item, 
  GameRandomSeeds, 
  InteractiveObject, 
  GameStatus, 
  BestRecord, 
  GameLog, 
  RoomId 
} from './types';
import { 
  generateRandomSeeds, 
  createInitialRooms, 
  ALL_ITEMS, 
  getStoredBestTime, 
  saveBestTime, 
  formatTime 
} from './services/gameState';
import { sound } from './services/audio';

import { Header } from './components/Header';
import { Minimap } from './components/Minimap';
import { RoomView } from './components/RoomView';
import { Inventory } from './components/Inventory';
import { LogConsole } from './components/LogConsole';
import { StartScreen } from './components/StartScreen';
import { ObjectModal } from './components/ObjectModal';
import { WirePuzzleModal } from './components/WirePuzzleModal';
import { ChemicalPuzzleModal } from './components/ChemicalPuzzleModal';
import { KeypadModal } from './components/KeypadModal';
import { LaserPanelModal } from './components/LaserPanelModal';
import { AirlockExitModal } from './components/AirlockExitModal';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';
import { ItemPickupAnimation } from './components/ItemPickupAnimation';

export default function App() {
  // Master Game State
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [totalTimeSeconds, setTotalTimeSeconds] = useState<number>(600);
  const [timeRemaining, setTimeRemaining] = useState<number>(600);
  const [currentRoomId, setCurrentRoomId] = useState<RoomId>('cryo_bay');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [bestRecord, setBestRecord] = useState<BestRecord | null>(null);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  // Puzzle Seeds & Dynamic State
  const [seeds, setSeeds] = useState<GameRandomSeeds>(() => generateRandomSeeds());
  const [rooms, setRooms] = useState<Room[]>(() => createInitialRooms(seeds));
  const [inventory, setInventory] = useState<Item[]>([]);
  const [lasersActive, setLasersActive] = useState<boolean>(true);
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  // Modals
  const [activeObject, setActiveObject] = useState<InteractiveObject | null>(null);
  const [pendingPickupItem, setPendingPickupItem] = useState<Item | null>(null);
  const [showWirePuzzle, setShowWirePuzzle] = useState<boolean>(false);
  const [showChemicalPuzzle, setShowChemicalPuzzle] = useState<boolean>(false);
  const [showLockerKeypad, setShowLockerKeypad] = useState<boolean>(false);
  const [showLaserPanel, setShowLaserPanel] = useState<boolean>(false);
  const [showAirlockExit, setShowAirlockExit] = useState<boolean>(false);
  const [gameOverReason, setGameOverReason] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load best time record from localStorage on mount
  useEffect(() => {
    const saved = getStoredBestTime();
    if (saved) {
      setBestRecord(saved);
    }
  }, []);

  // Add a log entry
  const addLog = useCallback((text: string, type: GameLog['type'] = 'info') => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const newLog: GameLog = {
      id: Math.random().toString(),
      timestamp,
      text,
      type,
    };
    setLogs((prev) => [newLog, ...prev]);
  }, []);

  // Timer Tick
  useEffect(() => {
    if (gameStatus !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          sound.playGameOver();
          setGameOverReason('Waktu Evakuasi Habis! Protokol Karantina Mutlak Diaktifkan.');
          setGameStatus('game_over');
          return 0;
        }

        // Low time alarm warning beep
        if (prev <= 30 && prev % 5 === 0) {
          sound.playAlarmBeep();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  // Start new game
  const handleStartGame = (durationSeconds: number) => {
    const newSeeds = generateRandomSeeds();
    setSeeds(newSeeds);
    setRooms(createInitialRooms(newSeeds));
    setInventory([]);
    setLasersActive(true);
    setCurrentRoomId('cryo_bay');
    setTotalTimeSeconds(durationSeconds);
    setTimeRemaining(durationSeconds);
    setIsNewRecord(false);
    setLogs([]);
    setGameStatus('playing');

    addLog('Sistem evakuasi fasilitas XENO-TECH diaktifkan. Hitung mundur dimulai!', 'warning');
    addLog('Objektif: Temukan kode tersembunyi & peralatan untuk membuka Pintu Keluar Airlock.', 'info');
  };

  // Restart game
  const handleRestart = () => {
    const newSeeds = generateRandomSeeds();
    setSeeds(newSeeds);
    setRooms(createInitialRooms(newSeeds));
    setInventory([]);
    setLasersActive(true);
    setCurrentRoomId('cryo_bay');
    setTimeRemaining(totalTimeSeconds);
    setIsNewRecord(false);
    setActiveObject(null);
    setShowWirePuzzle(false);
    setShowChemicalPuzzle(false);
    setShowLockerKeypad(false);
    setShowLaserPanel(false);
    setShowAirlockExit(false);
    setGameStatus('menu');
  };

  // Toggle audio
  const handleToggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    sound.setMute(nextMuted);
  };

  // Trigger laser hazard penalty
  const handleLaserTrigger = () => {
    sound.playLaserZap();
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 500);

    setTimeRemaining((prev) => Math.max(0, prev - 15));
    addLog('ALARM TERPICU! Medan laser aktif membakar sirkuit! Penalti: -15 Detik!', 'danger');

    // Also open laser panel modal so user knows how to solve it
    setShowLaserPanel(true);
  };

  // Unlock doors whenever keycards are acquired
  const checkKeycardUnlocks = (newItems: Item[]) => {
    const hasL1 = newItems.some((it) => it.id === 'keycard_l1');
    const hasL2 = newItems.some((it) => it.id === 'keycard_l2');

    setRooms((prevRooms) =>
      prevRooms.map((r) => {
        if (r.id === 'security_corridor' || r.id === 'research_lab') {
          if (hasL1 && !r.isUnlocked) {
            addLog(`Akses diberikan: ${r.name} kini TERBUKA.`, 'success');
            sound.playDoorOpen();
            return { ...r, isUnlocked: true };
          }
        }
        if (r.id === 'reactor_core' || r.id === 'exit_airlock') {
          if (hasL2 && !r.isUnlocked) {
            addLog(`Otorisasi L2 diverifikasi: ${r.name} kini TERBUKA.`, 'success');
            sound.playDoorOpen();
            return { ...r, isUnlocked: true };
          }
        }
        return r;
      })
    );
  };

  // Take item action from an object
  const handleTakeItem = (itemId: string) => {
    const item = ALL_ITEMS[itemId];
    if (!item) return;

    // Check if already in inventory
    if (inventory.some((it) => it.id === itemId)) return;

    // Close object inspection modal and trigger immersive pickup visual animation
    setActiveObject(null);
    setPendingPickupItem(item);
  };

  // Finalize item pickup after visual animation completes
  const handleFinishPickup = (item: Item) => {
    setPendingPickupItem(null);
    const nextInventory = [...inventory, item];
    setInventory(nextInventory);
    addLog(`Item Diambil: ${item.name} dimasukkan ke inventaris.`, 'success');

    // Update object state in the room
    setRooms((prevRooms) =>
      prevRooms.map((r) => ({
        ...r,
        objects: r.objects.map((obj) => {
          if (obj.containedItemId === item.id) {
            return { ...obj, status: 'solved', containedItemId: undefined };
          }
          return obj;
        }),
      }))
    );

    checkKeycardUnlocks(nextInventory);
  };

  // Use required item on an object (e.g. screwdriver on vent)
  const handleUseRequiredItem = (obj: InteractiveObject) => {
    if (!obj.requiredItemId) return;
    const hasRequired = inventory.some((it) => it.id === obj.requiredItemId);
    if (!hasRequired) return;

    sound.playSuccess();

    // Specific object actions
    if (obj.id === 'vent_grate') {
      addLog('Penutup ventilasi berhasil dibuka dengan Obeng Teknisi! Ditemukan Keycard Level 1 (Biru).', 'success');
      setRooms((prevRooms) =>
        prevRooms.map((r) => ({
          ...r,
          objects: r.objects.map((o) => {
            if (o.id === 'vent_grate') {
              return { ...o, status: 'unlocked' };
            }
            return o;
          }),
        }))
      );
      // Auto transfer item or let user take it
      handleTakeItem('keycard_l1');
    } else if (obj.id === 'containment_safe') {
      addLog('Brankas penahan cryo dibuka dengan Keycard Kuning L2! Ditemukan Master Encryption Chip.', 'success');
      setRooms((prevRooms) =>
        prevRooms.map((r) => ({
          ...r,
          objects: r.objects.map((o) => {
            if (o.id === 'containment_safe') {
              return { ...o, status: 'unlocked' };
            }
            return o;
          }),
        }))
      );
      handleTakeItem('encryption_chip');
    } else if (obj.id === 'reactor_terminal') {
      addLog('Master Encryption Chip dimasukkan! Generator inti stabil & Transponder Airlock diekstraksi!', 'success');
      setRooms((prevRooms) =>
        prevRooms.map((r) => ({
          ...r,
          objects: r.objects.map((o) => {
            if (o.id === 'reactor_terminal') {
              return { ...o, status: 'solved' };
            }
            return o;
          }),
        }))
      );
      handleTakeItem('reactor_transponder');
    }
  };

  // Object hotspot clicked
  const handleSelectObject = (obj: InteractiveObject) => {
    if (obj.actionType === 'wire_puzzle') {
      setShowWirePuzzle(true);
      return;
    }
    if (obj.actionType === 'chemical_puzzle') {
      setShowChemicalPuzzle(true);
      return;
    }
    if (obj.actionType === 'keypad') {
      setShowLockerKeypad(true);
      return;
    }
    if (obj.actionType === 'laser_panel') {
      setShowLaserPanel(true);
      return;
    }
    if (obj.actionType === 'airlock_door') {
      setShowAirlockExit(true);
      return;
    }

    // Default inspection modal
    setActiveObject(obj);
  };

  // Wire Puzzle Solved: laser disabled
  const handleWirePuzzleSolved = () => {
    setShowWirePuzzle(false);
    setLasersActive(false);
    addLog('Bypass kabel berhasil! Kisi laser keamanan dinonaktifkan sepenuhnya!', 'success');

    setRooms((prevRooms) =>
      prevRooms.map((r) => {
        if (r.id === 'security_corridor') {
          return {
            ...r,
            alertLevel: 'normal',
            objects: r.objects.map((o) => {
              if (o.id === 'laser_barrier' || o.id === 'fuse_box') {
                return { ...o, status: 'solved' };
              }
              return o;
            }),
          };
        }
        return r;
      })
    );
  };

  // Use Prism Reflector to disable lasers
  const handleUsePrism = () => {
    setShowLaserPanel(false);
    setLasersActive(false);
    addLog('Prisma Pembias dipasang pada emitor! Berkas laser dibelokkan dan aman dilintasi.', 'success');

    setRooms((prevRooms) =>
      prevRooms.map((r) => {
        if (r.id === 'security_corridor') {
          return {
            ...r,
            alertLevel: 'normal',
            objects: r.objects.map((o) => {
              if (o.id === 'laser_barrier') {
                return { ...o, status: 'solved' };
              }
              return o;
            }),
          };
        }
        return r;
      })
    );
  };

  // Chemical Puzzle Solved: get Keycard L2
  const handleChemicalPuzzleSolved = () => {
    setShowChemicalPuzzle(false);
    addLog('Sintesis reaksi pelarut asam berhasil! Kunci brankas meleleh dan Keycard Kuning L2 diambil!', 'success');
    handleTakeItem('keycard_l2');

    setRooms((prevRooms) =>
      prevRooms.map((r) => {
        if (r.id === 'research_lab') {
          return {
            ...r,
            objects: r.objects.map((o) => {
              if (o.id === 'chemical_rack') {
                return { ...o, status: 'solved' };
              }
              return o;
            }),
          };
        }
        return r;
      })
    );
  };

  // Locker Keypad Solved: get Prism
  const handleLockerKeypadSuccess = () => {
    setShowLockerKeypad(false);
    addLog(`Loker personel dibuka dengan kode ${seeds.lockerCode}! Ditemukan Prisma Pembias Optik.`, 'success');
    handleTakeItem('laser_prism');

    setRooms((prevRooms) =>
      prevRooms.map((r) => {
        if (r.id === 'security_corridor') {
          return {
            ...r,
            objects: r.objects.map((o) => {
              if (o.id === 'security_locker') {
                return { ...o, status: 'solved' };
              }
              return o;
            }),
          };
        }
        return r;
      })
    );
  };

  // Final Airlock Evacuation Escaped!
  const handleEscapeSuccess = () => {
    setShowAirlockExit(false);
    const elapsed = totalTimeSeconds - timeRemaining;
    sound.playVictory();

    const record: BestRecord = {
      timeRemainingSeconds: timeRemaining,
      timeElapsedSeconds: elapsed,
      date: new Date().toLocaleDateString('id-ID'),
      formattedTime: formatTime(elapsed),
    };

    const isNew = saveBestTime(record);
    setIsNewRecord(isNew);
    setBestRecord(getStoredBestTime());
    setGameStatus('victory');
  };

  // Current active room object
  const currentRoom = rooms.find((r) => r.id === currentRoomId) || rooms[0];

  // If in main menu, render start screen
  if (gameStatus === 'menu') {
    return (
      <StartScreen
        onStartGame={handleStartGame}
        bestRecord={bestRecord}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />
    );
  }

  const hasPrism = inventory.some((it) => it.id === 'laser_prism');
  const hasTransponder = inventory.some((it) => it.id === 'reactor_transponder');

  return (
    <div className={`min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black ${glitchActive ? 'animate-glitch' : ''}`}>
      {/* Top Navigation & Status */}
      <Header
        timeRemaining={timeRemaining}
        totalTime={totalTimeSeconds}
        currentRoomName={currentRoom.name}
        currentSector={currentRoom.sectorCode}
        itemsFoundCount={inventory.length}
        totalItemsCount={6}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onRestart={handleRestart}
        bestRecord={bestRecord}
        lasersActive={lasersActive}
      />

      {/* Main Gameplay Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* Interactive Room Visual Stage */}
        <RoomView
          room={currentRoom}
          allRooms={rooms}
          inventory={inventory}
          onSelectObject={handleSelectObject}
          lasersActive={lasersActive}
          onLaserTrigger={handleLaserTrigger}
          onNavigateRoom={setCurrentRoomId}
        />

        {/* Middle Dual Bar: Minimap + Telemetry Log Console */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <Minimap
              rooms={rooms}
              currentRoomId={currentRoomId}
              onSelectRoom={setCurrentRoomId}
              lasersActive={lasersActive}
            />
          </div>
          <div className="lg:col-span-1">
            <LogConsole logs={logs} />
          </div>
        </div>
      </main>

      {/* Bottom Inventory Tray */}
      <Inventory items={inventory} totalExpected={6} />

      {/* Interactive Modals */}
      {/* 1. Object Inspection Modal */}
      {activeObject && (
        <ObjectModal
          isOpen={true}
          object={activeObject}
          onClose={() => setActiveObject(null)}
          onTakeItem={handleTakeItem}
          containedItem={activeObject.containedItemId ? ALL_ITEMS[activeObject.containedItemId] : null}
          hasRequiredItem={activeObject.requiredItemId ? inventory.some((it) => it.id === activeObject.requiredItemId) : false}
          requiredItemName={activeObject.requiredItemId ? ALL_ITEMS[activeObject.requiredItemId]?.name : undefined}
          onUseRequiredItem={() => handleUseRequiredItem(activeObject)}
        />
      )}

      {/* 2. Wire Color Matching Puzzle Modal */}
      <WirePuzzleModal
        isOpen={showWirePuzzle}
        onClose={() => setShowWirePuzzle(false)}
        onSolve={handleWirePuzzleSolved}
        correctWireOrder={seeds.wireOrder}
      />

      {/* 3. Chemical Color Reaction Puzzle Modal */}
      <ChemicalPuzzleModal
        isOpen={showChemicalPuzzle}
        onClose={() => setShowChemicalPuzzle(false)}
        onSolve={handleChemicalPuzzleSolved}
        targetSequence={seeds.chemicalOrder}
      />

      {/* 4. Security Locker 3-Digit Keypad Modal */}
      <KeypadModal
        isOpen={showLockerKeypad}
        title="Loker Personel Keamanan"
        codeLength={3}
        correctCode={seeds.lockerCode}
        hintText="ID Pos Keamanan tercatat di Papan Tulis Lab Biokimia."
        onClose={() => setShowLockerKeypad(false)}
        onSuccess={handleLockerKeypadSuccess}
      />

      {/* 5. Laser Barrier Obstacle Panel Modal */}
      <LaserPanelModal
        isOpen={showLaserPanel}
        onClose={() => setShowLaserPanel(false)}
        lasersActive={lasersActive}
        hasPrism={hasPrism}
        onUsePrism={handleUsePrism}
        onOpenWirePuzzle={() => {
          setShowLaserPanel(false);
          setShowWirePuzzle(true);
        }}
      />

      {/* 6. Final Airlock Exit Evacuation Modal */}
      <AirlockExitModal
        isOpen={showAirlockExit}
        onClose={() => setShowAirlockExit(false)}
        hasTransponder={hasTransponder}
        correctExitCode={seeds.exitCode}
        onEscapeSuccess={handleEscapeSuccess}
      />

      {/* Game Over Lockdown Modal */}
      <GameOverModal
        isOpen={gameStatus === 'game_over'}
        onRestart={handleRestart}
        reason={gameOverReason}
        itemsFoundCount={inventory.length}
        totalItems={6}
      />

      {/* Victory Escape Modal */}
      <VictoryModal
        isOpen={gameStatus === 'victory'}
        onRestart={handleRestart}
        timeElapsed={totalTimeSeconds - timeRemaining}
        isNewRecord={isNewRecord}
        itemsFoundCount={inventory.length}
        totalItems={6}
      />

      {/* Visual Item Pickup Celebration Animation */}
      {pendingPickupItem && (
        <ItemPickupAnimation
          item={pendingPickupItem}
          onComplete={() => handleFinishPickup(pendingPickupItem)}
        />
      )}
    </div>
  );
}
