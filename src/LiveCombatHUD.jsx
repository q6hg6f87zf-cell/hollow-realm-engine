import React, { useState } from 'react';
import { useHollowRealm } from './HollowRealmContext';
import { Target, Sword, Crosshair, HelpCircle, ShieldAlert } from 'lucide-react';

export default function LiveCombatHUD() {
  const [intelligentBoss, setIntelligentBoss] = useState(true);
  const { squad } = useHollowRealm();
  const [weaponType, setWeaponType] = useState('Slashing');

  // --- CORE COMBAT CONSTANTS (Simplified, retained functionality) ---
  const IS_BLEEDING_ACTIVE = false;
  const IS_STEALTH_MODE = false;
  const CURRENT_ROLL_VAL = 10;

  // RETAINED actionMenu - every single line and cost preserved.
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

  // RETAINED aggro math logic - the mechanical "meat" is untouched.
  const calculateAggro = () => {
    let target = null;
    let highestThreat = -1;
    squad.forEach(player => {
      let threat = 0;
      let reasons = [];
      if (player.hp <= 3) { threat += 100; reasons.push("THE BLEEDING"); }
      if (intelligentBoss && player.class === "Healer" && player.status === "Casting") { threat += 80; reasons.push("HEALER CASTING"); }
      if (player.lastDamage >= 5) { threat += (player.lastDamage * 2); reasons.push("THE PROVOKER"); }
      if (player.class === "Warrior" && player.isDefending) { threat += 500; reasons.push("DEFENDING WARRIOR"); }
      if (threat > highestThreat) { highestThreat = threat; target = { ...player, reasons }; }
    });
    return target;
  };

  const aggroTarget = calculateAggro();

  // RETAINED damage physics logic
  const calculateDamagePhysics = () => {
    if (weaponType === 'Slashing') return IS_BLEEDING_ACTIVE ? "Standard + 2 Flat DMG (Bleeding)" : "Standard Slashing Damage";
    if (weaponType === 'Piercing') return IS_STEALTH_MODE ? "Ignores 1 pt DEF. Doubled DMG!" : "Ignores 1 pt enemy DEF.";
    if (weaponType === 'Blunt') return CURRENT_ROLL_VAL >= 15 ? "Nat 15+: Permanently shatter 1 point of target DEF!" : "Standard Blunt Damage.";
    return "Select weapon type.";
  };

  return (
    <div className="space-y-6">
      
      {/* GLOBAL HEADER - Retains context, adapt aesthetic */}
      <div className="skyrim-panel bg-zinc-950 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#ede0c9] uppercase tracking-tighter">Combat Chronology</h1>
          <p className="text-[10px] text-zinc-600 uppercase font-black mt-1">Hollow Realm Engagement Protocol v3.1</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0a0a0c] p-2 rounded">
           <ShieldAlert className="text-[#ef4444]" size={18}/>
           <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Live Calamity Feedback</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: AGGRO & PHYSICS (Skyrim Panel Adapt) */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-[#131317] skyrim-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Target className="text-[#ede0c9]" size={14}/> Aggro Index
              </h2>
              <label className="text-[10px] flex items-center gap-2 cursor-pointer uppercase font-black text-zinc-700 skyrim-btn-hover p-1">
                <input type="checkbox" checked={intelligentBoss} onChange={() => setIntelligentBoss(!intelligentBoss)} className="accent-[#ede0c9] opacity-70" /> Intelligent
              </label>
            </div>
            {aggroTarget ? (
              <div className="bg-[#0a0a0c] p-5 rounded-sm border border-white/5 shadow-inner text-center">
                <p className="text-[10px] text-[#ef4444] uppercase font-black tracking-widest mb-1.5 leading-none">Calamity's Chosen Target</p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-sm">{aggroTarget.name}</h3>
                <div className="skyrim-divider w-2/3 mx-auto my-3.5"></div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {aggroTarget.reasons.map((r, i) => (
                    <span key={i} className="text-[9px] bg-[#1a1a20] text-zinc-400 px-2.5 py-1 rounded-full font-bold uppercase tracking-tight">{r}</span>
                  ))}
                </div>
              </div>
            ) : <p className="text-center text-zinc-600 italic py-10">No Active Threat Profile.</p>}
          </div>

          <div className="bg-[#131317] skyrim-panel p-5 space-y-4">
            <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest text-center">Physics Oracle</h2>
            <div className="skyrim-divider"></div>
            <div className="space-y-3 pt-1">
              <label className="text-[10px] uppercase text-zinc-700 font-bold">Weaponry Type</label>
              <select className="w-full bg-[#0a0a0c] border border-zinc-800 p-3 rounded-sm text-[#ede0c9] font-bold text-sm outline-none skyrim-btn-hover" value={weaponType} onChange={(e) => setWeaponType(e.target.value)}>
                <option value="Slashing">Slashing (Blade/Axe)</option>
                <option value="Piercing">Piercing (Dagger/Lance)</option>
                <option value="Blunt">Blunt (Mace/Hammer)</option>
              </select>
              <p className="text-[10px] uppercase text-zinc-700 font-bold mt-2">Predicted Interaction</p>
              <div className="p-4 bg-[#0a0a0c] rounded-sm text-[#ede0c9] font-black text-center text-xs italic shadow-inner leading-relaxed">
                {calculateDamagePhysics()}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION MENU (Sleek scroll list) */}
        <div className="col-span-2 bg-[#131317] skyrim-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-800">
             <h2 className="text-xl font-black text-[#ede0c9] uppercase tracking-tighter">Engagement Menu</h2>
             <div className="text-[10px] text-zinc-700 uppercase font-bold">Chronicler Interaction</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-3 scrollbar-hide">
            {actionMenu.map((act, i) => (
              <div key={i} className="bg-[#0a0a0c] p-4 rounded-sm border border-zinc-900 flex flex-col justify-between skyrim-btn-hover">
                <div className="flex justify-between items-center mb-1.5">
                  <h3 className="font-bold text-[#ede0c9] text-sm uppercase">{act.name}</h3>
                  <span className="text-[11px] text-zinc-600 font-bold tracking-widest">{act.cost}c // {act.paypal}</span>
                </div>
                <div className="skyrim-divider mb-3"></div>
                <p className="text-[10px] text-zinc-500 italic mb-4 leading-relaxed flex-1">{act.desc}</p>
                
                <div className="flex items-end justify-between gap-3 pt-3 border-t border-zinc-800/50">
                    <p className='text-[9px] text-zinc-700 uppercase font-black'>Awaiting Authorization...</p>
                    <button 
                    onClick={() => handleActionCharge(act, "Chronicler")} 
                    className="bg-transparent text-amber-500 hover:text-amber-400 text-[10px] font-black py-1.5 px-3 rounded uppercase tracking-widest transition-colors skyrim-btn-hover active:scale-95"
                    style={{ border: '1px solid currentColor' }}>
                    Authorize Entry
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
