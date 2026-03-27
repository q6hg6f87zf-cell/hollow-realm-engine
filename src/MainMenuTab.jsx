import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { 
  Users, UserPlus, Heart, Shield, Skull, Plus, Minus, Coins, Dices, 
  Activity, Castle, Pickaxe, MapPin, Map, AlertTriangle, Dice5, 
  ChevronDown, ChevronUp, Camera, Settings, Trophy, Ghost, Dog, Brain, Zap
} from 'lucide-react';

export default function MainMenuTab() {
  const { players, setPlayers, addLog } = useHollowRealm();
  const [expanded, setExpanded] = useState({ forge: true, squad: true, villains: false, atlas: false, hq: false });
  const [editingId, setEditingId] = useState(null);

  // --- HANDBOOK DATA ---
  const bloodlines = {
    'Dust-Walker': { passive: 'Void-Scarred', desc: 'Ignore 1 magic attack/session. Night vision.' },
    'Garrison-Born': { passive: 'Iron Discipline', desc: 'Immune to Fear. +1 DEF near allies.' },
    'The Sunken': { passive: 'Amphibious', desc: 'Breathe underwater. 10% Black Market discount.' },
    'Deep-Claimed': { passive: 'Stonebreaker', desc: 'Mine ore barehanded. Detect traps in dark.' },
    'Aether-Kith': { passive: 'Phase Shift', desc: 'Move through solid objects. Zero weight.' }
  };

  const classStats = {
    Warrior: { hp: 12, def: 7 }, Wizard: { hp: 7, def: 2 }, Rogue: { hp: 8, def: 3 },
    Healer: { hp: 9, def: 4 }, Merchant: { hp: 8, def: 3 }, Bard: { hp: 8, def: 2 }
  };

  // --- COMPANION SYSTEM ---
  const companionTypes = ['None', 'Void-Hound (+1 STR)', 'Scavenger Crow (+1 LCK)', 'Stone-Crab (+1 DEF)'];

  // --- FORGE STATE ---
  const [charName, setCharName] = useState('');
  const [charClass, setCharClass] = useState('Warrior');
  const [charLineage, setCharLineage] = useState('Dust-Walker');

  // --- VTT ENGINE FUNCTIONS ---
  const handleForge = () => {
    if (!charName.trim()) return;
    const stats = classStats[charClass];
    const newPlayer = {
      id: Date.now().toString(), charname: charName, class: charClass, lineage: charLineage,
      hp: stats.hp, maxHp: stats.hp, def: stats.def, coins: 0, status: 'Healthy', 
      img: null, isLegend: false, isDead: false, companion: 'None', xp: 0,
      passive: bloodlines[charLineage].passive
    };
    setPlayers(prev => [...prev, newPlayer]);
    addLog({ type: 'system', who: 'Forge', what: `Spawned ${charName} (${charLineage})` });
    setCharName('');
  };

  const updatePlayer = (id, updates) => setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

  const handleImage = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePlayer(id, { img: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Filtered Lists
  const activeSquad = players.filter(p => !p.isDead && !p.isLegend);
  const graveyard = players.filter(p => p.isDead);

  return (
    <div className="space-y-4 animate-fadeIn pb-24">
      
      {/* 1. THE FORGE */}
      <div className="glass-panel overflow-hidden border-l-4 border-l-amber-500">
        <button onClick={() => setExpanded({...expanded, forge: !expanded.forge})} className="w-full p-4 flex justify-between items-center bg-black/40">
          <h2 className="text-[12px] text-amber-500 uppercase font-black flex items-center gap-2"><Dices size={16}/> Forge Character (1,000c)</h2>
          {expanded.forge ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {expanded.forge && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-black/20">
            <div>
              <label className="text-[9px] text-zinc-500 uppercase font-black mb-1 block">Name</label>
              <input value={charName} onChange={e => setCharName(e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm" placeholder="Operative..."/>
            </div>
            <div>
              <label className="text-[9px] text-zinc-500 uppercase font-black mb-1 block">Lineage</label>
              <select value={charLineage} onChange={e => setCharLineage(e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm">
                {Object.keys(bloodlines).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[9px] text-zinc-500 uppercase font-black mb-1 block">Class</label>
              <select value={charClass} onChange={e => setCharClass(e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm">
                {Object.keys(classStats).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={handleForge} className="bg-amber-600 hover:bg-amber-500 text-black font-black uppercase text-xs p-2.5 rounded transition-all">Create Operative</button>
          </div>
        )}
      </div>

      {/* 2. ACTIVE SQUAD DASHBOARD */}
      <div className="glass-panel border-l-4 border-l-green-500">
        <div className="p-4 bg-black/40 flex justify-between items-center border-b border-white/5">
          <h2 className="text-[12px] text-green-500 uppercase font-black flex items-center gap-2"><Activity size={16}/> Operational Roster</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSquad.map(p => (
            <div key={p.id} className={`glass-panel p-0 bg-black/60 border ${p.hp <= 3 ? 'border-red-500 animate-pulse-slow' : 'border-white/10'} overflow-hidden`}>
              {/* Header: Name/Controls */}
              <div className="p-3 bg-black/40 border-b border-white/5 flex justify-between items-start">
                <div className="flex gap-3">
                  <label className="w-12 h-12 rounded bg-zinc-800 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden">
                    {p.img ? <img src={p.img} className="w-full h-full object-cover"/> : <Camera size={16} className="text-zinc-600"/>}
                    <input type="file" className="hidden" onChange={e => handleImage(p.id, e)}/>
                  </label>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-tight leading-none">{p.charname}</h3>
                    <p className="text-[9px] text-amber-500 font-bold uppercase mt-1">{p.lineage} {p.class}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(editingId === p.id ? null : p.id)} className="text-zinc-500 hover:text-white"><Settings size={14}/></button>
                  <button onClick={() => updatePlayer(p.id, {isDead: true})} className="text-zinc-500 hover:text-red-500"><Skull size={14}/></button>
                </div>
              </div>

              {/* Passive & Companion Info */}
              <div className="px-3 py-2 bg-amber-500/5 flex justify-between items-center border-b border-white/5">
                <span className="text-[9px] font-black text-amber-400 uppercase flex items-center gap-1"><Zap size={10}/> {p.passive}</span>
                <span className="text-[9px] font-black text-blue-400 uppercase flex items-center gap-1"><Dog size={10}/> {p.companion}</span>
              </div>

              {/* Stats & Interaction */}
              <div className="p-3 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-black uppercase">Vitals</span>
                    <span className={`text-lg font-black ${p.hp <= 3 ? 'text-red-500' : 'text-white'}`}>{p.hp} / {p.maxHp}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => updatePlayer(p.id, {hp: Math.max(0, p.hp-1)})} className="bg-red-900/40 w-10 h-10 rounded border border-red-500/30 font-black text-red-500">-</button>
                    <button onClick={() => updatePlayer(p.id, {hp: Math.min(p.maxHp, p.hp+1)})} className="bg-green-900/40 w-10 h-10 rounded border border-green-500/30 font-black text-green-500">+</button>
                  </div>
                </div>

                {editingId === p.id && (
                  <div className="space-y-3 bg-black/40 p-3 rounded border border-amber-500/20 animate-fadeIn">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[8px] text-zinc-500 uppercase font-black">Max HP</label>
                        <input type="number" className="w-full bg-black/50 text-white text-xs p-1" value={p.maxHp} onChange={e => updatePlayer(p.id, {maxHp: parseInt(e.target.value)})}/>
                      </div>
                      <div className="flex-1">
                        <label className="text-[8px] text-zinc-500 uppercase font-black">DEF</label>
                        <input type="number" className="w-full bg-black/50 text-white text-xs p-1" value={p.def} onChange={e => updatePlayer(p.id, {def: parseInt(e.target.value)})}/>
                      </div>
                    </div>
                    <div>
                      <label className="text-[8px] text-zinc-500 uppercase font-black">Assign Companion [1,000c]</label>
                      <select value={p.companion} onChange={e => updatePlayer(p.id, {companion: e.target.value})} className="w-full bg-black/50 text-white text-[10px] p-1">
                        {companionTypes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[10px] text-zinc-500 font-black uppercase flex items-center gap-1"><Coins size={12} className="text-amber-500"/> Bank</span>
                  <input type="number" className="bg-transparent text-right text-amber-500 font-black w-20 outline-none border-b border-white/5" value={p.coins} onChange={e => updatePlayer(p.id, {coins: parseInt(e.target.value) || 0})}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. THE FALLEN (GRAVEYARD) */}
      <div className="glass-panel border-l-4 border-l-red-900 overflow-hidden">
        <button onClick={() => setExpanded({...expanded, graveyard: !expanded.graveyard})} className="w-full p-3 bg-black/60 flex justify-between items-center">
          <h2 className="text-[11px] text-red-700 uppercase font-black flex items-center gap-2"><Ghost size={14}/> The Graveyard (Hall of the Dead)</h2>
          {expanded.graveyard ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {expanded.graveyard && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {graveyard.map(p => (
              <div key={p.id} className="bg-black/40 p-2 rounded border border-red-900/30 flex items-center gap-3 grayscale">
                 <div className="w-10 h-10 rounded bg-zinc-900 border border-red-900/50 overflow-hidden shrink-0">
                  {p.img && <img src={p.img} className="w-full h-full object-cover"/>}
                 </div>
                 <div className="min-w-0">
                  <p className="text-[10px] text-zinc-400 font-black uppercase truncate">{p.charname}</p>
                  <button onClick={() => updatePlayer(p.id, {isDead: false, hp: 1})} className="text-[8px] text-red-500 uppercase font-bold hover:underline">Resurrect (6,000c)</button>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

