import React from 'react';

export default function HQUpgradesTab() {
  // --- 1. GLOBAL BASE UPGRADES ---
  const globalUpgrades = [
    { 
      name: "The Vault", 
      tiers: [
        [span_10](start_span){ level: "Lv. 1", cost: "Free", paypal: "$0", desc: "20 item limit.[span_10](end_span)" },
        { level: "Lv. 2", cost: "5,000c", paypal: "$65", desc: "50 item limit. [span_11](start_span)Organizes items.[span_11](end_span)" },
        { level: "Lv. 3", cost: "15,000c", paypal: "$195", desc: "100 item limit. [span_12](start_span)Item condition degrades significantly slower.[span_12](end_span)" }
      ] 
    },
    { 
      name: "The Barracks", 
      tiers: [
        { level: "Lv. 1", cost: "3,000c", paypal: "$39", desc: "2 guards. [span_13](start_span)Base defends successfully on a 12+.[span_13](end_span)" },
        { level: "Lv. 2", cost: "8,000c", paypal: "$104", desc: "4 guards. [span_14](start_span)Defense roll reduced to 9+.[span_14](end_span)" },
        { level: "Lv. 3", cost: "20,000c", paypal: "$260", desc: "6 guards. [span_15](start_span)Attackers need a 14+ to breach.[span_15](end_span)" }
      ] 
    },
    { 
      name: "The Forge", 
      tiers: [
        { level: "Lv. [span_16](start_span)1", cost: "4,000c", paypal: "$52", desc: "Unlocks basic repairs (500c / $7 PayPal per weapon).[span_16](end_span)" },
        { level: "Lv. [span_17](start_span)2", cost: "10,000c", paypal: "$130", desc: "Unlocks full repairs and Common enchantment socketing.[span_17](end_span)" },
        { level: "Lv. [span_18](start_span)3", cost: "25,000c", paypal: "$325", desc: "Unlocks Rare and Legendary enchantment socketing.[span_18](end_span)" }
      ] 
    },
    { 
      name: "The Infirmary", 
      tiers: [
        { level: "Lv. [span_19](start_span)1", cost: "3,000c", paypal: "$39", desc: "Restoring here heals 3 HP.[span_19](end_span)" },
        { level: "Lv. 2", cost: "8,000c", paypal: "$104", desc: "Full HP restore. [span_20](start_span)Cures standard curses.[span_20](end_span)" },
        { level: "Lv. [span_21](start_span)3", cost: "18,000c", paypal: "$234", desc: "Full recovery PLUS +1 to all rolls in your next session.[span_21](end_span)" }
      ] 
    },
    { 
      name: "The Watchtower", 
      tiers: [
        { level: "Lv. [span_22](start_span)1", cost: "4,000c", paypal: "$52", desc: "1 session warning for Base Sieges.[span_22](end_span)" },
        { level: "Lv. 2", cost: "10,000c", paypal: "$130", desc: "2 session warning. [span_23](start_span)Reveals exactly who is attacking.[span_23](end_span)" },
        { level: "Lv. 3", cost: "22,000c", paypal: "$286", desc: "Full intel. [span_24](start_span)Squad can actively remove one encounter from the incoming raid.[span_24](end_span)" }
      ] 
    }
  ];

  // --- 2. PERSONAL QUARTERS UPGRADES ---
  const personalQuarters = [
    { 
      name: "The Bunk", 
      tiers: [
        { level: "Lv. [span_25](start_span)1", cost: "2,000c", paypal: "$26", desc: "+2 Temp HP after a rest.[span_25](end_span)" },
        { level: "Lv. [span_26](start_span)2", cost: "5,000c", paypal: "$65", desc: "+5 Temp HP.[span_26](end_span)" },
        { level: "Lv. [span_27](start_span)3", cost: "12,000c", paypal: "$156", desc: "+10 Temp HP AND Status Immunity for your first combat.[span_27](end_span)" }
      ] 
    },
    { 
      name: "The Lockbox", 
      tiers: [
        { level: "Lv. [span_28](start_span)1", cost: "3,000c", paypal: "$39", desc: "25% chance to block a Box Battle item theft.[span_28](end_span)" },
        { level: "Lv. [span_29](start_span)2", cost: "8,000c", paypal: "$104", desc: "60% chance to block theft.[span_29](end_span)" },
        { level: "Lv. 3", cost: "20,000c", paypal: "$260", desc: "100% Void-Sealed. [span_30](start_span)Items can NEVER be stolen.[span_30](end_span)" }
      ] 
    },
    { 
      name: "The Hearth", 
      tiers: [
        { level: "Lv. [span_31](start_span)1", cost: "2,500c", paypal: "$33", desc: "Access to basic personal crafting.[span_31](end_span)" },
        { level: "Lv. [span_32](start_span)2", cost: "6,000c", paypal: "$78", desc: "Allies resting here get +1 to their first roll.[span_32](end_span)" },
        { level: "Lv. 3", cost: "15,000c", paypal: "$195", desc: "Host a Feast. [span_33](start_span)Entire squad gets +1 to ALL stats next session.[span_33](end_span)" }
      ] 
    }
  ];

  // --- 3. BASE RESIDENTS (NPC HIRES) ---
  const residents = [
    [span_34](start_span)// TIER 1[span_34](end_span)
    [span_35](start_span){ name: "Guard", cost: "500c", paypal: "$7", tier: "Tier 1", desc: "Meat shields. They give +1 Base Defense.[span_35](end_span)" },
    [span_36](start_span){ name: "Scholar", cost: "1,000c", paypal: "$13", tier: "Tier 1", desc: "Auto-identifies Vault items and reveals 1 Boss weakness per arc.[span_36](end_span)" },
    [span_37](start_span)// TIER 2[span_37](end_span)
    [span_38](start_span){ name: "Smith", cost: "1,500c", paypal: "$20", tier: "Tier 2", desc: "Reduces Forge repair costs by 20%.[span_38](end_span)" },
    [span_39](start_span){ name: "Healer", cost: "1,500c", paypal: "$20", tier: "Tier 2", desc: "Boosts Infirmary healing by +2 HP and identifies Void Infections for free.[span_39](end_span)" },
    { name: "Bard", cost: "2,000c", paypal: "$26", tier: "Tier 2", desc: "Squad gets +1 to first roll after resting. [span_40](start_span)Prevents 'Fear' status in raids.[span_40](end_span)" },
    [span_41](start_span)// TIER 3[span_41](end_span)
    [span_42](start_span){ name: "Merchant", cost: "2,500c", paypal: "$33", tier: "Tier 3", desc: "Prints money (100c base income per session) and cuts travel time in half.[span_42](end_span)" },
    [span_43](start_span){ name: "Informant", cost: "3,000c", paypal: "$39", tier: "Tier 3", desc: "Drops a Boss's DC by -2 for a session and reveals their exact Phase HP.[span_43](end_span)" },
    [span_44](start_span){ name: "Smuggler", cost: "3,500c", paypal: "$46", tier: "Tier 3", desc: "Brings 1 Rare item per session and can sell Cursed items at full value.[span_44](end_span)" }
  ];

  return (
    <div className="space-y-10 animate-fadeIn font-sans max-w-7xl mx-auto text-zinc-300">
      
      {/* --- GLOBAL BASE UPGRADES --- */}
      <section>
        <div className="border-b-2 border-amber-600 pb-2 mb-6">
          <h2 className="text-3xl font-black text-amber-500 tracking-widest uppercase">Moon Squad HQ: Global Upgrades</h2>
          [span_45](start_span)<p className="text-sm text-zinc-400 mt-1">Shared base facilities funded by the squad.[span_45](end_span)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {globalUpgrades.map((upg, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
              <h3 className="bg-zinc-900 border-b border-zinc-800 p-3 font-black text-white text-center tracking-widest uppercase">{upg.name}</h3>
              <div className="p-4 space-y-4 flex-1">
                {upg.tiers.map((t, idx) => (
                  <div key={idx} className="border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-amber-500 text-sm">{t.level}</span>
                      <div className="text-right">
                        <span className="block text-green-500 font-black text-sm">{t.cost}</span>
                        <span className="block text-green-700 font-bold text-[10px] uppercase">{t.paypal} PayPal</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PERSONAL QUARTERS --- */}
      <section>
        <div className="border-b-2 border-amber-600 pb-2 mb-6 mt-10">
          <h2 className="text-3xl font-black text-amber-500 tracking-widest uppercase">Bunkhouse: Personal Quarters</h2>
          <p className="text-sm text-zinc-400 mt-1">Individual upgrades. [span_46](start_span)Essential for PvP survival and theft protection.[span_46](end_span)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personalQuarters.map((upg, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
              <h3 className="bg-zinc-900 border-b border-zinc-800 p-3 font-black text-white text-center tracking-widest uppercase">{upg.name}</h3>
              <div className="p-4 space-y-4 flex-1">
                {upg.tiers.map((t, idx) => (
                  <div key={idx} className="border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-amber-500 text-sm">{t.level}</span>
                      <div className="text-right">
                        <span className="block text-green-500 font-black text-sm">{t.cost}</span>
                        <span className="block text-green-700 font-bold text-[10px] uppercase">{t.paypal} PayPal</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BASE RESIDENTS (NPCs) --- */}
      <section>
        <div className="border-b-2 border-amber-600 pb-2 mb-6 mt-10">
          <h2 className="text-3xl font-black text-amber-500 tracking-widest uppercase">Base Residents Roster</h2>
          [span_47](start_span)<p className="text-sm text-zinc-400 mt-1">Hireable NPCs that populate the base and provide permanent passive buffs.[span_47](end_span)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {residents.map((res, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg shadow-xl flex flex-col justify-between group hover:border-amber-700 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <h3 className="font-black text-lg text-white group-hover:text-amber-500 transition-colors">{res.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest ${
                    res.tier === 'Tier 1' ? 'bg-zinc-800 text-zinc-400' :
                    res.tier === 'Tier 2' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-purple-900/30 text-purple-400'
                  }`}>
                    {res.tier}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{res.desc}</p>
              </div>
              <div className="flex justify-between items-end pt-3 border-t border-zinc-800/50">
                <button className="bg-zinc-900 hover:bg-amber-600 hover:text-black text-amber-500 border border-amber-900/50 text-[10px] font-bold py-1.5 px-3 rounded uppercase tracking-widest transition-colors">
                  Hire
                </button>
                <div className="text-right">
                  <span className="block text-green-500 font-black text-sm">{res.cost}</span>
                  <span className="block text-green-700 font-bold text-[10px] uppercase">{res.paypal} PayPal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
