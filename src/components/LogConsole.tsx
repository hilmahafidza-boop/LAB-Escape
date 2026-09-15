import React from 'react';
import { Terminal, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { GameLog } from '../types';

interface LogConsoleProps {
  logs: GameLog[];
}

export const LogConsole: React.FC<LogConsoleProps> = ({ logs }) => {
  const renderLogIcon = (type: GameLog['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'danger':
        return <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />;
      default:
        return <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="bg-[#050b18]/90 border border-cyan-950 rounded-xl p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800/80">
        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-[11px] font-bold font-mono-tech text-cyan-400 tracking-wider uppercase">
          LOG TELEMETRI & AKSI FASILITAS
        </span>
      </div>

      <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1 text-xs font-mono-tech">
        {logs.slice(0, 5).map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-2 text-slate-300 leading-tight"
          >
            <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">
              [{log.timestamp}]
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {renderLogIcon(log.type)}
              <span
                className={
                  log.type === 'success'
                    ? 'text-emerald-300'
                    : log.type === 'danger'
                    ? 'text-red-300'
                    : log.type === 'warning'
                    ? 'text-amber-300'
                    : 'text-slate-200'
                }
              >
                {log.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
