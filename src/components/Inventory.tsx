import React, { useState } from 'react';
import { Item } from '../types';
import { 
  Wrench, 
  CreditCard, 
  Sparkles, 
  Cpu, 
  KeyRound, 
  Info, 
  HelpCircle,
  CheckCircle2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { sound } from '../services/audio';

interface InventoryProps {
  items: Item[];
  totalExpected: number;
}

export const Inventory: React.FC<InventoryProps> = ({ items, totalExpected }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Map icon strings to Lucide components
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className={className} />;
      case 'CreditCard':
        return <CreditCard className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'KeyRound':
        return <KeyRound className={className} />;
      default:
        return <HelpCircle className={className} />;
    }
  };

  // Fixed 6 slots
  const slots = Array.from({ length: totalExpected });

  return (
    <div className="w-full bg-[#070c1a]/95 border-t border-cyan-900/50 backdrop-blur-md transition-all">
      {/* Mini header toggle bar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-cyan-400 font-mono-tech tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            INVENTARIS PEMAIN
          </span>
          <span className="text-[11px] text-slate-400 font-mono-tech">
            ({items.length}/{totalExpected} Ditemukan)
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono-tech py-0.5 px-2"
        >
          {isExpanded ? (
            <>
              <span>Sembunyikan</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Buka Inventaris</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-3 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Item Slots grid */}
          <div className="grid grid-cols-6 gap-2 w-full md:w-auto">
            {slots.map((_, idx) => {
              const item = items[idx];
              const isSelected = selectedItem?.id === item?.id;

              return (
                <div
                  key={idx}
                  id={`inventory-slot-${idx}`}
                  onClick={() => {
                    if (item) {
                      sound.playClick();
                      setSelectedItem(isSelected ? null : item);
                    }
                  }}
                  className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center border transition-all cursor-pointer select-none ${
                    item
                      ? isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400 scale-105'
                        : 'bg-slate-900/90 border-slate-700 hover:border-cyan-500/60 hover:bg-slate-800/80'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-40 cursor-default'
                  }`}
                  title={item ? `${item.name} (Klik untuk detail)` : `Slot Kosong ${idx + 1}`}
                >
                  {item ? (
                    <>
                      {renderIcon(item.icon, `w-5 h-5 sm:w-6 sm:h-6 ${item.color}`)}
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </>
                  ) : (
                    <span className="text-[10px] font-mono-tech text-slate-600">
                      #{idx + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Item Details Drawer or Placeholder Advice */}
          <div className="w-full md:flex-1 bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 min-h-[58px] flex items-center justify-between">
            {selectedItem ? (
              <div className="flex items-start justify-between w-full gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">
                    {renderIcon(selectedItem.icon, `w-5 h-5 ${selectedItem.color}`)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-100 font-mono-tech">
                        {selectedItem.name}
                      </h4>
                      <span className="text-[10px] uppercase font-mono-tech px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {selectedItem.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {selectedItem.description}
                    </p>
                    {selectedItem.details && (
                      <p className="text-[11px] text-cyan-400/90 font-mono-tech mt-0.5">
                        Fungsi: {selectedItem.details}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-500 hover:text-slate-300 text-xs px-2 py-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-tech w-full justify-center sm:justify-start">
                <Info className="w-4 h-4 text-cyan-500/70" />
                <span>
                  Klik item dalam inventaris untuk memeriksa detail data & fungsi peralatan.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
