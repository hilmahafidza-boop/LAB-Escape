import React from 'react';
import { InteractiveObject, Item } from '../types';
import { 
  Eye, 
  PackageCheck, 
  AlertCircle, 
  X, 
  Sparkles, 
  KeyRound, 
  FileText,
  HelpCircle,
  Wrench,
  CheckCircle2,
  Hand
} from 'lucide-react';
import { sound } from '../services/audio';

interface ObjectModalProps {
  isOpen: boolean;
  object: InteractiveObject | null;
  onClose: () => void;
  onTakeItem?: (itemId: string) => void;
  containedItem?: Item | null;
  hasRequiredItem?: boolean;
  requiredItemName?: string;
  onUseRequiredItem?: () => void;
}

export const ObjectModal: React.FC<ObjectModalProps> = ({
  isOpen,
  object,
  onClose,
  onTakeItem,
  containedItem,
  hasRequiredItem,
  requiredItemName,
  onUseRequiredItem,
}) => {
  if (!isOpen || !object) return null;

  // Render dedicated mini-illustration for the discovered contained item
  const renderItemCardVisual = (item: Item) => {
    switch (item.id) {
      case 'screwdriver':
        return (
          <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <Wrench className="w-8 h-8 text-amber-300 rotate-45 animate-pulse" />
          </div>
        );
      case 'keycard_l1':
        return (
          <div className="w-16 h-12 rounded-xl bg-cyan-900 border-2 border-cyan-300 flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            <div className="flex justify-between items-center">
              <span className="text-[6px] font-mono-tech text-white font-bold">XENO</span>
              <span className="text-[6px] font-mono-tech bg-cyan-300 text-black px-1 rounded-xs font-bold">L1</span>
            </div>
            <div className="w-4 h-3 rounded-xs bg-amber-400" />
          </div>
        );
      case 'keycard_l2':
        return (
          <div className="w-16 h-12 rounded-xl bg-amber-900 border-2 border-amber-300 flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(245,158,11,0.6)]">
            <div className="flex justify-between items-center">
              <span className="text-[6px] font-mono-tech text-white font-bold">XENO</span>
              <span className="text-[6px] font-mono-tech bg-amber-300 text-black px-1 rounded-xs font-bold">L2</span>
            </div>
            <div className="w-4 h-3 rounded-xs bg-amber-200" />
          </div>
        );
      case 'laser_prism':
        return (
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Sparkles className="w-8 h-8 text-emerald-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        );
      case 'encryption_chip':
        return (
          <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border-2 border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <span className="text-2xl">💾</span>
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-cyan-300" />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0a1022] border-3 border-cyan-400/80 rounded-3xl p-6 shadow-2xl crt-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center shadow-sm">
              <Eye className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono-tech tracking-wider uppercase">
                {object.name}
              </h3>
              <span className="text-[10px] font-mono-tech text-cyan-400">
                Pemeriksaan Objek Laboratorium
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Object description */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 font-mono-tech leading-relaxed shadow-inner">
          <p>{object.description}</p>
        </div>

        {/* Revealed Hint or Clue Display */}
        {object.hint && (
          <div className="my-3 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-400/60 text-xs text-cyan-200 font-mono-tech shadow-md">
            <div className="flex items-center gap-2 font-bold text-cyan-300 mb-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>CATATAN RISET / PETUNJUK:</span>
            </div>
            <p className="leading-relaxed bg-black/60 p-3 rounded-xl border border-cyan-900/80 text-white font-semibold">
              {object.hint}
            </p>
          </div>
        )}

        {/* Required Item interaction */}
        {object.requiredItemId && object.status === 'requires_item' && (
          <div className="my-3 p-4 rounded-2xl bg-amber-950/30 border-2 border-amber-500/60 text-xs font-mono-tech">
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>DIBUTUHKAN PERALATAN KHUSUS</span>
            </div>
            <p className="text-slate-200 mb-3">
              Objek ini membutuhkan <span className="text-amber-300 font-extrabold">{requiredItemName || 'Peralatan Tertentu'}</span> untuk dibuka atau diakses.
            </p>

            {hasRequiredItem ? (
              <button
                onClick={() => {
                  sound.playSuccess();
                  if (onUseRequiredItem) onUseRequiredItem();
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Gunakan {requiredItemName} Sekarang</span>
              </button>
            ) : (
              <div className="p-2 rounded bg-black/50 border border-amber-900/60 text-amber-200 text-[11px] italic">
                ⚠️ Anda belum menemukan item ini. Cari di meja laboratorium atau ruangan lain terlebih dahulu!
              </div>
            )}
          </div>
        )}

        {/* Contained Item Reward box with visual preview and prominent take action */}
        {containedItem && object.status !== 'requires_item' && (
          <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-950 to-emerald-950/80 border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {renderItemCardVisual(containedItem)}
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-bold font-mono-tech text-emerald-400 uppercase tracking-wider">
                    ITEM TERSEMBUNYI DITEMUKAN!
                  </span>
                </div>
                <p className="text-sm font-extrabold text-white font-mono-tech mt-0.5">
                  {containedItem.name}
                </p>
                <p className="text-[11px] text-slate-300 font-mono-tech line-clamp-2">
                  {containedItem.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onTakeItem) onTakeItem(containedItem.id);
              }}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs font-mono-tech flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Hand className="w-4 h-4 text-slate-950" />
              <span>AMBIL KUNCI / ITEM</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800/80">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-white border-2 border-[#1e293b] text-[#0f172a] text-xs font-mono-tech font-black hover:bg-slate-100 transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
