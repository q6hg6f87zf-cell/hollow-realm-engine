import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Sphere, Trail } from '@react-three/drei';
import { HollowRealmProvider } from './HollowRealmContext';
import { ChevronDown, MapPin, Sword, Scale, User, Scroll, Shield, Gem, Users, ShoppingBag, Crosshair, Target, BookOpen } from 'lucide-react';

// --- ACTIVE MODULES ---
import LiveCombatHUD from './LiveCombatHUD';
import PlayerBankUI from './PlayerBankUI';
import ForgeSocketingUI from './ForgeSocketingUI';
import CharacterForgeUI from './CharacterForgeUI';
import CalamityAndBossTab from './CalamityAndBossTab';
import PlayerSystemsHUD from './PlayerSystemsHUD';
import LootModeUI from './LootModeUI';
import HQUpgradesTab from './HQUpgradesTab';
import FieldKitsTab from './FieldKitsTab';
import ExpandedArsenalUI from './ExpandedArsenalUI';
import RealmCodexTab from './RealmCodexTab'; // <-- THE HANDBOOK IS WIRED IN

export const triggerHaptic = (type = 'click') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'click') navigator.vibrate(15);
    if (type === 'calamity') navigator.vibrate([100, 50, 100, 50, 200]);
  }
};

// --- GLOBAL CINEMATIC STYLES ---
const CinematicStyles = () => (
  <style>{`
    :root {
      --epic-gold: #d97706;
      --epic-text: #f3f4f6;
    }
    body {
      background-color: #000;
      color: var(--epic-text);
      font-family: 'Futura Condensed', 'Inter', sans-serif;
      letter-spacing: 0.02em;
    }
    .glass-panel {
      background: rgba(15, 15, 20, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.7);
      border-radius: 8px;
    }
    .glass-header {
      background: linear-gradient(to bottom, rgba(5,5,10,0.9), rgba(5,5,10,0.4));
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-category {
      background: rgba(0, 0, 0, 0.4);
      border-right: 1px solid rgba(255,255,255,0.05);
    }
    .epic-btn-hover:hover {
      background: rgba(217, 119, 6, 0.15);
      color: var(--epic-gold);
      border-color: rgba(217, 119, 6, 0.5);
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// --- 3D BACKGROUND ELEMENTS ---
function CelestialNavigation() {
  const starMaterial = <meshStandardMaterial emissive="#fff" emissiveIntensity={1} color="#fff" />;
  return (
    <group>
      <Sphere args={[0.08, 16, 16]} position={[-4, 6, 2]}>{starMaterial}</Sphere>
      <group position={[3, 4, -8]} rotation={[0, 0, 0.5]}>
        <Sphere args={[0.04, 16, 16]} position={[-0.5, 0, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 16, 16]} position={[0, 0, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 16, 16]} position={[0.5, 0, 0]}>{starMaterial}</Sphere>
      </group>
    </group>
  );
}

function AsteroidFlyby() {
  const asteroidRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (asteroidRef.current) {
      asteroidRef.current.position.x = 20 - (time * 1.5) % 40; 
      asteroidRef.current.position.y = 4 + Math.sin(time * 0.5) * 2;
      asteroidRef.current.position.z = -6;
      asteroidRef.current.rotation.x += 0.005;
      asteroidRef.current.rotation.y += 0.01;
    }
  });
  return (
    <Trail width={1.2} color="#d97706" length={8} decay={1.2}>
      <mesh ref={asteroidRef}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#3f3f46" roughness={1} />
      </mesh>
    </Trail>
  );
}

function MapZone({ position, name, id, activeZone, onClick }) {
  const isActive = activeZone === id;
  return (
    <mesh position={position} onClick={() => onClick(id)}>
      <boxGeometry args={[1.6, isActive ? 2.5 : 1, 1.6]} />
      <meshStandardMaterial color={isActive ? "#d97706" : "#4b5563"} opacity={0.8} transparent />
    </mesh>
  );
}

function FateEngine() {
  const [roll, setRoll] = useState('--');
  const [dieType, setDieType] = useState('d20');
  const [showDice, setShowDice] = useState(false);

  const rollDice = (max) => {
    triggerHaptic('click');
    const result = Math.floor(Math.random() * max) + 1;
    setDieType(`d${max}`);
    setRoll(result);
    if ((max === 20 && result === 20) || (max === 100 && result === 100)) triggerHaptic('calamity');
  };

  const dice = [4, 6, 8, 12, 20, 100];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${showDice ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'}`}>
        <button onClick={() => setShowDice(!showDice)} className="w-full h-12 glass-panel rounded-b-none border-b-0 flex items-center justify-between px-6 epic-btn-hover cursor-pointer">
            <span className="text-xs text-zinc-300 uppercase font-black tracking-widest flex items-center gap-2">
                <ChevronDown className={`transition-transform duration-300 ${showDice ? 'rotate-180' : ''}`} size={18}/> 
                Fate Engine
            </span>
            <span className="text-amber-500 text-xs uppercase font-black tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 shadow-[0_0_10px_rgba(217,119,6,0.2)]">
                {dieType}: {roll}
            </span>
        </button>

        <div className="glass-panel rounded-t-none border-t-0 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-48 h-32 bg-black/50 border border-white/10 rounded-lg flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/20"></div>
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1 z-10">{dieType}</span>
                <span className={`text-6xl font-black z-10 ${roll === 20 && dieType === 'd20' ? 'text-amber-400 animate-pulse' : 'text-white'}`}
                style={{ textShadow: roll === 20 && dieType === 'd20' ? '0 0 20px rgba(217, 119, 6, 0.8)' : '0 2px 10px rgba(0,0,0,0.8)' }}>
                {roll}
                </span>
            </div>
            
            <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-3 w-full">
                {dice.map(d => (
                <button key={d} onClick={() => rollDice(d)} className="bg-white/5 border border-white/10 text-lg font-black text-zinc-300 py-4 rounded-lg transition-all uppercase epic-btn-hover hover:-translate-y-1 hover:shadow-lg">
                    d{d}
                </button>
                ))}
            </div>
        </div>
    </div>
  );
}

export default function App() {
  const [activeZone, setActiveZone] = useState('hq');
  const [uiVisible, setUiVisible] = useState(true);
  const [activeScreen, setActiveScreen] = useState('worldMap');

  // --- RESTRUCTURED GM NAVIGATION (Now includes the Codex) ---
  const navCategories = {
    "Live Operations": [
      { id: 'combat', name: 'Combat', icon: <Sword size={14} />, screen: 'combat' },
      { id: 'worldMap', name: 'Map', icon: <MapPin size={14} />, screen: 'worldMap' },
      { id: 'boss', name: 'Bosses', icon: <Scroll size={14} />, screen: 'boss' },
    ],
    "Loot & Logistics": [
      { id: 'loot', name: 'Loot', icon: <Gem size={14} />, screen: 'loot' },
      { id: 'bank', name: 'Bank', icon: <Scale size={14} />, screen: 'bank' },
      { id: 'arsenal', name: 'Arsenal', icon: <Crosshair size={14} />, screen: 'arsenal' },
      { id: 'kits', name: 'Kits', icon: <ShoppingBag size={14} />, screen: 'kits' },
    ],
    "Systems & HQ": [
      { id: 'character', name: 'Create', icon: <User size={14} />, screen: 'character' },
      { id: 'forge', name: 'Forge', icon: <Shield size={14} />, screen: 'forge' },
      { id: 'systems', name: 'Systems', icon: <Users size={14} />, screen: 'systems' },
      { id: 'hq', name: 'HQ', icon: <Target size={14} />, screen: 'hq' },
      { id: 'codex', name: 'Codex', icon: <BookOpen size={14} />, screen: 'codex' }, // HANDBOOK ADDED HERE
    ]
  };

  const navBtnStyle = (screen) => `px-4 py-3 font-bold uppercase tracking-widest text-[10px] transition-all whitespace-nowrap flex items-center gap-2 border-b-2
    ${activeScreen === screen ? 'border-amber-500 text-amber-400 bg-white/5' : 'border-transparent text-zinc-400 hover:bg-white/5 hover:text-white'}
  `;

  return (
    <HollowRealmProvider>
      <CinematicStyles />
      
      {/* THE MASTER BACKGROUND LAYER - Using your exact filename */}
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950"
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(10,10,15,0.4), rgba(10,10,15,0.85)), url('/IMG_5225.png')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed'
           }}>
        
        {/* EPIC HEADER W/ LOGO - Using your exact filename */}
        <header className="glass-header w-full p-4 flex justify-between items-center z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <img src="/IMG_5123.png" alt="The Hollow Realm" className="h-10 md:h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                 onError={(e) => { e.target.style.display='none'; }} /> 
            <div className="hidden md:block">
               <h1 className="text-xl font-black text-white tracking-widest uppercase shadow-black drop-shadow-md">Hollow Realm</h1>
               <div className="text-[9px] text-amber-500 tracking-widest font-black uppercase">Live // Moon Squad</div>
            </div>
          </div>
        </header>

        {/* RESTRUCTURED NAVIGATION */}
        <nav className="flex overflow-x-auto glass-header z-20 sticky top-[72px] scrollbar-hide divide-x divide-white/10">
          {Object.entries(navCategories).map(([categoryName, tabs]) => (
            <div key={categoryName} className="flex nav-category">
               <div className="px-3 py-3 flex items-center justify-center bg-black/40">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest whitespace-nowrap origin-center -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    {categoryName}
                  </span>
               </div>
               <div className="flex">
                 {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => { triggerHaptic(); setActiveScreen(tab.screen); }} className={navBtnStyle(tab.screen)}>
                      {tab.icon} {tab.name}
                    </button>
                 ))}
               </div>
            </div>
          ))}
        </nav>

        {/* 3D MAP CANVAS */}
        {activeScreen === 'worldMap' && (
          <div className="absolute inset-0 z-0 pt-[120px]">
            <Canvas camera={{ position: [0, 6, 12], fov: 50 }}>
              <ambientLight intensity={0.3} color="#fff" />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#d97706" />
              <OrbitControls autoRotate autoRotateSpeed={0.3} enablePan={false} maxPolarAngle={Math.PI / 2.1} />
              <Sparkles count={200} scale={15} size={2} speed={0.2} color="#fff" opacity={0.4} />
              <Stars radius={50} depth={50} count={3000} factor={4} fade speed={1} />
              <CelestialNavigation />
              <AsteroidFlyby />
              <group>
                 <MapZone position={[-4, 0, 2]} name="Moon Squad HQ" id="hq" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[0, 0, 2]} name="Dark Forest" id="forest" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[4, 0, 2]} name="Kingdom" id="kingdom" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              </group>
            </Canvas>
          </div>
        )}

        {/* CONTENT MOUNTING POINT */}
        <main className={`flex-1 p-4 md:p-8 overflow-y-auto relative z-10 ${!uiVisible ? 'hidden' : ''} pb-32`}>
          <div className='max-w-7xl mx-auto'>
            {activeScreen === 'combat' && <LiveCombatHUD />}
            {activeScreen === 'bank' && <PlayerBankUI />}
            {activeScreen === 'forge' && <ForgeSocketingUI />}
            {activeScreen === 'character' && <CharacterForgeUI />}
            {activeScreen === 'boss' && <CalamityAndBossTab />}
            {activeScreen === 'systems' && <PlayerSystemsHUD />}
            {activeScreen === 'loot' && <LootModeUI />}
            {activeScreen === 'hq' && <HQUpgradesTab />}
            {activeScreen === 'kits' && <FieldKitsTab />}
            {activeScreen === 'arsenal' && <ExpandedArsenalUI />}
            {activeScreen === 'codex' && <RealmCodexTab />} {/* THE HANDBOOK MOUNTS HERE */}
            
            {activeScreen === 'worldMap' && (
              <div className="fixed top-36 left-8 glass-panel p-5 w-64 border-l-4 border-l-amber-500">
                <h3 className="text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2 text-[10px] mb-2">
                  <Target size={14} className="text-amber-500"/> Zone Oracle
                </h3>
                <p className="text-xl text-white uppercase font-black tracking-tight drop-shadow-md">{activeZone.toUpperCase()}</p>
              </div>
            )}
          </div>
        </main>

        <FateEngine />

        <button 
          onClick={() => { triggerHaptic('click'); setUiVisible(!uiVisible); }} 
          className="fixed bottom-[80px] right-4 z-40 glass-panel text-zinc-400 hover:text-white text-[10px] uppercase font-bold px-4 py-2 transition-all shadow-xl">
          Toggle UI [DEV]
        </button>

      </div>
    </HollowRealmProvider>
  );
}
