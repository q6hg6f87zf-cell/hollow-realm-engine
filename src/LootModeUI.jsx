import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { Sparkles, Box, AlertTriangle, Skull } from 'lucide-react';

export default function LootModeUI() {
  const { gmCoins, setGmCoins, squad } = useHollowRealm();
  const [isLooting, setIsLooting] = useState(false);
  const [lastLoot, setLastLoot] = useState(null);

  // --- THE FULL LOOT DATABASE (Scrubbed of PDF tags) ---
  const lootTiers = [
    { 
      id: 'common', name: "Common Crate", cost: 100, color: "emerald",
      items: ["Aether Bandage", "Rusty Shiv", "Dried Void-Moss", "50c Pouch", "Whetstone"]
    },
    { 
      id: 'rare', name: "Rare Cache", cost: 500, color: "blue",
      items: ["Iron-Warden Shield", "Ember Rune", "Miracle Draught", "250c Satchel", "Void-Glass Lantern"]
    },
    { 
      id: 'legendary', name: "Void-Touched Coffer", cost: 2000, color: "purple",
      items: ["Hollow-Reforge Core", "Garrison-Armor", "Aether-Pulse Ring", "1000c Chest", "Core of the Sink"]
    }
  ];

  const handleLootRoll = (tier) => {
    if (gmCoins < tier.cost) return alert("GM BANK DEPLETED.");
    
    setIsLooting(true);
    // Simulate the TikTok "Hype" delay
    setTimeout(() => {
      const rolledItem = tier.items[Math.floor(Math.random() * tier.items.length)];
      setGmCoins(prev => prev - tier.cost);
      setLastLoot({ item: rolledItem, tier: tier.name, color: tier.color });
      setIsLooting(false);
    }, 1200);
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-emerald-900 shadow-2xl text-zinc-300 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-2 border-emerald-600 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
            <Box size={24} /> Loot Engine
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">TikTok LIVE Generation Mode</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-500 uppercase block">GM Treasury</span>
          <span className="text-xl font-black text-emerald-400">{gmCoins.toLocaleString()}c</span>
        </div>
      </div>

      {/* RECENT DROP NOTIFICATION */}
      <div className="mb-8 min-h-[80px]">
        {lastLoot ? (
          <div className={`bg-zinc-900 border-2 border-${lastLoot.color}-500/50 p-4 rounded-lg animate-bounce flex justify-between items-center`}>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500">{lastLoot.tier} DROP</p>
              <h3 className="text-xl font-black text-white">{lastLoot.item}</h3>
            </div>
            <Sparkles className={`text-${lastLoot.color}-400`} size={32} />
          </div>
        ) : (
          <div className="border-2 border-dashed border-zinc-800 p-4 rounded-lg text-center">
            <p className="text-xs text-zinc-600 italic uppercase">Awaiting GM Coin Drop...</p>
          </div>
        )}
      </div>

      {/* LOOT TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lootTiers.map((tier) => (
          <div key={tier.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col">
            <div className={`bg-${tier.color}-900/20 p-3 border-b border-zinc-800 text-center`}>
              <h3 className={`font-black uppercase tracking-widest text-sm text-${tier.color}-400`}>{tier.name}</h3>
            </div>
            
            <div className="p-4 flex-1">
              <ul className="space-y-2 mb-6">
                {tier.items.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="text-[10px] text-zinc-500 flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full bg-${tier.color}-500`} /> {item}
                  </li>
                ))}
                <li className="text-[10px] text-zinc-600 italic">+ more potential drops...</li>
              </ul>

              <button 
                onClick={() => handleLootRoll(tier)}
                disabled={isLooting || gmCoins < tier.cost}
                className={`w-full py-3 rounded font-black uppercase tracking-tighter text-xs transition-all ${
                  isLooting ? 'bg-zinc-800 text-zinc-600' : `bg-${tier.color}-600 hover:bg-${tier.color}-500 text-white shadow-lg`
                }`}
              >
                {isLooting ? "Generating..." : `Roll ${tier.cost}c`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SYSTEM WARNINGS */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-amber-950/20 border border-amber-900/50 p-3 rounded flex items-center gap-3">
          <AlertTriangle className="text-amber-600" size={16} />
          <p className="text-[9px] text-amber-500 leading-tight font-bold uppercase">
            Void-Infection risk increases with Legendary Drops.
          </p>
        </div>
        <div className="bg-red-950/20 border border-red-900/50 p-3 rounded flex items-center gap-3">
          <Skull className="text-red-600" size={16} />
          <p className="text-[9px] text-red-500 leading-tight font-bold uppercase">
            Cursed items cannot be unequipped without a Scholar NPC.
          </p>
        </div>
      </div>
    </div>
  );
}
