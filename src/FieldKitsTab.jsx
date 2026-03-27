import React from 'react';

export default function FieldKitsTab() {
  const kits = [
    { cat: "Medical & Recovery", items: [
      { name: "Aether Bandages", cost: "250c", desc: "Cures Bleeding, Restores 3 HP. [cite: 630-633]" },
      { name: "Miracle Draught", cost: "2,500c", desc: "Full HP Restore. [cite_start]Manual Defibrillator for 0 HP players. [cite: 634-637]" },
      { name: "Adrenaline Salts", cost: "400c", desc: "Grants +2 SPD/Initiative for 3 rounds. [cite_start]Causes Exhaustion after. [cite: 638-641]" }
    ]},
    { cat: "Environmental & Utility", items: [
      { name: "Holy Salt", cost: "500c", desc: "Creates 10ft Sanctified Circle blocking Void entities. [cite: 643-646]" },
      { name: "Deep-Blast Charge", cost: "800c", desc: "Deals 3d10 damage in 20ft radius. [cite_start]Cave-in risk. [cite: 648-652]" },
      { name: "Void-Glass Lantern", cost: "1,200c", desc: "Reveals hidden geometry, removes dark penalties. [cite: 653-655]" }
    ]},
    { cat: "The Volatile & Cursed", items: [
      { name: "Pure Void-Essence", cost: "2,000c", desc: "Restores Full HP/Powers. [cite_start]40% chance of Tier 2 Curse. [cite: 657-663]" },
      { name: "Dried Void-Moss", cost: "150c", desc: "Restores 1 HP, +1 WIS. [cite_start]GM whispers fake info to player. [cite: 664-666]" }
    ]}
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-red-900/20 border border-red-900 p-4 rounded text-red-400 mb-6">
        <h4 className="font-bold">The Pack-Mule Rules</h4>
        <p className="text-sm">Standard pouches hold 5 small consumables. Overloading Class Inventory applies permanent -2 SPD. [cite: 671-673]</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {kits.map((category, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
            <h3 className="bg-zinc-950 p-4 font-bold text-amber-500 uppercase border-b border-zinc-800">{category.cat}</h3>
            <div className="p-4 space-y-4">
              {category.items.map((item, i) => (
                <div key={i} className="border-b border-zinc-800/50 pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">{item.name}</span>
                    <span className="text-amber-500 text-xs font-bold">{item.cost}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
