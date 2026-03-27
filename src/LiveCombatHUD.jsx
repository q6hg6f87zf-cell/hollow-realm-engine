LiveCombatHUD.jsx

import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';

export default function LiveCombatHUD() {
  // --- STATE: SQUAD DATA ---
 
  const [intelligentBoss, setIntelligentBoss] = useState(true);

const { squad, setSquad } = useHollowRealm();

  // --- 1. THE ACTION MENU (LIVE COSTS & PAYPAL CONVERSIONS) ---
  const actionMenu = [
    { name: "Scout Ahead", cost: 100, paypal: "$2", desc: "Reveals next room before squad commits." },
    { name: "Standard Action", cost: 500, paypal: "$7", desc: "Attack, Defend (+2 DEF), or Search." },
    { name: "Initiate Box Battle", cost: 500, paypal: "$7", desc: "Minimum baseline drop to challenge to PvP." },
    { name: "First Re-Roll", cost: 500, paypal: "$7", desc: "Rolled a Fumble? Try again." },
    { name: "Second Re-Roll", cost: 1500, paypal: "$20", desc: "Forcing a third attempt costs triple." },
    { name: "Signature Skill / Item", cost: 1000, paypal: "$13", desc: "Auto-success or consume high-tier item." },
    { name: "Power Strike / Gift Power", cost: 5000, paypal: "$65", desc: "Major damage on 15+, or Class Gift Power." },
    { name: "Clutch Moment", cost: 10000, paypal: "$130", desc: "Narrative control. Player defines exact action." },
    { name: "EPIC WORLD ACTION", cost: 29999, paypal: "$390", desc: "Changes world narrative entirely." }
  ];

  const handleActionCharge = (action, playerName) => {
    alert(`CHARGING ${action.cost}c (${action.paypal} PayPal) to ${playerName} for: ${action.name}`);
  };

  // --- 2. THE AGGRO INDEX ENGINE ---
  const calculateAggro = () => {
    let target = null;
    let highestThreat = -1;
    let explanation = "";

    squad.forEach(player => {
      let threat = 0;
      let reasons = [];

      // Zero Threat Modifier (Rogue Shadow Step)
      if (player.class === "Rogue" && player.status === "Shadow Step") {
        threat = 0; 
        return; 
      }

      // Priority 2: The Bleeding (Overrides almost everything)
      if (player.hp <= 3) {
        threat += 100;
        reasons.push("The Bleeding");
      }

      // Priority 3: The Healer (If Boss is intelligent)
      if (intelligentBoss && player.class === "Healer" && player.status === "Casting") {
        threat += 80;
        reasons.push("Healer Casting (Intelligent Boss)");
      }

      // Priority 1: The Provoker
      if (player.lastDamage >= 5) {
        threat += player.lastDamage * 2;
        reasons.push("The Provoker");
      }

      // Priority 4: The Wall
      if (player.class === "Warrior") {
        threat += 10;
        reasons.push("Ambient Warrior Threat");
      }

      // Hard Override: Defending Warrior
      if (player.class === "Warrior" && player.isDefending) {
        threat += 500; 
        reasons.push("Defending Warrior Override");
      }

      if (threat > highestThreat) {
        highestThreat = threat;
        target = { ...player, threat, reasons };
      }
    });

    return target;
  };

  const aggroTarget = calculateAggro();

  // --- 3. DAMAGE PHYSICS & DURABILITY ---
  const [weaponType, setWeaponType] = useState('Slashing');
  const [isTargetBleeding, setIsTargetBleeding] = useState(false);
  const [isStealth, setIsStealth] = useState(false);
  const [rollResult, setRollResult] = useState(10);
  
  const calculateDamagePhysics = () => {
    let output = "";
    if (weaponType === 'Slashing') {
      output = isTargetBleeding ? "Standard Damage + 2 Flat DMG (Target is Bleeding)" : "Standard Slashing Damage";
    } else if (weaponType === 'Piercing') {
      output = isStealth ? "Ignores 1 pt DEF. Damage is DOUBLED from Stealth!" : "Ignores 1 pt of Enemy DEF.";
    } else if (weaponType === 'Blunt') {
      output = rollResult >= 15 ? "STRONG HIT: Permanently shatter 1 point of target DEF!" : "Standard Blunt Damage.";
    }
    return output;
  };

  const rollDurabilityTax = () => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    if (d20 <= 5) {
      alert(`Durability Tax Rolled: ${d20}. Armor drops one condition tier! (Broken = 0 DEF)`);
    } else {
      alert(`Durability Tax Rolled: ${d20}. Armor holds.`);
    }
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-red-900 shadow-2xl font-sans text-zinc-300 max-w-6xl mx-auto flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-2 border-red-600 pb-4">
        <div>
          <h1 className="text-3xl font-black text-red-500 uppercase tracking-widest">Live Combat Engine</h1>
          <p className="text-sm text-zinc-400 mt-1">Real-Time Adjudication & Aggro Tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: THE AGGRO INDEX */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-red-500 uppercase">The Aggro Index</h2>
              <label className="text-xs flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={intelligentBoss} onChange={() => setIntelligentBoss(!intelligentBoss)} />
                Intelligent Boss
              </label>
            </div>
            
            {/* Target Display */}
            {aggroTarget ? (
              <div className="bg-red-950/40 border border-red-500 p-4 rounded text-center animate-pulse mb-4">
                <p className="text-xs text-red-400 uppercase tracking-widest mb-1">Current Boss Target</p>
                <h3 className="text-2xl font-black text-white">{aggroTarget.name}</h3>
                <p className="text-xs text-red-300 mt-2 font-bold">{aggroTarget.reasons.join(" | ")}</p>
              </div>
            ) : (
              <div className="p-4 text-center text-zinc-500 italic">No valid targets found.</div>
            )}

            {/* Squad List for quick toggles */}
            <div className="space-y-2">
              {squad.map((p, idx) => (
                <div key={p.id} className="bg-black p-2 rounded border border-zinc-800 flex justify-between items-center text-xs">
                  <span className={`font-bold ${p.hp <= 3 ? 'text-red-500' : 'text-zinc-300'}`}>{p.name} ({p.class})</span>
                  <span>HP: {p.hp}/{p.maxHp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DAMAGE PHYSICS TRACKER */}
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <h2 className="text-lg font-bold text-amber-500 uppercase mb-4">Damage Physics</h2>
            <select 
              className="w-full bg-black border border-zinc-700 p-2 rounded text-white mb-2"
              value={weaponType} onChange={(e) => setWeaponType(e.target.value)}
            >
              <option value="Slashing">Slashing (Swords/Axes)</option>
              <option value="Piercing">Piercing (Daggers/Lances)</option>
              <option value="Blunt">Blunt (Hammers/Maces)</option>
            </select>
            
            <div className="flex gap-4 mb-4 text-xs">
              {weaponType === 'Slashing' && (
                <label className="flex items-center gap-2"><input type="checkbox" checked={isTargetBleeding} onChange={() => setIsTargetBleeding(!isTargetBleeding)} /> Target is Bleeding</label>
              )}
              {weaponType === 'Piercing' && (
                <label className="flex items-center gap-2"><input type="checkbox" checked={isStealth} onChange={() => setIsStealth(!isStealth)} /> Striking from Stealth</label>
              )}
              {weaponType === 'Blunt' && (
                <label className="flex items-center gap-2">Roll Result: <input type="number" className="w-12 bg-black border border-zinc-700 p-1 text-center" value={rollResult} onChange={(e) => setRollResult(e.target.value)}/></label>
              )}
            </div>

            <div className="p-3 bg-amber-950/20 border border-amber-900/50 rounded text-sm text-amber-500 font-bold mb-4">
              {calculateDamagePhysics()}
            </div>

            <button onClick={rollDurabilityTax} className="w-full bg-zinc-800 hover:bg-zinc-700 text-xs font-bold py-2 rounded border border-zinc-600 uppercase tracking-widest transition-colors">
              Roll Durability Tax (5+ DMG Taken)
            </button>
          </div>
        </div>

        {/* COLUMN 2 & 3: THE ACTION MENU LEDGER */}
        <div className="col-span-2 bg-zinc-900 p-4 rounded border border-zinc-800">
          <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
            <h2 className="text-lg font-bold text-green-500 uppercase">Live Action Menu</h2>
            <span className="text-xs text-zinc-500">Click to deduct coins instantly.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
            {actionMenu.map((act, i) => (
              <div key={i} className="bg-black p-3 rounded border border-zinc-800 hover:border-green-500 group transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-sm">{act.name}</h3>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-green-500 font-black text-sm">{act.cost.toLocaleString()}c</span>
                      <span className="text-green-700 font-bold text-[10px] uppercase">{act.paypal} PayPal</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 italic mb-3">{act.desc}</p>
                </div>
                <button 
                  onClick={() => handleActionCharge(act, "Player")}
                  className="bg-green-900/30 hover:bg-green-600 text-green-400 hover:text-white border border-green-800 text-xs font-bold py-1.5 rounded uppercase tracking-widest transition-colors w-full"
                >
                  Charge Action
                </button>
              </div>
            ))}
          </div>
        </div>
        
  );
}
