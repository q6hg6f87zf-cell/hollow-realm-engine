import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';

export default function LiveCombatHUD() {
  const [intelligentBoss, setIntelligentBoss] = useState(true);
  const { squad } = useHollowRealm();
  const [weaponType, setWeaponType] = useState('Slashing');
  const [isTargetBleeding, setIsTargetBleeding] = useState(false);
  const [isStealth, setlsStealth] = useState(false);
  const [rollResult, setRollResult] = useState(10);
 const [isTargetBleeding] = useState(false);
  const [isStealth] = useState(false);
  const [rollResult] = useState(10);

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
    alert(`CHARGING ${action.cost}c ($${action.paypal} PayPal) to ${playerName} for: ${action.name}`);
  };

  const calculateAggro = () => {
    let target = null;
    let highestThreat = -1;
    squad.forEach(player => {
      let threat = 0;
      let reasons = [];
      if (player.hp <= 3) { threat += 100; reasons.push("The Bleeding"); }
      if (intelligentBoss && player.class === "Healer" && player.status === "Casting") { threat += 80; reasons.push("Healer Casting"); }
      if (player.lastDamage >= 5) { threat += (player.lastDamage * 2); reasons.push("The Provoker"); }
      if (player.class === "Warrior" && player.isDefending) { threat += 500; reasons.push("Defending Warrior"); }
      if (threat > highestThreat) { highestThreat = threat; target = { ...player, reasons }; }
    });
    return target;
  };

  const aggroTarget = calculateAggro();

  const calculateDamagePhysics = () => {
    if (weaponType === 'Slashing') return isTargetBleeding ? "Standard Damage + 2 Flat DMG (Target is Bleeding)" : "Standard Slashing Damage";
    if (weaponType === 'Piercing') return isStealth ? "Ignores 1 pt DEF. Damage is DOUBLED from Stealth!" : "Ignores 1 pt of Enemy DEF.";
    if (weaponType === 'Blunt') return rollResult >= 15 ? "STRONG HIT: Permanently shatter 1 point of target DEF!" : "Standard Blunt Damage.";
    return "Select weapon type.";
  };

  const rollDurabilityTax = () => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    alert(`Durability Tax Roll: ${d20}. ${d20 <= 5 ? 'Armor drops one condition tier!' : 'Armor holds.'}`);
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-red-900 shadow-2xl font-sans text-zinc-300 w-full flex flex-col gap-6">
      <div className="flex justify-between items-center border-b-2 border-red-600 pb-4">
        <h1 className="text-2xl font-black text-red-500 uppercase tracking-widest">Live Combat Engine</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-red-500 uppercase">Aggro Index</h2>
              <label className="text-xs flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={intelligentBoss} onChange={() => setIntelligentBoss(!intelligentBoss)} /> Intelligent
              </label>
            </div>
            {aggroTarget ? (
              <div className="bg-red-950/40 border border-red-500 p-4 rounded text-center animate-pulse mb-4">
                <p className="text-xs text-red-400 uppercase mb-1">Current Boss Target</p>
                <h3 className="text-2xl font-black text-white">{aggroTarget.name}</h3>
                <p className="text-[10px] text-red-300 mt-2 font-bold">{aggroTarget.reasons.join(" | ")}</p>
              </div>
            ) : <p className="text-center text-zinc-500 italic">No target.</p>}
          </div>

          <div className="bg-zinc-900 p-4 rounded border border-zinc-800 text-sm">
            <h2 className="text-amber-500 font-bold uppercase mb-4 text-center">Damage Physics</h2>
            <select className="w-full bg-black border border-zinc-700 p-2 rounded text-white mb-4" value={weaponType} onChange={(e) => setWeaponType(e.target.value)}>
              <option value="Slashing">Slashing (Swords/Axes)</option>
              <option value="Piercing">Piercing (Daggers/Lances)</option>
              <option value="Blunt">Blunt (Hammers/Maces)</option>
            </select>
            <div className="p-3 bg-amber-950/20 border border-amber-900/50 rounded text-amber-500 font-bold text-center mb-4">
              {calculateDamagePhysics()}
            </div>
            <button onClick={rollDurabilityTax} className="w-full bg-zinc-800 text-xs font-bold py-2 rounded border border-zinc-600 uppercase tracking-widest">Roll Durability Tax</button>
          </div>
        </div>

        <div className="col-span-2 bg-zinc-900 p-4 rounded border border-zinc-800">
          <h2 className="text-lg font-bold text-green-500 uppercase border-b border-zinc-800 pb-2 mb-4 text-center">Action Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {actionMenu.map((act, i) => (
              <div key={i} className="bg-black p-3 rounded border border-zinc-800 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white text-xs">{act.name}</h3>
                  <span className="text-green-500 font-black text-xs">{act.cost}c</span>
                </div>
                <p className="text-[10px] text-zinc-500 italic mb-3">{act.desc}</p>
                <button onClick={() => handleActionCharge(act, "Player")} className="bg-green-900/30 hover:bg-green-600 text-green-400 text-[10px] font-bold py-1.5 rounded uppercase tracking-widest transition-colors w-full">Charge Action</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

