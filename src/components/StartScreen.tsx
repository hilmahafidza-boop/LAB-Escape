import React, { useState } from 'react';
import { 
  Play, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  KeyRound, 
  BookOpen, 
  X, 
  HelpCircle,
  Footprints,
  Wrench,
  DoorOpen,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { BestRecord } from '../types';
import { sound } from '../services/audio';

interface StartScreenProps {
  onStartGame: (timeLimitSeconds: number) => void;
  bestRecord: BestRecord | null;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  bestRecord,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'normal' | 'hard'>('normal');
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handleStart = () => {
    sound.playSuccess();
    const duration = selectedDifficulty === 'normal' ? 600 : 300; // 10 mins vs 5 mins
    onStartGame(duration);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#0e7490] overflow-hidden select-none">
      {/* 2D Cartoon Sci-Fi Laboratory Environment Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Upper Wall with Teal/Cyan Paint & Seams */}
        <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-[#083344] via-[#0f766e] to-[#14b8a6] border-b-4 border-[#0f172a]">
          {/* Overhead Fluorescent Ceiling Fixtures */}
          <div className="absolute top-0 inset-x-0 h-8 bg-[#1e293b] border-b-3 border-[#0f172a] flex justify-around items-center px-12">
            <div className="w-36 h-3 rounded-b-md bg-[#fef08a] border-x-2 border-b-2 border-[#1e293b] shadow-[0_0_15px_#fef08a]" />
            <div className="w-36 h-3 rounded-b-md bg-[#fef08a] border-x-2 border-b-2 border-[#1e293b] shadow-[0_0_15px_#fef08a]" />
            <div className="w-36 h-3 rounded-b-md bg-[#fef08a] border-x-2 border-b-2 border-[#1e293b] shadow-[0_0_15px_#fef08a]" />
          </div>

          {/* Yellow Hazard Pipes & Conduits running across */}
          <div className="absolute top-10 inset-x-0 h-4 bg-[#f59e0b] border-y-2 border-[#1e293b] flex justify-between px-16">
            <div className="w-3 h-full bg-[#1e293b]" />
            <div className="w-3 h-full bg-[#1e293b]" />
            <div className="w-3 h-full bg-[#1e293b]" />
            <div className="w-3 h-full bg-[#1e293b]" />
          </div>

          {/* Center Space Observation Window with Ringed Planet */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-48 sm:h-56 rounded-full border-4 border-[#1e293b] bg-[#020617] overflow-hidden shadow-2xl opacity-80 hidden md:block">
            {/* Stars */}
            <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <div className="absolute top-16 right-20 w-1 h-1 rounded-full bg-white" />
            <div className="absolute bottom-10 left-24 w-1.5 h-1.5 rounded-full bg-cyan-200" />
            {/* Distant Planet */}
            <div className="absolute -bottom-10 right-6 w-36 h-36 rounded-full bg-gradient-to-tr from-[#9333ea] via-[#ec4899] to-[#fb923c] border-2 border-white/20 shadow-[0_0_30px_#c084fc]">
              <div className="absolute inset-x-0 top-1/2 h-4 -rotate-12 border-y-2 border-white/60 bg-white/20 rounded-full" />
            </div>
            {/* Crosshair Wire */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-0.5 bg-cyan-500/20" />
              <div className="h-full w-0.5 bg-cyan-500/20 absolute" />
            </div>
          </div>
        </div>

        {/* Lower Lab Floor with Cartoon Tiles & Perspective Grid */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-[#334155] border-t-6 border-[#0f172a] shadow-inner flex flex-col justify-between overflow-hidden">
          {/* Floor Grid Lines */}
          <div className="w-full h-full opacity-30 flex">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="flex-1 border-r border-[#0f172a]" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Start Dialog Container */}
      <div className="relative z-10 w-full max-w-xl bg-[#f8fafc] border-4 border-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-[0_12px_0_#0f172a] flex flex-col items-center text-center">
        {/* Top Facility Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef08a] border-2 border-[#1e293b] text-[#854d0e] text-xs font-mono-tech font-black mb-4 tracking-wider uppercase shadow-xs">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>FASILITAS BIO-XENO • LOCKDOWN EVAKUASI</span>
        </div>

        {/* Game Title */}
        <div className="mb-3">
          <h1 className="text-4xl sm:text-5xl font-mono-tech font-black tracking-wider text-[#0f172a] uppercase drop-shadow-sm">
            LAB <span className="text-[#0284c7]">ESCAPE</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono-tech font-bold text-slate-600 mt-1 max-w-md mx-auto">
            Petualangan Melarikan Diri dari Laboratorium Fiksi Ilmiah
          </p>
        </div>

        {/* Professor & Lab Visual Preview Badge */}
        <div className="w-full mb-5 p-3 rounded-2xl bg-[#e0f2fe] border-3 border-[#1e293b] flex items-center gap-4 text-left shadow-xs">
          {/* Animated 2D Cartoon Professor in Lab Coat */}
          <div className="w-16 h-20 rounded-xl bg-white border-2 border-[#1e293b] flex items-center justify-center relative overflow-hidden shrink-0 shadow-sm">
            <svg width="44" height="68" viewBox="0 0 56 86" fill="none" className="char-idle-body">
              {/* Hair */}
              <ellipse cx="28" cy="14" rx="11" ry="11" fill="#fcd34d" />
              <path
                d="M17 14C17 8 20 5 28 5C36 5 39 8 39 14C41 12 42 16 41 19C40 21 38 21 37 19C37 13 35 8 28 8C21 8 19 13 19 19C18 21 16 21 15 19C14 16 15 12 17 14Z"
                fill="#e2e8f0"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              {/* Eyes with Glasses */}
              <circle cx="23" cy="13" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.2" />
              <circle cx="33" cy="13" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.2" />
              <line x1="26.5" y1="13" x2="29.5" y2="13" stroke="#0f172a" strokeWidth="1.5" />
              {/* White Lab Coat */}
              <path d="M18 24C18 22 22 21 28 21C34 21 38 22 38 24L38 48C38 50 34 52 28 52C22 52 18 50 18 48L18 24Z" fill="#0284c7" />
              <path d="M27 23H29L28 38L27 23Z" fill="#dc2626" />
              <path
                d="M14 24C14 22 20 20 28 20C36 20 42 22 42 24L44 64C44 65 40 67 36 67L32 46L24 46L20 67C16 67 12 65 12 64L14 24Z"
                fill="#ffffff"
                stroke="#1e293b"
                strokeWidth="2"
              />
              {/* Pen in Pocket */}
              <rect x="32" y="27" width="2" height="6" fill="#3b82f6" />
              {/* Legs */}
              <path d="M21 58L20 76L15 79L23 79L24 76L25 58Z" fill="#1e293b" />
              <path d="M31 58L32 76L29 79L37 79L37 76L35 58Z" fill="#1e293b" />
            </svg>
          </div>

          <div className="text-xs font-mono-tech flex-1">
            <div className="text-[#0f172a] font-black flex items-center gap-1.5 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Profesor Riset Laboratorium</span>
            </div>
            <p className="text-slate-700 text-[11px] mt-1 leading-snug">
              Jelajahi ruangan, temukan obeng & kartu akses, buka ventilasi, selesaikan puzzle sirkuit, dan melarikan diri sebelum waktu habis!
            </p>
          </div>
        </div>

        {/* Feature Highlights with Cartoon Icons */}
        <div className="grid grid-cols-3 gap-2 w-full mb-5 text-center">
          <div className="p-2 rounded-xl bg-white border-2 border-[#1e293b] shadow-xs">
            <KeyRound className="w-5 h-5 text-[#0284c7] mx-auto mb-1" />
            <span className="text-[10px] font-mono-tech font-black text-[#0f172a] block">
              Cari Kunci
            </span>
          </div>
          <div className="p-2 rounded-xl bg-white border-2 border-[#1e293b] shadow-xs">
            <Sparkles className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <span className="text-[10px] font-mono-tech font-black text-[#0f172a] block">
              Puzzle Nyata
            </span>
          </div>
          <div className="p-2 rounded-xl bg-white border-2 border-[#1e293b] shadow-xs">
            <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <span className="text-[10px] font-mono-tech font-black text-[#0f172a] block">
              Countdown
            </span>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="w-full mb-5">
          <div className="text-[11px] font-mono-tech font-black text-slate-600 mb-2 uppercase tracking-wider">
            PILIH WAKTU PERMAINAN
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedDifficulty('normal');
              }}
              className={`py-2.5 px-3 rounded-2xl border-3 font-mono-tech text-xs font-black transition-all active:scale-95 shadow-md cursor-pointer ${
                selectedDifficulty === 'normal'
                  ? 'bg-[#0284c7] border-[#1e293b] text-white shadow-[0_4px_0_#1e293b] scale-102'
                  : 'bg-white border-[#1e293b] text-[#0f172a] hover:bg-slate-100'
              }`}
            >
              STANDAR (10 MENIT)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedDifficulty('hard');
              }}
              className={`py-2.5 px-3 rounded-2xl border-3 font-mono-tech text-xs font-black transition-all active:scale-95 shadow-md cursor-pointer ${
                selectedDifficulty === 'hard'
                  ? 'bg-[#dc2626] border-[#1e293b] text-white shadow-[0_4px_0_#1e293b] scale-102'
                  : 'bg-white border-[#1e293b] text-[#0f172a] hover:bg-slate-100'
              }`}
            >
              EKSTREM (5 MENIT)
            </button>
          </div>
        </div>

        {/* Action Buttons: START GAME + CARA BERMAIN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <button
            id="btn-start-game"
            type="button"
            onClick={handleStart}
            className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#fde047] hover:bg-[#facc15] border-4 border-[#1e293b] text-[#0f172a] font-mono-tech font-black text-base uppercase tracking-wider shadow-[0_5px_0_#1e293b] active:translate-y-1 active:shadow-[0_0px_0_#1e293b] hover:scale-102 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current text-[#0f172a]" />
            <span>MULAI PERMAINAN</span>
          </button>

          <button
            id="btn-how-to-play"
            type="button"
            onClick={() => {
              sound.playClick();
              setShowHowToPlay(true);
            }}
            className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#e0f2fe] hover:bg-[#bae6fd] border-4 border-[#1e293b] text-[#0369a1] font-mono-tech font-black text-base uppercase tracking-wider shadow-[0_5px_0_#1e293b] active:translate-y-1 active:shadow-[0_0px_0_#1e293b] hover:scale-102 transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#0369a1]" />
            <span>CARA BERMAIN</span>
          </button>
        </div>

        {/* Best Record & Audio toggle footer */}
        <div className="mt-5 pt-3 border-t-2 border-slate-200 w-full flex items-center justify-between text-xs font-mono-tech font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>
              Rekor Terbaik:{' '}
              {bestRecord ? (
                <span className="text-[#0f172a] font-black">{bestRecord.formattedTime}</span>
              ) : (
                <span className="text-slate-400">Belum ada</span>
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onToggleAudio();
            }}
            className="flex items-center gap-1.5 hover:text-[#0f172a] p-1 rounded cursor-pointer"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#0284c7]" />}
            <span>{isAudioMuted ? 'Suara: Mati' : 'Suara: Aktif'}</span>
          </button>
        </div>
      </div>

      {/* CARA BERMAIN MODAL (TUTORIAL PANDUAN LENGKAP) */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#f8fafc] border-4 border-[#1e293b] rounded-3xl p-5 sm:p-7 shadow-[0_16px_0_#0f172a] max-h-[92vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-3 border-[#1e293b] pb-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#fef08a] border-2 border-[#1e293b] text-[#854d0e] text-[10px] font-mono-tech font-black tracking-wider uppercase mb-1">
                  <BookOpen className="w-3 h-3" />
                  <span>BUKU PANDUAN FASILITAS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono-tech font-black text-[#0f172a] tracking-wide">
                  CARA BERMAIN
                </h2>
                <p className="text-xs font-mono-tech text-slate-600 font-bold mt-0.5">
                  Ikuti panduan berikut untuk melarikan diri dari laboratorium sebelum evakuasi terkunci!
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowHowToPlay(false);
                }}
                className="p-1.5 rounded-xl border-2 border-[#1e293b] bg-white hover:bg-slate-100 text-[#0f172a] transition-colors cursor-pointer shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Steps Grid */}
            <div className="space-y-3 font-mono-tech">
              {/* Step 1: Gerakan */}
              <div className="p-3 rounded-2xl bg-white border-2 border-[#1e293b] shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] border-2 border-[#1e293b] flex items-center justify-center shrink-0 text-[#0284c7]">
                  <Footprints className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0f172a]">
                    1. Menggerakkan & Melompatkan Profesor
                  </h3>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    Klik langsung di lantai laboratorium atau gunakan tombol <span className="px-1.5 py-0.2 bg-slate-200 rounded border border-slate-400 font-bold">A / D</span> (atau panah kiri/kanan). Tekan tombol <span className="px-1.5 py-0.2 bg-emerald-200 rounded border border-emerald-400 font-bold text-[#0f172a]">W</span>, <span className="px-1.5 py-0.2 bg-emerald-200 rounded border border-emerald-400 font-bold text-[#0f172a]">Panah Atas</span>, <span className="px-1.5 py-0.2 bg-emerald-200 rounded border border-emerald-400 font-bold text-[#0f172a]">Spasi</span>, atau tombol <span className="font-black text-emerald-700">Lompat</span> di panel kontrol untuk melompat.
                  </p>
                </div>
              </div>

              {/* Step 2: Periksa Objek */}
              <div className="p-3 rounded-2xl bg-white border-2 border-[#1e293b] shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fef08a] border-2 border-[#1e293b] flex items-center justify-center shrink-0 text-[#854d0e]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0f172a]">
                    2. Memeriksa & Berinteraksi dengan Objek Lab
                  </h3>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    Dekati peralatan seperti meja kerja, kisi ventilasi, brankas kuantum, mikroskop, atau reaktor. Klik langsung objek tersebut untuk memeriksanya atau mengambil perkakas.
                  </p>
                </div>
              </div>

              {/* Step 3: Menemukan Kunci & Perkakas */}
              <div className="p-3 rounded-2xl bg-white border-2 border-[#1e293b] shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dcfce7] border-2 border-[#1e293b] flex items-center justify-center shrink-0 text-emerald-700">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0f172a]">
                    3. Mencari Kunci & Peralatan Rahasia
                  </h3>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    Ambil <span className="font-black text-[#0f172a]">Obeng</span> di Meja Lab untuk membuka baut kisi ventilasi dan mendapatkan <span className="font-black text-[#0284c7]">Kartu Akses L1</span>. Dapatkan <span className="font-black text-amber-600">Kartu Akses L2</span> melalui sintesis kimia di Reaktor.
                  </p>
                </div>
              </div>

              {/* Step 4: Navigasi Pintu Ruangan */}
              <div className="p-3 rounded-2xl bg-white border-2 border-[#1e293b] shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fae8ff] border-2 border-[#1e293b] flex items-center justify-center shrink-0 text-purple-700">
                  <DoorOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0f172a]">
                    4. Pintu Ruangan Sisi Kiri & Kanan
                  </h3>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    Setiap ruangan dilengkapi pintu di kedua sisi untuk berpindah sektor. Dekati pintu lalu klik gambar pintu atau tekan tombol <span className="px-1.5 py-0.5 bg-slate-200 rounded border border-slate-400 font-bold text-[#0f172a]">E</span> untuk berpindah ruangan. Pintu dengan kunci merah memerlukan kartu akses yang sesuai.
                  </p>
                </div>
              </div>

              {/* Step 5: Puzzle & Melarikan Diri */}
              <div className="p-3 rounded-2xl bg-white border-2 border-[#1e293b] shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fee2e2] border-2 border-[#1e293b] flex items-center justify-center shrink-0 text-red-700">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0f172a]">
                    5. Menyelesaikan Puzzle & Evakuasi Sebelum Waktu Habis
                  </h3>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    Sambungkan kabel sirkuit laser, pasang cip kuantum, catat 4 digit kode darurat dari petunjuk di setiap ruangan, lalu masukkan kode ke konsol pintu Airlock untuk menang!
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Button */}
            <div className="mt-5 pt-3 border-t-2 border-slate-200 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  setShowHowToPlay(false);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#fde047] hover:bg-[#facc15] border-3 border-[#1e293b] text-[#0f172a] font-mono-tech font-black text-sm uppercase tracking-wider shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-[0_0px_0_#1e293b] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0f172a]" />
                <span>SAYA MENGERTI, SIAP BERMAIN!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
