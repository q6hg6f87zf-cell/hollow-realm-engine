import React, { useState } from 'react';
import { triggerHaptic } from './App'; // Brings in that physical click we built!

export default function ForgeSocketingUI({ playerCoins, playerOre, forgeLevel = 1 }) {
  const [selectedTier, setSelectedTier] = useState('Common');
  const [activeEnchantments, setActiveEnchantments] = useState([]);

  // --- GM OVERRIDE: THE RULE OF THREE ---
  // This lives inside the component so it can interact with your UI
  const handleSocketUpgrade = (weapon, modifier) => {
    if (weapon.sockets && weapon.sockets.length >= 3) {
      triggerHaptic('calamity'); // Warns you that the limit is hit
      alert("FORGE ERROR: The Rule of Three strictly prohibits more than 3 modifiers on a single weapon.");
      return false; // Blocks the upgrade
    }
    // ... proceed with socketing the item ...
  };

  return (

  // The Complete 14-Item Enchantment Database
  const enchantments = [
    // COMMON - Requires Forge Lv. [span_3](start_span)2
    { id: 1, name: "Ember Rune", tier: "Common", cost: 500, ore: 0, effect: "Deals 1d4 Fire over 2 rounds. 30% hazard risk in Forest.[span_3](end_span)" },
    [span_4](start_span){ id: 2, name: "Frost Rune", tier: "Common", cost: 500, ore: 0, effect: "Reduces target SPD by 2 for one round.[span_4](end_span)" },
    { id: 3, name: "Soot-Grind", tier: "Common", cost: 500, ore: 0, effect: "+1 DMG to environmental objects and barricades." },
    { id: 4, name: "Whetstone Edge", tier: "Common", cost: 500, ore: 0, effect: "+1 to ATK rolls for the next 5 strikes." },
    
    [span_5](start_span)// RARE - Requires Forge Lv. 3[span_5](end_span)
    [span_6](start_span){ id: 5, name: "Bleed-Vein", tier: "Rare", cost: 3000, ore: 0, effect: "Slashing weapons deal flat +2 DMG to 'Bleeding' targets.[span_6](end_span)" },
    [span_7](start_span){ id: 6, name: "Armor-Breaker", tier: "Rare", cost: 3000, ore: 0, effect: "Blunt weapons permanently shatter 1 point of Enemy DEF on 15+.[span_7](end_span)" },
    [span_8](start_span){ id: 7, name: "Void-Resonance", tier: "Rare", cost: 3000, ore: 0, effect: "Bypasses ALL physical armor; strikes directly at Max HP.[span_8](end_span)" },
    [span_9](start_span){ id: 8, name: "Stealth-Wrap", tier: "Rare", cost: 3000, ore: 0, effect: "Piercing damage is doubled from Stealth.[span_9](end_span)" },
    [span_10](start_span){ id: 9, name: "Light-Eater", tier: "Rare", cost: 3000, ore: 0, effect: "Removes Disadvantage for ranged attacks in total darkness.[span_10](end_span)" },
    
    [span_11](start_span)// LEGENDARY/MYTHIC CORES - Requires Forge Lv. 3[span_11](end_span)
    [span_12](start_span){ id: 10, name: "Hollow-Reforge", tier: "Legendary", cost: 3000, ore: 2, effect: "Consumes 2 Ore to make weapon permanently indestructible.[span_12](end_span)" },
    [span_13](start_span){ id: 11, name: "Garrison-Core", tier: "Legendary", cost: 15000, ore: 0, effect: "Grants biological immunity to the 'Fear' status.[span_13](end_span)" },
    [span_14](start_span){ id: 12, name: "Core of the Sink", tier: "Legendary", cost: 15000, ore: 0, effect: "Grants Amphibious trait; zero penalties submerged.[span_14](end_span)" },
    [span_15](start_span){ id: 13, name: "Aether-Pulse", tier: "Legendary", cost: 15000, ore: 0, effect: "10% chance to 'glitch' and take 0 damage when hit.[span_15](end_span)" },
    [span_16](start_span){ id: 14, name: "Resurrection-Link", tier: "Legendary", cost: 25000, ore: 0, effect: "Prevents -2 Max HP penalty upon next Permanent Death resurrection.[span_16](end_span)" }
  ];

  const handleApply = (enc) => {
    [span_17](start_span)// 1. Check The Rule of Three[span_17](end_span)
    if (activeEnchantments.length >= 3) {
      [span_18](start_span)alert("RULE OF THREE: You may only stack a maximum of THREE positive modifiers.[span_18](end_span)");
      return;
    }
    
    [span_19](start_span)// 2. Check Forge Level Tier Gating[span_19](end_span)
    if (forgeLevel < (enc.tier === 'Common' ? 2 : 3)) {
      alert(`FORGE LEVEL INSUFFICIENT. ${enc.tier} sockets require Forge Lv. ${enc.tier === 'Common' ? 2 : 3}.`);
      return;
    }

    [span_20](start_span)// 3. Check Economy (Coins & Ore)[span_20](end_span)
    if (playerCoins < enc.cost || playerOre < enc.ore) {
      alert(`INSUFFICIENT FUNDS. Requires: ${enc.cost}c and ${enc.ore} Raw Hollow Ore.`);
      return;
    }

    // Apply Enchantment
    setActiveEnchantments([...activeEnchantments, enc]);
  };

  const removeEnchantment = (id) => {
    setActiveEnchantments(activeEnchantments.filter(e => e.id !== id));
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-amber-900 shadow-2xl font-sans">
      {/* HEADER & ACTIVE SLOTS */}
      <header className="mb-6">
        <div className="flex justify-between items-end border-b border-amber-900 pb-2 mb-4">
          <h2 className="text-xl font-black text-amber-500 uppercase tracking-widest">Forge Sockets (Lv. {forgeLevel})</h2>
          <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
            Rule of Three: <span className={activeEnchantments.length === 3 ? "text-red-500" : "text-amber-500"}>{activeEnchantments.length}/3</span>
          </div>
        </div>
        
        {/* Active Enchantments Display */}
        <div className="flex gap-2 min-h-[40px]">
          {activeEnchantments.map(enc => (
            <div key={enc.id} onClick={() => removeEnchantment(enc.id)} className="text-xs bg-amber-900/30 border border-amber-700 text-amber-500 px-3 py-1 rounded cursor-pointer hover:bg-red-900/50 hover:border-red-500 hover:text-red-500 transition-colors" title="Click to remove">
              {enc.name} ✕
            </div>
          ))}
          {activeEnchantments.length === 0 && <span className="text-xs text-zinc-600 italic">No active socket modifiers.</span>}
        </div>
      </header>

      {/* TIER NAVIGATION */}
      <div className="flex gap-2 mb-4">
        {['Common', 'Rare', 'Legendary'].map(t => (
          <button 
            key={t} 
            onClick={() => setSelectedTier(t)}
            className={`flex-1 py-2 text-xs uppercase tracking-widest font-bold rounded border transition-colors ${
              selectedTier === t ? 'bg-amber-600 text-black border-amber-500' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ENCHANTMENT LIST */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-zinc-950">
        {enchantments.filter(e => e.tier === selectedTier).map(e => (
          <div key={e.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded flex justify-between items-center group hover:border-amber-700 transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="font-bold text-white text-sm group-hover:text-amber-500 transition-colors">{e.name}</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{e.effect}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs font-black text-amber-500">{e.cost.toLocaleString()}c</span>
              {e.ore > 0 && <span className="text-[10px] font-bold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded">+{e.ore} ORE</span>}
              <button 
                onClick={() => handleApply(e)}
                disabled={activeEnchantments.length >= 3}
                className="bg-amber-900 hover:bg-amber-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-[10px] px-4 py-2 rounded text-white font-bold uppercase tracking-widest transition-colors mt-1"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
