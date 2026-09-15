import React from 'react';
import { InteractiveObject } from '../types';

interface LabObjectVisualProps {
  object: InteractiveObject;
  isClose: boolean;
  isTargeted: boolean;
  lasersActive?: boolean;
}

export const LabObjectVisual: React.FC<LabObjectVisualProps> = ({
  object,
  isClose,
  isTargeted,
  lasersActive = true,
}) => {
  const isDangerousLaser = object.id === 'laser_barrier' && lasersActive;

  // Render dedicated 2D cartoon artwork for each laboratory item & machine
  const renderVisualArtwork = () => {
    switch (object.id) {
      // 1. Cryo Pod in Cryo Bay
      case 'cryo_pod':
        return (
          <div className="relative w-28 sm:w-32 h-44 sm:h-52 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            {/* Main Capsule Body */}
            <div className="w-full h-full rounded-t-full rounded-b-2xl border-3 border-[#1e293b] bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0f172a] p-2 shadow-xl flex flex-col items-center justify-between relative overflow-hidden">
              {/* Glass Glare Highlights */}
              <div
                style={{ clipPath: 'polygon(15% 0, 45% 0, 30% 100%, 0% 100%)' }}
                className="absolute inset-0 bg-white/25 pointer-events-none"
              />

              {/* Top Pod Plate */}
              <div className="w-20 py-0.5 rounded bg-[#f8fafc] border-2 border-[#1e293b] flex items-center justify-center mt-2 z-10 shadow-sm">
                <span className="text-[9px] font-mono-tech font-black text-[#0f172a]">CRYO-POD 01</span>
              </div>

              {/* Frosted Specimen Window */}
              <div className="w-16 h-24 rounded-2xl bg-[#e0f2fe]/40 border-2 border-white/60 flex flex-col items-center justify-center relative backdrop-blur-xs">
                <div className="w-7 h-7 rounded-full bg-cyan-100/40 mb-1" />
                <div className="w-10 h-10 rounded-xl bg-cyan-100/30" />
                
                {/* Etched Clue Scratch on the Glass */}
                <div className="absolute inset-x-1 bottom-2 py-0.5 rounded bg-[#fef08a] border border-[#ca8a04] shadow text-center">
                  <span className="text-[8px] font-mono-tech font-black text-[#854d0e] tracking-tight">
                    DIGIT 1 ✎
                  </span>
                </div>
              </div>

              {/* Pod Base Status Bar */}
              <div className="w-full py-0.5 bg-[#0369a1] border-t-2 border-[#1e293b] flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[8px] font-mono-tech text-white font-bold">TERKUNCI</span>
              </div>
            </div>

            {/* Base Pedestal with Pipes */}
            <div className="w-24 h-4 rounded-b-lg bg-[#334155] border-x-3 border-b-3 border-[#1e293b] -mt-1 flex items-center justify-around px-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
          </div>
        );

      // 2. Lab Desk in Cryo Bay (With Visible Screwdriver / Obeng lying on it!)
      case 'lab_desk': {
        const hasScrewdriver = object.status !== 'solved';
        return (
          <div className="relative w-36 sm:w-44 h-32 sm:h-36 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            {/* Desk Surface & Equipment */}
            <div className="w-full flex items-end justify-between px-3 mb-1">
              {/* Desktop Monitor on Stand */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-10 sm:h-12 rounded-lg border-2 border-[#1e293b] bg-[#0284c7] p-1 shadow-md flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[6px] font-mono-tech text-cyan-200">
                    <span>OS-XENO</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-300 animate-pulse" />
                  </div>
                  <div className="text-[7px] font-mono-tech text-white font-bold text-center">
                    LOG DATA
                  </div>
                </div>
                <div className="w-2 h-2 bg-[#334155] border-x border-[#1e293b]" />
                <div className="w-6 h-1 bg-[#334155] rounded-full border border-[#1e293b]" />
              </div>

              {/* Research Notes / Papers */}
              <div className="w-8 h-6 bg-white border border-[#94a3b8] rounded shadow-xs rotate-6 flex flex-col justify-around p-0.5">
                <div className="w-full h-0.5 bg-slate-300" />
                <div className="w-3/4 h-0.5 bg-slate-300" />
                <div className="w-1/2 h-0.5 bg-slate-300" />
              </div>

              {/* THE SCREWDRIVER / OBENG - Prominently visible on desk! */}
              {hasScrewdriver ? (
                <div className="relative -ml-2 mb-0.5 flex flex-col items-center animate-bounce">
                  <span className="text-[8px] font-mono-tech font-extrabold text-[#0f172a] bg-[#fde047] px-1 py-0.2 rounded border border-[#ca8a04] shadow-sm whitespace-nowrap mb-0.5">
                    ✨ OBENG
                  </span>
                  {/* Cartoon Vector Screwdriver */}
                  <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
                    {/* Handle (Yellow/Orange with grooves) */}
                    <rect x="1" y="2" width="14" height="10" rx="2" fill="#f59e0b" stroke="#1e293b" strokeWidth="1.5" />
                    <line x1="5" y1="3" x2="5" y2="11" stroke="#b45309" strokeWidth="1" />
                    <line x1="9" y1="3" x2="9" y2="11" stroke="#b45309" strokeWidth="1" />
                    {/* Metal Shaft (Chrome) */}
                    <rect x="15" y="5" width="14" height="4" fill="#cbd5e1" stroke="#1e293b" strokeWidth="1.2" />
                    {/* Magnetic Flathead Tip */}
                    <polygon points="29,5 33,6 33,8 29,9" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                  </svg>
                </div>
              ) : (
                <div className="text-[7px] font-mono-tech text-slate-400 italic">
                  [Obeng Diambil]
                </div>
              )}
            </div>

            {/* Main Wooden/Metal Workbench Table Top */}
            <div className="w-full h-4 rounded-md bg-[#e2e8f0] border-3 border-[#1e293b] shadow-md flex items-center justify-between px-2">
              <div className="w-1 h-1 rounded-full bg-[#94a3b8]" />
              <div className="w-1 h-1 rounded-full bg-[#94a3b8]" />
            </div>

            {/* Desk Legs & Chassis with Storage Drawer */}
            <div className="w-full flex-1 flex justify-between px-2">
              {/* Left Metal Leg */}
              <div className="w-3 h-full bg-[#64748b] border-x-2 border-b-2 border-[#1e293b]" />
              {/* Center Storage Drawer */}
              <div className="w-18 h-12 bg-[#cbd5e1] border-2 border-[#1e293b] rounded-b p-1 flex flex-col items-center justify-center">
                <div className="w-6 h-1.5 bg-[#475569] rounded-full border border-[#1e293b]" />
              </div>
              {/* Right Metal Leg */}
              <div className="w-3 h-full bg-[#64748b] border-x-2 border-b-2 border-[#1e293b]" />
            </div>
          </div>
        );
      }

      // 3. Vent Grate (High up on the wall, with Visible Blue Keycard L1 inside!)
      case 'vent_grate': {
        const hasKeycard = object.status !== 'solved';
        const isOpened = object.status === 'solved';
        return (
          <div className="relative w-28 sm:w-34 h-24 sm:h-28 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            {/* Ventilation Wall Frame */}
            <div className="w-full h-full rounded-xl border-3 border-[#1e293b] bg-[#334155] p-2 shadow-xl flex flex-col justify-between relative overflow-hidden">
              {/* Four Screws on Corners */}
              <div className="absolute top-1 left-1 text-[8px] text-[#94a3b8] font-bold">✖</div>
              <div className="absolute top-1 right-1 text-[8px] text-[#94a3b8] font-bold">✖</div>
              <div className="absolute bottom-1 left-1 text-[8px] text-[#94a3b8] font-bold">✖</div>
              <div className="absolute bottom-1 right-1 text-[8px] text-[#94a3b8] font-bold">✖</div>

              {/* Top Label */}
              <div className="text-[8px] font-mono-tech font-extrabold text-[#f1f5f9] text-center border-b border-[#475569] pb-0.5">
                KISI VENTILASI
              </div>

              {/* Louver Slats & Visible Blue Keycard */}
              <div className="w-full h-14 rounded-lg bg-[#0f172a] border-2 border-[#1e293b] relative overflow-hidden flex flex-col justify-around p-1">
                {/* Vent Grill Slats */}
                <div className="w-full h-1 bg-[#475569] rounded" />
                <div className="w-full h-1 bg-[#475569] rounded" />
                <div className="w-full h-1 bg-[#475569] rounded" />

                {/* VISIBLE KEYCARD L1 - Glowing cyan/blue card poking through the slats! */}
                {hasKeycard ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative px-2 py-1 rounded bg-[#0284c7] border-2 border-[#38bdf8] shadow-[0_0_12px_#38bdf8] flex items-center gap-1 rotate-12 animate-pulse">
                      <div className="w-2 h-3 bg-[#f59e0b] rounded-xs" />
                      <span className="text-[8px] font-mono-tech font-black text-white whitespace-nowrap">
                        CARD [L1]
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[7px] font-mono-tech text-emerald-400 font-bold">
                      VENTILASI TERBUKA
                    </span>
                  </div>
                )}
              </div>

              {/* Status footer */}
              <div className="text-[7px] font-mono-tech text-center font-bold text-amber-300">
                {isOpened ? 'KARTU DIAMBIL' : 'BUTUH OBENG'}
              </div>
            </div>
          </div>
        );
      }

      // 4. Cryo Terminal (Floor Console)
      case 'cryo_terminal':
        return (
          <div className="relative w-26 sm:w-32 h-36 sm:h-42 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            {/* Terminal Monitor Housing */}
            <div className="w-full h-24 sm:h-28 rounded-2xl border-3 border-[#1e293b] bg-[#e2e8f0] p-1.5 shadow-xl flex flex-col justify-between">
              {/* Green CRT Phosphor Screen */}
              <div className="w-full h-full rounded-xl border-2 border-[#1e293b] bg-[#064e3b] p-1.5 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center text-[7px] font-mono-tech text-emerald-300 font-bold border-b border-emerald-800 pb-0.5">
                  <span>TERMINAL B-7</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[8px] font-mono-tech text-emerald-200 space-y-0.5 my-auto">
                  <div>&gt; EVAKUASI: DARURAT</div>
                  <div>&gt; SEKTOR LAIN: TERKUNCI</div>
                </div>
                <div className="text-[7px] font-mono-tech text-emerald-400 text-right">
                  [STATUS READY]
                </div>
              </div>
            </div>

            {/* Console Keyboard Base & Floor Stand */}
            <div className="w-22 h-4 bg-[#cbd5e1] border-x-2 border-b-2 border-[#1e293b] rounded-b flex items-center justify-around px-2">
              <div className="w-3 h-1 bg-[#475569] rounded-xs" />
              <div className="w-3 h-1 bg-[#475569] rounded-xs" />
              <div className="w-3 h-1 bg-[#475569] rounded-xs" />
            </div>
            <div className="w-10 h-8 bg-[#475569] border-x-2 border-[#1e293b]" />
            <div className="w-18 h-3 rounded-b-md bg-[#1e293b]" />
          </div>
        );

      // 5. Laser Barrier (Security Corridor)
      case 'laser_barrier':
        return (
          <div className="relative w-44 sm:w-56 h-48 sm:h-56 select-none flex items-center justify-between pointer-events-auto">
            {/* Left Emitter Pylon */}
            <div className="w-8 sm:w-10 h-full rounded-xl border-3 border-[#1e293b] bg-[#334155] p-1 flex flex-col justify-between shadow-xl">
              <div className="w-full h-4 rounded bg-[#ef4444] border border-[#1e293b] animate-pulse" />
              <div className="my-auto flex flex-col gap-3 items-center">
                <div className="w-4 h-4 rounded-full bg-[#f87171] border-2 border-white shadow-[0_0_8px_#ef4444]" />
                <div className="w-4 h-4 rounded-full bg-[#f87171] border-2 border-white shadow-[0_0_8px_#ef4444]" />
                <div className="w-4 h-4 rounded-full bg-[#f87171] border-2 border-white shadow-[0_0_8px_#ef4444]" />
              </div>
              <div className="w-full h-3 rounded bg-[#1e293b]" />
            </div>

            {/* Laser Beams in Center or Disabled Safe Gate */}
            <div className="flex-1 h-3/4 flex flex-col justify-around items-center px-1">
              {lasersActive ? (
                <>
                  <div className="w-full h-2 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444] laser-beam" />
                  <div className="px-2 py-1 rounded bg-[#7f1d1d] border border-red-500 text-[8px] font-mono-tech text-red-200 font-extrabold animate-pulse">
                    ⚠ LASER AKTIF
                  </div>
                  <div className="w-full h-2 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444] laser-beam" />
                </>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border-2 border-emerald-400 text-[9px] font-mono-tech text-emerald-300 font-black shadow-lg">
                  ✓ LASER DINONAKTIFKAN
                </div>
              )}
            </div>

            {/* Right Emitter Pylon */}
            <div className="w-8 sm:w-10 h-full rounded-xl border-3 border-[#1e293b] bg-[#334155] p-1 flex flex-col justify-between shadow-xl">
              <div className="w-full h-4 rounded bg-[#ef4444] border border-[#1e293b] animate-pulse" />
              <div className="my-auto flex flex-col gap-3 items-center">
                <div className="w-4 h-4 rounded-full bg-[#f87171] border-2 border-white shadow-[0_0_8px_#ef4444]" />
                <div className="w-4 h-4 rounded-full bg-[#f87171] border-2 border-white shadow-[0_0_8px_#ef4444]" />
                <div className="w-4 h-4 rounded-full bg-[#f87171] border-2 border-white shadow-[0_0_8px_#ef4444]" />
              </div>
              <div className="w-full h-3 rounded bg-[#1e293b]" />
            </div>
          </div>
        );

      // 6. Fuse Box / Wire Panel (Security Corridor)
      case 'fuse_box':
        return (
          <div className="relative w-28 sm:w-34 h-34 sm:h-40 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#f1f5f9] p-2 shadow-xl flex flex-col justify-between">
              {/* Box Title */}
              <div className="flex justify-between items-center text-[8px] font-mono-tech text-[#0f172a] font-extrabold border-b-2 border-[#1e293b] pb-0.5">
                <span>PANEL SIRKUIT</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>

              {/* 4 Colored Wires Illustrated */}
              <div className="w-full h-20 rounded-lg bg-[#1e293b] border-2 border-[#0f172a] p-1.5 flex items-center justify-around">
                <div className="w-2 h-16 rounded-full bg-red-500 border border-white" />
                <div className="w-2 h-16 rounded-full bg-blue-500 border border-white" />
                <div className="w-2 h-16 rounded-full bg-yellow-400 border border-white" />
                <div className="w-2 h-16 rounded-full bg-emerald-500 border border-white" />
              </div>

              <div className="text-[7px] font-mono-tech text-center font-black text-[#0f172a] bg-[#fde047] py-0.5 rounded border border-[#ca8a04]">
                [SAMBUNGKAN KABEL]
              </div>
            </div>
          </div>
        );

      // 7. Security Locker (With Visible Laser Prism when opened!)
      case 'security_locker': {
        const hasPrism = object.status !== 'solved';
        return (
          <div className="relative w-30 sm:w-36 h-44 sm:h-52 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#334155] p-2 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-[8px] font-mono-tech text-white font-extrabold border-b border-[#475569] pb-0.5">
                <span>LOKER B-04</span>
                <span className="text-amber-300">3-DIGIT</span>
              </div>

              {/* Locker Shelf Interior with PRISMA or Keypad */}
              <div className="w-full flex-1 my-1 rounded-xl bg-[#0f172a] border-2 border-[#1e293b] p-2 flex flex-col items-center justify-center relative">
                {hasPrism ? (
                  <div className="flex flex-col items-center animate-pulse">
                    {/* Glowing Green Diamond Prism */}
                    <div className="w-10 h-10 rotate-45 rounded-md bg-gradient-to-tr from-emerald-400 to-cyan-200 border-2 border-white shadow-[0_0_18px_#10b981] flex items-center justify-center">
                      <span className="text-xs -rotate-45">💎</span>
                    </div>
                    <span className="text-[8px] font-mono-tech font-black text-emerald-300 mt-2 bg-[#064e3b] px-1.5 py-0.2 rounded border border-emerald-500">
                      PRISMA LASER
                    </span>
                  </div>
                ) : (
                  <div className="text-[8px] font-mono-tech text-slate-500 text-center">
                    [Loker Kosong]
                  </div>
                )}
              </div>

              {/* Digital Dial Keypad Indicator */}
              <div className="w-full py-0.5 rounded bg-[#f59e0b] border border-[#b45309] text-center text-[8px] font-mono-tech font-black text-[#0f172a]">
                KODE PETUGAS
              </div>
            </div>
          </div>
        );
      }

      // 8. Microscope Scanner (Research Lab)
      case 'microscope_scanner':
        return (
          <div className="relative w-30 sm:w-36 h-36 sm:h-42 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            {/* Cartoon Microscope Illustration */}
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#f8fafc] p-2 shadow-xl flex flex-col justify-between items-center">
              <div className="w-full flex justify-between items-center text-[8px] font-mono-tech font-black text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
                <span>MIKROSKOP</span>
                <span className="text-emerald-600">SPESIMEN</span>
              </div>

              {/* Eyepiece and Objective Turret */}
              <div className="flex flex-col items-center my-auto">
                <div className="w-8 h-4 rounded-t bg-[#334155] border-2 border-[#1e293b]" />
                <div className="w-3 h-8 bg-[#64748b] border-x-2 border-[#1e293b]" />
                {/* Glowing Specimen Stage */}
                <div className="w-16 h-8 rounded-lg bg-[#0284c7] border-2 border-[#1e293b] p-1 flex items-center justify-center shadow-inner">
                  <div className="w-5 h-5 rounded-full bg-cyan-200 border border-white animate-ping" />
                  <span className="text-[8px] font-mono-tech font-black text-white ml-1">
                    SLIDE ✎
                  </span>
                </div>
              </div>

              <div className="w-full py-0.5 rounded bg-[#0284c7] text-white text-[7px] font-mono-tech font-bold text-center">
                [ANALISIS SPESIMEN]
              </div>
            </div>
          </div>
        );

      // 9. Chemical Rack (Research Lab with Visible Yellow Keycard L2 inside!)
      case 'chemical_rack': {
        const hasCardL2 = object.status !== 'solved';
        return (
          <div className="relative w-36 sm:w-44 h-36 sm:h-42 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#e2e8f0] p-2 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-center text-[8px] font-mono-tech font-black text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
                <span>REAKTOR KIMIA</span>
                <span className="text-purple-600 font-extrabold">SINTESIS</span>
              </div>

              {/* Chemical synthesis glassware & Chamber */}
              <div className="flex items-center justify-between my-auto px-1">
                {/* Flasks */}
                <div className="flex gap-1 items-end">
                  <div className="w-3 h-8 rounded-b-lg bg-[#ef4444] border-2 border-[#1e293b] relative">
                    <div className="w-1 h-1 rounded-full bg-white/60 absolute top-1 left-0.5" />
                  </div>
                  <div className="w-3.5 h-10 rounded-b-lg bg-[#10b981] border-2 border-[#1e293b] relative">
                    <div className="w-1 h-1 rounded-full bg-white/60 absolute top-1 left-0.5" />
                  </div>
                  <div className="w-3 h-7 rounded-b-lg bg-[#0ea5e9] border-2 border-[#1e293b] relative">
                    <div className="w-1 h-1 rounded-full bg-white/60 absolute top-1 left-0.5" />
                  </div>
                </div>

                {/* Synthesis Vault Box holding KEYCARD L2 */}
                <div className="w-20 h-18 rounded-xl bg-[#0f172a] border-2 border-[#1e293b] p-1 flex flex-col items-center justify-center">
                  {hasCardL2 ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="px-1.5 py-0.5 rounded bg-[#f59e0b] border-2 border-[#fef08a] shadow-[0_0_12px_#f59e0b] flex items-center gap-1">
                        <span className="w-1.5 h-2 bg-black rounded-xs" />
                        <span className="text-[8px] font-mono-tech font-black text-black">
                          CARD [L2]
                        </span>
                      </div>
                      <span className="text-[6px] font-mono-tech text-amber-300 mt-1">
                        TERKUNCI
                      </span>
                    </div>
                  ) : (
                    <span className="text-[7px] font-mono-tech text-emerald-400 font-bold text-center">
                      ✓ CARD DIAMBIL
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full py-0.5 rounded bg-[#fde047] border border-[#ca8a04] text-[7px] font-mono-tech font-black text-[#854d0e] text-center">
                PUZZLE SINTESIS SENYAWA
              </div>
            </div>
          </div>
        );
      }

      // 10. Research Whiteboard (On Wall in Research Lab)
      case 'research_whiteboard':
        return (
          <div className="relative w-36 sm:w-46 h-28 sm:h-34 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-xl border-3 border-[#1e293b] bg-white p-2 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-[8px] font-mono-tech text-[#0f172a] font-black border-b-2 border-slate-200 pb-0.5">
                <span>WHITEBOARD CATATAN</span>
                <span className="text-red-500 font-extrabold">PETUNJUK</span>
              </div>
              <div className="text-[8px] font-mono-tech text-slate-700 my-auto space-y-0.5">
                <div className="font-bold text-blue-600">[X] + [Y] = FORMULA KODE</div>
                <div className="text-[7px] text-slate-500">&gt; KODE LOKER KEAMANAN: ***</div>
              </div>
              {/* Marker pen tray */}
              <div className="w-full h-2 rounded bg-slate-200 border border-slate-400 flex items-center gap-1 px-1">
                <div className="w-3 h-1 bg-red-500 rounded-full" />
                <div className="w-3 h-1 bg-blue-500 rounded-full" />
                <div className="w-3 h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
        );

      // 11. Fusion Reactor Terminal (Reactor Core)
      case 'reactor_terminal':
      case 'fusion_reactor': {
        const hasTransponder = object.status !== 'solved';
        return (
          <div className="relative w-38 sm:w-46 h-42 sm:h-48 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#0f172a] p-2 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-[8px] font-mono-tech text-cyan-300 font-extrabold border-b border-slate-700 pb-0.5">
                <span>INTI DAYA REAKTOR</span>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              </div>

              {/* Reactor Core Glowing Chamber */}
              <div className="w-24 sm:w-28 h-24 sm:h-28 mx-auto my-auto rounded-full border-4 border-purple-400 bg-[#1e1b4b] flex items-center justify-center relative shadow-[0_0_25px_#a855f7]">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 animate-spin flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-300 shadow-[0_0_15px_#38bdf8]" />
                </div>
              </div>

              {/* Transponder Key Dispenser */}
              <div className="w-full py-0.5 rounded bg-purple-900 border border-purple-400 text-center text-[8px] font-mono-tech font-black text-purple-200">
                {hasTransponder ? 'BUTUH CIP KUANTUM' : 'TRANSPONDER TERPASANG'}
              </div>
            </div>
          </div>
        );
      }

      // 12. Containment Safe (Reactor Core with Visible Purple Quantum Chip!)
      case 'containment_safe': {
        const hasChip = object.status !== 'solved';
        return (
          <div className="relative w-28 sm:w-34 h-38 sm:h-44 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#334155] p-2 shadow-xl flex flex-col justify-between">
              <div className="text-[8px] font-mono-tech text-purple-300 font-extrabold border-b border-purple-800 pb-0.5">
                BRANKAS KUANTUM
              </div>

              {/* Safe Chamber Window */}
              <div className="w-full flex-1 my-1 rounded-xl bg-[#0f172a] border-2 border-[#1e293b] p-1.5 flex flex-col items-center justify-center">
                {hasChip ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="w-9 h-9 rounded-lg bg-purple-500 border-2 border-white shadow-[0_0_16px_#c084fc] flex items-center justify-center">
                      <span className="text-xs">💾</span>
                    </div>
                    <span className="text-[7px] font-mono-tech font-black text-purple-200 mt-1">
                      CIP ENKRIPSI
                    </span>
                  </div>
                ) : (
                  <span className="text-[7px] font-mono-tech text-slate-500">
                    [Brankas Terbuka]
                  </span>
                )}
              </div>

              <div className="text-[7px] font-mono-tech text-purple-200 text-center font-bold bg-purple-950 py-0.5 rounded border border-purple-700">
                [BUTUH CARD L2]
              </div>
            </div>
          </div>
        );
      }

      // 13. Coolant Valves (Reactor Core)
      case 'coolant_valves':
        return (
          <div className="relative w-26 sm:w-32 h-36 sm:h-42 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#0284c7] p-2 shadow-xl flex flex-col justify-between">
              <div className="text-[8px] font-mono-tech text-cyan-200 font-black border-b border-cyan-800 pb-0.5">
                KATUP NITROGEN
              </div>
              {/* Pressure Dial Wheel */}
              <div className="w-16 h-16 mx-auto my-auto rounded-full border-3 border-[#1e293b] bg-white flex items-center justify-center relative shadow-md">
                <div className="w-1.5 h-6 bg-red-500 origin-bottom transform rotate-45 rounded" />
                <div className="w-3 h-3 rounded-full bg-[#1e293b]" />
              </div>
              <div className="text-[7px] font-mono-tech text-white text-center font-bold">
                TEKANAN STABIL
              </div>
            </div>
          </div>
        );

      // 14. Exit Airlock Blast Door (Final Evacuation Gate)
      case 'exit_blast_door':
      case 'airlock_door':
        return (
          <div className="relative w-44 sm:w-52 h-52 sm:h-60 select-none flex flex-col items-center justify-between group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-3xl border-4 border-[#1e293b] bg-[#0f172a] p-3 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              {/* Hazard Frame Border */}
              <div className="w-full h-3 hazard-stripes rounded-t-lg mb-1" />
              
              <div className="flex justify-between items-center text-[9px] font-mono-tech text-[#f59e0b] font-black border-b border-amber-600 pb-0.5">
                <span>GERBANG EVAKUASI</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              </div>

              {/* Massive Rotary Hydraulic Wheel Lock */}
              <div className="w-24 sm:w-28 h-24 sm:h-28 mx-auto my-auto rounded-full border-4 border-[#334155] bg-[#1e293b] flex items-center justify-center shadow-inner relative">
                <div className="w-18 sm:w-20 h-18 sm:h-20 rounded-full border-2 border-dashed border-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="w-9 h-9 rounded-full bg-[#f59e0b] shadow-[0_0_12px_#f59e0b] flex items-center justify-center text-[9px] font-black text-[#0f172a]">
                  4-PIN
                </div>
              </div>

              <div className="w-full py-1 rounded-lg bg-[#b45309] text-[9px] font-mono-tech text-white text-center font-black">
                MASUKKAN KODE 4-DIGIT
              </div>
            </div>
          </div>
        );

      // 15. Decontamination Shower (Exit Airlock)
      case 'decontamination_shower':
        return (
          <div className="relative w-26 sm:w-32 h-40 sm:h-46 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#10b981] p-2 shadow-xl flex flex-col justify-between">
              <div className="text-[8px] font-mono-tech text-emerald-950 font-black border-b border-emerald-700 pb-0.5">
                DEKONTAMINASI
              </div>
              <div className="flex flex-col items-center my-auto space-y-1">
                <span className="text-2xl">🚿</span>
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-cyan-200 rounded-full animate-bounce" />
                  <div className="w-1 h-3 bg-cyan-200 rounded-full animate-bounce delay-75" />
                  <div className="w-1 h-3 bg-cyan-200 rounded-full animate-bounce delay-150" />
                </div>
              </div>
              <div className="text-[7px] font-mono-tech text-white text-center font-bold">
                SIAP EVAKUASI
              </div>
            </div>
          </div>
        );

      // 16. Evacuation Display Telemetry Monitor (Exit Airlock)
      case 'evacuation_display':
        return (
          <div className="relative w-28 sm:w-34 h-36 sm:h-42 flex flex-col items-center select-none group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl border-3 border-[#1e293b] bg-[#f8fafc] p-2 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-center text-[8px] font-mono-tech text-[#0f172a] font-black border-b-2 border-[#1e293b] pb-0.5">
                <span>TELEMETRI</span>
                <span className="text-amber-600 font-extrabold">STATUS</span>
              </div>
              {/* Blue/Cyan screen display */}
              <div className="w-full h-20 rounded-lg bg-[#0284c7] border-2 border-[#1e293b] p-1.5 flex flex-col justify-between text-white">
                <div className="text-[7px] font-mono-tech font-bold">SISTEM AIRLOCK:</div>
                <div className="text-[8px] font-mono-tech font-black text-amber-200">STANDBY</div>
                <div className="w-full h-1 bg-white/40 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-300" />
                </div>
              </div>
              <div className="text-[7px] font-mono-tech text-center font-bold text-slate-700 bg-slate-200 py-0.5 rounded">
                [DATA STATUS]
              </div>
            </div>
          </div>
        );

      // Default Fallback
      default:
        return (
          <div className="w-24 h-28 rounded-2xl border-3 border-[#1e293b] bg-[#f8fafc] p-2 flex flex-col items-center justify-center shadow-xl">
            <span className="text-2xl">🔬</span>
            <span className="text-[9px] font-mono-tech text-[#0f172a] font-bold mt-1 text-center truncate w-full">
              {object.name}
            </span>
          </div>
        );
    }
  };

  // Compute short interaction label
  const getInteractionVerb = () => {
    switch (object.actionType) {
      case 'take_item':
        return object.status === 'solved' ? 'Periksa' : 'Ambil';
      case 'examine':
        return 'Periksa';
      case 'keypad':
      case 'wire_puzzle':
      case 'chemical_puzzle':
        return 'Pecahkan';
      case 'laser_panel':
        return 'Panel';
      case 'airlock_door':
        return 'Buka';
      default:
        return 'Periksa';
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Visual Artwork container */}
      <div
        className={`relative transition-all duration-300 ${
          isDangerousLaser
            ? 'scale-105'
            : isClose
            ? 'scale-110 drop-shadow-[0_0_20px_rgba(56,189,248,0.85)]'
            : 'hover:scale-105'
        }`}
      >
        {renderVisualArtwork()}

        {/* Minimal, elegant interaction tag when close to object */}
        {isClose && !isDangerousLaser && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-40">
            <div className="px-2.5 py-0.5 rounded-full bg-[#fde047] border-2 border-[#1e293b] shadow-md flex items-center gap-1 whitespace-nowrap">
              <span className="text-[9px] font-mono-tech font-black text-[#0f172a]">
                {getInteractionVerb()}
              </span>
            </div>
            <div className="w-2 h-2 bg-[#fde047] rotate-45 -mt-1 border-r border-b border-[#1e293b]" />
          </div>
        )}

        {/* Walking destination pin */}
        {isTargeted && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-40">
            <span className="text-[9px] font-mono-tech font-extrabold text-white bg-[#0284c7] px-2 py-0.5 rounded-md border border-white shadow-lg whitespace-nowrap">
              Tujuan
            </span>
            <div className="w-2 h-2 bg-[#0284c7] rotate-45 -mt-1" />
          </div>
        )}
      </div>
    </div>
  );
};
