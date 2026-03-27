import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';

export default function PlayerSystemsHUD() {
  const [activeTab, setActiveTab] = useState('pvp');
  const { squad, updatePlayerInfection } = useHollowRealm();

  // --- PVP BOX BATTLE CALCULATOR ---
  const [winnerScore, setWinnerScore] = useState(15000);
  const [loserScore, setLoserScore] = useState(6000);
  const gap = Math.abs(winnerScore - loserScore);

  const getTollConsequence = (coinGap) => {
    if (coinGap >= 45000) return { tier: "OP Control", desc: "Godhood. The winner becomes the GM for a single scene and can narrate whatever permanent reality they want." };
    if (coinGap >= 20000) return { tier: "Severe Toll", desc: "Absolute ruin. The loser is Permanently Killed OR suffers a combined Curse + Exile + Item Theft." };
    if (coinGap >= 10000) return { tier: "Major Toll", desc: "Total dominance. The loser is Exiled from their current faction OR forced into servitude." };
    if (coinGap >= 5000) return { tier: "Moderate Toll", desc: "Blood is drawn. The loser is inflicted with a Curse for 2 sessions OR the winner steals one item." };
    return { tier: "Minor Toll", desc: "The loser is humiliated. They lose their current Class Title or suffer a temporary -1 stat debuff." };
  };
  const tollResult = getTollConsequence(gap);

  // --- VOID INFECTION LOGIC ---
  const getInfectionData = (level) => {
    switch(level) {
      case 0: return { name: "Clean", color: "text-zinc-500", desc: "No void presence detected." };
      case 1: return { name: "Stage 1: Infected Gear", color: "text-amber-500", desc: "Looted a Void-Touched item. -2 to Primary Stat while holding it." };
      case 2: return { name: "Stage 2: Assimilation", color: "text-red-500", desc: "Carried for 3 sessions. Curse binds to soul. Debuff is now permanent." };
      case 3: return { name: "Stage 3: The Overload", color: "text-purple-500", desc: "Acquired second infection. Drops to 1 HP immediately. Cannot be healed this session." };
      default: return { name: "Clean", color: "text-zinc-500", desc: "" };
    }
  };

  // --- COMPANION DATA ---
  const companions = [
    { name: "Void-Hound", cost: "1,000c", paypal: "$13", desc: "Loyal tracker. Grants permanent stat buffs." },
    { name: "Scavenger Crow", cost: "1,000c", paypal: "$13", desc: "Hoards items. May spite-drop loot if unhappy." },
    { name: "Clockwork Mule", cost: "1,000c", paypal: "$13", desc: "Increases inventory. Causes 'Grinding Gears' stealth penalty." }
  ];

  const consumables = [
    { name: "Companion Healthcare", cost: "500c", paypal: "$7", desc: "Restores a companion that fled combat at 0 HP." },
    { name: "Void-Hound Treat", cost: "100c", paypal: "$2", desc: "Restores 2 HP to a Void-Hound." },
    { name: "Scavenger Crow Shiny", cost: "100c", paypal: "$2", desc: "Prevents the Crow from 'spite-dropping' for 2 sessions." },
    { name: "Clockwork Oil", cost: "300c", paypal: "$5", desc: "Restores 4 HP and removes 'Grinding Gears' penalty." }
  ];

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-zinc-800 shadow-2xl font-sans text-zinc-300 max-w-4xl mx-auto flex flex-col gap-6">
      
      <div className="border-b-2 border-zinc-800 pb-4">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Operations & Systems</h1>
        <div className="flex gap-2">
          {['pvp', 'infections', 'companions'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded border transition-colors ${activeTab === tab ? 'bg-amber-600 text-black border-amber-400' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}>
              {tab === 'pvp' ? 'Box Battle Tolls' : tab === 'infections' ? 'Void Infections' : 'Companions'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'pvp' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-red-950/20 border border-red-900 p-4 rounded text-red-400 text-xs italic">
            <strong>PvP Rule:</strong> Min 500c ($7 PayPal) to initiate. Coin gap dictates the severity of the consequence.
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-zinc-900 p-4 rounded border border-zinc-800">
              <label className="block text-[10px] text-green-500 font-bold uppercase mb-2">Winner's Drop</label>
              <input type="number" value={winnerScore} onChange={(e) => setWinnerScore(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded text-green-400 font-black text-xl mb-4" />
              <label className="block text-[10px] text-red-500 font-bold uppercase mb-2">Loser's Drop</label>
              <input type="number" value={loserScore} onChange={(e) => setLoserScore(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded text-red-400 font-black text-xl" />
            </div>
            <div className="flex-1 bg-black p-6 rounded border-2 border-amber-900 flex flex-col justify-center items-center text-center shadow-inner">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Gap: {gap.toLocaleString()}c</p>
              <span className="bg-amber-900 text-amber-500 font-bold px-3 py-1 rounded text-sm uppercase tracking-widest mb-3">{tollResult.tier}</span>
              <p className="text-sm text-zinc-400 italic">"{tollResult.desc}"</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'infections' && (
        <div className="space-y-4 animate-fadeIn">
          {squad.map(p => {
            const infData = getInfectionData(p.infection);
            return (
              <div key={p.id} className="bg-zinc-900 p-4 rounded border border-zinc-800 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{p.name}</h3>
                  <p className={`text-xs font-black uppercase tracking-widest mt-1 ${infData.color}`}>{infData.name}</p>
                </div>
                <div className="flex items-center gap-3 bg-black p-2 rounded border border-zinc-800">
                  <button onClick={() => updatePlayerInfection(p.id, Math.max(0, p.infection - 1))} className="bg-zinc-800 text-white w-8 h-8 rounded">-</button>
                  <div className="text-xl font-black text-white w-6 text-center">{p.infection}</div>
                  <button onClick={() => updatePlayerInfection(p.id, Math.min(3, p.infection + 1))} className="bg-purple-900 text-white w-8 h-8 rounded">+</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'companions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-amber-500 uppercase border-b border-zinc-800 pb-2 mb-3">Adopt</h2>
            {companions.map((comp, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded flex justify-between items-center">
                <div className="pr-4">
                  <h4 className="font-bold text-white text-sm">{comp.name}</h4>
                  <p className="text-[10px] text-zinc-500">{comp.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-green-500 block">{comp.cost}</span>
                  <span className="text-[10px] text-green-700 font-bold uppercase">{comp.paypal} PayPal</span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-amber-500 uppercase border-b border-zinc-800 pb-2 mb-3">Support</h2>
            {consumables.map((item, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded flex justify-between items-center">
                <div className="pr-4">
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-[10px] text-zinc-500">{item.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-amber-500 block">{item.cost}</span>
                  <span className="text-[10px] text-amber-700 font-bold uppercase">{item.paypal} PayPal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

