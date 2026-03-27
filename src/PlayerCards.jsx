import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlayerCards({ rosterData, updateRoster }) {
  // --- SUB-NAVIGATION STATE ---
  // Toggles between the Living, the Dead, and the Legends
  const [viewMode, setViewMode] = useState('active'); // 'active', 'graveyard', 'legend'
  
  // --- EDITING STATE ---
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // --- ACTIONS ---
  // Initiate edit mode
  const startEditing = (character) => {
    setEditingId(character.id);
    setEditFormData({ ...character });
  };

  // Save the edited data back to the global roster
  const saveEdit = () => {
    const updatedRoster = rosterData.map(char => 
      char.id === editingId ? editFormData : char
    );
    updateRoster(updatedRoster);
    setEditingId(null);
  };

  // Move a character between states (e.g., Active -> Graveyard)
  const changeStatus = (id, newStatus) => {
    let causeOfDeath = "";
    let sensoryLore = "";

    if (newStatus === "Dead") {
      causeOfDeath = prompt("Enter Cause of Death (e.g., 'Gutted by a Phase 2 Revenant'):");
      sensoryLore = prompt("Sensory Lore: How does their corpse smell? (e.g., 'Gunpowder and copper'):");
    }

    const updatedRoster = rosterData.map(char => {
      if (char.id === id) {
        return { 
          ...char, 
          status: newStatus, 
          deathLore: causeOfDeath || char.deathLore,
          deathScent: sensoryLore || char.deathScent
        };
      }
      return char;
    });
    updateRoster(updatedRoster);
  };

  // --- FILTERING LORE ---
  const activeOperatives = rosterData.filter(c => c.status === 'Alive');
  const fallenOperatives = rosterData.filter(c => c.status === 'Dead');
  const legendaryOperatives = rosterData.filter(c => c.status === 'Legend');

  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-neutral-900/95 text-gray-200">
      
      {/* HEADER & ROSTER TABS */}
      <header className="mb-8 border-b border-neutral-700 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-widest text-white drop-shadow-md">
            Moon Squad <span className="text-red-600">Manifest</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-1">Classified Personnel Data // Edit Authority: Admin</p>
        </div>
        
        <div className="flex space-x-2 bg-black p-1 border border-neutral-800">
          <button 
            onClick={() => setViewMode('active')}
            className={`px-6 py-2 uppercase font-bold text-xs tracking-wider transition-all ${viewMode === 'active' ? 'bg-red-800 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Active Duty ({activeOperatives.length})
          </button>
          <button 
            onClick={() => setViewMode('graveyard')}
            className={`px-6 py-2 uppercase font-bold text-xs tracking-wider transition-all ${viewMode === 'graveyard' ? 'bg-neutral-700 text-gray-300 shadow-inner' : 'text-gray-500 hover:text-white'}`}
          >
            Graveyard ({fallenOperatives.length})
          </button>
          <button 
            onClick={() => setViewMode('legend')}
            className={`px-6 py-2 uppercase font-bold text-xs tracking-wider transition-all ${viewMode === 'legend' ? 'bg-yellow-600 text-black shadow-[0_0_15px_rgba(202,138,4,0.5)]' : 'text-gray-500 hover:text-white'}`}
          >
            Hall of Fame ({legendaryOperatives.length})
          </button>
        </div>
      </header>

      {/* RENDER THE SELECTED VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          
          {/* VIEW: ACTIVE DUTY */}
          {viewMode === 'active' && activeOperatives.map(char => (
            <motion.div 
              key={char.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black border border-neutral-700 rounded-sm shadow-2xl relative overflow-hidden group"
            >
              {/* Photo Area with Narcos/Gritty styling */}
              <div className="h-48 w-full border-b border-neutral-800 relative bg-neutral-900">
                {char.photo ? (
                   <img src={char.photo} alt="Mugshot" className="w-full h-full object-cover filter contrast-125 grayscale-[30%]" />
                ) : (
                   <div className="flex items-center justify-center h-full text-neutral-600 font-mono text-xs">NO VISUAL ID</div>
                )}
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Active</div>
              </div>

              {/* Data & Editing Area */}
              <div className="p-5">
                {editingId === char.id ? (
                  // EDIT MODE: Real-time stat manipulation
                  <div className="space-y-3">
                    <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-neutral-800 border-b border-red-500 text-xl font-bold p-1 focus:outline-none text-white uppercase" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.keys(editFormData.stats).map(stat => (
                        <div key={stat} className="flex justify-between items-center bg-neutral-900 p-1">
                          <span className="text-xs text-gray-400 uppercase">{stat}</span>
                          <input type="number" value={editFormData.stats[stat]} onChange={(e) => setEditFormData({...editFormData, stats: {...editFormData.stats, [stat]: parseInt(e.target.value)}})} className="w-12 bg-black text-white text-center text-sm border border-neutral-700" />
                        </div>
                      ))}
                    </div>
                    <button onClick={saveEdit} className="w-full bg-red-700 hover:bg-red-600 text-white text-xs font-bold py-2 mt-2">SAVE DATA</button>
                  </div>
                ) : (
                  // VIEW MODE: Standard Display
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">{char.name}</h3>
                    <p className="text-red-500 font-mono text-xs mb-4">{char.race} // {char.subLineage} // {char.charClass}</p>
                    
                    <div className="grid grid-cols-4 gap-1 mb-4">
                      {Object.keys(char.stats).map(stat => (
                        <div key={stat} className="bg-neutral-900 text-center p-2 border border-neutral-800">
                          <div className="text-[9px] text-gray-500 uppercase">{stat}</div>
                          <div className="text-lg font-bold text-gray-200">{char.stats[stat]}</div>
                        </div>
                      ))}
                    </div>

                    {/* Operational Commands */}
                    <div className="flex space-x-2 mt-4 pt-4 border-t border-neutral-800">
                      <button onClick={() => startEditing(char)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-gray-300 text-[10px] font-bold py-2 uppercase border border-neutral-600">Edit File</button>
                      <button onClick={() => changeStatus(char.id, 'Dead')} className="flex-1 bg-red-900/30 hover:bg-red-900 text-red-500 hover:text-white text-[10px] font-bold py-2 uppercase border border-red-900 transition-colors">Mark KIA</button>
                      <button onClick={() => changeStatus(char.id, 'Legend')} className="flex-1 bg-yellow-900/20 hover:bg-yellow-600 text-yellow-600 hover:text-black text-[10px] font-bold py-2 uppercase border border-yellow-700 transition-colors">Ascend</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* VIEW: THE GRAVEYARD */}
          {viewMode === 'graveyard' && fallenOperatives.map(char => (
            <motion.div 
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1818] border-2 border-neutral-800 rounded-sm shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-900/5 mix-blend-overlay pointer-events-none"></div>
              
              <div className="h-40 w-full relative bg-black sepia-[.8] opacity-70">
                {char.photo ? <img src={char.photo} alt="Mugshot" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-neutral-800 font-mono text-xs">NO BODY RECOVERED</div>}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-red-600 border-2 border-red-600 px-4 py-1 text-2xl font-black transform -rotate-12 uppercase tracking-widest opacity-80">Deceased</span>
                </div>
              </div>

              <div className="p-5 relative z-10">
                <h3 className="text-xl font-black uppercase text-gray-500 line-through">{char.name}</h3>
                <p className="text-neutral-500 font-mono text-xs mb-4">{char.charClass}</p>
                
                <div className="bg-black border border-neutral-800 p-3 space-y-2">
                  <div>
                    <span className="text-red-900 text-[10px] uppercase font-bold block">Cause of Death:</span>
                    <span className="text-gray-400 text-sm font-mono italic">{char.deathLore || "Classified/Unknown"}</span>
                  </div>
                  <div>
                    <span className="text-red-900 text-[10px] uppercase font-bold block">Sensory Profile (Scent):</span>
                    <span className="text-gray-400 text-sm font-mono italic">{char.deathScent || "Cold dust."}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* VIEW: HALL OF FAME */}
          {viewMode === 'legend' && legendaryOperatives.map(char => (
            <motion.div 
              key={char.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black border border-yellow-600 rounded-sm shadow-[0_0_30px_rgba(202,138,4,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"></div>
              
              <div className="h-56 w-full relative bg-neutral-900">
                {char.photo ? <img src={char.photo} alt="Legend" className="w-full h-full object-cover contrast-125" /> : null}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent h-24"></div>
                <div className="absolute bottom-2 left-4 text-yellow-500 text-xs font-bold uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse mr-2"></span> Immortalized
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">{char.name}</h3>
                <p className="text-yellow-700 font-mono text-sm mb-4">Legendary {char.charClass}</p>
                
                {/* Artifact / Stat Display for Legends */}
                <div className="grid grid-cols-2 gap-2 border-t border-yellow-900/30 pt-4">
                   <div className="bg-neutral-900 p-2 text-center">
                      <div className="text-[10px] text-yellow-700 uppercase">Final Grit</div>
                      <div className="text-xl font-bold text-yellow-500">{char.stats.grit}</div>
                   </div>
                   <div className="bg-neutral-900 p-2 text-center">
                      <div className="text-[10px] text-yellow-700 uppercase">Final Aura</div>
                      <div className="text-xl font-bold text-yellow-500">{char.stats.aura}</div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}

        </AnimatePresence>
      </div>
    </div>
  );
}
