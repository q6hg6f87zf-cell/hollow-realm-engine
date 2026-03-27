import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- THE LORE & LOGIC DICTIONARY ---
// This automates the dropdowns. If a race isn't picked, sub-lineages don't exist.
const forgeData = {
  "Human": {
    subLineages: ["Frontiersman", "Corpo-Rat", "Drifter"],
    classes: {
      "Frontiersman": ["Gunslinger", "Tracker", "Brawler"],
      "Corpo-Rat": ["Hacker", "Negotiator", "Smuggler"],
      "Drifter": ["Scavenger", "Blade-Dancer"]
    }
  },
  "Revenant": {
    subLineages: ["Awakened", "Cursed"],
    classes: {
      "Awakened": ["Soul-Reaper", "Blood-Mage"],
      "Cursed": ["Feral", "Shadow-Walker"]
    }
  }
};

export default function CharacterForge({ onCharacterCreate }) {
  // --- FORGE STATE MANAGEMENT ---
  const [charName, setCharName] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // Base Stats (Can be edited by the player)
  const [stats, setStats] = useState({ strength: 10, agility: 10, grit: 10, aura: 10 });

  // --- AUTOMATION TRIGGERS ---
  // Reset downstream choices if a parent choice changes
  useEffect(() => {
    setSelectedSub('');
    setSelectedClass('');
  }, [selectedRace]);

  useEffect(() => {
    setSelectedClass('');
  }, [selectedSub]);

  // --- PHOTO UPLOAD HANDLER ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creates a temporary local URL to preview the image immediately
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };

  // --- SUBMIT HANDLER ---
  const handleForge = (e) => {
    e.preventDefault();
    if (!charName || !selectedClass) return alert("Incomplete Data. The Forge requires a name and a class.");

    const newCharacter = {
      id: Date.now(), // Unique ID for database tracking
      name: charName,
      race: selectedRace,
      subLineage: selectedSub,
      charClass: selectedClass,
      photo: photoPreview,
      stats: stats,
      status: "Alive", // Hooks into the Graveyard logic later
      inventory: [] // Hooks into Arsenal later
    };

    // Sends the data back to MainMenuTab to store in the Squad Roster
    onCharacterCreate(newCharacter);
    alert(`${charName} has been forged and added to the roster.`);
  };

  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-neutral-900/90 text-gray-200">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-8 border-b border-red-800 pb-4">
          <h2 className="text-4xl font-black uppercase tracking-widest text-red-600 drop-shadow-sm">
            The Character Forge
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-2">Initialize new operative for The Hollow Realm.</p>
        </header>

        <form onSubmit={handleForge} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMN 1: VISUALS & IDENTITY */}
          <div className="col-span-1 space-y-6 bg-black p-6 border border-neutral-800 rounded-sm shadow-xl">
            <div>
              <label className="block text-xs uppercase text-red-500 font-bold mb-2">Operative Designation</label>
              <input 
                type="text" 
                className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-red-500 focus:outline-none"
                placeholder="Enter Name..."
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
              />
            </div>

            {/* Photo Upload Area */}
            <div>
              <label className="block text-xs uppercase text-red-500 font-bold mb-2">Mugshot / Visual ID</label>
              <div className="relative w-full h-64 bg-neutral-900 border-2 border-dashed border-neutral-700 flex items-center justify-center overflow-hidden hover:border-red-500 transition-colors cursor-pointer group">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-neutral-500 text-sm font-mono group-hover:text-red-400">UPLOAD CLASSIFIED PHOTO</span>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
          </div>

          {/* COLUMN 2: THE AUTOMATED LINEAGE TREE */}
          <div className="col-span-1 space-y-6 bg-black p-6 border border-neutral-800 rounded-sm shadow-xl">
            
            {/* 1. Race Selection */}
            <div>
              <label className="block text-xs uppercase text-red-500 font-bold mb-2">Primary Race</label>
              <select 
                className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-red-500 focus:outline-none"
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.target.value)}
              >
                <option value="">-- Select Origin --</option>
                {Object.keys(forgeData).map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>

            {/* 2. Sub-lineage (Only appears if Race is selected) */}
            {selectedRace && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-xs uppercase text-red-500 font-bold mb-2 mt-4">Bloodline / Sub-Lineage</label>
                <select 
                  className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-red-500 focus:outline-none"
                  value={selectedSub}
                  onChange={(e) => setSelectedSub(e.target.value)}
                >
                  <option value="">-- Select Bloodline --</option>
                  {forgeData[selectedRace].subLineages.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* 3. Class (Only appears if Sub-lineage is selected) */}
            {selectedSub && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-xs uppercase text-red-500 font-bold mb-2 mt-4">Combat Class</label>
                <select 
                  className="w-full bg-neutral-900 border border-neutral-700 p-3 text-white focus:border-red-500 focus:outline-none"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">-- Select Specialization --</option>
                  {forgeData[selectedRace].classes[selectedSub].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>

          {/* COLUMN 3: STAT CALIBRATION & EXECUTION */}
          <div className="col-span-1 space-y-6 bg-black p-6 border border-neutral-800 rounded-sm shadow-xl flex flex-col justify-between">
            <div>
              <label className="block text-xs uppercase text-red-500 font-bold mb-4">Initial Calibration (Stats)</label>
              {Object.keys(stats).map((stat) => (
                <div key={stat} className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 uppercase text-xs font-mono">{stat}</span>
                  <input 
                    type="number" 
                    className="w-20 bg-neutral-900 border border-neutral-700 p-2 text-center text-white focus:border-red-500"
                    value={stats[stat]}
                    onChange={(e) => setStats({...stats, [stat]: parseInt(e.target.value) || 0})}
                  />
                </div>
              ))}
            </div>

            <button 
              type="submit"
              className="w-full bg-red-800 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 mt-8 transition-colors border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
            >
              Forge Operative
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
