import React from 'react';
import { Zap, ShieldAlert, Sparkles, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { sound } from '../services/audio';

interface LaserPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lasersActive: boolean;
  hasPrism: boolean;
  onUsePrism: () => void;
  onOpenWirePuzzle: () => void;
}

export const LaserPanelModal: React.FC<LaserPanelModalProps> = ({
  isOpen,
  onClose,
  lasersActive,
  hasPrism,
  onUsePrism,
  onOpenWirePuzzle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0d0710] border-2 border-red-500/70 rounded-2xl p-5 shadow-2xl crt-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-950">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-100 font-mono-tech tracking-wider uppercase">
              KISI LASER KEAMANAN OTOMATIS
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Laser Status Graphic */}
        <div className="my-4 p-4 rounded-xl bg-black border border-red-900/60 flex flex-col items-center">
          <div className="w-full h-16 flex items-center justify-center gap-2 relative overflow-hidden rounded bg-red-950/20">
            {lasersActive ? (
              <>
                <div className="absolute inset-x-0 h-1 bg-red-500 laser-beam top-4" />
                <div className="absolute inset-x-0 h-1.5 bg-red-600 laser-beam top-8" />
                <div className="absolute inset-x-0 h-1 bg-red-500 laser-beam top-12" />
                <span className="relative z-10 px-3 py-1 bg-red-950/90 border border-red-500 text-red-400 font-mono-tech text-xs font-bold uppercase tracking-widest animate-pulse">
                  BEBAN DAYA: 10,000 VOLT AKTIF
                </span>
              </>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-mono-tech text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>KISI LASER NONAKTIF (AMAN DILINTASI)</span>
              </div>
            )}
          </div>
        </div>

        {/* Explanatory text */}
        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono-tech leading-relaxed space-y-2">
          {lasersActive ? (
            <>
              <p className="text-red-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Peringatan: Medan Laser Mematikan
              </p>
              <p>
                Lorong menuju Sektor Lab dan Reaktor terblokir kisi sensorik. Anda memiliki dua opsi untuk menonaktifkannya:
              </p>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                <li>Bypass kabel sirkuit manual pada Panel Sekering Dinding.</li>
                <li>Pasang Prisma Pembias Optik pada emitor lensa laser.</li>
              </ul>
            </>
          ) : (
            <p className="text-emerald-400 font-semibold">
              Berkas foton telah dialihkan. Koridor menuju Sektor Penelitian dan Ruang Reaktor kini dapat dilalui dengan aman tanpa memicu alarm.
            </p>
          )}
        </div>

        {/* Action buttons */}
        {lasersActive && (
          <div className="mt-4 space-y-2">
            {hasPrism ? (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onUsePrism();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold font-mono-tech text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>PASANG PRISMA PEMBIAS OPTIK</span>
              </button>
            ) : (
              <div className="text-[11px] text-slate-500 font-mono-tech text-center p-2 rounded bg-slate-900/60 border border-slate-800">
                (Prisma optik belum ada di inventaris - periksa Loker Keamanan)
              </div>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onOpenWirePuzzle();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-cyan-900/60 hover:bg-cyan-800/80 border border-cyan-500 text-cyan-300 font-bold font-mono-tech text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>BUKA PANEL SEKERING SIRKUIT</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3 mt-4 border-t border-slate-800">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-tech"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
