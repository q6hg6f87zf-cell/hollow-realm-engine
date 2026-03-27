import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For cinematic transitions

// THE HEAVY MODULES (To be built out in their own files)
import PlayerCards from './PlayerCards'; 
import CharacterForge from './CharacterForge';
import ArsenalEngine from './ArsenalEngine';
import WorldMap3D from './WorldMap3D';
import NPCDirectory from './NPCDirectory';
import VillainCodex from './VillainCodex';
import MemorialHub from './MemorialHub'; // Graveyard & Hall of Fame

export default function MainMenuTab() {
  // --- GLOBAL STATE MANAGEMENT ---
  const [activeView, setActiveView] = useState('map'); // Default to the 3D Map view
  
  // Roster State (Handles Edit Cards, Photo Uploads)
  const [squadRoster, setSquadRoster] = useState([]); 
  
  // Map State (6 Locations, Pins, 3D camera angles)
  const [activeLocation, setActiveLocation] = useState(null);

  // Core Navigation Array (Western/Narcos aesthetic names)
  const navItems = [
    { id: 'forge', label: 'The Forge' },
    { id: 'roster', label: 'Squad Cards' },
    { id: 'arsenal', label: 'The Arsenal' },
    { id: 'map', label: 'Tactical Map' },
    { id: 'npcs', label: 'Local Assets (NPCs)' },
    { id: 'villains', label: 'Targets (Villains)' },
    { id: 'memorial', label: 'The Memorial' }
  ];

  // --- ENGINE ROUTER ---
  // This switch statement loads the massive subsystems without crashing the browser
  const renderActiveModule = () => {
    switch(activeView) {
      case 'forge':
        return <CharacterForge onCharacterCreate={(char) => setSquadRoster([...squadRoster, char])} />;
      case 'roster':
        return <PlayerCards rosterData={squadRoster} updateRoster={setSquadRoster} />;
      case 'arsenal':
        return <ArsenalEngine />; // Handles Class-locks, Enchantments, Loot Bin
      case 'map':
        return <WorldMap3D activeLocation={activeLocation} setLocation={setActiveLocation} />;
      case 'npcs':
        return <NPCDirectory />; // Hireables and World look-ups
      case 'villains':
        return <VillainCodex />; // Phase levels, Stats, Sensory Lore (Smell/Aura)
      case 'memorial':
        return <MemorialHub />; // Graveyard and Hall of Fame logic
      default:
        return <WorldMap3D />;
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-900 text-gray-100 flex overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION - Gritty, High-Contrast UI */}
      <nav className="w-64 bg-black border-r border-red-900/50 flex flex-col shadow-2xl z-50">
        <div className="p-6 border-b border-red-900/30">
          <h1 className="text-3xl font-bold tracking-tighter text-red-700 uppercase drop-shadow-md">
            The Hollow Realm
          </h1>
          <p className="text-xs text-gray-500 tracking-widest mt-1">Moon Squad HQ // Server Online</p>
        </div>

        <ul className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`w-full text-left px-6 py-4 font-semibold transition-all duration-300 ${
                  activeView === item.id 
                    ? 'bg-red-900/20 text-red-500 border-l-4 border-red-600' 
                    : 'text-gray-400 hover:bg-neutral-800 hover:text-gray-200'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* MAIN CONTENT STAGE - Dynamic Module Loading */}
      <main className="flex-1 relative bg-[url('/assets/textures/gritty-dark-wood.png')] bg-cover bg-center">
        {/* Cinematic Fade transitions between heavy tabs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderActiveModule()}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
