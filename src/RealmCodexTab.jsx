import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RealmCodexTab() {
  const [activeChapter, setActiveChapter] = useState('ledger');

  // --- THE MASTER DATABASE ---
  const codexDatabase = [
    {
      id: 'ledger',
      title: 'STAB 1: THE MASTER LEDGER',
      sections: [
        {
          heading: "1. Core Character & Survival Costs",
          content: [
            "Character Forge (1,000c/ $13 PayPal): Spawns a brand new character. Includes your Class, Race, Origin, and all Destiny/Mechanic rolls.",
            "Protection Mode (1,000c / $13 PayPal): Void-Shields your character if you miss a live session. Prevents being targeted in Box Battles or world events while offline.",
            "Purchase Companion (1,000c / $13 PayPal): Buys a pet (Void-Hound, Scavenger Crow, etc.) for permanent stat buffs and abilities.",
            "Companion Healthcare (500c/ $7 PayPal): Restores a companion that has fled combat at 0 HP so they can return to your side.",
            "Full Resurrection (6,000c/ $78 PayPal): Reverses Permanent Death. Restores your character from the Graveyard with all gear intact."
          ]
        },
        {
          heading: "2. Live Action Costs (The Action Menu)",
          content: [
            "Scout Ahead (100c/ $2 PayPal): Reveals what is in the next room before the squad commits.",
            "Standard Action (500c/ $7 PayPal): Attack an enemy, Defend an ally (+2 DEF), or Search a room for loot.",
            "Initiate Box Battle (500c/ $7 PayPal): The minimum baseline drop to challenge another player to PvP.",
            "First Re-Roll (500c/ $7 PayPal): Rolled a Fumble? Try again.",
            "Second Re-Roll (1,500c/ $20 PayPal): Forcing a third attempt on a failed roll costs triple.",
            "Use Signature Skill / Item (1,000c/ $13 PayPal): Trigger your Class Signature Skill for an auto-success, or consume a high-tier item.",
            "Power Strike / Gift Power (5,000c/$65 PayPal): An all-in attack that deals major damage on a 15+, or triggers your massive Class Gift Power (e.g., instant revive).",
            "Clutch Moment (10,000c/ $130 PayPal): You take narrative control. You define exactly what your character does; the GM only rolls for the scale of the consequence.",
            "EPIC WORLD ACTION (29,999c/ $390 PayPal): You do something mythic. It changes the raid outcome or the world narrative entirely, regardless of the current state."
          ]
        },
        {
          heading: "3. Moon Squad HQ: Global Base Upgrades",
          content: [
            "Hire Base Resident (Price TBD - Suggested: 2,000c / $26 PayPal): Hire a Guard, Smith, Scholar, etc., to populate the base and provide permanent passive buffs.",
            "The Vault: Lv. 1 (Free): 20 item limit. Lv. 2 (5,000c/ $65 PayPal): 50 item limit. Organizes items. Lv. 3 (15,000c/ $195 PayPal): 100 item limit. Item condition degrades significantly slower.",
            "The Barracks (Guards against Sieges): Lv. 1 (3,000c/ $39 PayPal): 2 guards. Base defends successfully on a 12+. Lv. 2 (8,000c/ $104 PayPal): 4 guards. Defense roll reduced to 9+. Lv. 3 (20,000c/ $260 PayPal): 6 guards. Attackers need a 14+ to breach.",
            "The Forge (Weapon Repairs & Enchantments): Lv. 1 (4,000c / $52 PayPal): Unlocks basic repairs. (Costs 500c / $7 PayPal per weapon repaired). Lv. 2 (10,000c / $130 PayPal): Unlocks full repairs and Common enchantment socketing. Lv. 3 (25,000c/ $325 PayPal): Unlocks Rare and Legendary enchantment socketing.",
            "The Infirmary: Lv. 1 (3,000c / $39 PayPal): Restoring here heals 3 HP. Lv. 2 (8,000c / $104 PayPal): Full HP restore. Cures standard curses. Lv. 3 (18,000c/ $234 PayPal): Full recovery PLUS +1 to all rolls in your next session.",
            "The Watchtower: Lv. 1 (4,000c / $52 PayPal): 1 session warning for Base Sieges. Lv. 2 (10,000c / $130 PayPal): 2 session warning. Reveals exactly who is attacking. Lv. 3 (22,000c/ $286 PayPal): Full intel. Squad can actively remove one encounter from the incoming raid before it hits."
          ]
        },
        {
          heading: "4. Bunkhouse: Personal Quarters Upgrades",
          content: [
            "The Bunk: Lv. 1 (2,000c / $26 PayPal): +2 Temp HP after a rest. Lv. 2 (5,000c / $65 PayPal): +5 Temp HP. Lv. 3 (12,000c/ $156 PayPal): +10 Temp HP AND Status Immunity for your first combat.",
            "The Lockbox (PVP Theft Protection): Lv. 1 (3,000c / $39 PayPal): 25% chance to block a Box Battle item theft. Lv. 2 (8,000c / $104 PayPal): 60% chance to block theft. Lv. 3 (20,000c/ $260 PayPal): 100% Void-Sealed. Items can NEVER be stolen.",
            "The Hearth: Lv. 1 (2,500c / $33 PayPal): Access to basic personal crafting. Lv. 2 (6,000c/ $78 PayPal): Allies resting here get +1 to their first roll. Lv. 3 (15,000c/ $195 PayPal): Host a Feast. Entire squad gets +1 to ALL stats next session."
          ]
        },
        {
          heading: "5. Gear-Specific Active Costs",
          content: [
            "The Chairman's Suit (Legendary Armor): Costs 1,000c ($13 PayPal) to activate its auto-success social feature.",
            "The Golden Fleece (Mythic Armor): Drains 100c ($2 PayPal) from your bank for every 1 HP of damage it blocks."
          ]
        },
        {
          heading: "6. The World Merchants",
          content: [
            "The Daily Ledger (HQ): Bargain items (500c / $7), Essentials (2,000c/ $26), Artifacts (8,000c/$104).",
            "Quartermaster Rudge (Kingdom): Rations/Whetstones (150c / $2), Garrison Gear (500c-1,500c/$7-$20), Rare Weapon Drop (4,000c / $52).",
            "Nylah the Dredge (Library): Antidotes/Crystals (300c / $4), Grimoires (1,200c / $16), Legendary Lore fragment (10,000c/ $130).",
            "Sister Vex (Forest): Aether Bandages (250c / $4), Holy Salt (500c/ $7). Purify Void Infection (Costs 1 Max HP or permanent stat debuff).",
            "Krell the Foreman (Caverns): Deep-Blast Charge (800c / $11), Work Gloves (500c/ $7), Shatter-Guards (1,500c / $20 + 1 Ore), Hollow Reforges (3,000c/ $39 + 2 Ore).",
            "Voss, the Ash-Peddler (Edge): Pure Void-Essence (2,000c/ $26), Random Rare Weapons (5,000c/$65), Shard of the First Collapse (25,000c/ $325 + 1 Legendary item + 1 Max HP)."
          ]
        }
      ]
    },
    {
      id: 'pvp',
      title: 'TAB 2: BOX BATTLES & PAYOUTS',
      sections: [
        {
          heading: "1. Initiating a Box Battle",
          content: [
            "Any player can challenge another player to a live TikTok Box Battle.",
            "The Buy-In: It costs a minimum of 500c ($7 PayPal) to initiate a Box Battle.",
            "Declaration of Intent: The challenger must declare their target and their intent (e.g., 'I am battling for their Legendary Weapon' or 'I am battling to curse them') before the timer starts.",
            "The Lockbox Defense: If a player has upgraded their Bunkhouse Lockbox at the HQ, they have a chance to automatically block item theft (Lv. 1 blocks 25%, Lv. 2 blocks 60%, Lv. 3 blocks 100%)."
          ]
        },
        {
          heading: "2. The Toll (Coin Gap Consequences)",
          content: [
            "The difference in coins between the winner and loser is called The Gap. The wider the gap, the more devastating the consequence.",
            "A Minor Toll (0-4,999 Gap): The loser is humiliated. They lose their current Class Title or suffer a temporary -1 stat debuff for the next session.",
            "Moderate Toll (5,000 - 9,999 Gap): Blood is drawn. The loser is inflicted with a Curse for 2 sessions OR the winner successfully steals one item from their inventory.",
            "Major Toll (10,000 - 19,999 Gap): Total dominance. The loser is Exiled from their current faction OR forced into servitude as a Servant to the winner.",
            "Severe Toll (20,000 - 44,999 Gap): Absolute ruin. The loser is Permanently Killed OR suffers a combined Curse + Exile + Item Theft.",
            "OP Control (45,000+ Gap): Godhood. The winner becomes the GM for a single scene and can narrate whatever permanent reality they want."
          ]
        },
        {
          heading: "3. The Economy of War (Prize Pools & Payouts)",
          content: [
            "The Liquid Pool (TikTok's API Cut): Based on TikTok's current Multi-Guest API, the Host receives exactly 24% of the total coins dropped during the battle.",
            "The Payout Math: Your winner's cut is calculated directly from that 24% Liquid Pool. It is paid out immediately into your character's Moon Squad Bank account.",
            "The 40% Underdog Split: If the Winner's final score is under 5,000 coins ($65 PayPal), they receive 40% of the Liquid Pool.",
            "The 60% Champion Split: If the Winner's final score is 5,000 coins ($65 PayPal) or higher, they receive a massive 60% of the Liquid Pool."
          ]
        },
        {
          heading: "4. The Moon Squad Bank (Withdrawals & Valuations)",
          content: [
            "To request a withdrawal, you must select from one of the following exact TikTok gift drops.",
            "Flying Jets: 5,000c (True Valuation: ~$75 CAD)",
            "Interstellar: 10,000c (True Valuation: ~$150 CAD)",
            "Rose Nebula: 15,000c (True Valuation: ~$225 CAD)",
            "TikTok Rocket: 20,000c (True Valuation: ~$300 CAD)",
            "Lion: 29,999c (True Valuation: ~$450 CAD)",
            "Leon and Lion: 34,999c (True Valuation: ~$525 CAD)",
            "TikTok Universe: 44,999c (True Valuation: ~$675 CAD)",
            "The moment your total cumulative withdrawals hit 44,999c within a 7-day window, your account goes on a strict 1-week cooldown."
          ]
        }
      ]
    },
    {
      id: 'engine',
      title: 'TAB 3: THE ENGINE (Mechanics & Combat)',
      sections: [
        {
          heading: "1. The Anatomy of a Roll & The 'Rule of Three'",
          content: [
            "The Stat Formula: [Base Stat] + [Trait Bonus] + [Gear Bonus] + [Companion/HQ Buffs] - [Debuffs] = TOTAL",
            "The Hard Cap: No stat can naturally exceed 15.",
            "The Rule of Three (Buff Limit): You may only stack a maximum of THREE positive modifiers onto a single roll.",
            "Advantage (roll 2d20, take the highest) does not count against the Rule of Three."
          ]
        },
        {
          heading: "2. Combat Threat & The 'Aggro' Index",
          content: [
            "1. The Provoker: Whoever dealt the most damage to the Boss in the previous round.",
            "2. The Bleeding: Enemies are drawn to weakness. Any player at or below 3 HP automatically generates high Threat.",
            "3. The Healer: Intelligent enemies (like Valdris or Thessaly) will actively attempt to bypass front-line fighters to instantly down a Healer casting restorative magic.",
            "4. The Wall (Warriors): Warriors naturally generate ambient Threat. If all else is equal, an enemy will strike the Warrior.",
            "Rogues using Shadow Step drop their Threat to zero."
          ]
        },
        {
          heading: "3. Advanced Damage Physics & Degradation",
          content: [
            "Slashing (Swords, Axes): Deals standard base damage. If an enemy has a 'Bleeding' status, Slashing weapons deal a flat +2 DMG.",
            "Piercing (Daggers, Lances): Ignores 1 point of Enemy DEF inherently. If attacking from Stealth, Piercing damage is doubled.",
            "Blunt Force (Hammers, Maces): The Armor Breaker. On a Strong Hit (15+), Blunt weapons permanently shatter 1 point of the target's DEF.",
            "The Durability Tax: Every time you absorb an attack that deals 5 or more damage in a single blow, your equipped Armor takes stress. Roll a d20. On a 1-5, your Armor drops one condition tier (Pristine -> Worn -> Damaged -> Broken)."
          ]
        },
        {
          heading: "4. Elemental & Void Resonance",
          content: [
            "Fire / Burn: Deals 1d4 damage over 2 rounds. Physics: Casting fire magic or using a fire-enchanted weapon in the Dark Enchanted Forest has a 30% chance to trigger an environmental hazard.",
            "Cold / Frost: Reduces target Speed (SPD) by 2 for one round.",
            "Void / Aether: Bypasses ALL physical armor. Strikes directly at Max HP.",
            "Void Resonance: If two players use Void-based items/spells in the same combat round, it triggers a Hollow Anomaly. The fabric of reality tears, automatically dropping the Boss's DC by 2, but inflicting a random Curse on the player with the lowest Luck (LCK) stat."
          ]
        },
        {
          heading: "5. The Ecology of Curses (Infection Stacking)",
          content: [
            "Stage 1 (Infected Gear): You loot a Void-Touched item. You take a -2 to your Primary Stat while holding it.",
            "Stage 2 (Assimilation): If you carry a Void-Touched item for 3 consecutive sessions without purifying it, the curse leaves the item and binds to your character's soul. You can drop the item, but the -2 debuff remains permanently.",
            "Stage 3 (The Overload): If you acquire a second Void Infection while already cursed, you trigger The Overload. You immediately drop to 1 HP, and your character cannot be healed by any means for the remainder of the session."
          ]
        },
        {
          heading: "6. Death, Resurrection, and TikTok Sync",
          content: [
            "The Sickness: The resurrected player returns with a permanent -2 to their Max HP ceiling.",
            "To cure Resurrection Sickness, the player must either successfully complete an Epic World Action (29,999c) or obtain a Mythic-tier consumable.",
            "The 'Lag' Rule: If you type an action or drop a gift, and the GM does not see it before the timer hits 0:00 or the Boss phase shifts, the action did not happen in that round.",
            "Misfires: If you accidentally drop a 5,000c Power Strike when you meant to drop a 500c Standard Action, your character canonically panicked and swung wildly. No refunds."
          ]
        }
      ]
    },
    {
      id: 'atlas',
      title: 'TAB 5: THE ATLAS OF RUIN (World Map)',
      sections: [
        {
          heading: "1. The Geography & Danger Scales",
          content: [
            "Level 1: Calm (The Moon Squad HQ). Safe zones. Combat only occurs here if a Boss initiates a Base Siege.",
            "Level 2: Tense (Crumbling Kingdom, Sunken Library). Standard survival. Base DCs are 10-12. Chests carry a 20% Void Infection rate.",
            "Level 3: Dangerous (Underground Caverns, Dark Enchanted Forest). Active hostile territory. Base DCs are 13-15. Chests carry a 30% Void Infection rate.",
            "Level 4: Hostile (Deep/Unmapped Zones). Extreme environmental hazards. Base DCs are 16+. Chests carry a 40% Void Infection rate. Healing magic is mathematically dampened.",
            "Level 5: Extreme (The Hollow's Edge). Reality is actively tearing apart. Base DCs are 18+. Chests carry a 50% Void Infection rate. Magic is wildly unpredictable."
          ]
        },
        {
          heading: "2. The Deployment Protocol (Raid Tiers)",
          content: [
            "Tier 1: Scouting (100c/$2 PayPal). Max Party: 2 Players. Objective: Intelligence gathering. You do not engage.",
            "Tier 2: Skirmish (500c/ $7 PayPal per action). Max Party: 3 Players. Objective: Hit-and-run. Standard combat rules apply.",
            "Tier 3: Full Raid (5,000c/ $65 PayPal per action). Max Party: 5 Players. Objective: Deep infiltration. Surviving a Tier 3 Raid qualifies the party for the massive 30,000c ($390 PayPal) Split Pot payout.",
            "Tier 4: Boss Assault (29,999c/ $390 PayPal - Epic World Action). Max Party: 6 Players. Objective: Decapitation strike. Total commitment against a named Villain. The squad cannot retreat."
          ]
        },
        {
          heading: "3. Encounter Generation & The Domino Rule",
          content: [
            "Combat Encounters: A straight fight to the death.",
            "Stealth/Trap Encounters: Precision is required. A failed SPD roll means taking permanent environmental damage.",
            "Negotiation Encounters: You must buy your way out or pass a massive CHA check.",
            "The Domino Rule: If the squad encounters a threat and chooses to flee (or fails an extraction), that threat does not despawn. It remains on the board."
          ]
        },
        {
          heading: "4. Apex Predators (Boss Mechanics)",
          content: [
            "Phase Shifting: Every Boss has 3 to 4 distinct Phases. When the squad deals enough damage to break a Phase Threshold, the Boss shifts.",
            "The Immunity Frame: Any leftover damage from the attack that broke the threshold is completely voided. You cannot one-shot a Boss.",
            "Territory Control: If a Boss reaches 100% Territory, that map zone is permanently locked. Players cannot farm it for loot or visit its merchants until a Tier 4 Boss Assault successfully pushes the villain back."
          ]
        },
        {
          heading: "5. Environmental Hazards (Location Physics)",
          content: [
            "The Sunken Library: Anyone without the Sunken's Amphibious trait suffers a flat -2 penalty to ALL physical rolls due to water resistance. Lightning magic deals AoE damage to everyone in the room.",
            "Underground Caverns: Pitch Black. Without a magical light source or a Deep-Claimed guide, you cannot see. All ranged attacks and perception checks suffer Disadvantage.",
            "Dark Enchanted Forest: Acoustic Anomalies. Bard performances have a 25% chance to attract an unintended hostile audience. Gunpowder or explosive weapons instantly draw the Ashen Pack.",
            "The Hollow's Edge: The Static. Any spell cast in the Edge has a 50% chance to fail entirely, consuming the player's turn for zero effect."
          ]
        }
      ]
    },
    { id: 'bloodlines', title: 'CHAPTER 1: THE BLOODLINES', sections: [] },
    { id: 'classes', title: 'CHAPTER 2: THE CALLINGS (Classes)', sections: [] },
    { id: 'zones', title: 'ZONES 1-5 OVERVIEWS', sections: [] },
    { id: 'kits', title: 'CHAPTER 6: THE FIELD KITS', sections: [] },
    { id: 'npcs', title: 'NPC MANIFEST & INSURER FILE', sections: [] },
    { id: 'bosses', title: 'CHAPTER 7: APEX ENCOUNTERS', sections: [] },
    { id: 'calamities', title: 'CHAPTER 9: THE CALAMITY SYSTEM', sections: [] }
  ];

  const activeData = codexDatabase.find(c => c.id === activeChapter);

  return (
    <div className="bg-zinc-950 p-6 rounded-xl border-2 border-amber-900 shadow-2xl font-sans text-zinc-300 w-full h-full flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="border-b-2 border-amber-600 pb-4">
        <h1 className="text-4xl font-black text-amber-500 uppercase tracking-widest">The Master Codex</h1>
        <p className="text-sm text-zinc-400 mt-1">Official Rules of Engagement, Lore, and System Mechanics</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden h-full">
        
        {/* SIDEBAR NAVIGATION (SCROLLABLE TABS) */}
        <div className="w-full lg:w-1/4 flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-900 h-full">
          {codexDatabase.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setActiveChapter(chapter.id)}
              className={`text-left p-4 rounded border transition-all text-xs uppercase tracking-widest font-bold ${
                activeChapter === chapter.id
                  ? 'bg-amber-900/40 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.2)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 hover:border-amber-700'
              }`}
            >
              {chapter.title}
            </button>
          ))}
        </div>

        {/* MASSIVE CONTENT DISPLAY */}
        <div className="w-full lg:w-3/4 bg-black border border-zinc-800 rounded p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-black text-white border-b border-zinc-800 pb-4 mb-6 uppercase tracking-wider text-amber-500">
                {activeData.title}
              </h2>
              
              {activeData.sections.length > 0 ? (
                <div className="space-y-8">
                  {activeData.sections.map((sec, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-bold text-red-500 mb-3 uppercase tracking-widest">{sec.heading}</h3>
                      <ul className="space-y-4">
                        {sec.content.map((point, i) => (
                          <li key={i} className="flex items-start text-sm leading-relaxed text-zinc-300">
                            <span className="text-amber-600 mr-3 font-bold mt-0.5">»</span>
                            <span className="flex-1 font-serif">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-600 italic text-center mt-20 uppercase tracking-widest text-sm">
                  [ System Warning: Data Stream Paused. Awaiting next JSON payload to prevent memory overflow. ]
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
    {
      id: 'bloodlines',
      title: 'CHAPTER 1: THE BLOODLINES',
      sections: [
        {
          heading: "1. The Dust-Walker",
          content: [
            "Lore: Frontier scouts who adapted to the ash when the Edge began to devour the land. Insular nomads capable of navigating the shifting topography of the Hollow's Edge.",
            "Stat Modifications: WIS +2 | SPD +1 | CHA -2",
            "Ancestral Ability [Void-Scarred]: Once per session, completely ignore one incoming magical attack or curse.",
            "Biological Quirk [Photosensitive]: +2 Perception in total darkness. However, direct unshielded sunlight imposes a permanent -1 penalty to all hit rolls until in shade.",
            "Fatal Vulnerability [Fragile Mind]: -2 penalty to all Saving Throws against Psychic trauma, illusions, or mind-control.",
            "The Beast's Instinct: Natural animals will growl, panic, or flee when within 10 feet. You cannot use animal mounts.",
            "Sub-Lineage [Ash-Stalkers]: SPD +2 | CHA -3. Gain Advantage on all Stealth checks in the Forest and do not trigger perimeter bells.",
            "Sub-Lineage [Rift-Gazers]: INT +2 | WIS -2. Can 'smell' Gravity Wells/Glitches before they trigger. +3 to Stability Rolls."
          ]
        },
        {
          heading: "2. The Garrison-Born",
          content: [
            "Lore: Descendants of the grand military apparatus who entrenched themselves in fortresses. They treat the broken world as a temporary occupation zone.",
            "Stat Modifications: STR +1 | DEF +2 | SPD -1",
            "Ancestral Ability [Iron Discipline]: Biologically immune to 'Fear'. +1 to combat rolls when fighting directly adjacent to an ally (Phalanx combat).",
            "Biological Quirk [Dense Structure]: Take 50% less damage from blunt force trauma or long falls. However, zero buoyancy—you will sink and drown in 3 rounds unassisted.",
            "Fatal Vulnerability [Heavy-Footed]: -4 penalty to all Stealth checks involving water, gravel, or metal flooring.",
            "Sub-Lineage [Iron-Wardens]: DEF +3 | SPD -3. Cannot be Knocked Back/Stunned by non-bosses. Provide +1 DEF to ally directly behind you.",
            "Sub-Lineage [Sapper-Corps]: STR +1 | INT +1. Deal double damage to environmental objects. 50% chance to disarm proximity mines without rolling."
          ]
        },
        {
          heading: "3. The Sunken",
          content: [
            "Lore: Archivists and financiers trapped in the flooded metropolis who evolved to survive. They run a shadow economy based on debts, favors, and hoarded history.",
            "Stat Modifications: INT +2 | CHA +2 | LCK +1 | STR -1",
            "Ancestral Ability [Silver Tongue]: Start with a 'Black Ledger'. Automatic 10% discount on Black Market trades, and +2 to Bribery checks.",
            "Biological Quirk [Amphibious]: Hold breath for 10 minutes in combat. See perfectly in murky water, zero penalties when submerged.",
            "Fatal Vulnerability [Desiccation]: Suffer 'Exhaustion' twice as fast without double water intake. A week away from fog/flooded ruins causes -1 to all physical rolls.",
            "Sub-Lineage [Abyssal-Brokers]: LCK +2 | CHA -1. Communicate telepathically with Sunken NPCs. 'Search' flooded rooms without using an action.",
            "Sub-Lineage [Salt-Traders]: CHA +3 | STR -2. Can sell 'Cursed' items to non-Sunken merchants for 75% of original value."
          ]
        },
        {
          heading: "4. The Deep-Claimed",
          content: [
            "Lore: Subterranean survivalists who survived by farming fungi and integrating Hollow Ore into their diet. They worship the veins of the earth.",
            "Stat Modifications: STR +2 | DEF +1 | INT -1 | CHA -1",
            "Ancestral Ability [Stonebreaker]: Mine Hollow Ore bare-handed. Naturally detect structural traps in darkness without rolling Perception.",
            "Biological Quirk [Ore-Skin Calcification]: Natural +1 DEF unarmored. However, wearing metal armor causes claustrophobia, imposing a -1 SPD penalty.",
            "Fatal Vulnerability [Light-Blinded & Agoraphobia]: -3 penalty to all rolls for 1 hour after flashbang/bright magic. Standing under open sky causes panic.",
            "Sub-Lineage [Ore-Eaters]: CON +2 | INT -3. Consume 1 unit of Raw Hollow Ore to instantly restore 5 HP.",
            "Sub-Lineage [Tunnel-Wights]: SPD +2 | STR -1. Detect entity movement within 30ft if touching ground. Ignore Difficult Terrain in Forest/Caverns."
          ]
        },
        {
          heading: "5. The Aether-Kith",
          content: [
            "Lore: Descendants of grand mages whose ascension ritual was interrupted. They drift through the Realm struggling to maintain physical coherence.",
            "Stat Modifications: INT +1 | WIS +1 | CHA +1 | LCK +3 | STR -2 | DEF -1",
            "Ancestral Ability [Phase Shift]: Once per combat, move through a solid object, locked door, or enemy line without provoking attack.",
            "Biological Quirk [Semi-Ethereal Mass]: Never Encumbered, leave no footprints. However, kinetic/wind blasts deal double damage and launch you.",
            "Fatal Vulnerability [Disrupted Form]: Take 1d4 direct vitality damage every turn ended inside a strong magnetic or anti-magic field.",
            "Sub-Lineage [Static-Born]: LCK +4 | DEF -3. 10% chance to 'glitch' out of existence when taking damage, taking 0 damage.",
            "Sub-Lineage [Prism-Shards]: CHA +2 | WIS +1. Once per combat, emit blinding light. Enemies roll WIS 14+ or are Blinded for 1 round."
          ]
        }
      ]
    },
    {
      id: 'classes',
      title: 'CHAPTER 2: THE CALLINGS (Classes)',
      sections: [
        {
          heading: "1. The Warrior",
          content: [
            "Role: The ablative armor for the squad. You take the hit, hold the line, and buy time.",
            "Base HP: 12 | Inventory Cap: 8 Slots",
            "Core Stats: STR 8 | DEF 7 | SPD 4 | WIS 4 | INT 3 | CHA 3 | LCK 3",
            "Divine Intervention [Shield Block - 5,000c]: Once per session, completely absorb an incoming attack meant for an ally. No d20 roll required.",
            "Shadow Trait [The Berserker Flaw]: Falling below 3 HP requires a DC 10 WIS check, or you must blindly attack the nearest entity."
          ]
        },
        {
          heading: "2. The Wizard",
          content: [
            "Role: Reality-bending capability. You end encounters before damage can be dealt, trading physical safety for power.",
            "Base HP: 7 | Inventory Cap: 6 Slots",
            "Core Stats: INT 9 | WIS 7 | SPD 5 | CHA 4 | LCK 4 | STR 3 | DEF 2",
            "Divine Intervention [Arcane Surge - 5,000c]: Once per session, double the mathematical and narrative effect of your next roll.",
            "Shadow Trait [The Dependency]: Magic relies on an addictive arcane substance; without it, suffer -1 to all rolls."
          ]
        },
        {
          heading: "3. The Rogue",
          content: [
            "Role: Supreme scouts and assassins. Strike first, strike from the dark, and leave before retaliation lands.",
            "Base HP: 8 | Inventory Cap: 10 Slots",
            "Core Stats: SPD 9 | LCK 7 | CHA 6 | STR 5 | INT 5 | WIS 4 | DEF 3",
            "Divine Intervention [Shadow Step - 5,000c]: Once per session, avoid one consequence entirely. Step into the void and reappear unharmed.",
            "Shadow Trait [The Wanted]: A major faction holds a contract on your head; GM can spawn bounty hunters into your encounters."
          ]
        },
        {
          heading: "4. The Healer",
          content: [
            "Role: The absolute lifeline. Manage the action economy. Targeted first by intelligent Bosses.",
            "Base HP: 9 | Inventory Cap: 8 Slots",
            "Core Stats: WIS 9 | CHA 7 | INT 6 | LCK 5 | DEF 4 | SPD 4 | STR 3",
            "Divine Intervention [Miracle Touch - 5,000c]: Once per session, instantly restore a Downed character from 0 HP back to 1 HP. Stops Permanent Death.",
            "Shadow Trait [The Hollow Debt]: You used void-magic to save a life, and the GM treats your soul as collateral."
          ]
        },
        {
          heading: "5. The Merchant",
          content: [
            "Role: Manipulate the macro-economy. Negotiate, bribe, and secure wealth for the squad's survival.",
            "Base HP: 8 | Inventory Cap: 12 Slots",
            "Core Stats: CHA 8 | LCK 8 | INT 6 | WIS 5 | SPD 5 | STR 3 | DEF 3",
            "Divine Intervention [Black Market - 5,000c]: Once per session, force the GM to open an immediate, localized Black Market anywhere.",
            "Shadow Trait [The Forged Ledger]: A past transaction was fraudulent, and the GM knows who holds the proof."
          ]
        },
        {
          heading: "6. The Bard",
          content: [
            "Role: Play the game at a meta-narrative layer. Alter emotions and grant massive mathematical buffs to allies.",
            "Base HP: 8 | Inventory Cap: 7 Slots",
            "Core Stats: CHA 10 | SPD 6 | WIS 6 | INT 5 | LCK 5 | STR 3 | DEF 2",
            "Divine Intervention [Encore - 5,000c]: Once per session, legally demand a re-roll on ANY failed d20 roll made by yourself or an ally.",
            "Shadow Trait [The Inspired Enemy]: A past performance moved the wrong person, who took the lyrics as a manifesto to hunt you down."
          ]
        }
      ]
    },
    {
      id: 'zones',
      title: 'ZONES 1-5 OVERVIEWS',
      sections: [
        {
          heading: "Zone 1: The Dark Enchanted Forest (Ashen Timberlands)",
          content: [
            [cite_start]"Lore: Once the King's Hunting Grounds, the forest went feral after the Great Shift. Trees absorbed the ambient magic, growing hard as iron. Garrison soldiers mutated into the Ashen Pack [cite: 255-259].",
            "UE5 Visuals: Lumen global illumination struggling to pierce the canopy. A perpetual drift of grey ash. Volumetric fog hides traps. [cite_start]Smells of pine sap, wet earth, cold campfire ash, and ozone [cite: 246-254].",
            "Landmarks: Sister Vex's Chapel (Safe Zone, overgrown with glowing blue moss). The Poacher's Camp. [cite_start]The Ashen Den (Gravenor's Lair beneath the oldest tree) [cite: 259-264].",
            "Hazards: Rusted Bear Traps (Perception 14+ or Rooted). Hollow-Spore Pods (WIS 12+ save or Blind/Exhausted). [cite_start]The Pack's Perimeter (tripwires that spawn 1d4 Ashen Wolves) [cite: 265-270].",
            "Loot: Buried Bone-Caches. Hollow-Iron Axe (Rare, requires STR 16+ to pull free). [cite_start]Pioneer's Duster (+1 DEF and Stealth bonus) [cite: 271-276]."
          ]
        },
        {
          heading: "Zone 2: The Crumbling Kingdom (The Last Frontier)",
          content: [
            "Lore: The capital of the known world, split open by the Great Shift. Chancellor Valdris bound his soul to the Throne Room. [cite_start]Garrison soldiers enforce brutal tolls [cite: 287-290].",
            "UE5 Visuals: High-contrast lighting. Bruised purple sky, industrial oil lanterns. Gothic ruins patched with corrugated iron and sandbags. [cite_start]Dry, biting winds [cite: 279-284].",
            "Landmarks: Quartermaster Rudge's Toll Booth (Main gate, wanted posters). The Shattered Armory (Pitch-black labyrinth). [cite_start]The Suspended Throne Room (Cracked marble over an abyss) [cite: 292-296].",
            "Hazards: Structural Collapse (SPD 13+ to cross, or fall for 2d6 Blunt damage). Garrison Trip-Mines (SPD/INT 15+ to disarm, 2d8 AoE). [cite_start]Phantom Patrols (Un-winnable combat if not bypassed via Stealth) [cite: 297-302].",
            "Loot: Garrison Paymaster's Strongbox. Blood-Oath Claymore (Legendary, behind a false wall). [cite_start]Valdris's Debt Ledgers (Drops store prices by 20%) [cite: 303-308]."
          ]
        },
        {
          heading: "Zone 3: The Underground Caverns (Bedrock Syndicate)",
          content: [
            "Lore: Sealed off during the collapse, the miners consumed Hollow Ore to survive. [cite_start]Unionized into a ruthless syndicate led by Krell the Foreman [cite: 321-324].",
            "UE5 Visuals: Absolute darkness with harsh industrial lighting. Glowing Hollow Ore veins. Sputtering arc-lamps and steam vents. [cite_start]Smells of sulfur, pulverized stone, hot oil, and deep-earth gas [cite: 312-320].",
            "Landmarks: Krell's Steam-Forge (Fractured geothermal vent, upgrades weapons). The Bleeding Veins (Active excavation drop). [cite_start]Thessaly's Blind Drop (Entrance to the Cartographer's domain) [cite: 326-330].",
            "Hazards: Firedamp Pockets (Toxic gas, detonates for 3d8 Fire if lit). Structural Stress (Explosives or Fumbles cause Cave-Ins, 2d10 Blunt damage). [cite_start]Proximity Detonators [cite: 331-337].",
            "Loot: Smuggler's False-Bottom Crate (INT 14+ to spot). Raw Hollow Ore (Required for Krell's reforging). [cite_start]Deep-Blast Charge (Massive AoE but risks ceiling collapse) [cite: 338-342]."
          ]
        },
        {
          heading: "Zone 4: The Sunken Library (The Drowned Cartel)",
          content: [
            "Lore: Half-submerged pinnacle of academia and banking. The Sunken run a shadow economy based on secrets and blackmail. [cite_start]The entity 'The Sink' slumbers in the lowest flooded levels [cite: 343-344, 355-358].",
            "UE5 Visuals: Deep aquatic blues and sickly greens. Caustics ripple across standing water. Flooded reading rooms. [cite_start]Smells of stagnant water, rotting parchment, and algae [cite: 345-354].",
            "Landmarks: The Grand Rotunda (The Shallows, waist-deep water, Nylah's market). The Restricted Archive (The Deep, pitch-black 3D diving). [cite_start]The Sink's Basin [cite: 359-365].",
            "Hazards: The Drowning Clock (5 rounds of oxygen, takes 1d6 damage after). Electrified Water (Blue crystals spark, dealing 2d8 Lightning damage). [cite_start]The Sink's Pull (WIS 12+ save or dragged deeper) [cite: 366-372].",
            "Loot: Sealed Waterproof Lockboxes (INT 16+ to open). Blackmail Ledgers (Traded to Nylah for extreme payouts). [cite_start]Siren's Call Amulet (Legendary, charms non-boss NPCs) [cite: 373-377]."
          ]
        },
        {
          heading: "Zone 5: The Hollow's Edge (The Null Point)",
          content: [
            "Lore: The boundary where the Great Shift is still happening. [cite_start]A trash heap of deleted reality, ruled by The Null Warden [cite: 393-395].",
            "UE5 Visuals: Monochromatic white light from 'The Rift'. Floating islands, frozen explosions, crystalline bridges. 'The Static' haze. [cite_start]Zero scent [cite: 381-392].",
            "Landmarks: The Cathedral of Fragments (Split down the middle). The Memory Graveyard (Holographic loops). [cite_start]The Event Horizon (Reflective black disk boss arena) [cite: 397-403].",
            "Hazards: Gravity Wells (LCK 15+/SPD 16+ to spot, 3d6 Blunt damage and Pinned). Reality Glitches (d20 Stability Roll; Natural 1 deletes character). [cite_start]The Warden's Gaze (Orbital strike, 4d10 damage) [cite: 404-412].",
            "Loot: Void-Touched Relics (Change stats every equip). Stable Matter (Creates 20ft zone of normal gravity). [cite_start]The Null Warden's Mask (Legendary, sees invisible hazards) [cite: 413-418]."
          ]
        }
      ]
    },
    {
      id: 'kits',
      title: 'CHAPTER 6: THE FIELD KITS',
      sections: [
        {
          heading: "1. Medical & Recovery",
          content: [
            "Aether Bandages (250c): Cures 'Bleeding' instantly. Restores 3 HP. [cite_start]Leaves a procedural mossy texture on skin [cite: 421-424].",
            "Miracle Draught (2,500c): Full HP Restore. [cite_start]Acts as a manual defibrillator to bring Downed characters from 0 HP to 1 HP [cite: 425-428].",
            "Adrenaline Salts (400c): +2 to SPD and Initiative for 3 combat rounds. [cite_start]Causes 'Exhausted Level 1' (-1 to all rolls) when it wears off [cite: 429-432]."
          ]
        },
        {
          heading: "2. Environmental & Utility",
          content: [
            "Holy Salt (500c): Creates a 10ft Sanctified Circle. No Void-based entities can cross for 1 hour. [cite_start]Stuns entities inside upon casting [cite: 434-438].",
            "Deep-Blast Charge (800c): Deals 3d10 damage in a 20ft radius. [cite_start]If used in Caverns, roll d20: 1-5 triggers a Cave-In [cite: 439-443].",
            "Void-Glass Lantern (1,200c): Reveals 'Hidden Geometry' (invisible paths/doors). [cite_start]Removes Disadvantage on Perception in total darkness [cite: 444-446]."
          ]
        },
        {
          heading: "3. The Volatile & Cursed",
          content: [
            "Pure Void-Essence (2,000c): Instantly restores Full HP and all used Gift Powers. [cite_start]40% chance the player is hit with a Tier 2 Curse immediately [cite: 448-454].",
            "Dried Void-Moss (150c): Restores 1 HP and grants +1 to all WIS rolls for 10 minutes. [cite_start]GM may whisper fake hallucinations to the player [cite: 455-457]."
          ]
        },
        {
          heading: "4. Companion Supports & Pack-Mule Rules",
          content: [
            [cite_start]"Void-Hound Treat (100c): Restores 2 HP to a Void-Hound[span_0](end_span).",
            [span_1](start_span)"Scavenger Crow Shiny (100c): Prevents the Crow from spite-dropping an item for 2 sessions[span_1](end_span).",
            [span_2](start_span)"Clockwork Oil (300c): Repairs a Clockwork Mule, restoring 4 HP and removing stealth penalty[span_2](end_span).",
            "The Pack-Mule Rules: Standard Pouch holds 5 small consumables. Heavy Items take 1 full Slot. [span_3](start_span)Overloading your Class Cap applies a permanent -2 SPD penalty [cite: 461-464]."
          ]
        }
      ]
    },
    {
      id: 'npcs',
      title: 'NPC MANIFEST & INSURER FILE',
      sections: [
        {
          heading: "1. Gravenor (The Ashen Father)",
          content: [
            "Location: Dark Enchanted Forest. [cite_start]Leader of the Ashen Pack [cite: 465-466].",
            "Conflict: Former officer who held the line when the Kingdom fell. [cite_start]Believes in embracing the feral side to survive [cite: 468-469].",
            "Secret: Keeps a rusted locket with a Kingdom seal. [cite_start]Mentioning his family forces him to lose one turn in combat [cite: 470-472].",
            "Favor: If the squad culls a rival pack, he grants the Pack Mark. [cite_start]Forest wolves no longer attack, +2 to Tracking [cite: 473-474]."
          ]
        },
        {
          heading: "2. Chancellor Valdris (The Unmourned)",
          content: [
            "Location: Crumbling Kingdom. [cite_start]Last Bureaucrat of the Dead Empire[span_3](end_span).",
            "Conflict: A ghost bound to his throne, collecting unpaid debts. [span_4](start_span)Wants players to 'offload' his debts, cursing them with a Debt Bond [cite: 477-478].",
            "Secret: Helped orchestrate the Great Shift to avoid a corruption trial. [cite_start]The 'Black Box' proof is in the Sunken Library [cite: 479-480].",
            "Favor: Pay him 10,000c in one session, and he becomes a Political Patron. [cite_start]Garrison guards will ally during Base Sieges [cite: 481-482]."
          ]
        },
        {
          heading: "3. Krell the Foreman (The Bedrock Golem)",
          content: [
            "Location: Underground Caverns. [cite_start]Master Smith and Labor Union Leader[span_4](end_span).",
            "Conflict: Hates surface-dwellers. [span_5](start_span)Fighting a silent war against Thessaly's 'vandalizing' maps [cite: 485-486].",
            "Secret: His skin is turning to solid ore. [cite_start]He needs Void Salts from the Edge to stay mobile [cite: 487-488].",
            "Favor: Bring him 10x Raw Hollow Ore, and he grants Masterwork Status. [cite_start]One squad weapon becomes indestructible with +1 ATK [cite: 489-490]."
          ]
        },
        {
          heading: "4. Nylah the Dredge (The Gilded Gill)",
          content: [
            "Location: Sunken Library. [cite_start]High Broker of the Drowned Cartel[span_5](end_span).",
            "Conflict: Runs the shadow economy. Taxes Box Battle winners based on secret intel. [span_6](start_span)Obsessed with retrieving 'Founding Documents' from the Sink [cite: 492-494].",
            "Secret: An Aether-Kith who failed ascension and anchored herself using Sunken biology. [cite_start]Terrified of drying out [cite: 495-496].",
            "Favor: Deliver a Rival Merchant's Ledger, and she unlocks the Secret Stock. [cite_start]Squad gets 50% off Legendary items [cite: 496-497]."
          ]
        },
        {
          heading: "5. Thessaly Vane (The Burned Cartographer)",
          content: [
            "Location: Mobile/Underground Caverns. [cite_start]Rogue Visionary[span_6](end_span).",
            "Conflict: Realized the Hollow Realm is a leaking simulation. [span_7](start_span)Her maps are 'patches' that rewrite the world, often deleting villages [cite: 500-502].",
            [cite_start]"Secret: She drew the original maps centuries ago and hasn't aged a day since [cite: 503-504].",
            "Favor: Protect her during a Mapping Ritual to reveal a Ghost Path. [cite_start]Squad can fast travel anywhere bypassing costs [cite: 504-505]."
          ]
        },
        {
          heading: "6. The Insurer's File (NPC Rules)",
          content: [
            [cite_start]"Reputation Checks: GM tracks a hidden favor score (-10 to +10) for Architect NPCs [cite: 507-508].",
            "The Bribe Cap: You cannot bribe an Architect NPC with less than 2,000c. [cite_start]Less is an insult (-1 Rep)[span_7](end_span).",
            [span_8](start_span)"The Betrayal Domino: Favor with one Architect almost always costs favor with another (e.g., helping Gravenor angers Valdris) [cite: 509-510]."
          ]
        }
      ]
    },
    {
      id: 'bosses',
      title: 'CHAPTER 7: APEX ENCOUNTERS',
      sections: [
        {
          heading: "1. Global Boss Rules",
          content: [
            "The Immunity Gate: Upon hitting a Phase Threshold, Bosses become Invulnerable to damage until the next round. [cite_start]You cannot skip phases[span_8](end_span).",
            [span_9](start_span)"The Desperation Move: Every Phase Shift triggers an immediate, free Reaction Attack hitting everyone in the room[span_9](end_span).",
            [span_10](start_span)"State Persistence: Fleeing leaves the Boss in their current Phase, regenerating to the top of that Phase's HP for the next encounter[span_10](end_span)."
          ]
        },
        {
          heading: "2. Gravenor: The Ashen Hunt (80 HP)",
          content: [
            "Phase 1 (The Watcher, 80-61 HP): High SPD kite. [span_11](start_span)'Stalk' targets the lowest DEF player, applies Bleed on 15+ [cite: 518-520].",
            "Phase 2 (The Hunter, 60-31 HP): 'Call of the Pack' spawns 2d4 Wolves. [cite_start]Gravenor gains Advantage on players engaged by wolves [cite: 521-523].",
            "Phase 3 (The Feral, 30-1 HP): Discards armor (SPD doubles, DEF drops 2). [cite_start]Attacks twice per round, 25% chance to Stun [cite: 524-527]."
          ]
        },
        {
          heading: "3. Valdris: The Unmourned Chancellor (60 HP)",
          content: [
            "Phase 1 (The Diplomat, 60-41 HP): Uses Phantom summons. [cite_start]'Debt Collection' forces a CHA vs WIS roll; failure loses 100c from the player's bank [cite: 529-532].",
            "Phase 2 (The Negotiator, 40-16 HP): Floor collapses. [cite_start]Applies 'Weight of the Crown', every inventory item reduces SPD by -1 [cite: 532-535].",
            "Phase 3 (The Unmourned, 15-1 HP): Melee powerhouse. [cite_start]'Void Bankruptcy' strikes ignore DEF and heal him for 50% of damage dealt [cite: 535-537]."
          ]
        },
        {
          heading: "4. Thessaly Vane: The Burned Cartographer (70 HP)",
          content: [
            [cite_start]"Phase 1 (The Guide, 70-46 HP): Draws glowing trap lines on the floor (Perception 15+ to see, 2d6 Fire damage) [cite: 538-541].",
            "Phase 2 (The Architect, 45-21 HP): Remaps the room. Moving more than 10ft requires a d20; [cite_start]1-5 teleports back to start [cite: 541-545].",
            "Phase 3 (The Burned, 20-1 HP): Erases the room. [cite_start]If not defeated in 3 rounds, she self-destructs for 50 damage and locks the map [cite: 546-548]."
          ]
        },
        {
          heading: "5. The Null Warden (150 HP)",
          content: [
            "Phase 1 (The Boundary, 150-101 HP): Zero Gravity. [cite_start]SPD ignored; movement dictated by STR pushing off objects [cite: 549-551].",
            "Phase 2 (The Warden, 100-51 HP): Sweeping light beams. [cite_start]Caught players roll their Shadow Trait immediately [cite: 552-554].",
            "Phase 3 (The Keeper, 50-1 HP): Event Horizon absorbs all magic. No spells allowed. [cite_start]Warden victories result in permanent Character Deletion [cite: 555-558]."
          ]
        },
        {
          heading: "6. The Boss Reward Math",
          content: [
            [cite_start]"The MVP Bonus: Player dealing the final blow receives a Unique Boss Artifact (e.g., Gravenor's Pelt)[span_11](end_span).",
            [span_12](start_span)"The Split Pot: The 30,000c Raid Pot is divided among all surviving players and deposited into their Bank wallets[span_12](end_span)."
          ]
        }
      ]
    },
    {
      id: 'calamities',
      title: 'CHAPTER 9: THE CALAMITY SYSTEM',
      sections: [
        {
          heading: "1. The Blood Moon (The Primal Surge)",
          content: [
            [span_13](start_span)"Trigger: Ashen Pack gains 10% Territory or a Player kills a non-hostile animal[span_13](end_span).",
            "Effects: All Beasts gain +2 ATK and +5 SPD. Players cannot heal by resting; must deal damage for 10% Life-Steal. [span_14](start_span)Chests 20% more likely to drop Bestial rare items [cite: 570-573]."
          ]
        },
        {
          heading: "2. The Rift Tear (The Static Leak)",
          content: [
            [cite_start]"Trigger: Wizard rolls a Natural 1 on a Tier 3 spell, or a violent Boss Phase Shift[span_14](end_span).",
            "Effects: Spells cost 0c but have 50% chance to target a random player. Every 3 rounds, d20 roll: 1-5 teleports the party 50ft randomly. [span_15](start_span)Random glitched items drop [cite: 578-581]."
          ]
        },
        {
          heading: "3. The Void-Frost (The Absolute Zero)",
          content: [
            [cite_start]"Trigger: The Null Warden is not challenged for 3 consecutive Arcs[span_15](end_span).",
            "Effects: Thermal Drain removes 1 HP every 10 minutes unless near a heat source. Armor DEF reduced by -2. [span_16](start_span)Weapons have 10% chance to shatter on Fumbles [cite: 587-589]."
          ]
        },
        {
          heading: "4. The Debtor's Eclipse (The Golden Dark)",
          content: [
            [cite_start]"Trigger: Sunken Library or Kingdom Garrison reaches 80% Wealth control[span_16](end_span).",
            "Effects: Every movement costs 1 coin. Combat can be bypassed by paying enemy Life Value (Standard 100c, Elite 1,000c). [cite_start]Chests hold 500% more coins, but all items carry Permanent Debt Curses [cite: 594-596]."
          ]
        }
      ]
    }
