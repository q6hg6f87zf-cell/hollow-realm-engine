import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { Activity, Heart, Shield, Skull, Plus, Minus, Coins, UserPlus, ShieldAlert } from 'lucide-react';

export default function LiveSquadTracker() {
  const { players, setPlayers, addLog } = useHollowRealm();
  const [newCharName, setNewCharName] = useState('');
  const [newCharClass, setNewCharClass] = useState('Warrior');

  // Hardcoded from your Player's Handbook physics
  const classDefaults = {
    Warrior: { maxHp: 12, def: 7 },
    Wizard: { maxHp: 7, def: 2 },
    Rogue: { maxHp: 8, def: 3 },
    Healer: { maxHp: 9, def: 4 },
    Merchant: { maxHp: 8, def: 3 },
    Bard: { maxHp: 8, def: 2 }
  };

  const handleAddPlayer = () => {
    if (!newCharName.trim()) return;
    const stats = classDefaults[newCharClass];
    const newPlayer = {
      id: Date.now().toString(),
      charname: newCharName,
      class: newCharClass,
      hp: stats.maxHp,
      maxHp: stats.maxHp,
      def: stats.def,
      coins: 0,
      status: 'Healthy'
    };
    
    // Safety check in case context isn't fully wired yet
    if (setPlayers) {
      setPlayers(prev => [...(prev || []), newPlayer]);
    }
    
    if (addLog) addLog({ type: 'system', who: 'GM', what: `Spawned new ${newCharClass}: ${newCharName}` });
    setNewCharName('');
  };

  const updatePlayer = (id, field, value) => {
    if (setPlayers) {
      setPlayers(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    }
  };

  const adjustHp = (id, amount) => {
    if (setPlayers) {
      setPlayers(prev => prev.map(p => {
        if (p.id === id) {
          const newHp = Math.max(0, Math.min(p.maxHp, p.hp + amount));
          return { ...p, hp: newHp };
        }
        return p;
      }));
    }
  };

  const removePlayer = (id, name) => {
    if(window.confirm(`PERMADEATH WARNING: Move ${name} to the Graveyard?`)) {
        if (setPlayers) {
          setPlayers(prev => prev.filter(p => p.id !== id));
        }
        if (addLog) addLog({ type: 'death', who: name, what: `Succumbed to the Hollow. Moved to Graveyard.` });
    }
  };

  const statuses = ['Healthy', 'Bleeding', 'Stunned', 'Blinded', 'Exhausted', 'Cursed', 'Downed (0 HP)'];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* HEADER */}
      <div className="glass-panel p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#ede0c9] uppercase tracking-tighter flex items-center gap-3">
            <Activity size={24} className="text-amber-500" />
            Live Squad Tracker
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">Roster & Vitals Management</p>
        </div>
      </div>

      {/* RECRUITMENT TERMINAL */}
      <div className="glass-panel p-5 border-l-4 border-l-amber-500 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-1 block">Operative Designation</label>
          <input 
            type="text" 
            value={newCharName} 
            onChange={e => setNewCharName(e.target.value)}
            className="w-full bg-black/50 border border-white/10 p-3 rounded text-white text-sm outline-none focus:border-amber-500 transition-colors"
            placeholder="Enter character name..."
          />
        </div>
        <div className="flex-1 w-full">
          <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-1 block">Class Lineage</label>
          <select 
            value={newCharClass} 
            onChange={e => setNewCharClass(e.target.value)}
            className="w-full bg-black/50 border border-white/10 p-3 rounded text-white text-sm outline-none focus:border-amber-500 transition-colors cursor-pointer"
          >
            {Object.keys(classDefaults).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button 
          onClick={handleAddPlayer}
          className="bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-widest text-xs px-6 py-3 rounded transition-all flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <UserPlus size={16} /> Spawn
        </button>
      </div>

      {/* ACTIVE ROSTER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(players || []).map(player => (
          <div key={player.id} className={`glass-panel p-0 overflow-hidden border ${player.hp <= 3 ? 'border-red-900 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/5'}`}>
            
            {/* CARD HEADER */}
            <div className={`p-4 border-b border-white/5 flex justify-between items-start ${player.hp <= 3 ? 'bg-red-950/30' : 'bg-black/40'}`}>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{player.charname}</h3>
                <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">{player.class}</p>
              </div>
              <button onClick={() => removePlayer(player.id, player.charname)} className="text-zinc-600 hover:text-red-500 transition-colors">
                <Skull size={16} />
              </button>
            </div>

            {/* VITALS & STATS */}
            <div className="p-4 space-y-5">
              
              {/* HP Controls */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest flex items-center gap-1">
                    <Heart size={12} className={player.hp <= 3 ? 'text-red-500 animate-pulse' : 'text-zinc-400'}/> Vitals
                  </span>
                  <span className={`text-sm font-black ${player.hp <= 3 ? 'text-red-500' : 'text-white'}`}>
                    {player.hp} / {player.maxHp}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => adjustHp(player.id, -1)} className="flex-1 bg-red-900/20 hover:bg-red-900/50 text-red-500 border border-red-900/50 py-2 rounded flex justify-center items-center transition-colors">
                    <Minus size={14} />
                  </button>
                  <button onClick={() => adjustHp(player.id, 1)} className="flex-1 bg-green-900/20 hover:bg-green-900/50 text-green-500 border border-green-900/50 py-2 rounded flex justify-center items-center transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Status & Defense */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-1">Status</label>
                  <select 
                    value={player.status} 
                    onChange={e => updatePlayer(player.id, 'status', e.target.value)}
                    className={`w-full bg-black/50 border p-2 rounded text-xs font-bold outline-none cursor-pointer ${player.status !== 'Healthy' ? 'text-red-400 border-red-900/50' : 'text-zinc-300 border-white/5'}`}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-1 flex items-center gap-1">
                    <Shield size={10}/> Base DEF
                  </label>
                  <div className="w-full bg-black/50 border border-white/5 p-2 rounded text-xs font-black text-zinc-300 text-center">
                    {player.def}
                  </div>
                </div>
              </div>

              {/* Treasury Tracker */}
              <div className="pt-3 border-t border-white/5">
                <label className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-1 flex items-center gap-1">
                  <Coins size={10} className="text-amber-500"/> Treasury (Coins)
                </label>
                <input 
                  type="number" 
                  value={player.coins}
                  onChange={e => updatePlayer(player.id, 'coins', parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent border-b border-zinc-700 text-amber-500 font-black text-sm p-1 outline-none focus:border-amber-500"
                />
              </div>

            </div>
          </div>
        ))}
        
        {(!players || players.length === 0) && (
          <div className="col-span-full glass-panel p-10 flex flex-col items-center justify-center text-center border-dashed border-zinc-700">
            <ShieldAlert size={32} className="text-zinc-600 mb-3" />
            <p className="text-zinc-400 uppercase font-black tracking-widest text-sm">No Active Operatives</p>
            <p className="text-zinc-600 text-xs mt-1 italic">Spawn a new character to begin tracking vitals.</p>
          </div>
        )}
      </div>

    </div>
  );
}

