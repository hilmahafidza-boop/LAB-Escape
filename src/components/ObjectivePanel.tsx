import React from 'react';
import { Item, Room, RoomId } from '../types';
import { Target, Compass } from 'lucide-react';

interface ObjectivePanelProps {
  inventory: Item[];
  currentRoomId: RoomId;
  lasersActive: boolean;
  rooms: Room[];
}

export const ObjectivePanel: React.FC<ObjectivePanelProps> = ({
  inventory,
  currentRoomId,
  lasersActive,
  rooms,
}) => {
  const hasItem = (id: string) => inventory.some((item) => item.id === id);

  // Compute concise, punchy current objective
  const getMissionObjective = (): { title: string; instruction: string } => {
    // Stage 1: Screwdriver
    if (!hasItem('screwdriver')) {
      return {
        title: 'CARI PERKAKAS',
        instruction: 'Ambil Obeng di Meja Lab',
      };
    }

    // Stage 2: Keycard L1 in Vent
    if (!hasItem('keycard_l1')) {
      return {
        title: 'BUKA VENTILASI',
        instruction: 'Buka Kisi Dinding dengan Obeng',
      };
    }

    // Stage 3: Lasers & Security Corridor
    if (lasersActive) {
      if (currentRoomId !== 'security_corridor') {
        return {
          title: 'EKSPLORASI',
          instruction: 'Gunakan Pintu ke Koridor Keamanan',
        };
      }
      if (!hasItem('laser_prism')) {
        return {
          title: 'AMBIL PRISMA',
          instruction: 'Buka Loker Keamanan (Kode 3-Digit)',
        };
      }
      return {
        title: 'MATIKAN LASER',
        instruction: 'Sambungkan Kabel di Panel Sekering',
      };
    }

    // Stage 4: Keycard L2 & Research Lab
    if (!hasItem('keycard_l2')) {
      if (currentRoomId !== 'research_lab') {
        return {
          title: 'LAB BIOKIMIA',
          instruction: 'Masuk ke Lab Riset Biokimia',
        };
      }
      return {
        title: 'SINTESIS REAGEN',
        instruction: 'Selesaikan Reaksi Kimia untuk Kartu L2',
      };
    }

    // Stage 5: Reactor Core & Encryption Chip
    if (!hasItem('encryption_chip')) {
      if (currentRoomId !== 'reactor_core') {
        return {
          title: 'RUANG REAKTOR',
          instruction: 'Masuk ke Ruang Reaktor Inti',
        };
      }
      return {
        title: 'BRANKAS KUANTUM',
        instruction: 'Buka Brankas dengan Kartu Akses L2',
      };
    }

    // Stage 6: Reactor Transponder
    if (!hasItem('reactor_transponder')) {
      return {
        title: 'STABILISASI INTI',
        instruction: 'Pasang Cip Kuantum di Konsol Reaktor',
      };
    }

    // Stage 7: Exit Airlock Gate
    if (currentRoomId !== 'exit_airlock') {
      return {
        title: 'EVAKUASI AKHIR',
        instruction: 'Menuju Gerbang Evakuasi Airlock',
      };
    }

    return {
      title: 'GERBANG EVAKUASI',
      instruction: 'Kumpulkan 4 Digit & Buka Pintu Airlock',
    };
  };

  const { title, instruction } = getMissionObjective();

  return (
    <div
      id="mission-objective-panel"
      className="absolute top-4 right-4 z-25 max-w-[210px] sm:max-w-[240px] pointer-events-auto"
    >
      <div className="bg-[#f8fafc] border-3 border-[#1e293b] rounded-2xl p-2 sm:p-2.5 shadow-[0_5px_0_#0f172a] transition-all hover:scale-102">
        <div className="flex items-center gap-1.5 border-b-2 border-slate-200 pb-1 mb-1">
          <div className="w-5 h-5 rounded-full bg-[#fde047] border border-[#ca8a04] flex items-center justify-center shrink-0">
            <Target className="w-3 h-3 text-[#854d0e]" />
          </div>
          <span className="text-[10px] font-mono-tech font-black tracking-wider text-[#0f172a] uppercase truncate">
            {title}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-auto shrink-0" />
        </div>
        <p className="text-[11px] sm:text-xs font-mono-tech font-bold text-[#1e293b] leading-tight line-clamp-2">
          {instruction}
        </p>
      </div>
    </div>
  );
};
