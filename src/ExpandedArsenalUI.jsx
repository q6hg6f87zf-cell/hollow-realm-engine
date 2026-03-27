ExpandedArsenalUI.jsx

import React, { useState } from 'react';

// 1. THE ARSENAL DATA (Loaded once, outside the component)
export const hollowRealmArsenal = [
  // --- WARRIOR ---
  [span_0](start_span){ id: "w1", class: "Warrior", type: "Weapon", rarity: "Common", name: "Broken Kingdom Greatsword", description: "Slashing. Deals standard damage but counts as 0 weight due to its shattered state.[span_0](end_span)" },
  { id: "w2", class: "Warrior", type: "Weapon", rarity: "Common", name: "Soot-Stained Sledge", description: "Blunt. [span_1](start_span)+1 DMG to environmental objects like doors or pillars.[span_1](end_span)" },
  { id: "w3", class: "Warrior", type: "Weapon", rarity: "Uncommon", name: "Ashen Timber-Axe", description: "Slashing. [span_2](start_span)Deals +2 DMG if the target already has the 'Bleeding' status.[span_2](end_span)" },
  { id: "w4", class: "Warrior", type: "Weapon", rarity: "Uncommon", name: "Garrison Trench-Shovel", description: "Blunt. [span_3](start_span)Can be used to clear 'Difficult Terrain' in the Forest or Caverns.[span_3](end_span)" },
  { id: "w5", class: "Warrior", type: "Weapon", rarity: "Rare", name: "Shatter-Point Warhammer", description: "Blunt. [span_4](start_span)On a 15+, permanently shatters 1 point of target DEF.[span_4](end_span)" },
  { id: "w6", class: "Warrior", type: "Weapon", rarity: "Legendary", name: "Blood-Oath Claymore", description: "Slashing. [span_5](start_span)If the Warrior is below 3 HP, all damage dealt is doubled.[span_5](end_span)" },
  { id: "w7", class: "Warrior", type: "Weapon", rarity: "Legendary", name: "Halberd of the Last Guard", description: "Reach. [span_6](start_span)Attacks ignore the 'Immunity Frame' of Boss Phase shifts.[span_6](end_span)" },
  { id: "w8", class: "Warrior", type: "Gear", rarity: "Uncommon", name: "Phalanx Buckler", description: "Shield. [span_7](start_span)Grants +1 to all combat rolls when standing directly adjacent to an ally.[span_7](end_span)" },
  { id: "w9", class: "Warrior", type: "Gear", rarity: "Rare", name: "Iron-Warden Greaves", description: "Armor. +2 DEF. [span_8](start_span)Passive: User cannot be 'Knocked Back' or 'Stunned' by non-boss enemies.[span_8](end_span)" },
  { id: "w10", class: "Warrior", type: "Gear", rarity: "Rare", name: "Vex's Plated Duster", description: "Armor. [span_9](start_span)Blends into the Forest (Zone 1) for a stealth bonus while providing +1 DEF.[span_9](end_span)" },
  { id: "w11", class: "Warrior", type: "Gear", rarity: "Legendary", name: "The Bastion's Bulwark", description: "Shield. [span_10](start_span)Reduces the 5,000c 'Shield Block' cost to 2,500c for one session.[span_10](end_span)" },
  { id: "w12", class: "Warrior", type: "Gear", rarity: "Mythic", name: "The Golden Fleece", description: "Armor. [span_11](start_span)Drains 100c from the bank for every 1 HP of damage it blocks.[span_11](end_span)" },
  [span_12](start_span){ id: "w13", class: "Warrior", type: "Artifact", rarity: "Mythic", name: "Titan's Ore-Heart", description: "Increases Max HP ceiling by +5, bypassing 'Resurrection Sickness' penalties.[span_12](end_span)" },
  [span_13](start_span){ id: "w14", class: "Warrior", type: "Passive", rarity: "Mythic", name: "The Unbreakable Will", description: "Grants permanent immunity to 'Fear' and 'Stun' statuses.[span_13](end_span)" },

  // --- WIZARD ---
  { id: "wiz1", class: "Wizard", type: "Weapon", rarity: "Common", name: "Ash-Wood Wand", description: "Focus. [span_14](start_span)Grants +1 to Fire/Burn elemental damage rolls.[span_14](end_span)" },
  { id: "wiz2", class: "Wizard", type: "Weapon", rarity: "Common", name: "Cracked Aether-Lens", description: "Focus. [span_15](start_span)Reveals invisible traps in Zone 5 (Hollow's Edge) on a LCK 10+.[span_15](end_span)" },
  { id: "wiz3", class: "Wizard", type: "Weapon", rarity: "Uncommon", name: "Lumen-Glass Orb", description: "Focus. [span_16](start_span)Removes 'Disadvantage' on perception checks in total darkness.[span_16](end_span)" },
  { id: "wiz4", class: "Wizard", type: "Weapon", rarity: "Rare", name: "Prism-Shard Staff", description: "Focus. [span_17](start_span)30% chance to trigger an environmental hazard in Zone 1.[span_17](end_span)" },
  { id: "wiz5", class: "Wizard", type: "Weapon", rarity: "Rare", name: "Wand of the Sunken", description: "Focus. [span_18](start_span)Lightning spells deal AoE damage to everyone in a flooded room.[span_18](end_span)" },
  { id: "wiz6", class: "Wizard", type: "Weapon", rarity: "Legendary", name: "The First Collapse", description: "Staff. [span_19](start_span)Bypasses ALL physical armor; strikes directly at Max HP.[span_19](end_span)" },
  { id: "wiz7", class: "Wizard", type: "Weapon", rarity: "Mythic", name: "The Ever-Changing Blade", description: "Focus. [span_20](start_span)Swaps between Slashing/Blunt/Piercing damage every turn.[span_20](end_span)" },
  { id: "wiz8", class: "Wizard", type: "Gear", rarity: "Uncommon", name: "Static-Thread Robes", description: "Armor. [span_21](start_span)Bypasses the -1 healing penalty in Hostile (Level 4) zones.[span_21](end_span)" },
  { id: "wiz9", class: "Wizard", type: "Utility", rarity: "Uncommon", name: "Grimoire of the Rift", description: "Book. [span_22](start_span)Adds +1 to Void-based damage rolls.[span_22](end_span)" },
  { id: "wiz10", class: "Wizard", type: "Utility", rarity: "Legendary", name: "Arcane Surge Catalyst", description: "Consumable. [span_23](start_span)Doubles the narrative effect of the next roll for the entire party.[span_23](end_span)" },
  { id: "wiz11", class: "Wizard", type: "Utility", rarity: "Legendary", name: "Valdris's Ledger-Scroll", description: "Quest Item. [span_24](start_span)Forces a Boss to lose 500c if they use a 'Desperation Move'.[span_24](end_span)" },
  [span_25](start_span){ id: "wiz12", class: "Wizard", type: "Artifact", rarity: "Rare", name: "Eye of the Hollow", description: "Allows the Wizard to see the GM's exact Difficulty Class (DC) in chat.[span_25](end_span)" },
  [span_26](start_span){ id: "wiz13", class: "Wizard", type: "Artifact", rarity: "Mythic", name: "Chronos-Anchor", description: "Once per session, avoid a 'Reality Glitch' deletion entirely.[span_26](end_span)" },
  { id: "wiz14", class: "Wizard", type: "Passive", rarity: "Mythic", name: "Void-Walker's Essence", description: "+3 LCK. [span_27](start_span)Moving through solid objects no longer provokes attacks.[span_27](end_span)" },

  // --- ROGUE ---
  { id: "r1", class: "Rogue", type: "Weapon", rarity: "Common", name: "Garrison Stiletto", description: "Piercing. [span_28](start_span)Inherently ignores 1 point of Enemy DEF.[span_28](end_span)" },
  { id: "r2", class: "Rogue", type: "Weapon", rarity: "Uncommon", name: "Throwing Garrote", description: "Thrown. [span_29](start_span)On a SPD 14+ check, silences a target for 1 round.[span_29](end_span)" },
  { id: "r3", class: "Rogue", type: "Weapon", rarity: "Rare", name: "Nylah's Glass Dirk", description: "Piercing. [span_30](start_span)Piercing damage is tripled from stealth (instead of doubled).[span_30](end_span)" },
  { id: "r4", class: "Rogue", type: "Weapon", rarity: "Legendary", name: "Whisper's End", description: "Piercing. [span_31](start_span)Auto-kill mechanic on stealth strikes of 18+.[span_31](end_span)" },
  { id: "r5", class: "Rogue", type: "Weapon", rarity: "Mythic", name: "Glitched Dagger", description: "Weapon. [span_32](start_span)Stat buff changes from +1 to +10 every turn.[span_32](end_span)" },
  { id: "r6", class: "Rogue", type: "Gear", rarity: "Uncommon", name: "Shadow-Step Boots", description: "Gear. [span_33](start_span)Grants Advantage on all Stealth checks in the Forest (Zone 1).[span_33](end_span)" },
  { id: "r7", class: "Rogue", type: "Gear", rarity: "Rare", name: "Smuggler's Satchel", description: "Gear. [span_34](start_span)Increases Inventory Cap by +2 slots.[span_34](end_span)" },
  { id: "r8", class: "Rogue", type: "Gear", rarity: "Legendary", name: "The Void-Veil", description: "Cloak. [span_35](start_span)Reduces 'Shadow Step' cost from 5,000c to 1,000c.[span_35](end_span)" },
  { id: "r9", class: "Rogue", type: "Utility", rarity: "Common", name: "Soot-Dusted Lockpicks", description: "Tool. [span_36](start_span)+2 to Lockpicking checks for Garrison Strongboxes.[span_36](end_span)" },
  { id: "r10", class: "Rogue", type: "Utility", rarity: "Uncommon", name: "Black-Market Oil", description: "Consumable. [span_37](start_span)Removes 'Grinding Gears' stealth penalty for 1 session.[span_37](end_span)" },
  { id: "r11", class: "Rogue", type: "Utility", rarity: "Rare", name: "Void-Glass Lantern", description: "Utility. [span_38](start_span)Reveals 'Hidden Geometry' and invisible paths.[span_38](end_span)" },
  { id: "r12", class: "Rogue", type: "Artifact", rarity: "Legendary", name: "Phantom's Ledger", description: "Artifact. [span_39](start_span)Blocks 100% of Box Battle item thefts (Lv. 3 Lockbox effect).[span_39](end_span)" },
  { id: "r13", class: "Rogue", type: "Artifact", rarity: "Mythic", name: "The Null Warden's Mask", description: "Artifact. [span_40](start_span)Allows the wearer to see through walls and perceive invisible hazards.[span_40](end_span)" },
  { id: "r14", class: "Rogue", type: "Passive", rarity: "Mythic", name: "Fragment of the Edge", description: "Passive. [span_41](start_span)10% chance to 'glitch' and take 0 damage when hit.[span_41](end_span)" },

  // --- HEALER ---
  { id: "h1", class: "Healer", type: "Weapon", rarity: "Common", name: "Surgical Scalpel", description: "Piercing. [span_42](start_span)+1 to identifying Void Infections for free.[span_42](end_span)" },
  { id: "h2", class: "Healer", type: "Gear", rarity: "Rare", name: "Amulet of the Unmourned", description: "Gear. [span_43](start_span)+2 to WIS healing rolls in Zone 4 (Library).[span_43](end_span)" },
  { id: "h3", class: "Healer", type: "Gear", rarity: "Legendary", name: "Siren's Call Pearl", description: "Gear. [span_44](start_span)Grants the ability to charm any non-boss NPC for one scene.[span_44](end_span)" },
  { id: "h4", class: "Healer", type: "Utility", rarity: "Common", name: "Order Censer", description: "Utility. [span_45](start_span)1 HP AoE regen for allies out of combat.[span_45](end_span)" },
  { id: "h5", class: "Healer", type: "Utility", rarity: "Uncommon", name: "Aether Bandages", description: "Medical. [span_46](start_span)Cures 'Bleeding' instantly and restores 3 HP.[span_46](end_span)" },
  { id: "h6", class: "Healer", type: "Utility", rarity: "Uncommon", name: "Blood-Glass Syringe", description: "Medical. [span_47](start_span)Drain HP from an enemy and inject it into an ally.[span_47](end_span)" },
  { id: "h7", class: "Healer", type: "Utility", rarity: "Uncommon", name: "Sister Vex's Holy Salt", description: "Utility. [span_48](start_span)Stuns Void entities for 2 rounds if thrown correctly.[span_48](end_span)" },
  { id: "h8", class: "Healer", type: "Utility", rarity: "Rare", name: "Miracle Draught", description: "Consumable. [span_49](start_span)Defibrillator: Restores a 0 HP player to 1 HP mid-combat.[span_49](end_span)" },
  { id: "h9", class: "Healer", type: "Utility", rarity: "Rare", name: "Companion Healthcare Kit", description: "Utility. [span_50](start_span)Restores a pet that fled at 0 HP.[span_50](end_span)" },
  { id: "h10", class: "Healer", type: "Utility", rarity: "Legendary", name: "Vex's Resurrector", description: "Utility. [span_51](start_span)Reduces the 6,000c Resurrection fee by 20%.[span_51](end_span)" },
  [span_52](start_span){ id: "h11", class: "Healer", type: "Artifact", rarity: "Legendary", name: "Catalyst of Rebirth", description: "Cures 'Resurrection Sickness' and restores Max HP ceiling.[span_52](end_span)" },
  [span_53](start_span){ id: "h12", class: "Healer", type: "Artifact", rarity: "Mythic", name: "The Life-Binder's Soul", description: "'Miracle Touch' now restores a player to Full HP instead of 1 HP.[span_53](end_span)" },
  { id: "h13", class: "Healer", type: "Passive", rarity: "Mythic", name: "Apothecary's Essence", description: "Natural +3 LCK; [span_54](start_span)+1 to all stats next session after a Feast.[span_54](end_span)" },
  [span_55](start_span){ id: "h14", class: "Healer", type: "Passive", rarity: "Mythic", name: "The Eternal Light", description: "Immunity to 'Void Infection' stacking (Stage 2/3).[span_55](end_span)" },

  // --- MERCHANT ---
  { id: "m1", class: "Merchant", type: "Weapon", rarity: "Common", name: "Concealed Cane-Blade", description: "Slashing. [span_56](start_span)+1 to friendly persuasion rolls (CHA).[span_56](end_span)" },
  { id: "m2", class: "Merchant", type: "Weapon", rarity: "Common", name: "Heavy Debt-Ledger", description: "Blunt. [span_57](start_span)Damage scales with the amount of gold held in inventory.[span_57](end_span)" },
  { id: "m3", class: "Merchant", type: "Gear", rarity: "Uncommon", name: "Pack-Mule Harness", description: "Gear. [span_58](start_span)Increases Inventory Cap by +4 slots (total 16).[span_58](end_span)" },
  { id: "m4", class: "Merchant", type: "Gear", rarity: "Rare", name: "Garrison Paymaster's Seal", description: "Gear. [span_59](start_span)Kingdom Garrison guards act as allies during Base Sieges.[span_59](end_span)" },
  { id: "m5", class: "Merchant", type: "Gear", rarity: "Legendary", name: "Chancellor's Golden Seal", description: "Gear. [span_60](start_span)Dropping items now costs 0 coins during a Debtor's Eclipse.[span_60](end_span)" },
  { id: "m6", class: "Merchant", type: "Gear", rarity: "Mythic", name: "The Midas Mantle", description: "Armor. [span_61](start_span)Drains 100c from the bank per 1 HP blocked.[span_61](end_span)" },
  { id: "m7", class: "Merchant", type: "Utility", rarity: "Uncommon", name: "Silver Bribery Coin", description: "Tool. [span_62](start_span)+2 to Bribery checks to avoid combat.[span_62](end_span)" },
  { id: "m8", class: "Merchant", type: "Utility", rarity: "Uncommon", name: "Quartermaster's Whetstone", description: "Tool. [span_63](start_span)+1 to ATK for the next combat.[span_63](end_span)" },
  { id: "m9", class: "Merchant", type: "Utility", rarity: "Rare", name: "Sealed Waterproof Box", description: "Chest. [span_64](start_span)Contains 500% more coins but carries a Debt Curse.[span_64](end_span)" },
  { id: "m10", class: "Merchant", type: "Utility", rarity: "Legendary", name: "Smuggler's False-Bottom", description: "Tool. [span_65](start_span)Allows selling Cursed items for 75% value to any merchant.[span_65](end_span)" },
  { id: "m11", class: "Merchant", type: "Utility", rarity: "Legendary", name: "The Black Market Signal", description: "Utility. [span_66](start_span)Reduces the cost of 'Black Market' Gift Power to 2,500c.[span_66](end_span)" },
  [span_67](start_span){ id: "m12", class: "Merchant", type: "Artifact", rarity: "Rare", name: "Nylah's Gondola Key", description: "Grants 50% off all Legendary items in the Daily Ledger.[span_67](end_span)" },
  { id: "m13", class: "Merchant", type: "Artifact", rarity: "Mythic", name: "World-Eater's Maps", description: "Travel to any previously discovered map zone for 0 cost once per session. [span_68](start_span)Cannot bypass active lockdowns and may trigger an instability event.[span_68](end_span)" },
  [span_69](start_span){ id: "m14", class: "Merchant", type: "Passive", rarity: "Mythic", name: "Tax-Collector's Soul", description: "Generates 250c base income per session (instead of 100c).[span_69](end_span)" },

  // --- BARD ---
  { id: "b1", class: "Bard", type: "Weapon", rarity: "Common", name: "Hollow-Bone Flute", description: "Instrument. [span_70](start_span)Forces enemies to attack nearest entity for 1 round.[span_70](end_span)" },
  { id: "b2", class: "Bard", type: "Weapon", rarity: "Common", name: "Prism-Shard Lute", description: "Instrument. [span_71](start_span)Increases 'Encore' re-roll success by +2.[span_71](end_span)" },
  { id: "b3", class: "Bard", type: "Weapon", rarity: "Uncommon", name: "Echo-Chamber Drum", description: "Instrument. [span_72](start_span)Grants Advantage to all stealth checks in the Library (Zone 4).[span_72](end_span)" },
  { id: "b4", class: "Bard", type: "Weapon", rarity: "Rare", name: "Chromatic Flare Lyre", description: "Instrument. [span_73](start_span)All enemies must roll WIS 14+ or be Blinded.[span_73](end_span)" },
  { id: "b5", class: "Bard", type: "Weapon", rarity: "Legendary", name: "Void-Strung Lyre", description: "Instrument. [span_74](start_span)Reverses time by 1 combat round for the squad.[span_74](end_span)" },
  { id: "b6", class: "Bard", type: "Gear", rarity: "Uncommon", name: "Acoustic Occlusion Cape", description: "Gear. [span_75](start_span)Prevents attracting unintended audiences in Zone 1.[span_75](end_span)" },
  { id: "b7", class: "Bard", type: "Gear", rarity: "Uncommon", name: "Static-Born Silk", description: "Armor. [span_76](start_span)+1 to deceptive misdirection and grifting rolls.[span_76](end_span)" },
  { id: "b8", class: "Bard", type: "Gear", rarity: "Rare", name: "Charmer's Chime", description: "Gear. [span_77](start_span)Charm any non-boss NPC for one scene.[span_77](end_span)" },
  { id: "b9", class: "Bard", type: "Utility", rarity: "Rare", name: "Vex's Resonating Moss", description: "Consumable. [span_78](start_span)Allies resting at a Feast get +2 to ALL stats.[span_78](end_span)" },
  { id: "b10", class: "Bard", type: "Utility", rarity: "Legendary", name: "Inspired Enemy Manifesto", description: "Quest Item. [span_79](start_span)GM cannot spawn bounty hunters during your session.[span_79](end_span)" },
  [span_80](start_span){ id: "b11", class: "Bard", type: "Artifact", rarity: "Legendary", name: "The Director's Baton", description: "Reduces 'Encore' Gift Power cost to 2,500c.[span_80](end_span)" },
  [span_81](start_span){ id: "b12", class: "Bard", type: "Artifact", rarity: "Mythic", name: "The Stolen Song", description: "Host a Feast that grants +2 to ALL stats (instead of +1).[span_81](end_span)" },
  [span_82](start_span){ id: "b13", class: "Bard", type: "Passive", rarity: "Mythic", name: "Rift-Singer's Essence", description: "Gain Advantage on all rolls during a Rift Tear.[span_82](end_span)" },
  [span_83](start_span){ id: "b14", class: "Bard", type: "Passive", rarity: "Mythic", name: "Glitch-Step Tempo", description: "10% chance to 'glitch' out of existence when hit.[span_83](end_span)" }
];

// 2. THE MAIN COMPONENT
export default function ExpandedArsenalUI() {
  // State for filtering
  const [filterClass, setFilterClass] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterRarity, setFilterRarity] = useState('All');

  // Arrays to generate our dropdowns smoothly
  const classes = ['All', 'Warrior', 'Wizard', 'Rogue', 'Healer', 'Merchant', 'Bard'];
  const types = ['All', 'Weapon', 'Gear', 'Utility', 'Artifact', 'Passive'];
  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythic'];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center border-b border-gray-700 pb-4">
        The Hollow Realm Arsenal
      </h1>

      {/* FILTER CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <label className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Class</span>
          <select 
            className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={filterClass} 
            onChange={(e) => setFilterClass(e.target.value)}
          >
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Item Type</span>
          <select 
            className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Rarity</span>
          <select 
            className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={filterRarity} 
            onChange={(e) => setFilterRarity(e.target.value)}
          >
            {rarities.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
      </div>

      {/* ARSENAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hollowRealmArsenal
          .filter(item => filterClass === 'All' || item.class === filterClass)
          .filter(item => filterType === 'All' || item.type === filterType)
          .filter(item => filterRarity === 'All' || item.rarity === filterRarity)
          .map(item => (
            <div key={item.id} className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">{item.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  item.rarity === 'Common' ? 'text-gray-400 border-gray-600' :
                  item.rarity === 'Uncommon' ? 'text-green-400 border-green-800' :
                  item.rarity === 'Rare' ? 'text-blue-400 border-blue-800' :
                  item.rarity === 'Legendary' ? 'text-purple-400 border-purple-800' :
                  'text-yellow-400 border-yellow-800 font-bold'
                }`}>
                  {item.rarity}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                <strong className="text-gray-500">{item.type} | {item.class}</strong><br/>
                {item.description}
              </p>
            </div>
        ))}
      </div>
    </div>
  );
}
