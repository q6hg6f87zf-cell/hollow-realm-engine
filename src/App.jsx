import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Sphere, Trail } from '@react-three/drei';
import { HollowRealmProvider } from './HollowRealmContext';
import { ChevronDown, MapPin, Sword, Scale, User, Scroll, Shield, Gem, Users, ShoppingCart, Crosshair, HelpCircle, Target } from 'lucide-react';

// --- ACTIVE MODULES (Names must match your GitHub files exactly) ---
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

// --- 1. MOON SQUAD HAPTIC ENGINE ---
export const triggerHaptic = (type = 'click') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'click') navigator.vibrate(15);
    if (type === 'calamity') navigator.vibrate([100, 50, 100, 50, 200]);
  }
};

// --- 2. GLOBAL AESTHETIC STYLES (Skyrim Theme) ---
// Using custom CSS variables for a deep, fantasy color scheme.
const SkyrimStyles = () => (
  <style>{`
    :root {
      --skyrim-bg: #0a0a0c;
      --skyrim-panel: rgba(22, 22, 26, 0.95);
      --skyrim-parchment: #ede0c9;
      --skyrim-charcoal: #3f3f46;
      --skyrim-silver: #d1d5db;
      --skyrim-iron: #6b7280;
      --skyrim-accent: #d97706; /* Still amber, but subtler */
      --skyrim-health: #ef4444; /* Standard red, used sparingly */
      --skyrim-magicka: #06b6d4; /* Magic Cyan */
    }

    body {
      background-color: var(--skyrim-bg);
      color: var(--skyrim-parchment);
      font-family: 'Futura Condensed', 'Inter', sans-serif; /* Clean, tight font */
      font-size: 14px;
      letter-spacing: -0.01em;
    }

    /* Elegant, semi-transparent overlay for components */
    .skyrim-panel {
      background: var(--skyrim-panel);
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
    }

    /* Carved stone/iron texture dividers */
    .skyrim-divider {
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, rgba(209, 213, 223, 0.2) 50%, transparent 100%);
      margin: 10px 0;
    }

    .skyrim-divider-vertical {
      width: 1px;
      height: 100%;
      background: linear-gradient(0deg, transparent 0%, rgba(209, 213, 223, 0.2) 50%, transparent 100%);
    }

    /* Subtle hover effect for buttons */
    .skyrim-btn-hover:hover {
      background-color: rgba(217, 119, 6, 0.05) !important;
      color: var(--skyrim-accent) !important;
    }

    /* Cinematic Shake (Slightly more refined) */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-3px) rotate(-0.5deg); }
      75% { transform: translateX(3px) rotate(0.5deg); }
    }
    .animate-seismic-shake {
      animation: shake 0.4s ease-in-out infinite;
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.3) !important;
    }
    
    /* Water Ripple (Adapted from existing logic) */
    @keyframes waterRipple {
      0% { filter: hue-rotate(0deg) blur(0px); }
      50% { filter: hue-rotate(10deg) blur(0.5px); transform: scale(1.005); }
      100% { filter: hue-rotate(0deg) blur(0px); }
    }
    .animate-submerged {
      animation: waterRipple 4s infinite ease-in-out;
      border-color: rgba(6, 182, 212, 0.2) !important;
    }
    
    /* Global scrollbar hide, just for look */
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- 3. CELESTIAL NAVIGATION (Retained from existing build) ---
function CelestialNavigation() {
  const starMaterial = <meshStandardMaterial emissive="#fff" emissiveIntensity={0.8} color="#ede0c9" transparent opacity={0.6}/>;
  return (
    <group>
      {/* Polaris */}
      <Sphere args={[0.08, 16, 16]} position={[-4, 6, 2]}>{starMaterial}</Sphere>
      {/* Orion's Belt */}
      <group position={[3, 4, -8]} rotation={[0, 0, 0.5]}>
        <Sphere args={[0.04, 16, 16]} position={[-0.5, 0, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 16, 16]} position={[0, 0, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.04, 16, 16]} position={[0.5, 0, 0]}>{starMaterial}</Sphere>
      </group>
      {/* Cassiopeia */}
      <group position={[6, 3, -4]} rotation={[0.2, -0.4, 0]}>
        <Sphere args={[0.03, 16, 16]} position={[-1, 0.5, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.03, 16, 16]} position={[-0.5, -0.2, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.03, 16, 16]} position={[0, 0.3, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.03, 16, 16]} position={[0.5, -0.4, 0]}>{starMaterial}</Sphere>
        <Sphere args={[0.03, 16, 16]} position={[1, 0.6, 0]}>{starMaterial}</Sphere>
      </group>
    </group>
  );
}

// --- 4. ASTEROID FLY-BY (Retained from existing build) ---
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
    <Trail width={1.2} color="#ede0c9" length={8} decay={1.2} attenuation={(t) => t * t}>
      <mesh ref={asteroidRef}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#6b7280" roughness={1} flatShading={true}/>
      </mesh>
    </Trail>
  );
}

// --- 5. THE 3D MAP PILLAR ---
function MapZone({ position, name, id, activeZone, onClick }) {
  const isActive = activeZone === id;
  // A carved stone-style mesh
  return (
    <mesh position={position} onClick={() => onClick(id)} castShadow receiveShadow>
      <boxGeometry args={[1.6, isActive ? 2 : 1, 1.6]} />
      <meshStandardMaterial color={isActive ? "#ede0c9" : "#6b7280"} roughness={1} flatShading={true}/>
    </mesh>
  );
}

// --- 7. THE Retractible GM DICE ROLLER (Rebuilt) ---
function FateEngine() {
  const [roll, setRoll] = useState('--');
  const [dieType, setDieType] = useState('d20');
  const [showDice, setShowDice] = useState(false);

  const rollDice = (max) => {
    // Elegant tactile click
    triggerHaptic('click');
    
    const result = Math.floor(Math.random() * max) + 1;
    setDieType(`d${max}`);
    setRoll(result);
    
    // Smooth magical glow for crits
    if ((max === 20 && result === 20) || (max === 100 && result === 100)) {
       triggerHaptic('calamity');
    }
  };

  const dice = [4, 6, 8, 12, 20, 100];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all ${showDice ? 'translate-y-0' : 'translate-y-[calc(100%-40px)]'}`}>
        {/* Toggle Bar */}
        <button onClick={() => setShowDice(!showDice)} className="w-full h-10 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-6 skyrim-btn-hover">
            <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest flex items-center gap-2">
                <ChevronDown className={`transition-transform ${showDice ? 'rotate-180' : ''}`} size={16}/> Fate Engine
            </span>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{dieType}: {roll}</span>
        </button>

        {/* Dice Controls (Retracted when hidden) */}
        <div className="bg-zinc-950 p-6 flex items-center gap-6 skyrim-panel border-t-0 rounded-t-none border-t border-zinc-800">
            {/* Display */}
            <div className="w-40 h-28 bg-black border border-zinc-800 rounded py-6 flex flex-col items-center justify-center mb-0 shadow-inner">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">{dieType}</span>
                <span className={`text-5xl font-black ${
                roll === 20 && dieType === 'd20' ? 'text-[#ede0c9] animate-pulse' : 
                'text-[#ede0c9]'
                }`}
                style={{
                  textShadow: roll === 20 && dieType === 'd20' ? '0 0 10px rgba(237, 224, 201, 0.5)' : 'none'
                }}>
                {roll}
                </span>
            </div>
            
            <div className="skyrim-divider-vertical h-28"></div>

            {/* Buttons */}
            <div className="flex-1 grid grid-cols-6 gap-2 w-full h-28 items-center">
                {dice.map(d => (
                <button 
                    key={d} 
                    onClick={() => rollDice(d)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-sm font-black text-[#ede0c9] py-3 rounded transition-colors uppercase skyrim-btn-hover"
                >
                    d{d}
                </button>
                ))}
            </div>
        </div>
    </div>
  );
}

// --- 6. THE MASTER COMPONENT ---
export default function App() {
  const [activeZone, setActiveZone] = useState('hq');
  const [uiVisible, setUiVisible] = useState(true);
  const [activeScreen, setActiveScreen] = useState('worldMap');

  // navBtn adaptation for Skyrim style (minimalist dividers)
  const navBtnStyle = (screen) => `px-5 py-3.5 font-bold uppercase tracking-widest text-[10px] transition-all whitespace-nowrap skyrim-btn-hover relative
    ${activeScreen === screen ? 'text-[#ede0c9]' : 'text-zinc-500 hover:bg-zinc-800'}
  `;

  // Icons for navigation
  const tabs = [
    { id: 'combat', name: 'Combat', icon: <Sword size={14} />, screen: 'combat' },
    { id: 'worldMap', name: 'Map', icon: <MapPin size={14} />, screen: 'worldMap' },
    { id: 'bank', name: 'Bank', icon: <Scale size={14} />, screen: 'bank' },
    { id: 'forge', name: 'Forge', icon: <Shield size={14} />, screen: 'forge' },
    { id: 'character', name: 'Create', icon: <User size={14} />, screen: 'character' },
    { id: 'systems', name: 'Systems', icon: <Users size={14} />, screen: 'systems' },
    { id: 'kits', name: 'Kits', icon: <ShoppingBag size={14} />, screen: 'kits' },
  ];

  return (
    <HollowRealmProvider>
      <SkyrimStyles />
      <div className="min-h-screen bg-black text-[#ede0c9] flex flex-col relative overflow-hidden">
        
        {/* GLOBAL HEADER (Minimalist silver and amber) */}
        <header className="bg-zinc-950 border-b border-zinc-800 p-4 flex justify-between items-center z-20 shadow-lg">
          <h1 className="text-2xl font-black text-[#ede0c9] tracking-tighter uppercase flex items-center gap-2">
            The <span className='text-amber-500 font-normal'>Hollow Realm</span> Chronology
          </h1>
          <div className="text-[10px] text-zinc-600 tracking-widest font-black uppercase">LIVE // MOON SQUAD OPERATIVE</div>
        </header>

        {/* MAIN NAVIGATION (Scrollable sleek tabs with Lucide icons) */}
        <nav className="flex items-center overflow-x-auto bg-zinc-950 border-b border-zinc-800 z-20 sticky top-0 scrollbar-hide p-0.5">
          {tabs.map((tab, idx) => (
             <React.Fragment key={tab.id}>
                {idx > 0 && <div className="skyrim-divider-vertical h-8" />}
                <button onClick={() => { triggerHaptic(); setActiveScreen(tab.screen); }} className={navBtnStyle(tab.screen)}>
                  <span className='flex items-center gap-2'>{tab.icon} {tab.name}</span>
                  {activeScreen === tab.screen && <div className='absolute bottom-1.5 left-5 right-5 h-px bg-[#ede0c9]'/>}
                </button>
             </React.Fragment>
          ))}
        </nav>

        {/* THE 3D BACKGROUND LAYER (retuned for subtler mood) */}
        {activeScreen === 'worldMap' && (
          <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at center, rgba(26,22,58,0.5) 0%, rgba(10,10,12,0.95) 100%)" }}>
            <Canvas camera={{ position: [0, 6, 12], fov: 50 }} shadows>
              <ambientLight intensity={0.2} color="#fef3c7" />
              <pointLight position={[10, 10, 10]} intensity={1} color="#fef3c7" castShadow/>
              <pointLight position={[-10, -10, -10]} intensity={0.2} color="#d1d5db" />
              <OrbitControls autoRotate autoRotateSpeed={0.3} enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2.2} minDistance={5} maxDistance={20}/>
              <Sparkles count={150} scale={15} size={1.5} speed={0.2} color="#ede0c9" opacity={0.3} />
              <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
              <CelestialNavigation />
              <AsteroidFlyby />
              
              <group>
                 <MapZone position={[-4, 0, 2]} name="Moon Squad HQ" id="hq" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[0, 0, 2]} name="Dark Forest" id="forest" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[4, 0, 2]} name="Kingdom" id="kingdom" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[-2, 0, -2]} name="Caverns" id="caverns" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[2, 0, -2]} name="Library" id="library" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
                 <MapZone position={[0, 0, -5]} name="Edge" id="edge" activeZone={activeZone} onClick={(z) => { triggerHaptic('click'); setActiveZone(z); }} />
              </group>
              
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0a0a0c" roughness={1}/>
              </mesh>
            </Canvas>
          </div>
        )}

        {/* CONTENT MOUNTING POINT (Styled with skyrim-panel) */}
        <main className={`flex-1 p-6 overflow-y-auto relative z-10 ${!uiVisible ? 'hidden' : ''} pb-28`}>
          <div className='max-w-7xl mx-auto space-y-8'>
            {activeScreen === 'combat' && <LiveCombatHUD />}
            {activeScreen === 'bank' && <PlayerBankUI />}
            {activeScreen === 'forge' && <ForgeSocketingUI />}
            {activeScreen === 'character' && <CharacterForgeUI />}
            {activeScreen === 'systems' && <PlayerSystemsHUD />}
            {activeScreen === 'kits' && <FieldKitsTab />}
            
            {/* Map Overlay HUD (Only on worldMap) -adapted to Skyrim overlay style */}
            {activeScreen === 'worldMap' && (
              <div className="fixed top-28 left-6 bg-[#131317]/90 p-4 rounded-sm skyrim-panel backdrop-blur-sm w-56">
                <h3 className="text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2 text-[10px]">
                  <Target size={14}/> Zone Oracle
                </h3>
                <p className="text-lg text-white mt-1.5 uppercase font-black">{activeZone.toUpperCase()}</p>
                <div className="skyrim-divider"></div>
                <p className="text-[10px] text-zinc-600 mt-1 italic leading-tight">Zone of Operation: {activeZone.toUpperCase()}</p>
              </div>
            )}
          </div>
        </main>

        {/* RETRACTABLE FATE ENGINE */}
        <FateEngine />

        {/* CINEMATIC TOGGLE */}
        <button 
          onClick={() => { triggerHaptic('click'); setUiVisible(!uiVisible); }} 
          className="fixed bottom-14 right-4 z-40 bg-zinc-950/80 text-zinc-500 text-[9px] uppercase font-bold px-3 py-1.5 rounded skyrim-panel border border-zinc-800">
          Toggle Chronicler View
        </button>

      </div>
    </HollowRealmProvider>
  );
}
