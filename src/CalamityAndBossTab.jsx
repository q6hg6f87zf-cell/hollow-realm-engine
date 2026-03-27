import React from 'react';

export default function CalamityAndBossTab() {
  const calamities = [
    { name: "The Blood Moon", trigger: "Ashen Pack gains +10% Territory[span_21](end_span)", fx: "All beasts gain +2 ATK, +5 SPD. [span_22](start_span)No resting heals. [cite: 779-780]" },
    { name: "The Rift Tear", trigger: "Wizard rolls Nat 1 on Tier 3 spell[span_22](end_span)", fx: "Spells cost 0c, 50% friendly fire. [span_23](start_span)Random teleportation. [cite: 787-788]" },
    { name: "The Void-Frost", trigger: "Null Warden ignored for 3 Arcs[span_23](end_span)", fx: "Lose 1 HP every 10 mins without heat. [span_24](start_span)Armor DEF -2. [cite: 796-797]" },
    { name: "Debtor's Eclipse", trigger: "Library/Garrison hits 80% Wealth[span_24](end_span)", fx: "Movement costs 1c. [span_25](start_span)Combat bypassed by bribes. [cite: 803-804]" }
  ];

 const bosses = [
  { name: "Gravenor", sub: "The Ashen Father", hp: 80, loc: "Dark Enchanted Forest", color: "#ef4444", phases: ["Ph 1: Stalks lowest DEF", "Ph 2: Call of the Pack (Spawns 2d4 Wolves)", "Ph 3: The Shedding (SPD doubles)"] },
  { name: "Valdris", sub: "The Unmourned", hp: 90, loc: "Crumbling Kingdom", color: "#64748b", phases: ["Ph 1: The Audit (Coin Drain)", "Ph 2: Garrison Summon", "Ph 3: Desperation Move"] },
  { name: "Thessaly Vane", sub: "Burned Cartographer", hp: 70, loc: "Underground Caverns", color: "#f59e0b", phases: ["Ph 1: Draws traps on floor", "Ph 2: Remaps room layout", "Ph 3: Reality Deletion (Self-destruct)"] },
  { name: "The Sink", sub: "Maw of the Library", hp: 100, loc: "Sunken Library", color: "#06b6d4", phases: ["Ph 1: The Pull (WIS Save)", "Ph 2: Submerged Combat", "Ph 3: Absolute Silence"] },
  { name: "The Null Warden", sub: "Apex Entity", hp: 150, loc: "The Hollow's Edge", color: "#a855f7", phases: ["Ph 1: Zero Gravity Physics", "Ph 2: The Gaze (Data Corruption)", "Ph 3: Event Horizon (Absorbs magic)"] }
];


  return (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <h2 className="text-2xl font-bold text-amber-500 border-b border-zinc-800 pb-2 mb-4">Global Calamity System[span_37](end_span)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calamities.map((cal, i) => (
            <div key={i} className="bg-zinc-950 border-l-4 border-red-800 p-4 rounded shadow">
              <h3 className="font-bold text-red-500 uppercase">{cal.name}</h3>
              <p className="text-xs text-zinc-500 mb-2">Trigger: {cal.trigger}</p>
              <p className="text-sm text-zinc-300">{cal.fx}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-amber-500 border-b border-zinc-800 pb-2 mb-4">Apex Boss Mechanics[span_38](end_span)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bosses.map((boss, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-white">{boss.name}</h3>
                <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-bold">{boss.hp} HP</span>
              </div>
              <p className="text-xs text-zinc-500 mb-4 uppercase">{boss.loc}</p>
              <div className="space-y-2">
                {boss.phases.map((ph, idx) => (
                  <div key={idx} className="text-sm text-zinc-400 bg-zinc-950 p-2 border border-zinc-800/50 rounded">{ph}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
