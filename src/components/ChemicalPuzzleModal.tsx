import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, RefreshCw, X, Sparkles } from 'lucide-react';
import { sound } from '../services/audio';

interface ChemicalPuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolve: () => void;
  targetSequence: string[]; // e.g. ['reagent_blue', 'reagent_red', 'reagent_green', 'reagent_purple']
}

interface ChemicalItem {
  id: string;
  name: string;
  colorName: string;
  formula: string;
  colorClass: string;
  bgHex: string;
}

const CHEMICALS: ChemicalItem[] = [
  { id: 'reagent_blue', name: 'Cobalt Reagent', colorName: 'Biru Cobalt', formula: 'Co(NO3)2', colorClass: 'text-cyan-400 border-cyan-500 bg-cyan-950/50', bgHex: '#06b6d4' },
  { id: 'reagent_red', name: 'Phenol Catalyst', colorName: 'Merah Fenol', formula: 'C19H14O5S', colorClass: 'text-red-400 border-red-500 bg-red-950/50', bgHex: '#ef4444' },
  { id: 'reagent_green', name: 'Copper Solution', colorName: 'Hijau Tembaga', formula: 'CuCl2·2H2O', colorClass: 'text-emerald-400 border-emerald-500 bg-emerald-950/50', bgHex: '#10b981' },
  { id: 'reagent_purple', name: 'Potassium Acid', colorName: 'Ungu Permanganat', formula: 'KMnO4', colorClass: 'text-purple-400 border-purple-500 bg-purple-950/50', bgHex: '#a855f7' },
];

export const ChemicalPuzzleModal: React.FC<ChemicalPuzzleModalProps> = ({
  isOpen,
  onClose,
  onSolve,
  targetSequence,
}) => {
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAddReagent = (id: string) => {
    if (selectedSequence.length >= 4 || isSolved) return;
    sound.playKeypress();
    const newSeq = [...selectedSequence, id];
    setSelectedSequence(newSeq);
    setErrorMessage(null);

    // If 4 selected, evaluate
    if (newSeq.length === 4) {
      checkSynthesis(newSeq);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedSequence([]);
    setErrorMessage(null);
  };

  const checkSynthesis = (seq: string[]) => {
    const isCorrect = seq.every((item, idx) => item === targetSequence[idx]);
    if (isCorrect) {
      sound.playSuccess();
      setIsSolved(true);
      setTimeout(() => {
        onSolve();
      }, 1400);
    } else {
      sound.playError();
      setErrorMessage('Reaksi asam tidak stabil! Urutan katalis tidak seimbang dan memicu residu hangus.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#08101e] border-2 border-emerald-500/60 rounded-2xl p-5 shadow-2xl crt-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100 font-mono-tech tracking-wider">
              SINTESIS PELARUT ASAM KUANTUM
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

        {/* Clue and guidance */}
        <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono-tech leading-relaxed">
          <p className="text-emerald-400 font-semibold mb-1">
            Prosedur Laboratorium:
          </p>
          <p>
            Campurkan 4 senyawa kimia dalam urutan tepat untuk menghasilkan cairan pelarut super guna mencairkan kunci brankas logam berkarat:
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span>Urutan Reaksi:</span>
            {targetSequence.map((chemId, i) => {
              const chem = CHEMICALS.find((c) => c.id === chemId);
              return (
                <span key={i} className="text-slate-300 font-bold">
                  {i + 1}. {chem?.colorName || chemId}
                  {i < 3 ? ' ➔ ' : ''}
                </span>
              );
            })}
          </div>
        </div>

        {/* Reaction Flask Display */}
        <div className="my-5 p-4 rounded-xl bg-[#040813] border border-emerald-950 flex flex-col items-center">
          <div className="w-28 h-36 border-2 border-emerald-500/40 rounded-b-3xl rounded-t-md relative flex flex-col justify-end p-2 overflow-hidden bg-slate-950/60">
            {/* Layers of liquid */}
            {selectedSequence.map((id, idx) => {
              const chem = CHEMICALS.find((c) => c.id === id);
              return (
                <div
                  key={idx}
                  className="w-full h-7 rounded-sm transition-all duration-500 opacity-85"
                  style={{ backgroundColor: chem?.bgHex || '#06b6d4' }}
                />
              );
            })}
            {selectedSequence.length === 0 && (
              <span className="text-[10px] text-slate-600 font-mono-tech text-center pb-8">
                Tabung Kosong
              </span>
            )}
          </div>
          <div className="text-xs font-mono-tech text-emerald-400 mt-2">
            Campuran Reagen: {selectedSequence.length} / 4 Komponen
          </div>
        </div>

        {/* Reagent Selection Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {CHEMICALS.map((chem) => (
            <button
              key={chem.id}
              onClick={() => handleAddReagent(chem.id)}
              disabled={selectedSequence.length >= 4 || isSolved}
              className={`p-2.5 rounded-lg border text-left transition-all ${chem.colorClass} hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono-tech">{chem.name}</span>
                <span className="text-[10px] font-mono-tech text-slate-400">{chem.formula}</span>
              </div>
              <span className="text-[11px] font-mono-tech text-slate-300">
                Warna: {chem.colorName}
              </span>
            </button>
          ))}
        </div>

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/60 border border-red-500/60 text-red-300 text-xs font-mono-tech mb-3 animate-glitch">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSolved && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-mono-tech mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sintesis Berhasil! Kunci brankas meleleh dan terungkap Keycard Kuning L2!</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono-tech hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Kosongkan Tabung</span>
          </button>

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
