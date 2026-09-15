import React from 'react';
import { Room, RoomId } from '../types';
import { Lock, Unlock, Zap, ShieldAlert, Compass } from 'lucide-react';
import { sound } from '../services/audio';

interface MinimapProps {
  rooms: Room[];
  currentRoomId: RoomId;
  onSelectRoom: (roomId: RoomId) => void;
  lasersActive: boolean;
}

export const Minimap: React.FC<MinimapProps> = ({
  rooms,
  currentRoomId,
  onSelectRoom,
  lasersActive,
}) => {
  return (
    <div className="bg-[#070d1e]/90 border border-cyan-900/60 rounded-xl p-3 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 font-mono-tech tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>DENAH FASILITAS LABORATORIUM</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono-tech">
          PILIH RUANGAN TERBUKA
        </span>
      </div>

      {/* Grid of rooms */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {rooms.map((room) => {
          const isCurrent = room.id === currentRoomId;
          const isLocked = !room.isUnlocked;
          const isLaserZone = room.id === 'security_corridor' && lasersActive;

          return (
            <button
              key={room.id}
              id={`nav-room-${room.id}`}
              disabled={isLocked}
              onClick={() => {
                if (!isLocked) {
                  sound.playClick();
                  onSelectRoom(room.id);
                }
              }}
              className={`relative flex flex-col p-2.5 rounded-lg border text-left transition-all group ${
                isCurrent
                  ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                  : isLocked
                  ? 'bg-slate-950/40 border-slate-800/80 opacity-60 cursor-not-allowed'
                  : 'bg-slate-900/60 border-slate-700/80 hover:border-cyan-500/60 hover:bg-slate-800/80 cursor-pointer'
              }`}
            >
              {/* Sector Code */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-mono-tech font-semibold text-slate-400">
                  {room.sectorCode}
                </span>

                {isLocked ? (
                  <Lock className="w-3 h-3 text-red-400" />
                ) : (
                  <Unlock className="w-3 h-3 text-emerald-400" />
                )}
              </div>

              {/* Room name */}
              <p
                className={`text-xs font-bold font-mono-tech line-clamp-1 ${
                  isCurrent
                    ? 'text-cyan-300'
                    : isLocked
                    ? 'text-slate-500'
                    : 'text-slate-200 group-hover:text-cyan-400'
                }`}
              >
                {room.name}
              </p>

              {/* Status footer */}
              <div className="mt-2 flex items-center gap-1 text-[10px] font-mono-tech">
                {isCurrent && (
                  <span className="text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Posisi Anda
                  </span>
                )}
                {isLocked && (
                  <span className="text-red-400/90 truncate">
                    {room.requiredKeycardId === 'keycard_l1' ? 'Butuh Card L1' : 'Butuh Card L2'}
                  </span>
                )}
                {!isCurrent && !isLocked && (
                  <span className="text-emerald-400/80">Terbuka</span>
                )}
              </div>

              {/* Laser indicator for security corridor */}
              {isLaserZone && (
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
