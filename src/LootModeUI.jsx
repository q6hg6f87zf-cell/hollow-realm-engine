import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { Sparkles, Box, AlertTriangle, Skull } from 'lucide-react';

export default function LootModeUI() {
  const { gmCoins, setGmCoins } = useHollowRealm();
  const [isLooting, setIsLooting] = useState(false);
  const [lastLoot, setLastLoot] = useState(null);

  // --- THE FULL LOOT DATABASE (Zero shortcuts, zero junk) ---
  const lootTiers = [
    { 
      id: 'common', 
      name: "Common Crate", 
      cost: 100, 
      color: "emerald",
      items: ["Aether Bandage", "Rusty Shiv", "Dried Void-Moss", "50c Pouch", "Whetstone", "Cracked Lens", "Frayed Rope"]
    },
    { 
      id: 'rare', 
      name: "Rare Cache", 
      cost: 500, 
      color: "blue",
      items: ["Iron-Warden Shield", "Ember Rune", "Miracle Draught", "250c Satchel", "Void-Glass Lantern", "Silver-Tongue Charm", "Sapper-Charge"]
    },
    { 
      id: 'legendary', 
      name: "Void-Touched Coffer", 
      cost: 2000, 
      color: "purple",
      items: ["Hollow-Reforge Core", "Garrison-Armor", "Aether-Pulse Ring", "1000c Chest", "Core of the Sink", "Resurrection-Link", "Prism-Shard"]
    }
  ];

  const handleLootRoll = (tier) => {
    if (gmCoins < tier.cost) {
      alert("GM TREASURY DEPLETED: Cannot generate loot drop.");
      return;
    }
    
    setIsLooting(true);
    // TikTok-style "Hype" delay for stream suspense
    setTimeout(() => {
      const rolledItem = tier.items[Math.floor(Math.random() * tier.items.length)];
      setGmCoins(prev => prev - tier.cost);
      setLastLoot({ item: rolledItem, tier: tier.name, color: tier.color });
      setIsLooting(false);
    }, 1200);
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-emerald-900 shadow-2xl text-zinc-300 font-sans animate-fadeIn">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center border-b-2 border-emerald-600 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
            <Box size={24} /> Loot Engine
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1 tracking-tighter">TikTok LIVE Protocol v1.2</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-500 uppercase block font-bold">GM Treasury Balance</span>
          <span className="text-xl font-black text-emerald-400 font-mono">{gmCoins.toLocaleString()}c</span>
        </div>
      </div>

      {/* DYNAMIC DROP DISPLAY */}
      <div className="mb-8 min-h-[100px] flex items-center justify-center">
        {lastLoot ? (
          <div className={`w-full bg-zinc-900 border-2 border-${lastLoot.color}-500/50 p-5 rounded-lg animate-bounce flex justify-between items-center shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
            <div>
              <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">{lastLoot.tier} ACQUIRED</p>
              <h3 className="text-2xl font-black text-white drop-shadow-md">{lastLoot.item}</h3>
            </div>
            <Sparkles className={`text-${lastLoot.color}-400 animate-pulse`} size={40} />
          </div>
        ) : (
          <div className="w-full border-2 border-dashed border-zinc-800 p-6 rounded-lg text-center">
            <p className="text-xs text-zinc-600 italic uppercase tracking-widest animate-pulse">Awaiting Coin Injection...</p>
          </div>
        )}
      </div>

      {/* LOOT SELECTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lootTiers.map((tier) => (
          <div key={tier.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col group hover:border-zinc-600 transition-all">
            <div className={`bg-${tier.color}-900/20 p-3 border-b border-zinc-800 text-center`}>
              <h3 className={`font-black uppercase tracking-widest text-sm text-${tier.color}-400`}>{tier.name}</h3>
            </div>
            
            <div className="p-4 flex-1 flex flex-col justify-between">
              <ul className="space-y-2 mb-6">
                {tier.items.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="text-[10px] text-zinc-400 flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full bg-${tier.color}-500 shadow-[0_0_5px_#10b981]`} /> {item}
                  </li>
                ))}
                <li className="text-[10px] text-zinc-600 italic">+ more potential artifacts</li>
              </ul>

              <button 
                onClick={() => handleLootRoll(tier)}
                disabled={isLooting || gmCoins < tier.cost}
                className={`w-full py-3 rounded font-black uppercase tracking-widest text-xs transition-all ${
                  isLooting ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : `bg-${tier.color}-700 hover:bg-${tier.color}-600 text-white shadow-lg active:scale-95`
                }`}
              >
                {isLooting ? "Rolling Odds..." : `Generate (${tier.cost}c)`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SYSTEM MECHANICS FOOTER */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-950/20 border border-amber-900/40 p-3 rounded flex items-center gap-3">
          <AlertTriangle className="text-amber-500" size={20} />
          <p className="text-[10px] text-amber-500 leading-tight font-bold uppercase">
            Void-Infection risk increases with Legendary Drops. Verify status in Systems HUD.
          </p>
        </div>
        <div className="bg-red-950/20 border border-red-900/40 p-3 rounded flex items-center gap-3">
          <Skull className="text-red-500" size={20} />
          <p className="text-[10px] text-red-500 leading-tight font-bold uppercase tracking-tighter">
            Cursed items require a Scholar NPC or 15+ WIS roll to unequip safely.
          </p>
        </div>
      </div>
    </div>
  );
}
