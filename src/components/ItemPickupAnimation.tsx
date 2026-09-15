import React, { useState } from 'react';
import { Item } from '../types';
import { 
  Sparkles, 
  PackageCheck, 
  KeyRound, 
  Wrench, 
  Cpu, 
  CreditCard, 
  Check, 
  CheckCircle2,
  ShieldCheck,
  PartyPopper
} from 'lucide-react';
import { sound } from '../services/audio';

interface ItemPickupAnimationProps {
  item: Item;
  onComplete: () => void;
}

export const ItemPickupAnimation: React.FC<ItemPickupAnimationProps> = ({ item, onComplete }) => {
  const [isTaking, setIsTaking] = useState(false);

  const handleTake = () => {
    setIsTaking(true);
    sound.playItemGet();
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  // Render visual graphic representation for the specific acquired item
  const renderItemVisualArt = () => {
    switch (item.id) {
      // 1. Obeng Teknisi
      case 'screwdriver':
        return (
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
            <div className="relative flex flex-col items-center rotate-45 group-hover:rotate-12 transition-transform duration-500">
              {/* Screwdriver Shaft & Tip */}
              <div className="w-4 h-18 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-t-sm border border-slate-500 shadow-md relative">
                <div className="absolute top-0 inset-x-0 h-3 bg-slate-100 rounded-t-sm shadow-[0_0_8px_#ffffff]" />
                <div className="w-1.5 h-6 bg-slate-300 mx-auto -mt-6 rounded-t" />
              </div>
              {/* Screwdriver Handle */}
              <div className="w-10 h-22 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 border-2 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)] flex flex-col justify-around py-2 items-center">
                <div className="w-8 h-2 rounded bg-slate-900" />
                <div className="w-8 h-2 rounded bg-slate-900" />
                <div className="w-8 h-2 rounded bg-slate-900" />
              </div>
            </div>
          </div>
        );

      // 2. Keycard L1 (Biru)
      case 'keycard_l1':
        return (
          <div className="relative w-44 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/30 blur-2xl animate-pulse" />
            {/* Glossy High-Tech Keycard */}
            <div className="w-40 h-26 rounded-2xl bg-gradient-to-br from-[#0c4a6e] via-[#0284c7] to-[#0369a1] border-3 border-cyan-300 shadow-[0_0_35px_rgba(6,182,212,0.8)] p-3 flex flex-col justify-between relative overflow-hidden transform hover:scale-105 transition-all">
              {/* Magnetic Holographic Stripe */}
              <div className="absolute inset-x-0 top-3 h-3 bg-black/40 border-y border-cyan-400/40" />
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-mono-tech text-white font-extrabold tracking-wider">XENO-TECH</span>
                <span className="px-2 py-0.5 rounded bg-cyan-300 text-slate-950 font-black text-[10px]">L-1 ACCESS</span>
              </div>
              {/* Golden Smartchip */}
              <div className="w-8 h-7 rounded bg-amber-400 border border-amber-200 shadow-sm flex items-center justify-center relative">
                <div className="w-5 h-4 border border-amber-600 rounded-xs" />
              </div>
              <div className="flex justify-between items-end z-10">
                <div className="text-[9px] font-mono-tech text-cyan-200">ID: 884-K1-BLUE</div>
                <CreditCard className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        );

      // 3. Keycard L2 (Kuning)
      case 'keycard_l2':
        return (
          <div className="relative w-44 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-2xl animate-pulse" />
            <div className="w-40 h-26 rounded-2xl bg-gradient-to-br from-[#78350f] via-[#d97706] to-[#b45309] border-3 border-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.8)] p-3 flex flex-col justify-between relative overflow-hidden transform hover:scale-105 transition-all">
              <div className="absolute inset-x-0 top-3 h-3 bg-black/40 border-y border-amber-400/40" />
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-mono-tech text-white font-extrabold tracking-wider">XENO-TECH</span>
                <span className="px-2 py-0.5 rounded bg-amber-300 text-slate-950 font-black text-[10px]">L-2 ACCESS</span>
              </div>
              <div className="w-8 h-7 rounded bg-amber-200 border border-amber-400 shadow-sm flex items-center justify-center relative">
                <div className="w-5 h-4 border border-amber-700 rounded-xs" />
              </div>
              <div className="flex justify-between items-end z-10">
                <div className="text-[9px] font-mono-tech text-amber-200">ID: 990-K2-GOLD</div>
                <CreditCard className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        );

      // 4. Prisma Pembias Optik
      case 'laser_prism':
        return (
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl animate-pulse" />
            {/* 3D Crystal Gem Polygon */}
            <div className="relative flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
              <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                <polygon points="50,10 90,40 75,90 25,90 10,40" fill="url(#prismGrad)" stroke="#34d399" strokeWidth="3" />
                <line x1="50" y1="10" x2="50" y2="70" stroke="#a7f3d0" strokeWidth="2" />
                <line x1="10" y1="40" x2="50" y2="70" stroke="#a7f3d0" strokeWidth="1.5" />
                <line x1="90" y1="40" x2="50" y2="70" stroke="#a7f3d0" strokeWidth="1.5" />
                <line x1="25" y1="90" x2="50" y2="70" stroke="#a7f3d0" strokeWidth="1.5" />
                <line x1="75" y1="90" x2="50" y2="70" stroke="#a7f3d0" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );

      // 5. Master Encryption Chip
      case 'encryption_chip':
        return (
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl animate-pulse" />
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-950 via-purple-900 to-black border-3 border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.8)] p-3 flex flex-col items-center justify-center relative">
              {/* Golden Pins on all sides */}
              <div className="absolute -top-1.5 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2 bg-amber-400 rounded-t-xs" />
                ))}
              </div>
              <div className="absolute -bottom-1.5 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2 bg-amber-400 rounded-b-xs" />
                ))}
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-950 border-2 border-purple-300 flex items-center justify-center shadow-inner">
                <Cpu className="w-8 h-8 text-purple-300 animate-pulse" />
              </div>
              <span className="text-[9px] font-mono-tech text-purple-200 mt-2 font-bold">QUANTUM CORE</span>
            </div>
          </div>
        );

      // 6. Transponder Otorisasi Airlock
      case 'reactor_transponder':
        return (
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl animate-pulse" />
            <div className="w-32 h-34 rounded-2xl bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 border-3 border-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.8)] p-3 flex flex-col items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span className="text-[8px] font-mono-tech text-rose-300 font-extrabold">AIRLOCK KEY</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shadow-[0_0_15px_#f43f5e]">
                <KeyRound className="w-6 h-6 text-rose-300" />
              </div>
              <span className="text-[8px] font-mono-tech text-rose-200 font-bold">EVACUATION PASS</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-32 h-32 rounded-2xl bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div
        className={`relative w-full max-w-md bg-[#0a1426] border-3 border-cyan-400/90 rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.5)] flex flex-col items-center text-center transition-all duration-700 ${
          isTaking ? 'scale-75 translate-y-12 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400 text-xs font-mono-tech text-cyan-300 shadow-sm mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="font-extrabold tracking-wider">ITEM PENTING DITEMUKAN!</span>
        </div>

        {/* Big Visual Graphic of the Item */}
        <div className="my-2 py-4 flex items-center justify-center">
          {renderItemVisualArt()}
        </div>

        {/* Item Title & Category */}
        <h3 className="text-xl font-extrabold font-mono-tech text-white tracking-wide">
          {item.name}
        </h3>
        <p className="text-xs text-slate-300 font-mono-tech max-w-xs mt-2 leading-relaxed">
          {item.description}
        </p>

        {/* Additional Lore / Details Box */}
        {item.details && (
          <div className="w-full mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-cyan-900/60 text-[11px] font-mono-tech text-cyan-200">
            <span className="text-amber-400 font-bold">Fungsi: </span>
            {item.details}
          </div>
        )}

        {/* Big Interactive "Ambil Kunci / Peralatan" Button with Visual Hand/Check Action */}
        <button
          type="button"
          disabled={isTaking}
          onClick={handleTake}
          className="w-full mt-5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-sm font-mono-tech flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all transform active:scale-95 cursor-pointer"
        >
          {isTaking ? (
            <>
              <CheckCircle2 className="w-5 h-5 animate-bounce" />
              <span>Memasukkan ke Inventaris...</span>
            </>
          ) : (
            <>
              <PackageCheck className="w-5 h-5 text-slate-950" />
              <span>AMBIL & MASUKKAN KE KANTONG JAS LAB</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
