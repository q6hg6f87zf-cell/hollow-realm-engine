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
