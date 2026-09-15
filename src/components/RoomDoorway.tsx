import React from 'react';
import { Room } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  DoorOpen, 
  Ban,
  KeyRound
} from 'lucide-react';
import { sound } from '../services/audio';

interface RoomDoorwayProps {
  side: 'left' | 'right';
  targetRoom: Room | null;
  onNavigate?: (roomId: string) => void;
  isCharacterClose?: boolean;
}

export const RoomDoorway: React.FC<RoomDoorwayProps> = ({
  side,
  targetRoom,
  onNavigate,
  isCharacterClose = false,
}) => {
  // If this side has no adjacent room (e.g. facility dead-end / starting room)
  const isTerminalBulkhead = !targetRoom;
  const isLocked = targetRoom ? !targetRoom.isUnlocked : true;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTerminalBulkhead) {
      sound.playLaserZap();
      return;
    }

    if (isLocked) {
      sound.playLaserZap();
    } else {
      sound.playDoorOpen();
      if (onNavigate && targetRoom) {
        onNavigate(targetRoom.id);
      }
    }
  };

  return (
    <button
      type="button"
      id={`doorway-${side}`}
      onClick={handleClick}
      disabled={isTerminalBulkhead}
      aria-label={
        isTerminalBulkhead
          ? 'Batas Fasilitas'
          : isLocked
          ? `Pintu Terkunci ke ${targetRoom?.name}`
          : `Masuk ke ${targetRoom?.name}`
      }
      style={{
        bottom: '36px',
      }}
      className={`absolute z-25 flex flex-col items-center select-none transition-all duration-200 outline-none ${
        side === 'left' ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
      } ${
        isTerminalBulkhead
          ? 'cursor-not-allowed opacity-85'
          : 'cursor-pointer group hover:scale-105 active:scale-95'
      }`}
    >
      {/* Symmetrical Cartoon Lab Door Frame as the Clickable Button */}
      <div
        className={`relative w-24 sm:w-28 md:w-32 h-64 sm:h-72 rounded-t-3xl border-4 border-[#1e293b] shadow-[0_6px_0_#0f172a] flex flex-col items-center justify-between p-2 overflow-hidden transition-all duration-200 ${
          isTerminalBulkhead
            ? 'bg-[#334155]'
            : isLocked
            ? 'bg-[#475569] group-hover:bg-[#526177]'
            : isCharacterClose
            ? 'bg-[#0284c7] shadow-[0_0_30px_rgba(2,132,199,0.85)] border-[#0284c7]'
            : 'bg-[#0ea5e9] group-hover:bg-[#0284c7] group-hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]'
        }`}
      >
        {/* Top Warning Hazard Caution Stripes Bar */}
        <div className="w-full h-4 rounded-t-xl hazard-stripes border-b-2 border-[#1e293b] shrink-0" />

        {/* Access Keypad Scanner Node on the Door Jamb */}
        {!isTerminalBulkhead && (
          <div
            className={`absolute top-14 w-5 h-10 rounded-lg p-1 border-2 border-[#1e293b] flex flex-col justify-around shadow-md z-10 ${
              side === 'left' ? '-right-2' : '-left-2'
            } ${isLocked ? 'bg-red-600' : 'bg-emerald-500'}`}
          >
            <div className={`w-full h-2 rounded-xs ${isLocked ? 'bg-white animate-pulse' : 'bg-white'}`} />
            <div className="w-full h-1 bg-[#1e293b] rounded-xs" />
            <div className="w-full h-1 bg-[#1e293b] rounded-xs" />
          </div>
        )}

        {/* Central Observation Reinforced Glass Window / Portal */}
        <div className="w-18 sm:w-22 md:w-24 h-32 sm:h-36 rounded-2xl bg-[#0f172a] border-3 border-[#1e293b] relative overflow-hidden flex flex-col items-center justify-center shadow-inner my-auto shrink-0">
          {/* Glass reflection gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-10" />
          
          {/* Wire diamond grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#38bdf8" strokeWidth="1.2" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#38bdf8" strokeWidth="1.2" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeWidth="1.2" />
          </svg>

          {/* Central Graphical Status & Directional Action Icon */}
          {isTerminalBulkhead ? (
            <div className="relative z-20 flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-900/90 border-2 border-slate-700 shadow-lg">
              <Ban className="w-8 h-8 text-slate-400" />
            </div>
          ) : isLocked ? (
            <div className="relative z-20 flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-red-950/90 border-2 border-red-500 shadow-lg animate-pulse">
              <Lock className="w-8 h-8 text-red-400" />
              {/* Keycard indicator icon */}
              <div className="w-7 h-4 rounded-md bg-red-800 border border-red-400 flex items-center justify-center">
                <KeyRound className="w-3.5 h-3.5 text-red-200" />
              </div>
            </div>
          ) : (
            <div className="relative z-20 flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl bg-cyan-950/90 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform">
              <DoorOpen className="w-8 h-8 text-cyan-200" />
              {/* Directional animated arrow badge */}
              <div className="px-2 py-0.5 rounded-full bg-[#fde047] border-2 border-[#1e293b] flex items-center justify-center shadow-xs">
                {side === 'left' ? (
                  <ArrowLeft className="w-4 h-4 text-[#0f172a] animate-pulse" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#0f172a] animate-pulse" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Brass Door Handle (facing inward toward room center) */}
        {!isTerminalBulkhead && (
          <div
            className={`w-5 h-5 rounded-full bg-[#f59e0b] border-2 border-[#1e293b] shadow-md my-1 shrink-0 ${
              side === 'left' ? 'self-end mr-1.5' : 'self-start ml-1.5'
            }`}
          />
        )}

        {/* Heavy Steel Door Kickplate with ventilation vents (100% graphic, no text) */}
        <div className="w-full h-11 rounded-b-2xl bg-[#1e293b] border-t-3 border-[#334155] flex items-center justify-center gap-1.5 px-3 shrink-0">
          <div className="h-1.5 flex-1 rounded-full bg-[#334155]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#334155]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#334155]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#334155]" />
        </div>
      </div>
    </button>
  );
};
