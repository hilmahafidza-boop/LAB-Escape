import React from 'react';
import { Room } from '../types';

interface LabRoomDecorProps {
  room: Room;
  lasersActive: boolean;
}

export const LabRoomDecor: React.FC<LabRoomDecorProps> = ({ room, lasersActive }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Wall Background (Bright, layered 2D cartoon sci-fi laboratory) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b] via-[#243347] to-[#1e293b]" />

      {/* 2. Cartoon Wall Panels (Teal, mint, slate & off-white steel panels) */}
      <div className="absolute inset-x-0 top-0 h-[68%] flex">
        {/* Wall Seams and Rivets */}
        <div className="w-1/4 h-full border-r-3 border-[#0f172a]/60 bg-gradient-to-b from-[#334155]/40 to-[#1e293b]/40 relative">
          <div className="absolute top-12 left-4 w-2 h-2 rounded-full bg-[#94a3b8] shadow-inner" />
          <div className="absolute bottom-12 left-4 w-2 h-2 rounded-full bg-[#94a3b8] shadow-inner" />
        </div>
        <div className="w-1/2 h-full border-r-3 border-[#0f172a]/60 bg-gradient-to-b from-[#3b4c63]/30 to-[#1e293b]/30 relative">
          {/* Observation Window to Deep Space / Orbital Facility */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-24 sm:h-28 rounded-2xl border-4 border-[#475569] bg-[#09101f] shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Stars & Nebula inside window */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1833] via-[#0b1329] to-[#040817]" />
            <div className="absolute top-3 left-6 w-1.5 h-1.5 rounded-full bg-cyan-200 animate-pulse" />
            <div className="absolute top-10 right-10 w-1 h-1 rounded-full bg-white opacity-80" />
            <div className="absolute bottom-5 left-16 w-2 h-2 rounded-full bg-cyan-300 opacity-70" />
            <div className="absolute top-6 right-24 w-1 h-1 rounded-full bg-amber-200 opacity-60" />
            <div className="absolute -bottom-10 -right-6 w-28 h-28 rounded-full bg-gradient-to-tl from-cyan-500/20 to-teal-400/10 blur-sm" />
            {/* Distant Planet Arc */}
            <div className="absolute -bottom-16 left-4 w-36 h-36 rounded-full border-2 border-cyan-400/40 bg-gradient-to-tr from-cyan-900/60 to-emerald-900/20" />
            {/* Window Glass Reflection Glare */}
            <div
              style={{
                clipPath: 'polygon(15% 0, 35% 0, 20% 100%, 0% 100%)',
              }}
              className="absolute inset-0 bg-white/10"
            />
            <div
              style={{
                clipPath: 'polygon(45% 0, 55% 0, 40% 100%, 30% 100%)',
              }}
              className="absolute inset-0 bg-white/5"
            />
          </div>
        </div>
        <div className="w-1/4 h-full bg-gradient-to-b from-[#334155]/40 to-[#1e293b]/40 relative">
          <div className="absolute top-12 right-4 w-2 h-2 rounded-full bg-[#94a3b8] shadow-inner" />
          <div className="absolute bottom-12 right-4 w-2 h-2 rounded-full bg-[#94a3b8] shadow-inner" />
        </div>
      </div>

      {/* 3. Top Architectural Ceiling Truss & Conduits */}
      <div className="absolute top-0 inset-x-0 h-14 bg-[#1e293b] border-b-4 border-[#0f172a] flex items-center justify-between px-6 z-10">
        {/* Cartoon Yellow/Orange Conduit along ceiling */}
        <div className="absolute top-4 inset-x-0 h-2.5 bg-[#f59e0b] border-y border-[#b45309] shadow-sm flex items-center">
          {/* Metal Pipe Couplings */}
          <div className="w-3 h-4 bg-[#64748b] border border-[#1e293b] ml-24" />
          <div className="w-3 h-4 bg-[#64748b] border border-[#1e293b] ml-48" />
          <div className="w-3 h-4 bg-[#64748b] border border-[#1e293b] ml-64" />
          <div className="w-3 h-4 bg-[#64748b] border border-[#1e293b] ml-auto mr-32" />
        </div>

        {/* Cyan Coolant Conduit */}
        <div className="absolute top-8 inset-x-0 h-1.5 bg-[#06b6d4] border-y border-[#0891b2] opacity-85" />

        {/* Left Status Light Indicator */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 border border-white animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-[11px] font-mono-tech font-extrabold text-slate-200 tracking-wider">
            LAB SEKTOR: <span className="text-amber-400">{room.sectorCode}</span>
          </span>
        </div>

        {/* Right Security Status */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-[10px] font-mono-tech text-cyan-300 font-bold hidden sm:inline">
            VENTILASI: NORMAL
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
      </div>

      {/* 4. Ceiling Hanging Lamps & Light Cones */}
      <div className="absolute top-14 left-[28%] flex flex-col items-center z-10 pointer-events-none">
        <div className="w-1 h-5 bg-[#475569]" />
        <div className="w-12 h-6 rounded-t-lg bg-[#334155] border-t-2 border-cyan-400 flex items-center justify-center shadow-md">
          <div className="w-8 h-2 bg-cyan-200 rounded-full blur-[1px]" />
        </div>
        {/* Soft cartoon light cone */}
        <div
          style={{
            clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.18), transparent)',
          }}
          className="w-48 h-64"
        />
      </div>

      <div className="absolute top-14 right-[28%] flex flex-col items-center z-10 pointer-events-none">
        <div className="w-1 h-5 bg-[#475569]" />
        <div className="w-12 h-6 rounded-t-lg bg-[#334155] border-t-2 border-amber-400 flex items-center justify-center shadow-md">
          <div className="w-8 h-2 bg-amber-200 rounded-full blur-[1px]" />
        </div>
        {/* Soft cartoon light cone */}
        <div
          style={{
            clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.14), transparent)',
          }}
          className="w-48 h-64"
        />
      </div>

      {/* 5. Room Themed Wall Art & Background Shelves */}
      {/* Cryo Bay wall elements */}
      {room.id === 'cryo_bay' && (
        <div className="absolute top-20 left-8 hidden md:flex flex-col items-center z-5">
          <div className="w-20 h-16 rounded-xl border-3 border-[#475569] bg-[#1e293b] p-2 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between text-[8px] font-mono-tech text-cyan-300 font-bold border-b border-slate-700 pb-0.5">
              <span>SUHU CRYO</span>
              <span className="text-cyan-400">OK</span>
            </div>
            <div className="text-center font-mono-tech text-xs font-black text-cyan-300">
              -196°C
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-3/4 h-full bg-cyan-400" />
            </div>
          </div>
        </div>
      )}

      {/* Research Lab: Wall Chemical Glassware Shelves */}
      {room.id === 'research_lab' && (
        <div className="absolute top-20 left-10 hidden md:flex flex-col items-center z-5">
          <div className="w-28 h-18 rounded-lg border-2 border-[#475569] bg-[#1e293b]/90 p-1.5 shadow-md flex flex-col justify-between">
            <span className="text-[7px] font-mono-tech text-emerald-400 font-bold border-b border-slate-700 pb-0.5">
              TABUNG REAGEN
            </span>
            <div className="flex items-end justify-around py-1">
              <div className="w-3 h-8 rounded-t bg-cyan-500/80 border border-white/60 relative">
                <div className="absolute top-1 left-0.5 w-1 h-2 bg-white/40 rounded-full" />
              </div>
              <div className="w-3 h-10 rounded-t bg-emerald-500/80 border border-white/60 relative">
                <div className="absolute top-1 left-0.5 w-1 h-3 bg-white/40 rounded-full" />
              </div>
              <div className="w-3.5 h-7 rounded-t bg-amber-500/80 border border-white/60 relative">
                <div className="absolute top-1 left-0.5 w-1 h-2 bg-white/40 rounded-full" />
              </div>
              <div className="w-3 h-9 rounded-t bg-purple-500/80 border border-white/60 relative">
                <div className="absolute top-1 left-0.5 w-1 h-3 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Corridor: Red Alarm Siren on Ceiling */}
      {room.id === 'security_corridor' && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center z-15">
          <div className="w-7 h-5 rounded-t-full bg-red-600 border-2 border-white shadow-[0_0_18px_#ef4444] animate-pulse" />
          <div className="w-10 h-2 bg-[#334155] rounded-b border-t border-slate-700" />
        </div>
      )}

      {/* Laser corridor animated red beam */}
      {room.id === 'security_corridor' && lasersActive && (
        <div className="absolute inset-0 z-15 flex flex-col justify-center items-center pointer-events-none">
          <div className="w-full h-1.5 bg-red-500 laser-beam my-4" />
          <div className="w-full h-2 bg-red-600 laser-beam my-3" />
          <div className="w-full h-1.5 bg-red-500 laser-beam my-4" />
        </div>
      )}

      {/* Reactor Core: Industrial Exhaust Turbine in Background */}
      {room.id === 'reactor_core' && (
        <div className="absolute top-18 right-8 hidden md:flex flex-col items-center z-5">
          <div className="w-22 h-22 rounded-full border-4 border-[#475569] bg-[#0f172a] p-1 shadow-inner flex items-center justify-center relative">
            <div className="w-18 h-18 rounded-full border-2 border-dashed border-cyan-400 animate-spin flex items-center justify-center" style={{ animationDuration: '6s' }}>
              <div className="w-6 h-6 rounded-full bg-cyan-400/80 shadow-[0_0_12px_#38bdf8]" />
            </div>
          </div>
        </div>
      )}

      {/* 6. Cartoon Lab Floor (Clean, bright, polished floor with hazard stripe border) */}
      <div className="absolute bottom-0 inset-x-0 h-36 z-5 pointer-events-none overflow-hidden">
        {/* Floor Horizon Baseboard with Hazard Caution Stripes */}
        <div className="w-full h-4 hazard-stripes border-y-2 border-[#0f172a] shadow-sm" />

        {/* Polished Composite Lab Floor Surface */}
        <div className="w-full h-full bg-gradient-to-b from-[#475569] via-[#334155] to-[#1e293b] relative">
          {/* Cartoon Floor Tiles & Perspective Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <line x1="0" y1="28%" x2="100%" y2="28%" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="0" y1="62%" x2="100%" y2="62%" stroke="#94a3b8" strokeWidth="2" />
            {/* Perspective vertical lines */}
            <line x1="12%" y1="0" x2="4%" y2="100%" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30%" y1="0" x2="24%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
            <line x1="70%" y1="0" x2="76%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
            <line x1="88%" y1="0" x2="96%" y2="100%" stroke="#94a3b8" strokeWidth="1.5" />
          </svg>

          {/* Snaking Cartoon Cables on Floor */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-90">
            {/* Yellow thick industrial cable */}
            <path
              d="M -10 50 Q 140 85 280 45 T 560 65 T 840 40 T 1200 75"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Teal/Cyan coolant conduit */}
            <path
              d="M -10 80 Q 180 30 360 75 T 700 50 T 980 80 T 1200 40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* Floor Soft Highlights / Ambient Reflections */}
          <div className="absolute top-0 left-[24%] w-44 h-16 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute top-0 right-[24%] w-44 h-16 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
