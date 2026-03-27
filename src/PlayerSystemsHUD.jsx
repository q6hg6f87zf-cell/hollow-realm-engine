
import React, { useState } from 'react';

import { useHollowRealm } from './HollowRealmContext';

export default function PlayerSystemsHUD() {
  const [activeTab, setActiveTab] = useState('pvp'); // pvp, infections, companions

const { squad, updatePlayerInfection } = useHollowRealm();

  // --- PVP BOX BATTLE CALCULATOR STATE ---
  const [winnerScore, setWinnerScore] = useState(15000);
  const [loserScore, setLoserScore] = useState(6000);
  const gap = Math.abs(winnerScore - loserScore);

  const getTollConsequence = (coinGap) => {
    [span_2](start_span)if (coinGap >= 45000) return { tier: "OP Control", desc: "Godhood. The winner becomes the GM for a single scene and can narrate whatever permanent reality they want.[span_2](end_span)" };
    if (coinGap >= 20000) return { tier: "Severe Toll", desc: "Absolute ruin. [span_3](start_span)The loser is Permanently Killed OR suffers a combined Curse + Exile + Item Theft.[span_3](end_span)" };
    if (coinGap >= 10000) return { tier: "Major Toll", desc: "Total dominance. [span_4](start_span)The loser is Exiled from their current faction OR forced into servitude as a Servant to the winner.[span_4](end_span)" };
    if (coinGap >= 5000) return { tier: "Moderate Toll", desc: "Blood is drawn. [span_5](start_span)The loser is inflicted with a Curse for 2 sessions OR the winner successfully steals one item from their inventory.[span_5](end_span)" };
    return { tier: "Minor Toll", desc: "The loser is humiliated. [span_6](start_span)They lose their current Class Title or suffer a temporary -1 stat debuff for the next session.[span_6](end_span)" };
  };
  const tollResult = getTollConsequence(gap);

  // --- VOID INFECTION TRACKER STATE ---
 
  const updateInfection = (id, newLevel) => {
    if (newLevel < 0 || newLevel > 3) return;
    setPlayers squad.map(p =>  p.id === id ? { ...p, infection: newLevel } : p));
  };

  const getInfectionData = (level) => {
    switch(level) {
      case 0: return { name: "Clean", color: "text-zinc-500", desc: "No void presence detected." };
      case 1: return { name: "Stage 1: Infected Gear", color: "text-amber-500", desc: "Looted a Void-Touched item. -[span_7](start_span)2 to Primary Stat while holding it.[span_7](end_span)" };
      case 2: return { name: "Stage 2: Assimilation", color: "text-red-500", desc: "Carried for 3 sessions. Curse binds to soul. [span_8](start_span)Dropping item keeps the -2 debuff permanently.[span_8](end_span)" };
      case 3: return { name: "Stage 3: The Overload", color: "text-purple-500", desc: "Acquired second infection while at Stage 2. Drops to 1 HP immediately. [span_9](start_span)Cannot be healed for the remainder of the session.[span_9](end_span)" };
      default: return { name: "Clean", color: "text-zinc-500", desc: "" };
    }
  };

  // --- COMPANION STORE DATA (WITH PAYPAL CONVERSIONS) ---
  const companions = [
    { name: "Void-Hound", cost: "1,000c", paypal: "$13", type: "Base Pet", desc: "Loyal tracker. [span_10](start_span)Grants permanent stat buffs.[span_10](end_span)" },
    { name: "Scavenger Crow", cost: "1,000c", paypal: "$13", type: "Base Pet", desc: "Hoards items. [span_11](start_span)May spite-drop loot if unhappy.[span_11](end_span)" },
    { name: "Clockwork Mule", cost: "1,000c", paypal: "$13", type: "Base Pet", desc: "Increases inventory. [span_12](start_span)Causes 'Grinding Gears' stealth penalty.[span_12](end_span)" }
  ];

  const companionConsumables = [
    [span_13](start_span){ name: "Companion Healthcare", cost: "500c", paypal: "$7", desc: "Restores a companion that fled combat at 0 HP.[span_13](end_span)" },
    [span_14](start_span){ name: "Void-Hound Treat", cost: "100c", paypal: "$2", desc: "Restores 2 HP to a Void-Hound.[span_14](end_span)" },
    [span_15](start_span){ name: "Scavenger Crow Shiny", cost: "100c", paypal: "$2", desc: "Prevents the Crow from 'spite-dropping' an item for 2 sessions.[span_15](end_span)" },
    [span_16](start_span){ name: "Clockwork Oil", cost: "300c", paypal: "$5", desc: "Restores 4 HP and removes 'Grinding Gears' stealth penalty for 1 session.[span_16](end_span)" }
  ];

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-zinc-800 shadow-2xl font-sans text-zinc-300 max-w-4xl mx-auto flex flex-col gap-6">
      
      {/* HEADER & NAV */}
      <div className="border-b-2 border-zinc-800 pb-4">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Operations & Systems</h1>
        <div className="flex gap-2">
          {['pvp', 'infections', 'companions'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs uppercase tracking-widest font-bold rounded border transition-colors ${
                activeTab === tab ? 'bg-amber-600 text-black border-amber-500' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              {tab === 'pvp' ? 'Box Battle Tolls' : tab === 'infections' ? 'Void Infections' : 'Companions'}
            </button>
          ))}
        </div>
      </div>

      {/* --- TAB 1: PVP BOX BATTLE TOLLS --- */}
      {activeTab === 'pvp' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-red-950/20 border border-red-900 p-4 rounded text-red-400 text-sm">
            [span_17](start_span)<strong>PvP Rule:</strong> It costs a minimum of 500c ($7 PayPal) to initiate a Box Battle[span_17](end_span). [span_18](start_span)The difference in coins dropped dictates the severity of the consequence[span_18](end_span).
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-zinc-900 p-4 rounded border border-zinc-800">
              <label className="block text-xs text-green-500 font-bold uppercase mb-2">Winner's Coin Drop</label>
              <input type="number" value={winnerScore} onChange={(e) => setWinnerScore(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded text-green-400 font-black text-xl mb-4" />
              
              <label className="block text-xs text-red-500 font-bold uppercase mb-2">Loser's Coin Drop</label>
              <input type="number" value={loserScore} onChange={(e) => setLoserScore(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded text-red-400 font-black text-xl" />
            </div>

            <div className="flex-1 bg-black p-6 rounded border-2 border-amber-900 flex flex-col justify-center items-center text-center">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Calculated Coin Gap</p>
              <h2 className="text-4xl font-black text-white mb-4">{gap.toLocaleString()}c</h2>
              <span className="bg-amber-900 text-amber-500 font-bold px-3 py-1 rounded text-sm uppercase tracking-widest mb-3">
                {tollResult.tier}
              </span>
              <p className="text-sm text-zinc-400 italic">"{tollResult.desc}"</p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: VOID INFECTION TRACKER --- */}
      {activeTab === 'infections' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-purple-950/20 border border-purple-900 p-4 rounded text-purple-400 text-sm mb-4">
            <strong>The Parasitic Mechanic:</strong> Infections stack. [span_19](start_span)If a player hits Stage 3, they immediately drop to 1 HP and cannot be healed[span_19](end_span).
          </div>
          
          {players.map(p => {
            const infData = getInfectionData(p.infection);
            return (
              <div key={p.id} className="bg-zinc-900 p-4 rounded border border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-white text-lg">{p.name}</h3>
                  <p className={`text-xs font-black uppercase tracking-widest mt-1 ${infData.color}`}>{infData.name}</p>
                  <p className="text-xs text-zinc-400 mt-2 italic leading-relaxed">{infData.desc}</p>
                </div>
                
                <div className="flex items-center gap-3 bg-black p-2 rounded border border-zinc-800">
                  <button onClick={() => updateInfection(p.id, p.infection - 1)} className="bg-zinc-800 hover:bg-zinc-700 text-white w-8 h-8 rounded font-bold">-</button>
                  <div className="text-xl font-black text-white w-6 text-center">{p.infection}</div>
                  <button onClick={() => updateInfection(p.id, p.infection + 1)} className="bg-purple-900 hover:bg-purple-700 text-white w-8 h-8 rounded font-bold">+</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- TAB 3: COMPANIONS & PETS --- */}
      {activeTab === 'companions' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Base Pets */}
            <div>
              <h2 className="text-sm font-bold text-amber-500 uppercase border-b border-zinc-800 pb-2 mb-3">Adopt A Companion</h2>
              <div className="space-y-3">
                {companions.map((comp, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded flex justify-between items-center group">
                    <div className="pr-4">
                      <h4 className="font-bold text-white text-sm">{comp.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{comp.desc}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-black text-green-500 bg-green-900/20 px-2 py-1 rounded mb-1">{comp.cost}</span>
                      <span className="text-[10px] text-green-600 font-bold uppercase">{comp.paypal} PayPal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consumables & Healthcare */}
            <div>
              <h2 className="text-sm font-bold text-amber-500 uppercase border-b border-zinc-800 pb-2 mb-3">Companion Support & Healthcare</h2>
              <div className="space-y-3">
                {companionConsumables.map((item, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded flex justify-between items-center group">
                    <div className="pr-4">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{item.desc}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-black text-amber-500 bg-amber-900/20 px-2 py-1 rounded mb-1">{item.cost}</span>
                      <span className="text-[10px] text-amber-600 font-bold uppercase">{item.paypal} PayPal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
