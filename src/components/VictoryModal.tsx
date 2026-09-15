import React from 'react';
import { Trophy, CheckCircle, RotateCcw, Sparkles, Clock, Award } from 'lucide-react';
import { formatTime } from '../services/gameState';
import { sound } from '../services/audio';

interface VictoryModalProps {
  isOpen: boolean;
  onRestart: () => void;
  timeElapsed: number;
  isNewRecord: boolean;
  itemsFoundCount: number;
  totalItems: number;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onRestart,
  timeElapsed,
  isNewRecord,
  itemsFoundCount,
  totalItems,
}) => {
  if (!isOpen) return null;

  // Calculate Rank based on speed
  const getRank = (seconds: number) => {
    if (seconds <= 120) return { rank: 'S+', title: 'CYBER OPERATIVE LEGEND', color: 'text-amber-400' };
    if (seconds <= 200) return { rank: 'S', title: 'MASTER ESCAPIST', color: 'text-cyan-400' };
    if (seconds <= 300) return { rank: 'A', title: 'SENIOR RESEARCH AGENT', color: 'text-emerald-400' };
    return { rank: 'B', title: 'SURVIVOR LAB', color: 'text-purple-400' };
  };

  const rankInfo = getRank(timeElapsed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-md bg-[#051119] border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(16,185,129,0.3)] crt-glow text-center">
        {/* Trophy icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/80 text-emerald-400 flex items-center justify-center mx-auto mb-4 neon-border-green">
          <Trophy className="w-9 h-9 animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono-tech tracking-wider uppercase mb-1 neon-text-green">
          BERHASIL KABUR!
        </h2>
        <p className="text-xs text-emerald-300 font-mono-tech uppercase tracking-widest mb-6">
          EVAKUASI FASILITAS SUKSES • AIRLOCK TERBUKA
        </p>

        {/* New Record Banner */}
        {isNewRecord && (
          <div className="mb-4 py-2 px-3 rounded-lg bg-amber-500/20 border border-amber-400/80 text-amber-300 text-xs font-mono-tech font-bold flex items-center justify-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>REKOR WAKTU TERCEPAT BARU!</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 font-mono-tech">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
            <span className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Waktu Selesai
            </span>
            <span className="text-xl font-bold text-cyan-300">
              {formatTime(timeElapsed)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
            <span className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Peringkat & Skor
            </span>
            <span className={`text-xl font-extrabold ${rankInfo.color}`}>
              {rankInfo.rank} <span className="text-xs font-semibold text-slate-400">({rankInfo.title})</span>
            </span>
          </div>
        </div>

        {/* Lore confirmation */}
        <p className="text-xs text-slate-300 font-mono-tech mb-6 leading-relaxed bg-black/50 p-3 rounded-lg border border-emerald-950">
          Semua sistem keamanan berhasil diretas, kisi laser dinonaktifkan, dan sampel penting berhasil diselamatkan dari fasilitas XENO-TECH.
        </p>

        {/* Play Again Button */}
        <button
          id="btn-play-again"
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold font-mono-tech text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/30"
        >
          <RotateCcw className="w-4 h-4" />
          <span>MAIN LAGI (PUZZLE DIACAK)</span>
        </button>
      </div>
    </div>
  );
};
