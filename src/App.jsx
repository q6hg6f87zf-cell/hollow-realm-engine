import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Sphere, Trail } from '@react-three/drei';

// --- IMPORTS FOR LATER (Commented out until we build the files) ---
// import CalamityAndBossTab from './CalamityAndBossTab';
// import LiveCombatHUD from './LiveCombatHUD';
// import ForgeSocketingUI from './ForgeSocketingUI';
// import BankTab from './BankTab';

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

// --- 6. THE MASTER COMPONENT ---
export default function App() {
  const [activeZone, setActiveZone] = useState('hq');
  const [uiVisible, setUiVisible] = useState(true);

  return (
    <>
      <BossStyles />
      <div className="min-h-screen bg-black text-zinc-300 font-sans flex flex-col relative overflow-hidden">
        
        {/* THE 3D BACKGROUND LAYER */}
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

        {/* THE HUD LAYER */}
        {uiVisible && (
          <div className="relative z-10 pointer-events-none h-screen flex flex-col p-4">
            <div className="bg-black/80 p-3 rounded border border-zinc-700 backdrop-blur-sm max-w-[200px] pointer-events-auto">
              <h3 className="text-amber-500 font-bold uppercase tracking-widest flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Feed
              </h3>
              <p className="text-xs text-white mt-1">Zone: <span className="text-amber-400 font-black">{activeZone.toUpperCase()}</span></p>
            </div>
            
            <div className="mt-auto pointer-events-auto bg-black/80 border border-zinc-700 p-4 rounded text-center backdrop-blur-sm">
              <p className="text-xs text-zinc-400">Combat HUD, Forge, and Bank modules offline. Awaiting connection...</p>
            </div>
          </div>
        )}

        {/* CINEMATIC TOGGLE */}
        <button 
          onClick={() => { triggerHaptic('click'); setUiVisible(!uiVisible); }} 
          className="absolute bottom-4 right-4 z-20 bg-zinc-950/80 border border-amber-900 text-amber-500 text-[10px] uppercase font-bold px-3 py-1 rounded hover:bg-amber-900 hover:text-white backdrop-blur-sm">
          Toggle UI [DEV]
        </button>

      </div>
    </>
  );
}
