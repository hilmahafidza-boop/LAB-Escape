import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle, AlertTriangle, RefreshCw, X } from 'lucide-react';
import { sound } from '../services/audio';

interface WirePuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolve: () => void;
  correctWireOrder: number[]; // e.g. [2, 0, 3, 1]
}

const WIRE_COLORS = [
  { id: 0, name: 'Cyan (Alfa)', colorHex: '#06b6d4', bgClass: 'bg-cyan-500', borderClass: 'border-cyan-400' },
  { id: 1, name: 'Merah (Beta)', colorHex: '#ef4444', bgClass: 'bg-red-500', borderClass: 'border-red-400' },
  { id: 2, name: 'Kuning (Gamma)', colorHex: '#eab308', bgClass: 'bg-yellow-500', borderClass: 'border-yellow-400' },
  { id: 3, name: 'Hijau (Delta)', colorHex: '#22c55e', bgClass: 'bg-green-500', borderClass: 'border-green-400' },
];

export const WirePuzzleModal: React.FC<WirePuzzleModalProps> = ({
  isOpen,
  onClose,
  onSolve,
  correctWireOrder,
}) => {
  // connections: mapping from source wire index to socket index
  const [connections, setConnections] = useState<Record<number, number>>({});
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSourceClick = (sourceIdx: number) => {
    sound.playClick();
    setSelectedSource(sourceIdx === selectedSource ? null : sourceIdx);
    setErrorMessage(null);
  };

  const handleSocketClick = (socketIdx: number) => {
    if (selectedSource === null) return;
    sound.playClick();

    // Check if this socket is already connected to another wire, remove old
    const newConns = { ...connections };
    Object.keys(newConns).forEach((src) => {
      if (newConns[Number(src)] === socketIdx) {
        delete newConns[Number(src)];
      }
    });

    newConns[selectedSource] = socketIdx;
    setConnections(newConns);
    setSelectedSource(null);
    setErrorMessage(null);

    // Auto verify if all 4 wires connected
    if (Object.keys(newConns).length === 4) {
      checkSolution(newConns);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setConnections({});
    setSelectedSource(null);
    setErrorMessage(null);
  };

  const checkSolution = (conns: Record<number, number>) => {
    let allCorrect = true;
    for (let i = 0; i < 4; i++) {
      if (conns[i] !== correctWireOrder[i]) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      sound.playSuccess();
      setIsSolved(true);
      setTimeout(() => {
        onSolve();
      }, 1200);
    } else {
      sound.playError();
      setErrorMessage('Korsleting frekuensi! Susunan kabel tidak sesuai diagram sekering.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0a1020] border-2 border-cyan-500/60 rounded-2xl p-5 shadow-2xl crt-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100 font-mono-tech tracking-wider">
              BYPASS KABEL GENERATOR LASER
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

        {/* Instructions & Hint */}
        <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono-tech leading-relaxed">
          <p className="text-cyan-400 font-semibold mb-1">
            Petunjuk Manual Sirkuit Darurat:
          </p>
          <p>
            Hubungkan setiap kabel daya masukan di kiri ke soket pengalih di kanan.
            Diagram terminal menyatakan koneksi inverter:
          </p>
          <div className="grid grid-cols-2 gap-1.5 mt-2 text-[11px] text-slate-400">
            <span>• Alfa (Cyan) ➔ Soket #{correctWireOrder[0] + 1}</span>
            <span>• Beta (Merah) ➔ Soket #{correctWireOrder[1] + 1}</span>
            <span>• Gamma (Kuning) ➔ Soket #{correctWireOrder[2] + 1}</span>
            <span>• Delta (Hijau) ➔ Soket #{correctWireOrder[3] + 1}</span>
          </div>
        </div>

        {/* Puzzle Interface */}
        <div className="my-5 p-4 rounded-xl bg-[#060b17] border border-cyan-950 flex justify-between items-center relative">
          {/* Left: Source Wires */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase font-mono-tech text-cyan-400 font-bold">
              Terminal Masukan
            </span>
            {WIRE_COLORS.map((wire) => {
              const isSelected = selectedSource === wire.id;
              const hasConnection = connections[wire.id] !== undefined;

              return (
                <button
                  key={wire.id}
                  onClick={() => handleSourceClick(wire.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono-tech transition-all ${
                    isSelected
                      ? `${wire.bgClass} text-black font-bold ring-2 ring-white scale-105`
                      : hasConnection
                      ? 'bg-slate-900 text-slate-200 border-cyan-700'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${wire.bgClass} inline-block`} />
                  <span>{wire.name}</span>
                </button>
              );
            })}
          </div>

          {/* Center Connection Indicator */}
          <div className="flex flex-col items-center justify-center px-2 text-center">
            <span className="text-[11px] font-mono-tech text-slate-500 mb-1">
              Koneksi
            </span>
            <div className="text-xs font-mono-tech text-cyan-400">
              {Object.keys(connections).length} / 4 Terpasang
            </div>
            {selectedSource !== null && (
              <span className="text-[10px] text-amber-400 font-mono-tech mt-2 animate-pulse">
                Pilih soket kanan ➔
              </span>
            )}
          </div>

          {/* Right: Destination Sockets */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase font-mono-tech text-emerald-400 font-bold text-right">
              Soket Pembumian
            </span>
            {[0, 1, 2, 3].map((socketIdx) => {
              // find which wire connected here
              const connectedWireIdx = Object.keys(connections).find(
                (src) => connections[Number(src)] === socketIdx
              );
              const connectedWire = connectedWireIdx !== undefined ? WIRE_COLORS[Number(connectedWireIdx)] : null;

              return (
                <button
                  key={socketIdx}
                  onClick={() => handleSocketClick(socketIdx)}
                  className={`flex items-center justify-end gap-2 px-3 py-2 rounded-lg border text-xs font-mono-tech transition-all ${
                    connectedWire
                      ? `${connectedWire.borderClass} bg-slate-900 text-slate-100`
                      : 'bg-slate-900/60 text-slate-400 border-dashed border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  {connectedWire && (
                    <span className={`w-2.5 h-2.5 rounded-full ${connectedWire.bgClass}`} />
                  )}
                  <span>Soket #{socketIdx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error / Success feedback */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/60 border border-red-500/60 text-red-300 text-xs font-mono-tech mb-3 animate-glitch">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSolved && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-mono-tech mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sirkuit stabil! Kisi laser keamanan dinonaktifkan!</span>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono-tech hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Kabel</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-tech"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
