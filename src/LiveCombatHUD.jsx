import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';

export default function LiveCombatHUD() {
  const [intelligentBoss, setIntelligentBoss] = useState(true);
  const { squad } = useHollowRealm();
  const [weaponType, setWeaponType] = useState('Slashing');

  // --- CORE COMBAT CONSTANTS (Renamed to avoid "Already Declared" errors) ---
  const IS_BLEEDING_ACTIVE = false;
  const IS_STEALTH_MODE = false;
  const CURRENT_ROLL_VAL = 10;

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
    if (weaponType === 'Slashing') return IS_BLEEDING_ACTIVE ? "Standard Damage + 2 Flat DMG (Target is Bleeding)" : "Standard Slashing Damage";
    if (weaponType === 'Piercing') return IS_STEALTH_MODE ? "Ignores 1 pt DEF. Damage is DOUBLED from Stealth!" : "Ignores 1 pt of Enemy DEF.";
    if (weaponType === 'Blunt') return CURRENT_ROLL_VAL >= 15 ? "STRONG HIT: Permanently shatter 1 point of target DEF!" : "Standard Blunt Damage.";
    return "Select weapon type.";
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-red-900 shadow-2xl font-sans text-zinc-300 w-full flex flex-col gap-6 animate-fadeIn">
      <div className="flex justify-between items-center border-b-2 border-red-600 pb-4">
        <h1 className="text-2xl font-black text-red-500 uppercase tracking-widest">Live Combat Engine</h1>
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Moon Squad Battle Protocol</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: AGGRO & PHYSICS */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-red-500 uppercase tracking-widest">Aggro Index</h2>
              <label className="text-[10px] flex items-center gap-2 cursor-pointer uppercase font-black text-zinc-500">
                <input type="checkbox" checked={intelligentBoss} onChange={() => setIntelligentBoss(!intelligentBoss)} className="accent-red-600" /> Intelligent
              </label>
            </div>
            {aggroTarget ? (
              <div className="bg-red-950/40 border border-red-500 p-4 rounded text-center animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <p className="text-[10px] text-red-400 uppercase font-black mb-1">Target Priority Alpha</p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">{aggroTarget.name}</h3>
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  {aggroTarget.reasons.map((r, i) => (
                    <span key={i} className="text-[9px] bg-red-900 text-red-100 px-2 py-0.5 rounded font-bold uppercase">{r}</span>
                  ))}
                </div>
              </div>
            ) : <p className="text-center text-zinc-600 italic py-8">No Active Threat Detected.</p>}
          </div>

          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <h2 className="text-[10px] font-black text-amber-500 uppercase mb-4 text-center tracking-widest">Damage Physics Engine</h2>
            <select className="w-full bg-black border border-zinc-700 p-3 rounded text-white mb-4 font-bold text-sm outline-none" value={weaponType} onChange={(e) => setWeaponType(e.target.value)}>
              <option value="Slashing">Slashing (Swords/Axes)</option>
              <option value="Piercing">Piercing (Daggers/Lances)</option>
              <option value="Blunt">Blunt (Hammers/Maces)</option>
            </select>
            <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded text-amber-500 font-black text-center text-xs shadow-inner">
              {calculateDamagePhysics()}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION MENU */}
        <div className="col-span-2 bg-zinc-900 p-5 rounded border border-zinc-800">
          <h2 className="text-lg font-black text-green-500 uppercase border-b border-zinc-800 pb-3 mb-5 text-center tracking-widest">TikTok Live Action Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {actionMenu.map((act, i) => (
              <div key={i} className="bg-black p-4 rounded border border-zinc-800 flex flex-col justify-between hover:border-green-900 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-white text-xs uppercase group-hover:text-green-400">{act.name}</h3>
                  <span className="text-green-500 font-black text-sm">{act.cost}c</span>
                </div>
                <p className="text-[10px] text-zinc-500 italic mb-4 leading-relaxed">{act.desc}</p>
                <button 
                  onClick={() => handleActionCharge(act, "Player")} 
                  className="bg-green-900/20 hover:bg-green-600 text-green-400 hover:text-white text-[10px] font-black py-2 rounded uppercase tracking-widest transition-all active:scale-95"
                >
                  Charge Action
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
