import React, { useState } from 'react';
import { DoorClosed, KeyRound, Check, AlertCircle, X, ShieldCheck, Unlock } from 'lucide-react';
import { sound } from '../services/audio';

interface AirlockExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasTransponder: boolean;
  correctExitCode: string;
  onEscapeSuccess: () => void;
}

export const AirlockExitModal: React.FC<AirlockExitModalProps> = ({
  isOpen,
  onClose,
  hasTransponder,
  correctExitCode,
  onEscapeSuccess,
}) => {
  const [transponderInserted, setTransponderInserted] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (inputCode.length >= 4 || isOpening) return;
    sound.playKeypress();
    setInputCode((prev) => prev + digit);
    setErrorMessage(null);
  };

  const handleDelete = () => {
    sound.playClick();
    setInputCode((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleVerify = () => {
    if (!transponderInserted) {
      sound.playError();
      setErrorMessage('KUNCI TRANSPONDER BELUM TERPASANG! Masukkan kunci dari Ruang Reaktor.');
      return;
    }

    if (inputCode === correctExitCode) {
      sound.playSuccess();
      sound.playDoorOpen();
      setIsOpening(true);
      setTimeout(() => {
        onEscapeSuccess();
      }, 1500);
    } else {
      sound.playError();
      setErrorMessage('KODE EVAKUASI SALAH! Periksa catatan di Cryo Pod, Mikroskop, & Papan Tulis.');
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0a0f1d] border-2 border-cyan-400 rounded-2xl p-5 shadow-2xl crt-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900">
          <div className="flex items-center gap-2">
            <DoorClosed className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 font-mono-tech tracking-wider uppercase">
              KONSOL PINTU KELUAR AIRLOCK
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

        {/* Requirements status */}
        <div className="my-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 font-mono-tech text-xs">
          <div className="text-cyan-400 font-bold uppercase">
            PROTOKOL PEMBUKAAN DARURAT:
          </div>

          {/* Step 1: Transponder */}
          <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-700">
            <span className="text-slate-300">1. Transponder Otorisasi Reaktor:</span>
            {transponderInserted ? (
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-4 h-4" /> Terpasang
              </span>
            ) : hasTransponder ? (
              <button
                onClick={() => {
                  sound.playSuccess();
                  setTransponderInserted(true);
                }}
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] transition-all"
              >
                Pasang Transponder
              </button>
            ) : (
              <span className="text-red-400 text-[11px]">Belum Dimiliki</span>
            )}
          </div>

          {/* Step 2: 4-digit code */}
          <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-700">
            <span className="text-slate-300">2. Kode Kunci Evakuasi (4 Digit):</span>
            <span className={inputCode.length === 4 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
              {inputCode.length}/4 Digit
            </span>
          </div>
        </div>

        {/* Digital display */}
        <div className="my-3 p-3 rounded-lg bg-black border border-cyan-500/50 text-center">
          <div className="text-[10px] text-cyan-400 uppercase font-mono-tech tracking-wider mb-1">
            MASUKKAN 4-DIGIT KODE DARURAT
          </div>
          <div className="text-3xl font-bold font-mono-tech tracking-[0.4em] text-cyan-300 min-h-[36px] flex items-center justify-center">
            {inputCode.padEnd(4, '•')}
          </div>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-1.5 p-2 rounded bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-mono-tech mb-2 animate-glitch">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isOpening && (
          <div className="p-2.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono-tech mb-2 text-center flex items-center justify-center gap-2">
            <Unlock className="w-4 h-4 animate-spin" />
            <span>KATUP TEKANAN DILEPAS! AIRLOCK MEMBUKA...</span>
          </div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="py-2.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-100 font-bold font-mono-tech text-base active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="py-2.5 rounded bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-400 text-xs font-mono-tech font-bold flex items-center justify-center"
          >
            HAPUS
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="py-2.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-100 font-bold font-mono-tech text-base"
          >
            0
          </button>
          <button
            onClick={handleVerify}
            disabled={inputCode.length !== 4 || isOpening}
            className="py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono-tech text-xs disabled:opacity-40 flex items-center justify-center gap-1"
          >
            <Check className="w-4 h-4" />
            <span>BUKA</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-tech"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
