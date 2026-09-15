import React from 'react';
import { Timer, RotateCcw, Volume2, VolumeX, Trophy, ShieldAlert, Cpu } from 'lucide-react';
import { formatTime } from '../services/gameState';
import { sound } from '../services/audio';
import { BestRecord } from '../types';

interface HeaderProps {
  timeRemaining: number;
  totalTime: number;
  currentRoomName: string;
  currentSector: string;
  itemsFoundCount: number;
  totalItemsCount: number;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onRestart: () => void;
  bestRecord: BestRecord | null;
  lasersActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  timeRemaining,
  totalTime,
  currentRoomName,
  currentSector,
  itemsFoundCount,
  totalItemsCount,
  isAudioMuted,
  onToggleAudio,
  onRestart,
  bestRecord,
  lasersActive,
}) => {
  const isUrgent = timeRemaining <= 60;
  const progressPercent = Math.min(100, Math.round((itemsFoundCount / totalItemsCount) * 100));

  return (
    <header className="w-full bg-[#f8fafc] border-b-4 border-[#1e293b] px-3 sm:px-6 py-2.5 z-30 sticky top-0 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Title & Sector */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0284c7] border-2 border-[#1e293b] flex items-center justify-center text-white shadow-xs">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-mono-tech font-black tracking-wider text-[#0f172a] uppercase">
                LAB ESCAPE
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e0f2fe] text-[#0369a1] border border-[#0284c7] font-mono-tech font-bold">
                {currentSector}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono-tech font-bold truncate max-w-[160px] sm:max-w-xs">
              {currentRoomName}
            </p>
          </div>
        </div>

        {/* Center: Timer & Status */}
        <div className="flex items-center gap-4">
          <div
            id="game-timer-display"
            className={`flex items-center gap-2 px-3.5 py-1 rounded-xl border-2 font-mono-tech transition-all shadow-xs ${
              isUrgent
                ? 'bg-red-500 border-[#1e293b] text-white animate-pulse'
                : 'bg-[#fef08a] border-[#1e293b] text-[#854d0e]'
            }`}
          >
            <Timer className={`w-4 h-4 ${isUrgent ? 'animate-spin text-white' : 'text-[#854d0e]'}`} />
            <span className="text-lg sm:text-xl font-black tracking-wider">
              {formatTime(timeRemaining)}
            </span>
            {isUrgent && (
              <span className="text-[10px] uppercase tracking-wider text-white font-black hidden sm:inline">
                DARURAT!
              </span>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-700 font-bold">
              <span className="text-slate-500">Progress:</span>
              <span className="text-[#0284c7] font-black">
                {itemsFoundCount}/{totalItemsCount} Item
              </span>
            </div>
            <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden border border-[#1e293b]">
              <div
                className="h-full bg-[#10b981] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Controls & Record */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Laser warning badge if active */}
          {lasersActive && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-100 border border-red-400 text-red-700 text-xs font-mono-tech font-bold">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-red-600" />
              <span>LASER AKTIF</span>
            </div>
          )}

          {/* Best Time badge */}
          {bestRecord && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono-tech font-bold shadow-xs"
              title={`Rekor Terbaik: ${bestRecord.formattedTime}`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{bestRecord.formattedTime}</span>
            </div>
          )}

          {/* Audio toggle */}
          <button
            type="button"
            id="btn-toggle-audio"
            onClick={() => {
              sound.playClick();
              onToggleAudio();
            }}
            className="p-2 rounded-xl bg-white border-2 border-[#1e293b] text-slate-700 hover:bg-slate-100 transition-colors shadow-xs active:scale-95 cursor-pointer"
            title={isAudioMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
            aria-label="Toggle Audio"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#0284c7]" />}
          </button>

          {/* Restart Button */}
          <button
            type="button"
            id="btn-restart-game"
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#1e293b] hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-mono-tech font-black transition-colors shadow-xs active:scale-95 cursor-pointer"
            title="Restart Permainan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
