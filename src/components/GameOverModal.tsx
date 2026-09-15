import React from 'react';
import { Skull, RotateCcw, AlertOctagon, Clock } from 'lucide-react';
import { sound } from '../services/audio';

interface GameOverModalProps {
  isOpen: boolean;
  onRestart: () => void;
  reason?: string;
  itemsFoundCount: number;
  totalItems: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onRestart,
  reason = 'Waktu Evakuasi Habis! Protokol Karantina Mutlak Diaktifkan.',
  itemsFoundCount,
  totalItems,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-glitch">
      <div className="relative w-full max-w-md bg-[#130606] border-2 border-red-600 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(239,68,68,0.4)] crt-glow text-center">
        {/* Skull / Danger Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border-2 border-red-500/80 text-red-500 flex items-center justify-center mx-auto mb-4 neon-border-red">
          <AlertOctagon className="w-9 h-9 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-red-500 font-mono-tech tracking-wider uppercase mb-2 neon-text-red">
          MISI GAGAL
        </h2>
        <p className="text-xs text-red-300 font-mono-tech uppercase tracking-widest mb-4">
          CONTAINMENT BREACH • LOCKDOWN AKTIF
        </p>

        {/* Cause */}
        <div className="p-3.5 rounded-xl bg-black/70 border border-red-900/80 text-xs text-slate-300 font-mono-tech mb-6 leading-relaxed">
          {reason}
        </div>

        {/* Progress achieved before dying */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono-tech text-slate-400 mb-6">
          <Clock className="w-4 h-4 text-red-400" />
          <span>Kemajuan Terakhir: <strong className="text-slate-200">{itemsFoundCount}/{totalItems} Item Terkumpul</strong></span>
        </div>

        {/* Restart Button */}
        <button
          id="btn-retry-game"
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold font-mono-tech text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-red-600/30"
        >
          <RotateCcw className="w-4 h-4" />
          <span>COBA LAGI</span>
        </button>
      </div>
    </div>
  );
};
