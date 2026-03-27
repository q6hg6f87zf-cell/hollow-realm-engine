import React, { useState } from 'react';
import { BookOpen, Users, Coins, ShieldAlert, Sparkles } from 'lucide-react';

export default function RealmCodexTab() {
  const [activeChapter, setActiveChapter] = useState('bloodlines');

  const bloodlines = [
    {
      name: "The Dust-Walker",
      quote: "We didn't walk into the ash to die. We walked into it because the kingdom was already a corpse...",
      lore: "Nomads who adapted to the ash at the Edge. They navigate shifting topography without going mad.",
      stats: "WIS +2 | SPD +1 | CHA -2",
      ability: "[Void-Scarred]: Once per session, ignore one magical attack or curse.",
      quirk: "Perfect night vision, but direct sunlight cracks skin to ash (-1 to hit in daylight)."
    },
    {
      name: "The Garrison-Born",
      quote: "Steel lasts longer than hope. Polished steel lasts forever. Stand the line.",
      lore: "Descendants of entrenched battalions. Broad-shouldered, rigid, treating the world as a temporary occupation zone.",
      stats: "STR +1 | DEF +2 | SPD -1",
      ability: "[Iron Discipline]: Immune to 'Fear'. +1 to combat rolls when adjacent to an ally.",
      quirk: "Take 50% less damage from blunt force/falls, but possess zero buoyancy (sink like an anvil)."
    },
    {
      name: "The Sunken",
      quote: "A secret is only valuable if someone is willing to kill for it. Violence is cheap. Leverage is priceless.",
      lore: "Evolved archivists operating a shadow economy out of flooded manors. Sleek, sharp, and cold-blooded.",
      stats: "INT +2 | CHA +2 | LCK +1 | STR -1",
      ability: "[Silver Tongue]: Start with a 'Black Ledger'. 10% discount on Black Market trades, +2 Bribery.",
      quirk: "Amphibious (breathe underwater 10 mins), but suffer rapid exhaustion if dehydrated."
    },
    {
      name: "The Deep-Claimed",
      quote: "The mountain gives nothing. You must take it. If you strike the stone long enough, it breaks.",
      lore: "Subterranean survivalists who farmed bioluminescent fungi and integrated Hollow Ore into their diet.",
      stats: "STR +2 | DEF +1 | INT -1 | CHA -1",
      ability: "[Stonebreaker]: Mine ore with bare hands. Detect structural traps in complete darkness.",
      quirk: "Calcified flesh (+1 unarmored DEF), but severely claustrophobic in traditional metal armor."
    },
    {
      name: "The Aether-Kith",
      quote: "Form is temporary. Energy is eternal. You fight over the dirt, but the dirt is already dead.",
      lore: "Descendants of a failed ascension ritual, trapped halfway between reality and the aether.",
      stats: "INT +1 | WIS +1 | CHA +1 | LCK +3 | STR -2 | DEF -1",
      ability: "[Phase Shift]: Once per combat, move through a solid object or enemy line without provoking attacks.",
      quirk: "Almost zero physical weight (no encumbrance, silent footsteps), but take double damage from kinetic shockwaves."
    }
  ];

  const rules = [
    { title: "Initiating a Box Battle", desc: "Costs a minimum of 500c to initiate. Target and intent must be declared before the timer starts." },
    { title: "The Toll (Coin Gap)", desc: "The consequence is dictated by the coin gap. Moderate Toll (5k-9k) results in a Curse or Item Theft. Severe Toll (20k+) results in Permanent Death or Exile." },
    { title: "The Rule of Three", desc: "You may only stack a maximum of THREE positive modifiers onto a single roll (e.g., enchanted sword, HQ buff, Bard song)." },
    { title: "Permanent Death", desc: "Bleeding out at 0 HP without a Healer results in Permanent Death. Full Resurrection costs 6,000c and leaves a permanent -2 Max HP penalty." }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* HEADER */}
      <div className="glass-panel p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#ede0c9] uppercase tracking-tighter flex items-center gap-3">
            <BookOpen size={24} className="text-amber-500" />
            The Master Ledger
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">Hollow Realm Rulebook & Lineages</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        <button onClick={() => setActiveChapter('bloodlines')} className={`px-4 py-2 font-black uppercase text-xs tracking-widest rounded-sm transition-all ${activeChapter === 'bloodlines' ? 'bg-amber-500 text-black' : 'glass-panel text-zinc-400 hover:text-white'}`}>
          <Users size={14} className="inline mr-2" /> Bloodlines
        </button>
        <button onClick={() => setActiveChapter('rules')} className={`px-4 py-2 font-black uppercase text-xs tracking-widest rounded-sm transition-all ${activeChapter === 'rules' ? 'bg-amber-500 text-black' : 'glass-panel text-zinc-400 hover:text-white'}`}>
          <ShieldAlert size={14} className="inline mr-2" /> Core Rules
        </button>
      </div>

      {/* CONTENT */}
      {activeChapter === 'bloodlines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bloodlines.map((b, i) => (
            <div key={i} className="glass-panel p-6 border-l-2 border-amber-500 relative overflow-hidden group">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">{b.name}</h3>
              <p className="text-xs text-amber-500 italic mb-4 leading-relaxed">"{b.quote}"</p>
              <div className="skyrim-divider my-4"></div>
              <div className="space-y-3">
                <p className="text-xs text-zinc-300 leading-relaxed">{b.lore}</p>
                <p className="text-[10px] bg-black/50 p-2 rounded text-zinc-400 font-bold uppercase tracking-widest border border-white/5"><span className="text-amber-500">STATS:</span> {b.stats}</p>
                <p className="text-[11px] text-zinc-300 leading-relaxed"><strong className="text-white">Ability:</strong> {b.ability}</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed"><strong className="text-zinc-500">Quirk:</strong> {b.quirk}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeChapter === 'rules' && (
        <div className="space-y-4">
          {rules.map((r, i) => (
            <div key={i} className="glass-panel p-5 border border-white/5 flex gap-4 items-start">
              <div className="bg-black/50 p-3 rounded-full border border-white/10 shrink-0">
                <Coins size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#ede0c9] uppercase tracking-tight mb-1">{r.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
