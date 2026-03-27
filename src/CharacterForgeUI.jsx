import React, { useState } from 'react';

export default function CharacterForgeUI({ playerCoins = 1500 }) {
  const forgeCost = 1000;

  // --- DATABASE ---
  const classes = [
    { 
      id: 'warrior', name: "The Warrior", hp: 12, inv: 8,
      stats: { STR: 8, DEF: 7, SPD: 4, WIS: 4, INT: 3, CHA: 3, LCK: 3 },
      power: "Shield Block",
      shadows: ["The Berserker Flaw"] 
    },
    { 
      id: 'wizard', name: "The Wizard", hp: 7, inv: 6,
      stats: { STR: 3, DEF: 2, SPD: 5, WIS: 7, INT: 9, CHA: 4, LCK: 4 },
      power: "Arcane Surge",
      shadows: ["The Dependency", "The Unfinished Experiment"] 
    },
    { 
      id: 'rogue', name: "The Rogue", hp: 8, inv: 10,
      stats: { STR: 5, DEF: 3, SPD: 9, WIS: 4, INT: 5, CHA: 6, LCK: 7 },
      power: "Shadow Step",
      shadows: ["The Wanted", "The Ghost That Talks"] 
    },
    { 
      id: 'healer', name: "The Healer", hp: 9, inv: 8,
      stats: { STR: 3, DEF: 4, SPD: 4, WIS: 9, INT: 6, CHA: 7, LCK: 5 },
      power: "Miracle Touch",
      shadows: ["The One They Couldn't Save", "The Hollow Debt"] 
    },
    { 
      id: 'merchant', name: "The Merchant", hp: 8, inv: 12,
      stats: { STR: 3, DEF: 3, SPD: 5, WIS: 5, INT: 6, CHA: 8, LCK: 8 },
      power: "Black Market",
      shadows: ["The Forged Ledger", "The Undercut"] 
    },
    { 
      id: 'bard', name: "The Bard", hp: 8, inv: 7,
      stats: { STR: 3, DEF: 2, SPD: 6, WIS: 6, INT: 5, CHA: 10, LCK: 5 },
      power: "Encore",
      shadows: ["The Stolen Song", "The Inspired Enemy"] 
    }
  ];

  const lineages = [
    { 
      id: 'dustwalker', name: "Dust-Walker",
      mods: { WIS: 2, SPD: 1, CHA: -2 },
      subs: [
        { name: "Ash-Stalkers", mods: { SPD: 2, CHA: -3 } },
        { name: "Rift-Gazers", mods: { INT: 2, WIS: -2 } }
      ]
    },
    { 
      id: 'garrison', name: "Garrison-Born",
      mods: { STR: 1, DEF: 2, SPD: -1 },
      subs: [
        { name: "Iron-Wardens", mods: { DEF: 3, SPD: -3 } },
        { name: "Sapper-Corps", mods: { STR: 1, INT: 1 } }
      ]
    },
    { 
      id: 'sunken', name: "The Sunken",
      mods: { INT: 2, CHA: 2, LCK: 1, STR: -1 },
      subs: [
        { name: "Abyssal-Brokers", mods: { LCK: 2, CHA: -1 } },
        { name: "Salt-Traders", mods: { CHA: 3, STR: -2 } }
      ]
    },
    { 
      id: 'deepclaimed', name: "Deep-Claimed",
      mods: { STR: 2, DEF: 1, INT: -1, CHA: -1 },
      subs: [
        { name: "Ore-Eaters", mods: { CON: 2, INT: -3 } }, // Note: Assuming CON replaces a stat based on your file
        { name: "Tunnel-Wights", mods: { SPD: 2, STR: -1 } }
      ]
    },
    { 
      id: 'aetherkith', name: "Aether-Kith",
      mods: { INT: 1, WIS: 1, CHA: 1, LCK: 3, STR: -2, DEF: -1 },
      subs: [
        { name: "Static-Born", mods: { LCK: 4, DEF: -3 } },
        { name: "Prism-Shards", mods: { CHA: 2, WIS: 1 } }
      ]
    }
  ];

  // --- STATE ---
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedLineage, setSelectedLineage] = useState(lineages[0]);
  const [selectedSub, setSelectedSub] = useState(lineages[0].subs[0]);
  const [rolledShadow, setRolledShadow] = useState(null);
  const [characterName, setCharacterName] = useState("New Recruit");

  // --- MATH ENGINE ---
  const calculateFinalStats = () => {
    const base = { ...selectedClass.stats };
    const linMods = selectedLineage.mods;
    const subMods = selectedSub.mods;

    const finalStats = {};

    Object.keys(base).forEach(stat => {
      let total = base[stat] + (linMods[stat] || 0) + (subMods[stat] || 0);
      
      // The Hard Cap rule: No stat can naturally exceed 15
      if (total > 15) total = 15;
      
      finalStats[stat] = total;
    });

    return finalStats;
  };

  const finalStats = calculateFinalStats();

  // --- ACTIONS ---
  const handleLineageSelect = (lin) => {
    setSelectedLineage(lin);
    setSelectedSub(lin.subs[0]); // Reset sub-lineage when main changes
  };

  const rollDestiny = () => {
    const shadows = selectedClass.shadows;
    const randomShadow = shadows[Math.floor(Math.random() * shadows.length)];
    setRolledShadow(randomShadow);
  };

  const handleForge = () => {
    if (playerCoins < forgeCost) {
      alert(`Insufficient funds. The Character Forge requires ${forgeCost}c.`);
      return;
    }
    if (!rolledShadow) {
      alert("You must roll your Destiny (Shadow Trait) before forging.");
      return;
    }
    alert(`Character Forged! Deducting ${forgeCost}c. Welcome to the Hollow Realm, ${characterName}.`);
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-amber-900 shadow-2xl font-sans text-zinc-300 max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-2 border-amber-600 pb-4">
        <div>
          <h1 className="text-3xl font-black text-amber-500 uppercase tracking-widest">The Character Forge</h1>
          <p className="text-sm text-zinc-400 mt-1">Cost: 1,000c ($13 PayPal) to spawn.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500 uppercase">Player Bank</p>
          <p className={`text-xl font-black ${playerCoins >= forgeCost ? 'text-green-500' : 'text-red-500'}`}>
            {playerCoins.toLocaleString()}c
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: SELECTIONS */}
        <div className="col-span-2 space-y-6">
          
          {/* Name Input */}
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <label className="block text-xs text-amber-500 font-bold uppercase mb-2">Character Name</label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded p-2 text-white font-bold"
            />
          </div>

          {/* Class Selection */}
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <h2 className="text-sm font-bold text-amber-500 uppercase border-b border-zinc-800 pb-2 mb-3">1. Select Class</h2>
            <div className="grid grid-cols-3 gap-2">
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => { setSelectedClass(cls); setRolledShadow(null); }}
                  className={`p-2 text-sm font-bold rounded border transition-colors ${
                    selectedClass.id === cls.id ? 'bg-amber-600 text-black border-amber-400' : 'bg-black text-zinc-400 border-zinc-700 hover:border-amber-700'
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lineage Selection */}
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <h2 className="text-sm font-bold text-amber-500 uppercase border-b border-zinc-800 pb-2 mb-3">2. Select Bloodline & Sub-Lineage</h2>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {lineages.map(lin => (
                <button
                  key={lin.id}
                  onClick={() => handleLineageSelect(lin)}
                  className={`p-2 text-xs font-bold rounded border transition-colors ${
                    selectedLineage.id === lin.id ? 'bg-blue-900 text-blue-100 border-blue-500' : 'bg-black text-zinc-400 border-zinc-700 hover:border-blue-700'
                  }`}
                >
                  {lin.name}
                </button>
              ))}
            </div>

            <div className="bg-black p-3 rounded border border-zinc-800 flex gap-4">
              {selectedLineage.subs.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSub(sub)}
                  className={`flex-1 p-2 text-xs font-bold rounded border transition-colors ${
                    selectedSub.name === sub.name ? 'bg-purple-900 text-purple-100 border-purple-500' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-purple-700'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {/* Destiny Roll */}
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-amber-500 uppercase">3. The Destiny Roll</h2>
              <p className="text-xs text-zinc-400">Determines your Shadow Trait.</p>
            </div>
            <button
              onClick={rollDestiny}
              className="bg-amber-700 hover:bg-amber-600 text-white font-black px-6 py-2 rounded uppercase tracking-wider transition-colors"
            >
              Roll d20
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: THE CHARACTER SHEET */}
        <div className="col-span-1 bg-black border-2 border-zinc-700 rounded-lg p-4 flex flex-col">
          
          <div className="text-center mb-4 border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-black text-white">{characterName}</h2>
            <p className="text-sm text-amber-500 font-bold">{selectedClass.name} | {selectedSub.name}</p>
          </div>

          {/* Core Resources */}
          <div className="flex justify-between text-center mb-6">
            <div className="bg-zinc-900 p-2 rounded flex-1 mr-2 border border-zinc-800">
              <span className="block text-xs text-zinc-500 uppercase">Max HP</span>
              <span className="text-2xl font-black text-green-500">{selectedClass.hp}</span>
            </div>
            <div className="bg-zinc-900 p-2 rounded flex-1 ml-2 border border-zinc-800">
              <span className="block text-xs text-zinc-500 uppercase">Inv Cap</span>
              <span className="text-2xl font-black text-white">{selectedClass.inv}</span>
            </div>
          </div>

          {/* Final Calculated Stats */}
          <div className="mb-6 flex-1">
            <h3 className="text-xs font-bold text-zinc-500 uppercase border-b border-zinc-800 pb-1 mb-3">Calculated Base Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(finalStats).map(stat => (
                <div key={stat} className="flex justify-between items-center bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400">{stat}</span>
                  <span className={`text-sm font-black ${finalStats[stat] >= 10 ? 'text-amber-400' : 'text-white'}`}>
                    {finalStats[stat]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 mt-2 text-center italic">Includes Lineage & Sub-Lineage modifiers. Hard Cap: 15.</p>
          </div>

          {/* Shadow Trait Display */}
          <div className="bg-red-950/20 border border-red-900/50 p-3 rounded mb-6 min-h-[80px]">
            <span className="block text-[10px] text-red-500 font-bold uppercase mb-1">Shadow Trait</span>
            <span className="text-sm text-red-200 font-medium">
              {rolledShadow ? rolledShadow : "Waiting for Destiny Roll..."}
            </span>
          </div>

          {/* Final Forge Action */}
          <button
            onClick={handleForge}
            disabled={!rolledShadow || playerCoins < forgeCost}
            className="w-full bg-green-700 hover:bg-green-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black py-4 rounded uppercase tracking-widest transition-colors"
          >
            Spawn Character (1,000c)
          </button>
        </div>

      </div>
    </div>
  );
}
