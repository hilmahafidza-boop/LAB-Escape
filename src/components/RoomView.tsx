import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Room, InteractiveObject, Item } from '../types';
import { 
  ShieldAlert, 
  HelpCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Footprints,
  Compass,
  DoorOpen,
  Lock
} from 'lucide-react';
import { sound } from '../services/audio';
import { CharacterSprite } from './CharacterSprite';
import { LabRoomDecor } from './LabRoomDecor';
import { LabObjectVisual } from './LabObjectVisual';
import { RoomDoorway } from './RoomDoorway';
import { ObjectivePanel } from './ObjectivePanel';

interface RoomViewProps {
  room: Room;
  allRooms: Room[];
  inventory: Item[];
  onSelectObject: (obj: InteractiveObject) => void;
  lasersActive: boolean;
  onLaserTrigger: () => void;
  onNavigateRoom: (roomId: string) => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  room,
  allRooms,
  inventory,
  onSelectObject,
  lasersActive,
  onLaserTrigger,
  onNavigateRoom,
}) => {
  // Character horizontal position on the lab floor (14% to 86% to respect door margins)
  const [characterX, setCharacterX] = useState<number>(30);
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [targetX, setTargetX] = useState<number | null>(null);
  const pendingInteractionRef = useRef<InteractiveObject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastStepTimeRef = useRef<number>(0);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine neighboring rooms for left and right doorways
  const currentRoomIndex = allRooms.findIndex((r) => r.id === room.id);
  const prevRoom = currentRoomIndex > 0 ? allRooms[currentRoomIndex - 1] : null;
  const nextRoom = currentRoomIndex < allRooms.length - 1 ? allRooms[currentRoomIndex + 1] : null;

  // Synchronization refs to eliminate stale closure bugs in keyboard handlers
  const characterXRef = useRef(characterX);
  characterXRef.current = characterX;
  const prevRoomRef = useRef(prevRoom);
  prevRoomRef.current = prevRoom;
  const nextRoomRef = useRef(nextRoom);
  nextRoomRef.current = nextRoom;
  const lasersActiveRef = useRef(lasersActive);
  lasersActiveRef.current = lasersActive;
  const onNavigateRoomRef = useRef(onNavigateRoom);
  onNavigateRoomRef.current = onNavigateRoom;
  const onLaserTriggerRef = useRef(onLaserTrigger);
  onLaserTriggerRef.current = onLaserTrigger;
  const onSelectObjectRef = useRef(onSelectObject);
  onSelectObjectRef.current = onSelectObject;

  // Reset or adjust character position when changing room
  useEffect(() => {
    setCharacterX(30);
    setFacing('right');
    setIsWalking(false);
    setTargetX(null);
    pendingInteractionRef.current = null;
  }, [room.id]);

  // Find nearest object to current character position (within 14% distance threshold)
  const nearbyObject = room.objects.find((obj) => Math.abs(obj.position.x - characterX) <= 14);
  const nearbyObjectRef = useRef(nearbyObject);
  nearbyObjectRef.current = nearbyObject;

  // Check if character is near the left or right door (comfortable 22% threshold)
  const isNearLeftDoor = characterX <= 22;
  const isNearRightDoor = characterX >= 78;

  // Play footstep audio periodically while walking
  const playFootstep = useCallback(() => {
    const now = Date.now();
    if (now - lastStepTimeRef.current > 240) {
      sound.playStep();
      lastStepTimeRef.current = now;
    }
  }, []);

  // Smooth animation frame for moving towards targetX (from mouse/touch clicks)
  useEffect(() => {
    if (targetX === null) return;

    let animationFrameId: number;

    const step = () => {
      setCharacterX((currentX) => {
        const diff = targetX - currentX;
        const speed = 1.3; // percentage per frame

        if (Math.abs(diff) <= speed) {
          // Arrived at target
          setIsWalking(false);
          setTargetX(null);

          // If walking towards an object interaction, trigger it
          if (pendingInteractionRef.current) {
            const obj = pendingInteractionRef.current;
            pendingInteractionRef.current = null;
            if (obj.id === 'laser_barrier' && lasersActiveRef.current) {
              sound.playLaserZap();
              onLaserTriggerRef.current();
            } else {
              sound.playClick();
              onSelectObjectRef.current(obj);
            }
          }
          return targetX;
        }

        playFootstep();
        setIsWalking(true);
        setFacing(diff > 0 ? 'right' : 'left');
        return currentX + (diff > 0 ? speed : -speed);
      });

      if (targetX !== null) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetX, playFootstep]);

  // Handle interaction trigger (walks to it first if far away)
  const handleInteractWithObject = useCallback((obj: InteractiveObject) => {
    const dist = Math.abs(obj.position.x - characterXRef.current);

    if (dist <= 15) {
      if (obj.id === 'laser_barrier' && lasersActiveRef.current) {
        sound.playLaserZap();
        onLaserTriggerRef.current();
      } else {
        sound.playClick();
        onSelectObjectRef.current(obj);
      }
    } else {
      pendingInteractionRef.current = obj;
      setTargetX(obj.position.x);
      setIsWalking(true);
      setFacing(obj.position.x >= characterXRef.current ? 'right' : 'left');
      sound.playClick();
    }
  }, []);

  // Handle direct doorway navigation
  const handleDoorNavigate = useCallback((side: 'left' | 'right') => {
    const target = side === 'left' ? prevRoomRef.current : nextRoomRef.current;
    if (!target) {
      sound.playLaserZap();
      return;
    }
    if (!target.isUnlocked) {
      sound.playLaserZap();
      return;
    }
    sound.playDoorOpen();
    onNavigateRoomRef.current(target.id);
  }, []);

  // Unified action trigger: checks doorways first if near door, else checks nearby objects
  const handleActionTrigger = useCallback(() => {
    const curX = characterXRef.current;
    const nearLeft = curX <= 22;
    const nearRight = curX >= 78;

    if (nearLeft) {
      handleDoorNavigate('left');
      return;
    }

    if (nearRight) {
      handleDoorNavigate('right');
      return;
    }

    const nearObj = nearbyObjectRef.current;
    if (nearObj) {
      handleInteractWithObject(nearObj);
    }
  }, [handleDoorNavigate, handleInteractWithObject]);

  const handleActionTriggerRef = useRef(handleActionTrigger);
  handleActionTriggerRef.current = handleActionTrigger;

  // Keyboard navigation handler (A/D and Arrow Keys, plus E/Space for action)
  useEffect(() => {
    const activeKeys = new Set<string>();
    let keyInterval: NodeJS.Timeout | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input/textarea or if a modal dialog is open
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (document.querySelector('.fixed.inset-0')) {
        return;
      }

      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        activeKeys.add(e.key.toLowerCase());

        setTargetX(null);
        pendingInteractionRef.current = null;

        if (!keyInterval) {
          keyInterval = setInterval(() => {
            let dx = 0;
            if (activeKeys.has('arrowleft') || activeKeys.has('a')) {
              dx -= 1.5;
              setFacing('left');
            }
            if (activeKeys.has('arrowright') || activeKeys.has('d')) {
              dx += 1.5;
              setFacing('right');
            }

            if (dx !== 0) {
              setIsWalking(true);
              playFootstep();
              setCharacterX((prev) => Math.max(14, Math.min(86, prev + dx)));
            } else {
              setIsWalking(false);
            }
          }, 24);
        }
      }

      // Interact with doorway or nearby object via E or Space
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        e.preventDefault();
        handleActionTriggerRef.current();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      activeKeys.delete(e.key.toLowerCase());
      if (activeKeys.size === 0) {
        if (keyInterval) {
          clearInterval(keyInterval);
          keyInterval = null;
        }
        setIsWalking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (keyInterval) clearInterval(keyInterval);
    };
  }, [playFootstep]);

  // Handle clicking on room floor to walk there
  const handleFloorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(14, Math.min(86, (clickX / rect.width) * 100));

    pendingInteractionRef.current = null;
    setTargetX(percentage);
    setIsWalking(true);
    setFacing(percentage >= characterX ? 'right' : 'left');
    sound.playClick();
  };

  // Continuous manual walk buttons for mobile/touch
  const handleManualStep = (direction: 'left' | 'right') => {
    setTargetX(null);
    pendingInteractionRef.current = null;
    setFacing(direction);
    setIsWalking(true);
    playFootstep();
    setCharacterX((prev) =>
      direction === 'left' ? Math.max(14, prev - 4) : Math.min(86, prev + 4)
    );
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    stepTimerRef.current = setTimeout(() => {
      setIsWalking(false);
      stepTimerRef.current = null;
    }, 440);
  };

  // Compute active prompt context for the character floating bubble & dock action button
  let activeActionPrompt: { label: string; isDoor?: boolean } | null = null;
  if (isNearLeftDoor) {
    if (prevRoom) {
      activeActionPrompt = {
        label: prevRoom.isUnlocked ? `Masuk: ${prevRoom.name}` : `Pintu Terkunci (${prevRoom.requiredKeycardId === 'keycard_l1' ? 'Card L1' : 'Card L2'})`,
        isDoor: true,
      };
    } else {
      activeActionPrompt = {
        label: 'Batas Fasilitas',
        isDoor: true,
      };
    }
  } else if (isNearRightDoor) {
    if (nextRoom) {
      activeActionPrompt = {
        label: nextRoom.isUnlocked ? `Masuk: ${nextRoom.name}` : `Pintu Terkunci (${nextRoom.requiredKeycardId === 'keycard_l1' ? 'Card L1' : 'Card L2'})`,
        isDoor: true,
      };
    } else {
      activeActionPrompt = {
        label: 'Batas Fasilitas',
        isDoor: true,
      };
    }
  } else if (nearbyObject) {
    activeActionPrompt = {
      label: `Periksa: ${nearbyObject.name}`,
      isDoor: false,
    };
  }

  return (
    <div className="space-y-3">
      {/* Main Visual Room Stage */}
      <div
        ref={containerRef}
        onClick={handleFloorClick}
        className="relative w-full h-[450px] sm:h-[520px] md:h-[570px] rounded-3xl overflow-hidden border-4 border-[#1e293b] bg-[#1e293b] shadow-2xl select-none cursor-crosshair group"
      >
        {/* Architectural 2D Cartoon Lab Room Environment */}
        <LabRoomDecor room={room} lasersActive={lasersActive} />

        {/* Left Room Doorway Navigation (Pintu Sisi Kiri) */}
        <RoomDoorway
          side="left"
          targetRoom={prevRoom}
          onNavigate={onNavigateRoom}
          isCharacterClose={isNearLeftDoor}
        />

        {/* Right Room Doorway Navigation (Pintu Sisi Kanan) */}
        <RoomDoorway
          side="right"
          targetRoom={nextRoom}
          onNavigate={onNavigateRoom}
          isCharacterClose={isNearRightDoor}
        />

        {/* Room Sector Top Left Badge */}
        <div className="absolute top-4 left-32 sm:left-36 z-20 flex flex-col gap-1 pointer-events-none">
          <div className="px-3 py-1 rounded-xl bg-[#f8fafc] border-2 border-[#1e293b] text-xs font-mono-tech text-[#0f172a] flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-extrabold">{room.sectorCode} : {room.name}</span>
          </div>

          {/* Laser warning badge in security corridor */}
          {room.id === 'security_corridor' && lasersActive && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                sound.playLaserZap();
                onLaserTrigger();
              }}
              className="px-2.5 py-1 rounded-lg bg-red-600 border border-[#1e293b] text-[10px] font-mono-tech text-white flex items-center gap-1.5 shadow-md pointer-events-auto cursor-pointer animate-pulse"
              title="Awas! Berjalan menembus laser aktif mengurangi sisa waktu!"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span className="font-black">LASER AKTIF (-15s)</span>
            </div>
          )}
        </div>

        {/* Mission / Objective Panel in Top Right */}
        <ObjectivePanel
          inventory={inventory}
          currentRoomId={room.id}
          lasersActive={lasersActive}
          rooms={allRooms}
        />

        {/* Interactive Lab Equipment Hotspots */}
        {room.objects.map((obj) => {
          const isDangerousLaser = obj.id === 'laser_barrier' && lasersActive;
          const isTargeted = pendingInteractionRef.current?.id === obj.id;
          const isClose = Math.abs(obj.position.x - characterX) <= 14;

          return (
            <div
              key={obj.id}
              id={`object-hotspot-${obj.id}`}
              style={{
                left: `${obj.position.x}%`,
                top: `${obj.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleInteractWithObject(obj);
              }}
              className="absolute z-20 group cursor-pointer"
            >
              {/* Full Illustrated Lab Equipment / Task Object Artwork */}
              <LabObjectVisual
                object={obj}
                isClose={isClose}
                isTargeted={isTargeted}
                lasersActive={lasersActive}
              />

              {/* Hover Tooltip Label */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:flex flex-col items-center z-35 pointer-events-none">
                <div className="px-3 py-1 rounded-xl bg-white border-2 border-[#1e293b] shadow-xl text-center whitespace-nowrap">
                  <span className="text-xs font-black font-mono-tech text-[#0f172a] block">
                    {obj.name}
                  </span>
                </div>
                <div className="w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-[#1e293b] rotate-45 -mt-1.5" />
              </div>
            </div>
          );
        })}

        {/* Playable Character Sprite Walking on the Lab Floor */}
        <CharacterSprite
          posX={characterX}
          facing={facing}
          isWalking={isWalking}
          actionPrompt={activeActionPrompt}
          onAction={handleActionTrigger}
        />

        {/* Room ambient lore at bottom */}
        <div className="absolute bottom-3 inset-x-32 z-20 hidden md:flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-200 bg-[#0f172a]/85 px-4 py-1.5 rounded-full border border-slate-700 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{room.description}</span>
          </div>
        </div>
      </div>

      {/* Responsive Character Controls Dock */}
      <div className="flex items-center justify-center gap-3 bg-[#f8fafc] border-3 border-[#1e293b] rounded-2xl p-2.5 sm:p-3 shadow-md">
        {/* Walk Left Button */}
        <button
          type="button"
          id="btn-walk-left"
          onClick={() => handleManualStep('left')}
          className="flex-1 max-w-44 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border-2 border-[#1e293b] text-[#0f172a] font-mono-tech text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#0284c7]" />
          <span>Jalan Kiri</span>
        </button>

        {/* Action / Inspect Button for Nearby Object or Doorway */}
        <button
          type="button"
          id="btn-inspect-nearby"
          disabled={!activeActionPrompt || activeActionPrompt.label === 'Batas Fasilitas'}
          onClick={handleActionTrigger}
          className={`flex-1 max-w-72 py-2.5 px-4 rounded-xl border-2 font-mono-tech text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs ${
            activeActionPrompt && activeActionPrompt.label !== 'Batas Fasilitas'
              ? activeActionPrompt.isDoor
                ? 'bg-cyan-300 hover:bg-cyan-200 border-[#1e293b] text-[#0f172a] shadow-md animate-bounce cursor-pointer'
                : 'bg-[#fde047] hover:bg-[#facc15] border-[#1e293b] text-[#0f172a] shadow-md animate-bounce cursor-pointer'
              : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed'
          }`}
        >
          {activeActionPrompt?.isDoor ? (
            <DoorOpen className="w-4 h-4 text-[#0f172a]" />
          ) : (
            <Sparkles className={`w-4 h-4 ${activeActionPrompt ? 'text-[#0f172a]' : 'text-slate-400'}`} />
          )}
          <span className="truncate">
            {activeActionPrompt ? activeActionPrompt.label : 'Dekati Objek / Pintu'}
          </span>
        </button>

        {/* Walk Right Button */}
        <button
          type="button"
          id="btn-walk-right"
          onClick={() => handleManualStep('right')}
          className="flex-1 max-w-44 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border-2 border-[#1e293b] text-[#0f172a] font-mono-tech text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <span>Jalan Kanan</span>
          <ArrowRight className="w-4 h-4 text-[#0284c7]" />
        </button>
      </div>
    </div>
  );
};
