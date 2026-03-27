import React from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { ListOrdered, Trash2, Swords, Gift, Skull, Info, ShieldAlert } from 'lucide-react';

export default function ActionLogTab() {
  const { logs, clearLogs } = useHollowRealm();

  const getIcon = (type) => {
    switch(type) {
      case 'battle': return <Swords size={16} className="text-amber-500" />;
      case 'gift': return <Gift size={16} className="text-green-500" />;
      case 'death': return <Skull size={16} className="text-red-500" />;
      case 'system': return <Info size={16} className="text-blue-500" />;
      default: return <ShieldAlert size={16} className="text-zinc-500" />;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'battle': return 'border-amber-500/30 bg-amber-500/5';
      case 'gift': return 'border-green-500/30 bg-green-500/5';
      case 'death': return 'border-red-500/30 bg-red-500/5';
      case 'system': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-white/10 bg-black/40';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10 h-full flex flex-col">
      
      {/* HEADER */}
      <div className="glass-panel p-6 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-black text-[#ede0c9] uppercase tracking-tighter flex items-center gap-3">
            <ListOrdered size={24} className="text-amber-500" />
            Live Action Log
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">Session Chronology & Audit Trail</p>
        </div>
        <button 
          onClick={clearLogs}
          className="bg-red-900/20 hover:bg-red-900/60 text-red-500 border border-red-900/50 p-3 rounded transition-colors flex items-center gap-2"
          title="Wipe Session Logs"
        >
          <Trash2 size={16} /> <span className="text-[10px] font-black uppercase hidden md:inline">Clear Log</span>
        </button>
      </div>

      {/* THE FEED */}
      <div className="glass-panel p-6 flex-1 overflow-hidden flex flex-col min-h-[500px]">
        {logs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/5 rounded-lg">
            <ListOrdered size={32} className="text-zinc-700 mb-3" />
            <p className="text-zinc-500 uppercase font-black tracking-widest text-sm">Log Empty</p>
            <p className="text-zinc-600 text-xs mt-1 italic">Waiting for session activity...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {logs.map((log) => (
              <div key={log.id} className={`p-4 rounded border-l-4 flex gap-4 ${getColor(log.type)}`}>
                <div className="mt-0.5 shrink-0">
                  {getIcon(log.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-black text-white uppercase tracking-widest">{log.who}</span>
                    <span className="text-[10px] text-zinc-500 font-bold">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{log.what}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

