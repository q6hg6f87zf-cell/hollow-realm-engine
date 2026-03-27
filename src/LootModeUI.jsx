import React, { useState } from 'react';

export default function LootModeUI() {
  // Boss Loot Math State
  const [survivors, setSurvivors] = useState(4);
  const [mvp, setMvp] = useState('Rogue_Echo');
  const [activeBoss, setActiveBoss] = useState('Gravenor');

  // Zone Roller State
  const [activeZone, setActiveZone] = useState('forest');
  const [rolledLoot, setRolledLoot] = useState(null);

  [span_3](start_span)// The 30,000c Raid Pot[span_3](end_span)
  const raidPotTotal = 30000;
  const splitCut = Math.floor(raidPotTotal / Math.max(1, survivors));

  [span_4](start_span)// Boss MVP Drop Logic[span_4](end_span)
  const getBossArtifact = (boss) => {
    switch(boss) {
      case 'Gravenor': return "Gravenor's Pelt (Immunity to Bleed)";
      case 'Valdris': return "Valdris's Signet (Kingdom Guards act as allies)";
      case 'Thessaly': return "World-Eater's Map (Ghost Path unlocked)";
      case 'Null Warden': return "The Null Warden's Mask (See invisible hazards)";
      default: return "Unique Boss Artifact";
    }
  };

  // Zone-Locked Loot Engine Database
  const lootDatabase = [
    { name: "Wolf-Bane Scent", rarity: "Rare", zone: "forest", desc: "Wolves ignore user for 3 rounds." },
    { name: "Gravenor's Rusted Locket", rarity: "Rare", zone: "forest", desc: "Forces Gravenor to lose 1 turn." },
    { name: "Garrison Oil-Lantern", rarity: "Rare", zone: "kingdom", desc: "Reveals Phantom Patrols early." },
    { name: "Audit-Shield Ring", rarity: "Rare", zone: "kingdom", desc: "Blocks Valdris's coin drain." },
    { name: "Geothermal Regulator", rarity: "Rare", zone: "caverns", desc: "Prevents Exhaustion from steam vents." },
    { name: "Void-Salts", rarity: "Rare", zone: "caverns", desc: "Traded to Krell for Masterwork Status." },
    { name: "The Sink's Anchor", rarity: "Legendary", zone: "library", desc: "Auto-pass WIS save against Sink's Pull." },
    { name: "Founding Documents", rarity: "Legendary", zone: "library", desc: "Unlock Nylah's Secret Stock." },
    { name: "Null-Field Generator", rarity: "Mythic", zone: "edge", desc: "Allows spells during Event Horizon." },
    { name: "Glass-Walk Stabilizer", rarity: "Mythic", zone: "edge", desc: "Advantage on Stability Rolls in the Edge." },
    // Filler common/uncommon items for the roller
    { name: "Aether Bandages", rarity: "Uncommon", zone: "forest", desc: "Cures Bleeding, restores 3 HP." },
    { name: "Bone-Handled Knife", rarity: "Common", zone: "forest", desc: "Basic survival blade." },
    { name: "Garrison Halberd", rarity: "Uncommon", zone: "kingdom", desc: "Reach weapon." }
  ];

  // The Strict Rarity Gate Logic
  const rollZoneLoot = () => {
    const allowedRarities = {
      'forest': ['Common', 'Uncommon', 'Rare'],
      'kingdom': ['Common', 'Uncommon', 'Rare'],
      'caverns': ['Common', 'Uncommon', 'Rare'],
      'library': ['Common', 'Uncommon', 'Rare', 'Legendary'],
      'edge': ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythic']
    };

    // Filter the database by matching zone AND permitted rarity tier
    const validLoot = lootDatabase.filter(item => 
      (item.zone === activeZone || item.zone === 'all') && 
      allowedRarities[activeZone].includes(item.rarity)
    );

    if (validLoot.length > 0) {
      const randomItem = validLoot[Math.floor(Math.random() * validLoot.length)];
      setRolledLoot(randomItem);
    } else {
      setRolledLoot({ name: "Empty Cache", rarity: "Common", desc: "Someone looted this already." });
    }
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-amber-900 shadow-2xl font-sans text-zinc-300 flex flex-col gap-8">
      
      {/* HEADER: LOOT MODE INITIATED */}
      <div className="text-center border-b-2 border-amber-600 pb-4 animate-pulse">
        <h1 className="text-4xl font-black text-amber-500 uppercase tracking-widest">Loot Mode Initiated</h1>
        [span_5](start_span)<p className="text-sm text-zinc-400 mt-2">Boss Phase 3 Complete. Commencing Payouts.[span_5](end_span)</p>
      </div>

      {/* MVP & SPLIT POT DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* MVP Award Panel */}
        <div className="bg-zinc-900 p-6 rounded border border-zinc-700 relative overflow-hidden">
          [span_6](start_span)<div className="absolute top-0 right-0 bg-amber-600 text-black font-bold px-3 py-1 text-xs rounded-bl">MVP[span_6](end_span)</div>
          <h2 className="text-xl font-bold text-white mb-4">Final Blow Award</h2>
          <div className="mb-4">
            <label className="block text-xs text-zinc-500 uppercase">Select MVP Player</label>
            <input 
              type="text" 
              value={mvp} 
              onChange={(e) => setMvp(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded p-2 text-amber-500 font-bold mt-1"
            />
          </div>
          <div className="p-3 bg-black border border-amber-900/50 rounded">
            <p className="text-xs text-zinc-500 uppercase">Awarded Artifact:</p>
            <p className="text-sm text-amber-500 font-bold">{getBossArtifact(activeBoss)}</p>
          </div>
        </div>

        {/* 30,000c Split Pot Panel */}
        <div className="bg-zinc-900 p-6 rounded border border-zinc-700 relative">
          [span_7](start_span)<div className="absolute top-0 right-0 bg-green-600 text-black font-bold px-3 py-1 text-xs rounded-bl">RAID POT[span_7](end_span)</div>
          <h2 className="text-xl font-bold text-white mb-4">The Split Pot</h2>
          <div className="flex justify-between items-center mb-6">
            <div>
              <label className="block text-xs text-zinc-500 uppercase">Surviving Players</label>
              <input 
                type="number" 
                min="1" max="6"
                value={survivors} 
                onChange={(e) => setSurvivors(parseInt(e.target.value) || 1)}
                className="w-20 bg-black border border-zinc-700 rounded p-2 text-white font-bold mt-1 text-center"
              />
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase">Total Raid Pot</p>
              <p className="text-2xl font-black text-green-500">{raidPotTotal.toLocaleString()}c</p>
            </div>
          </div>
          <div className="p-4 bg-green-950/20 border border-green-900/50 rounded flex justify-between items-center">
            <span className="font-bold text-white">Payout Per Survivor:</span>
            <span className="text-xl font-black text-green-400">+{splitCut.toLocaleString()}c</span>
          </div>
        </div>
      </div>

      {/* ZONE-LOCKED CHEST ROLLER */}
      <div className="bg-zinc-900 p-6 rounded border border-zinc-700">
        <h2 className="text-xl font-bold text-white mb-4">Zone-Locked Chest Extraction</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-xs text-zinc-500 uppercase mb-1">Current Extraction Zone</label>
            <select 
              className="w-full bg-black border border-zinc-700 text-white p-3 rounded font-bold uppercase"
              value={activeZone} 
              onChange={(e) => setActiveZone(e.target.value)}
            >
              <option value="forest">Zone 1: The Dark Forest (Max: Rare)</option>
              <option value="kingdom">Zone 2: Crumbling Kingdom (Max: Rare)</option>
              <option value="caverns">Zone 3: Underground Caverns (Max: Rare)</option>
              <option value="library">Zone 4: Sunken Library (Max: Legendary)</option>
              <option value="edge">Zone 5: The Hollow's Edge (Max: Mythic)</option>
            </select>
          </div>
          <button 
            onClick={rollZoneLoot}
            className="bg-amber-700 hover:bg-amber-600 text-white font-black px-8 py-3 rounded uppercase tracking-wider transition-colors md:mt-5"
          >
            Open Chest
          </button>
        </div>

        {/* Rolled Loot Display */}
        {rolledLoot && (
          <div className="p-6 bg-black border-2 border-amber-900 rounded-lg text-center animate-fadeIn">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Item Acquired</p>
            <h3 className="text-3xl font-black text-white mb-2">{rolledLoot.name}</h3>
            <span className={`text-xs px-3 py-1 rounded font-bold uppercase tracking-widest inline-block mb-4 ${
              rolledLoot.rarity === 'Legendary' ? 'bg-amber-900 text-amber-500' :
              rolledLoot.rarity === 'Mythic' ? 'bg-purple-900 text-purple-400' :
              rolledLoot.rarity === 'Rare' ? 'bg-blue-900 text-blue-400' : 'bg-zinc-800 text-zinc-400'
            }`}>
              {rolledLoot.rarity}
            </span>
            <p className="text-sm text-zinc-400 italic">"{rolledLoot.desc}"</p>
          </div>
        )}
      </div>

    </div>
  );
}
