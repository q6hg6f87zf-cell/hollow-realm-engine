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
import React, { useState, useEffect } from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { 
  Users, UserPlus, Heart, Shield, Skull, Plus, Minus, Coins, Dices, 
  Activity, Castle, Pickaxe, MapPin, Map, AlertTriangle, Dice5, 
  ChevronDown, ChevronUp, Camera, Settings, Trophy, Ghost, Dog, Brain, Zap, 
  Flame, Snowflake, Wind, DollarSign, Hammer, Music, Book, crosshair
} from 'lucide-react';

export default function MainMenuTab() {
  const { players, setPlayers, addLog, gmCoins, setGmCoins } = useHollowRealm();
  
  // --- GM ENGINE STATE ---
  const [expanded, setExpanded] = useState({ 
    forge: true, squad: true, villains: false, atlas: false, hq: false, graveyard: false, worldEvents: true 
  });
  const [editingId, setEditingId] = useState(null);
  const [activeEvent, setActiveEvent] = useState('None'); // Void-Frost, Void-Gale, Debtor's Eclipse

  // --- DATA ARCHIVE ---
  const bloodlines = {
    'Dust-Walker': { passive: 'Void-Scarred', stats: 'WIS+2, SPD+1, CHA-2', desc: 'Ignore 1 magic attack/session. Perfect night vision.' },
    'Garrison-Born': { passive: 'Iron Discipline', stats: 'STR+1, DEF+2, SPD-1', desc: 'Immune to Fear. +1 DEF when near allies.' },
    'The Sunken': { passive: 'Amphibious', stats: 'INT+2, CHA+2, LCK+1', desc: 'Breathe underwater. 10% Black Market discount.' },
    'Deep-Claimed': { passive: 'Stonebreaker', stats: 'STR+2, DEF+1, INT-1', desc: 'Mine ore barehanded. Detect structural traps.' },
    'Aether-Kith': { passive: 'Phase Shift', stats: 'LCK+3, INT+1, STR-2', desc: 'Move through solid objects. Zero physical weight.' }
  };

  const classStats = {
    Warrior: { hp: 12, def: 7, kit: 'Soldier Pack' },
    Wizard: { hp: 7, def: 2, kit: 'Scholar Satchel' },
    Rogue: { hp: 8, def: 3, kit: 'Thief Tools' },
    Healer: { hp: 9, def: 4, kit: 'Medic Crate' },
    Merchant: { hp: 8, def: 3, kit: 'Trading Ledger' },
    Bard: { hp: 8, def: 2, kit: 'Instrument' }
  };

  const mapZones = {
    hq: { name: 'Moon Squad HQ', level: 1, dc: 'Safe', infection: '0%', hazard: 'None', desc: 'Safe zone. Base Sieges only.' },
    kingdom: { name: 'Crumbling Kingdom', level: 2, dc: '10-12', infection: '20%', hazard: 'None', desc: 'Standard survival. Rusted iron.' },
    library: { name: 'Sunken Library', level: 2, dc: '10-12', infection: '20%', hazard: 'Lightning AoE', desc: 'Water dampens physical rolls (-2).' },
    forest: { name: 'Dark Forest', level: 3, dc: '13-15', infection: '30%', hazard: 'Acoustic Mimicry', desc: 'Explosives draw the Ashen Pack.' },
    caverns: { name: 'Underground Caverns', level: 3, dc: '13-15', infection: '30%', hazard: 'Pitch Black', desc: 'Ranged attacks suffer Disadvantage.' },
    edge: { name: "The Hollow's Edge", level: 5, dc: '18+', infection: '50%', hazard: 'Anti-Magic Field', desc: '50% chance for spells to fail.' }
  };

  // --- AUTOMATION: WORLD EVENTS ---
  useEffect(() => {
    if (activeEvent === 'Void-Frost') {
      const timer = setInterval(() => {
        setPlayers(prev => prev.map(p => p.hp > 0 ? { ...p, hp: Math.max(0, p.hp - 1) } : p));
        addLog({ type: 'system', who: 'VOID-FROST', what: 'Thermal Drain active. All players lost 1 HP.' });
      }, 600000); // 10 minutes real-time
      return () => clearInterval(timer);
    }
  }, [activeEvent, setPlayers, addLog]);

  // --- GM FUNCTIONS ---
  const [charName, setCharName] = useState('');
  const [charClass, setCharClass] = useState('Warrior');
  const [charLineage, setCharLineage] = useState('Dust-Walker');

  const handleForge = () => {
    if (!charName.trim()) return;
    const stats = classStats[charClass];
    const newPlayer = {
      id: Date.now().toString(), charname: charName, class: charClass, lineage: charLineage,
      hp: stats.hp, maxHp: stats.hp, def: stats.def, coins: 0, status: 'Healthy', 
      img: null, isLegend: false, isDead: false, companion: 'None',
      passive: bloodlines[charLineage].passive, inventory: [stats.kit], wounds: []
    };
    setPlayers(prev => [...prev, newPlayer]);
    addLog({ type: 'system', who: 'GM', what: `Spawned ${charName}.` });
    setCharName('');
  };

  const updatePlayer = (id, updates) => setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

  const handleAction = (id, cost, label) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === id) {
        if (p.coins < cost) { alert('Insufficient Coins'); return p; }
        addLog({ type: 'system', who: p.charname, what: `Spent ${cost}c on ${label}.` });
        return { ...p, coins: p.coins - cost };
      }
      return p;
    }));
  };

  const [activeZone, setActiveZone] = useState('hq');
  const [generatedEncounter, setGeneratedEncounter] = useState(null);

  const rollEncounter = () => {
    const zone = mapZones[activeZone];
    const roll = Math.floor(Math.random() * 100) + 1;
    let encounter = { type: 'Combat', text: `Hostile contact! DC: ${zone.dc}`, hazard: zone.hazard };
    if (roll > 70) encounter = { type: 'Anomaly', text: `Reality glitch. Wisdom Check DC: ${zone.dc}`, hazard: zone.hazard };
    setGeneratedEncounter(encounter);
    addLog({ type: 'system', who: 'Atlas', what: `Spawned ${encounter.type} in ${zone.name}` });
  };

  // --- SECTIONS ---
  const activeSquad = players.filter(p => !p.isDead && !p.isLegend);
  const graveyard = players.filter(p => p.isDead);

  return (
    <div className="space-y-4 animate-fadeIn pb-32">
      
      {/* WORLD EVENTS (AUTOMATION) */}
      <div className="glass-panel overflow-hidden border-l-4 border-l-cyan-500">
        <button onClick={() => setExpanded({...expanded, worldEvents: !expanded.worldEvents})} className="w-full p-4 flex justify-between items-center bg-black/40">
          <h2 className="text-[12px] text-cyan-400 uppercase font-black flex items-center gap-2"><Snowflake size={16}/> Global Physics</h2>
          <span className="text-[10px] text-zinc-500 font-bold">Active: {activeEvent}</span>
        </button>
        {expanded.worldEvents && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'None', icon: <Zap size={14}/>, color: 'text-zinc-500' },
              { id: 'Void-Frost', icon: <Snowflake size={14}/>, color: 'text-blue-400' },
              { id: 'Void-Gale', icon: <Wind size={14}/>, color: 'text-green-400' },
              { id: 'Debtor-Eclipse', icon: <DollarSign size={14}/>, color: 'text-amber-500' }
            ].map(ev => (
              <button key={ev.id} onClick={() => setActiveEvent(ev.id)} className={`p-2 rounded border text-[10px] font-black uppercase flex items-center justify-center gap-2 transition-all ${activeEvent === ev.id ? 'bg-white/10 border-white/40' : 'bg-black/40 border-white/5'}`}>
                <span className={ev.color}>{ev.icon}</span> {ev.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CHARACTER FORGE */}
      <div className="glass-panel overflow-hidden border-l-4 border-l-amber-500">
        <button onClick={() => setExpanded({...expanded, forge: !expanded.forge})} className="w-full p-4 flex justify-between items-center bg-black/40">
          <h2 className="text-[12px] text-amber-500 uppercase font-black flex items-center gap-2"><Dices size={16}/> The Forge (1,000c)</h2>
          {expanded.forge ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {expanded.forge && (
          <div className="p-4 space-y-4 bg-black/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input value={charName} onChange={e => setCharName(e.target.value)} className="bg-black/50 border border-white/10 p-2 rounded text-white text-sm" placeholder="Name..."/>
              <select value={charLineage} onChange={e => setCharLineage(e.target.value)} className="bg-black/50 border border-white/10 p-2 rounded text-white text-sm">
                {Object.keys(bloodlines).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={charClass} onChange={e => setCharClass(e.target.value)} className="bg-black/50 border border-white/10 p-2 rounded text-white text-sm">
                {Object.keys(classStats).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="p-3 bg-amber-500/5 rounded border border-amber-500/20">
              <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">{charLineage} Physiology:</p>
              <p className="text-xs text-zinc-300 italic">"{bloodlines[charLineage].desc}" — {bloodlines[charLineage].stats}</p>
            </div>
            <button onClick={handleForge} className="w-full bg-amber-600 text-black font-black uppercase text-xs p-3 rounded">Forge Operative</button>
          </div>
        )}
      </div>

      {/* OPERATIONAL ROSTER */}
      <div className="glass-panel border-l-4 border-l-green-500">
        <div className="p-4 bg-black/40 flex justify-between items-center border-b border-white/5">
          <h2 className="text-[12px] text-green-500 uppercase font-black flex items-center gap-2"><Activity size={16}/> Operational Roster</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSquad.map(p => (
            <div key={p.id} className="glass-panel p-0 bg-black/60 border border-white/10 overflow-hidden">
              <div className="p-3 bg-black/40 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-zinc-800 rounded border border-white/10 flex items-center justify-center overflow-hidden">
                    {p.img ? <img src={p.img} className="w-full h-full object-cover"/> : <Camera size={14}/>}
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase text-sm leading-none">{p.charname}</h3>
                    <p className="text-[9px] text-amber-500 font-bold uppercase mt-1">{p.lineage} {p.class}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setEditingId(editingId === p.id ? null : p.id)}><Settings size={14} className="text-zinc-500"/></button>
                   <button onClick={() => updatePlayer(p.id, {isDead: true})}><Skull size={14} className="text-red-500"/></button>
                </div>
              </div>

              <div className="p-3 space-y-3">
                <div className="flex justify-between items-center">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-black uppercase">HP {p.hp}/{p.maxHp}</span>
                      <div className="w-24 h-1 bg-white/5 rounded-full mt-1"><div className="h-full bg-green-500" style={{width: `${(p.hp/p.maxHp)*100}%`}}></div></div>
                   </div>
                   <div className="flex gap-1">
                      <button onClick={() => updatePlayer(p.id, {hp: Math.max(0, p.hp-1)})} className="bg-red-900/40 px-3 py-1 rounded text-red-500 font-black">-</button>
                      <button onClick={() => updatePlayer(p.id, {hp: Math.min(p.maxHp, p.hp+1)})} className="bg-green-900/40 px-3 py-1 rounded text-green-500 font-black">+</button>
                   </div>
                </div>

                {/* ACTION MENU */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleAction(p.id, 500, 'Standard Action')} className="bg-white/5 border border-white/10 p-2 rounded text-[9px] font-black uppercase hover:bg-white/10">Action (500c)</button>
                  <button onClick={() => handleAction(p.id, 500, 'Re-Roll')} className="bg-white/5 border border-white/10 p-2 rounded text-[9px] font-black uppercase hover:bg-white/10">Re-Roll (500c)</button>
                </div>

                <div className="flex justify-between items-center text-[10px] font-black text-amber-500">
                  <span className="flex items-center gap-1"><Coins size={10}/> BANK: {p.coins}c</span>
                  <input type="number" className="w-16 bg-transparent text-right border-b border-white/10" value={p.coins} onChange={e => updatePlayer(p.id, {coins: parseInt(e.target.value) || 0})}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VTT ATLAS */}
      <div className="glass-panel overflow-hidden border-l-4 border-l-purple-500">
        <button onClick={() => setExpanded({...expanded, atlas: !expanded.atlas})} className="w-full p-4 flex justify-between items-center bg-black/40">
          <h2 className="text-[12px] text-purple-400 uppercase font-black flex items-center gap-2"><Map size={16}/> VTT Atlas</h2>
          {expanded.atlas ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {expanded.atlas && (
          <div className="p-4 space-y-4">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(mapZones).map(([k,v]) => (
                  <button key={k} onClick={() => setActiveZone(k)} className={`p-2 rounded border text-[10px] font-black uppercase text-left ${activeZone === k ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-black/40'}`}>
                    {v.name}
                  </button>
                ))}
             </div>
             <div className="bg-purple-900/10 border border-purple-500/30 p-4 rounded relative overflow-hidden">
                <div className="absolute top-2 right-2 text-purple-500 opacity-20"><Map size={48}/></div>
                <h3 className="text-white font-black uppercase text-sm mb-1">{mapZones[activeZone].name} (LVL {mapZones[activeZone].level})</h3>
                <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mb-3">Hazard: {mapZones[activeZone].hazard}</p>
                <button onClick={rollEncounter} className="w-full bg-purple-600 text-white font-black py-2 rounded uppercase text-xs">Roll Encounter</button>
                {generatedEncounter && (
                  <div className="mt-3 p-3 bg-black/60 border border-purple-500/50 rounded animate-fadeIn">
                    <p className="text-[10px] text-purple-400 font-black uppercase">{generatedEncounter.type}</p>
                    <p className="text-xs text-white italic">"{generatedEncounter.text}"</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>

      {/* THE GRAVEYARD */}
      <div className="glass-panel overflow-hidden border-l-4 border-l-red-900">
        <button onClick={() => setExpanded({...expanded, graveyard: !expanded.graveyard})} className="w-full p-4 flex justify-between items-center bg-black/40">
          <h2 className="text-[12px] text-red-700 uppercase font-black flex items-center gap-2"><Ghost size={16}/> The Graveyard</h2>
        </button>
        {expanded.graveyard && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {graveyard.map(p => (
              <div key={p.id} className="bg-black/60 p-2 rounded border border-red-900/30 flex items-center gap-3 grayscale">
                 <div className="w-10 h-10 bg-zinc-900 rounded border border-red-900/50 shrink-0"></div>
                 <div className="min-w-0">
                  <p className="text-[10px] text-zinc-500 font-black uppercase truncate">{p.charname}</p>
                  <button onClick={() => updatePlayer(p.id, {isDead: false, hp: 1})} className="text-[8px] text-red-500 uppercase font-bold">Resurrect (6,000c)</button>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

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

