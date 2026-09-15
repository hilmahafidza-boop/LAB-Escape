import React, { useState } from 'react';
import { KeyRound, Delete, Check, X, AlertCircle } from 'lucide-react';
import { sound } from '../services/audio';

interface KeypadModalProps {
  isOpen: boolean;
  title: string;
  codeLength: number;
  correctCode: string;
  hintText?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const KeypadModal: React.FC<KeypadModalProps> = ({
  isOpen,
  title,
  codeLength,
  correctCode,
  hintText,
  onClose,
  onSuccess,
}) => {
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDigitClick = (digit: string) => {
    if (inputCode.length >= codeLength || isSuccess) return;
    sound.playKeypress();
    const nextCode = inputCode + digit;
    setInputCode(nextCode);
    setErrorMessage(null);
  };

  const handleDelete = () => {
    sound.playClick();
    setInputCode(inputCode.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    sound.playClick();
    setInputCode('');
    setErrorMessage(null);
  };

  const handleSubmit = () => {
    if (inputCode === correctCode) {
      sound.playSuccess();
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      sound.playError();
      setErrorMessage('KODE AKSES DITOLAK! Kombinasi tidak terdaftar.');
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#0a1020] border-2 border-cyan-500/60 rounded-2xl p-5 shadow-2xl crt-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 font-mono-tech tracking-wider uppercase">
              {title}
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

        {/* Clue notice if provided */}
        {hintText && (
          <div className="mt-2.5 p-2 rounded bg-slate-950/80 border border-cyan-950 text-[11px] text-slate-300 font-mono-tech">
            <span className="text-cyan-400 font-bold">Catatan intelijen: </span>
            {hintText}
          </div>
        )}

        {/* Digital LCD display */}
        <div className="my-4 p-3 rounded-lg bg-black border border-cyan-500/40 text-center relative overflow-hidden">
          <div className="text-[10px] text-cyan-500 font-mono-tech tracking-widest uppercase mb-1">
            TERMINAL INPUT OTORISASI
          </div>
          <div className="text-3xl font-bold font-mono-tech tracking-[0.4em] text-cyan-300 min-h-[40px] flex items-center justify-center">
            {inputCode.padEnd(codeLength, '•')}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="flex items-center gap-1.5 p-2 rounded bg-red-950/70 border border-red-500/60 text-red-300 text-xs font-mono-tech mb-3 animate-glitch">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess && (
          <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono-tech mb-3 text-center">
            AKSES DITERIMA! MEKANISME TERBUKA.
          </div>
        )}

        {/* Number Keypad Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigitClick(num)}
              className="py-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-slate-100 text-lg font-bold font-mono-tech active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="py-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-400 flex items-center justify-center font-mono-tech active:scale-95"
            title="Hapus Satu"
          >
            <Delete className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDigitClick('0')}
            className="py-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-100 text-lg font-bold font-mono-tech active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={inputCode.length !== codeLength || isSuccess}
            className="py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed border border-cyan-400 text-black flex items-center justify-center font-mono-tech font-bold active:scale-95"
            title="Konfirmasi Kode"
          >
            <Check className="w-5 h-5" />
          </button>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-slate-200 font-mono-tech"
          >
            Reset Input
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 font-mono-tech"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
