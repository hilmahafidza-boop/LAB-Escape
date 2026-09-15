import React from 'react';

export interface CharacterSpriteProps {
  posX: number;
  facing: 'left' | 'right';
  isWalking: boolean;
  nearbyObjectName?: string | null;
  actionPrompt?: { label: string; isDoor?: boolean } | null;
  onAction?: () => void;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  posX,
  facing,
  isWalking,
  nearbyObjectName,
  actionPrompt,
  onAction,
}) => {
  const currentPrompt = actionPrompt || (nearbyObjectName ? { label: `Periksa: ${nearbyObjectName}`, isDoor: false } : null);

  return (
    <div
      id="player-character"
      style={{
        left: `${posX}%`,
        bottom: '38px',
        transform: 'translateX(-50%)',
        transition: isWalking ? 'none' : 'left 0.16s ease-out',
      }}
      className="absolute z-30 pointer-events-auto select-none flex flex-col items-center"
    >
      {/* Interaction Prompt Bubble when close to an object or doorway */}
      {currentPrompt ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onAction) onAction();
          }}
          className={`mb-2 px-3 py-1.5 rounded-2xl border-2 border-[#1e293b] shadow-md text-xs font-mono-tech cursor-pointer animate-bounce flex items-center gap-1.5 whitespace-nowrap transition-all hover:scale-105 ${
            currentPrompt.isDoor
              ? 'bg-cyan-300 hover:bg-cyan-200 text-[#0f172a]'
              : 'bg-[#fde047] hover:bg-[#facc15] text-[#0f172a]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-black tracking-wide">{currentPrompt.label}</span>
        </button>
      ) : isWalking ? (
        <div className="mb-2 px-3 py-1 rounded-full bg-white/95 border-2 border-[#1e293b] text-xs font-mono-tech text-[#0f172a] font-black opacity-95 whitespace-nowrap shadow-xs flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Melangkah...</span>
        </div>
      ) : null}

      {/* Professor / Scientist Container with Directional Flip (Scaled up by ~45%) */}
      <div
        style={{
          transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: '38px 58px',
        }}
        className="relative w-20 h-32 flex items-center justify-center"
      >
        {/* Flashlight Beam on the lab floor */}
        <div
          style={{
            left: '46px',
            top: '18px',
            width: '180px',
            height: '110px',
            background: 'radial-gradient(ellipse at left top, rgba(245, 245, 245, 0.5), rgba(6, 182, 212, 0.22) 50%, transparent 80%)',
            clipPath: 'polygon(0 32%, 100% 0, 100% 100%, 0 68%)',
            transformOrigin: '0px 36px',
          }}
          className={`absolute pointer-events-none z-10 ${isWalking ? 'char-beam-walking' : ''}`}
        />

        {/* Professor Scientist SVG Body */}
        <div className={`relative z-20 ${isWalking ? 'char-walking-body' : 'char-idle-body'}`}>
          <svg
            width="78"
            height="116"
            viewBox="0 0 56 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] overflow-visible"
          >
            {/* White Lab Coat Tail / Flaps Back - Swings during walk */}
            <g className={isWalking ? 'char-coat-tails-walking' : ''}>
              <path
                d="M14 36L11 67L19 69L22 45"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="1.8"
              />
              <path
                d="M42 36L45 67L37 69L34 45"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="1.8"
              />
            </g>

            {/* Torso: Inner Blue Shirt */}
            <path
              d="M18 24C18 22 22 21 28 21C34 21 38 22 38 24L38 48C38 50 34 52 28 52C22 52 18 50 18 48L18 24Z"
              fill="#0284c7"
            />

            {/* Red Tie - Subtle secondary motion */}
            <g className={isWalking ? 'char-tie-walking' : ''}>
              <path
                d="M26 23H30L29 38L28 42L27 38L26 23Z"
                fill="#dc2626"
              />
            </g>

            {/* White Scientist Lab Coat (Baju Putih Peneliti) */}
            <path
              d="M15 24C15 22 20 20 28 20C36 20 41 22 41 24L43 64C43 65 39 67 36 67L32 46L24 46L20 67C17 67 13 65 13 64L15 24Z"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1.8"
            />

            {/* Lab Coat Lapels / Kerah Mantel Putih */}
            <path d="M21 21L24 35L20 36Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <path d="M35 21L32 35L36 36Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />

            {/* Pocket with Pens on Chest */}
            <rect x="18" y="32" width="6" height="7" rx="1" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            {/* Red & Blue Pen Tips */}
            <line x1="20" y1="30" x2="20" y2="33" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="30" x2="22" y2="33" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />

            {/* Scientist ID Card Badge hanging */}
            <rect x="33" y="32" width="6" height="8" rx="1" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <rect x="34" y="33" width="4" height="3" fill="#38bdf8" />
            <line x1="34" y1="38" x2="38" y2="38" stroke="#64748b" strokeWidth="1" />

            {/* Scientist Head & Hair & Glasses */}
            <g className={isWalking ? 'char-head-walking' : 'char-head-idle'}>
              <ellipse cx="28" cy="14" rx="10" ry="10" fill="#fcd34d" />
              
              {/* Fluffy Professor Hair & Mustache */}
              <path
                d="M17 14C17 8 20 5 28 5C36 5 39 8 39 14C41 12 42 16 41 19C40 21 38 21 37 19C37 13 35 8 28 8C21 8 19 13 19 19C18 21 16 21 15 19C14 16 15 12 17 14Z"
                fill="#e2e8f0"
              />
              {/* White Professor Mustache */}
              <path
                d="M23 18C25 18 27 16 28 17C29 16 31 18 33 18C31 19 29 19 28 18C27 19 25 19 23 18Z"
                fill="#ffffff"
              />

              {/* Round Professor Glasses (Kacamata Peneliti) */}
              <circle cx="24" cy="13" r="3.5" fill="#38bdf8" fillOpacity="0.45" stroke="#0f172a" strokeWidth="1.4" />
              <circle cx="32" cy="13" r="3.5" fill="#38bdf8" fillOpacity="0.45" stroke="#0f172a" strokeWidth="1.4" />
              <line x1="27.5" y1="13" x2="28.5" y2="13" stroke="#0f172a" strokeWidth="1.4" />
              {/* Glasses Gloss Reflection */}
              <line x1="23" y1="11" x2="25" y2="11" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="31" y1="11" x2="33" y2="11" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Left Arm (Back Arm) - Swings opposite to front leg */}
            <g className={isWalking ? 'char-arm-left-walking' : ''}>
              <path
                d="M16 25L12 38L15 40L19 27"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1.6"
              />
              {/* Left Hand (Skin Tone) */}
              <circle cx="13" cy="40" r="2.5" fill="#fcd34d" />
            </g>

            {/* Right Arm Holding Handheld Lab Flashlight - Swings dynamically */}
            <g className={isWalking ? 'char-arm-right-walking' : ''}>
              <path
                d="M38 25L42 36L38 39L35 27"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1.6"
              />
              {/* Right Hand */}
              <circle cx="41" cy="37" r="2.5" fill="#fcd34d" />
              {/* Flashlight device in hand */}
              <rect x="41" y="34" width="9" height="4" rx="1" fill="#334155" stroke="#0284c7" strokeWidth="1" />
              <rect x="49" y="33" width="2.5" height="6" rx="0.5" fill="#38bdf8" />
            </g>

            {/* Dark Trousers / Celana Panjang Formal Peneliti */}
            {/* Left Leg (Back Leg) */}
            <g className={isWalking ? 'char-leg-left-walking' : ''}>
              <path
                d="M21 58L20 75L16 78L24 78L25 75L25 58Z"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="1.4"
              />
              {/* Formal Shoes */}
              <path d="M16 77L15 81H25L24 77Z" fill="#0f172a" />
            </g>

            {/* Right Leg (Front Leg) */}
            <g className={isWalking ? 'char-leg-right-walking' : ''}>
              <path
                d="M31 58L31 75L27 78L35 78L37 75L36 58Z"
                fill="#334155"
                stroke="#0f172a"
                strokeWidth="1.4"
              />
              {/* Formal Shoes */}
              <path d="M27 77L26 81H36L35 77Z" fill="#0f172a" />
            </g>
          </svg>
        </div>
      </div>

      {/* Dynamic Ground Shadow */}
      <div className="relative w-22 h-4 -mt-1 pointer-events-none">
        <div
          className={`w-full h-full rounded-full bg-cyan-500/25 blur-sm transition-all duration-150 ${
            isWalking ? 'char-shadow-walking' : 'scale-x-100 opacity-70'
          }`}
        />
        <div className="absolute inset-x-2 top-0.5 h-2 rounded-full bg-black/80 blur-[1px]" />
      </div>
    </div>
  );
};
