import { HollowRealmProvider } from './HollowRealmContext';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Sphere, Trail } from '@react-three/drei';

// --- IMPORTS FOR LATER (Commented out until we build the files) ---
 import CalamityAndBossTab from './CalamityAndBossTab';
 import LiveCombatHUD from './LiveCombatHUD';
 import ForgeSocketingUI from './ForgeSocketingUI';
 import BankTab from './BankTab';

// --- 1. MOON SQUAD HAPTIC ENGINE ---
export const triggerHaptic = (type = 'click') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'click') navigator.vibrate(15);
    if (type === 'calamity') navigator.vibrate([100, 50, 100, 50, 200]);
  }
};

// --- 2. CSS ANIMATIONS (Seismic Shake & Submerged) ---
const BossStyles = () => (
  <style>{`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px) rotate(-1deg); }
      75% { transform: translateX(5px) rotate(1deg); }
    }
    .animate-seismic-shake {
      animation: shake 0.4s ease-in-out infinite;
      border-color: #ef4444 !important;
    }
    @keyframes waterRipple {
      0% { filter: hue-rotate(0deg) blur(0px); }
      50% { filter: hue-rotate(15deg) blur(1px); transform: scale(1.01); }
      100% { filter: hue-rotate(0deg) blur(0px); }
    }
    .animate-submerged {
      animation: waterRipple 3s infinite ease-in-out;
      background-color: rgba(6, 182, 212, 0.05) !important;
      border-color: #06b6d4 !important;
    }
  `}</style>
);

// --- 3. CELESTIAL NAVIGATION ---
function CelestialNavigation() {
  const starMaterial = <meshStandardMaterial emissive="#f472b6" emissiveIntensity={2} color="#fff" />;
  return (
    <group>
      {/* Polaris */}
      <Sphere args={[0.1, 8, 8]} position={[-4, 6, 2]}>{starMaterial}</Sphere>
      {/* Orion's Belt */}
      <group position={[3, 4, -8]} rotation={[0, 0, 0.5]}>
        <Sphere args={[0.05, 8, 8]} position={[-0.5, 0, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.05, 8, 8]} position={[0, 0, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.05, 8, 8]} position={[0.5, 0, 0]}>{starMaterial}</Sphere>
      </group>
      {/* Cassiopeia */}
      <group position={[6, 3, -4]} rotation={[0.2, -0.4, 0]}>
        <Sphere args={[0.04, 8, 8]} position={[-1, 0.5, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 8, 8]} position={[-0.5, -0.2, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 8, 8]} position={[0, 0.3, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 8, 8]} position={[0.5, -0.4, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 8, 8]} position={[1, 0.6, 0]}>{starMaterial}</Sphere>
      </group>
    </group>
  );
}

// --- 4. ASTEROID FLY-BY ---
function AsteroidFlyby() {
  const asteroidRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (asteroidRef.current) {
      asteroidRef.current.position.x = 20 - (time * 1.5) % 40; 
      asteroidRef.current.position.y = 4 + Math.sin(time * 0.5) * 2;
      asteroidRef.current.position.z = -6;
      asteroidRef.current.rotation.x += 0.01;
      asteroidRef.current.rotation.y += 0.02;
    }
  });
  return (
    <Trail width={1.5} color="#d97706" length={10} decay={1} attenuation={(t) => t * t}>
      <mesh ref={asteroidRef}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.9} />
      </mesh>
    </Trail>
  );
}

// --- 5. THE 3D MAP PILLAR ---
function MapZone({ position, name, id, activeZone, onClick }) {
  const isActive = activeZone === id;
  return (
    <mesh position={position} onClick={() => onClick(id)}>
      {/* The pillar gets taller when selected */}
      <boxGeometry args={[1.5, isActive ? 2 : 1, 1.5]} />
      <meshStandardMaterial color={isActive ? "#d97706" : "#27272a"} />
    </mesh>
  );
}
// --- 7. THE GM DICE ROLLER ---
function ThreeDiceRoller() {
  const [roll, setRoll] = useState('--');
  const [dieType, setDieType] = useState('Awaiting Roll');

  const rollDice = (max) => {
    // Standard tactile click
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
    
    const result = Math.floor(Math.random() * max) + 1;
    setDieType(`d${max}`);
    setRoll(result);
    
    // Heavy rumble for a Nat 20 or Nat 100
    if ((max === 20 && result === 20) || (max === 100 && result === 100)) {
       if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  };

  const dice = [4, 6, 8, 12, 20, 100];

  return (
    <div className="bg-zinc-950 border-2 border-amber-900 p-4 rounded-xl flex flex-col items-center shadow-2xl w-full">
      <h3 className="text-amber-500 font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        Fate Engine
      </h3>
      
      {/* The Digital Readout */}
      <div className="bg-black border border-zinc-800 rounded w-full py-6 flex flex-col items-center justify-center mb-4 shadow-inner">
        <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">{dieType}</span>
        <span className={`text-5xl font-black ${
          roll === 20 && dieType === 'd20' ? 'text-green-500 animate-pulse' : 
          roll === 1 && dieType === 'd20' ? 'text-red-600' : 
          'text-white'
        }`}>
          {roll}
        </span>
      </div>

      {/* The Dice Pad */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {dice.map(d => (
          <button 
            key={d} 
            onClick={() => rollDice(d)}
            className="bg-zinc-900 hover:bg-amber-600 hover:text-black text-amber-500 border border-zinc-800 text-sm font-black py-3 rounded transition-colors uppercase tracking-widest"
          >
            d{d}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- 6. THE MASTER COMPONENT ---
export default function App() {
  const [activeZone, setActiveZone] = useState('hq');
  const [uiVisible, setUiVisible] = useState(true);
  const [activeScreen, setActiveScreen] = useState('worldMap'); // Controls which tab is active

  // Nav Button Style for mobile-friendly tabs
  const navBtn = (screen) => `px-4 py-3 font-bold uppercase tracking-wider text-[10px] transition-all border-b-2 whitespace-nowrap ${
    activeScreen === screen ? 'border-amber-500 text-amber-500 bg-zinc-900' : 'border-transparent text-zinc-500 hover:bg-zinc-800'
  }`;

  return (
    <HollowRealmProvider>
      <BossStyles />
      <div className="min-h-screen bg-black text-zinc-300 font-sans flex flex-col relative overflow-hidden">
        
        {/* GLOBAL HEADER */}
        <header className="bg-zinc-950 border-b border-zinc-800 p-4 flex justify-between items-center z-20">
          <h1 className="text-xl font-black text-amber-600 tracking-widest uppercase">The Hollow Realm</h1>
          <div className="text-[10px] text-zinc-500 tracking-widest">GM SUITE [LIVE]</div>
        </header>

        {/* MAIN NAVIGATION (SCROLLABLE TABS) */}
        <nav className="flex overflow-x-auto bg-zinc-950 border-b border-zinc-800 z-20 sticky top-0 scrollbar-hide">
          <button onClick={() => { triggerHaptic(); setActiveScreen('combat'); }} className={navBtn('combat')}>Combat</button>
          <button onClick={() => { triggerHaptic(); setActiveScreen('worldMap'); }} className={navBtn('worldMap')}>Map</button>
          <button onClick={() => { triggerHaptic(); setActiveScreen('bank'); }} className={navBtn('bank')}>Bank</button>
          <button onClick={() => { triggerHaptic(); setActiveScreen('forge'); }} className={navBtn('forge')}>Forge</button>
          <button onClick={() => { triggerHaptic(); setActiveScreen('character'); }} className={navBtn('character')}>Forge Character</button>
        </nav>

        {/* THE 3D BACKGROUND LAYER (Only visible on Map tab) */}
        {activeScreen === 'worldMap' && (
          <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at center, #450a0a 0%, #1a163a 50%, #000000 100%)" }}>
            <Canvas camera={{ position: [0, 6, 12], fov: 50 }}>
              <ambientLight intensity={0.4} color="#a855f7" />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#f472b6" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4fc3f7" />
              <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} maxPolarAngle={Math.PI / 2.1} />
              <Sparkles count={250} scale={15} size={2.5} speed={0.3} color="#d97706" opacity={0.6} />
              <Stars radius={50} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
              <CelestialNavigation />
              <AsteroidFlyby />
              <MapZone position={[-4, 0, 2]} name="Moon Squad HQ" id="hq" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              <MapZone position={[0, 0, 2]} name="Dark Enchanted Forest" id="forest" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              <MapZone position={[4, 0, 2]} name="Crumbling Kingdom" id="kingdom" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              <MapZone position={[-2, 0, -2]} name="Underground Caverns" id="caverns" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              <MapZone position={[2, 0, -2]} name="Sunken Library" id="library" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              <MapZone position={[0, 0, -5]} name="Hollow's Edge" id="edge" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
            </Canvas>
          </div>
        )}

        {/* CONTENT MOUNTING POINT */}
        <main className={`flex-1 p-4 overflow-y-auto relative z-10 ${!uiVisible ? 'hidden' : ''}`}>
          {activeScreen === 'combat' && <LiveCombatHUD />}
          {activeScreen === 'bank' && <PlayerBankUI />}
          {activeScreen === 'forge' && <ForgeSocketingUI />}
          {activeScreen === 'character' && <CharacterForgeUI />}
          
          {/* Map Overlay HUD (Only on worldMap) */}
          {activeScreen === 'worldMap' && (
            <div className="bg-black/80 p-3 rounded border border-zinc-700 backdrop-blur-sm max-w-[200px] pointer-events-auto">
              <h3 className="text-amber-500 font-bold uppercase tracking-widest flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Feed
              </h3>
              <p className="text-xs text-white mt-1">Zone: <span className="text-amber-400 font-black">{activeZone.toUpperCase()}</span></p>
            </div>
          )}
        </main>

        {/* ALWAYS-ON FATE ENGINE (Fixed to Corner) */}
        <div className="fixed bottom-20 left-4 w-64 z-30 pointer-events-auto">
           <ThreeDiceRoller />
        </div>

        {/* CINEMATIC TOGGLE */}
        <button 
          onClick={() => { triggerHaptic('click'); setUiVisible(!uiVisible); }} 
          className="fixed bottom-4 right-4 z-40 bg-zinc-950/80 border border-amber-900 text-amber-500 text-[10px] uppercase font-bold px-3 py-1 rounded backdrop-blur-sm">
          Toggle UI [DEV]
        </button>

      </div>
    </HollowRealmProvider>
  );
}
