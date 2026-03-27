import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Sphere, Trail } from '@react-three/drei';
import { HollowRealmProvider } from './HollowRealmContext';
import { 
  ChevronDown, MapPin, Sword, Scale, User, Scroll, Shield, Gem, Users, 
  ShoppingBag, Crosshair, Target, BookOpen, Activity, ListOrdered, Home
} from 'lucide-react';

// --- ACTIVE MODULES ---
import MainMenuTab from './MainMenuTab';
import LiveCombatHUD from './LiveCombatHUD';
import BoxBattleTab from './BoxBattleTab';
import LiveSquadTracker from './LiveSquadTracker';
import ActionLogTab from './ActionLogTab';

import PlayerBankUI from './PlayerBankUI';
import LootModeUI from './LootModeUI';
import ExpandedArsenalUI from './ExpandedArsenalUI';
import ForgeSocketingUI from './ForgeSocketingUI';
import FieldKitsTab from './FieldKitsTab';
import HQUpgradesTab from './HQUpgradesTab';

import CalamityAndBossTab from './CalamityAndBossTab';
import CharacterForgeUI from './CharacterForgeUI';
import PlayerSystemsHUD from './PlayerSystemsHUD';
import RealmCodexTab from './RealmCodexTab';

export const triggerHaptic = (type = 'click') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'click') navigator.vibrate(15);
    if (type === 'calamity') navigator.vibrate([100, 50, 100, 50, 200]);
  }
};

// --- GLOBAL CINEMATIC STYLES ---
const CinematicStyles = () => (
  <style>{`
    :root { --epic-gold: #d97706; --epic-text: #f3f4f6; }
    body {
      background-color: #000; color: var(--epic-text);
      font-family: 'Futura Condensed', 'Inter', sans-serif;
      letter-spacing: 0.02em; margin: 0; overflow-x: hidden;
    }
    #bg-layer {
      position: fixed; top: -10%; left: -10%; width: 120%; height: 120%;
      background-image: linear-gradient(to bottom, rgba(10,10,15,0.4), rgba(10,10,15,0.85)), url('/IMG_5225.png');
      background-size: cover; background-position: center;
      z-index: -2; pointer-events: none; transition: transform 0.1s ease-out;
    }
    canvas#particle-canvas {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      z-index: -1; pointer-events: none;
    }
    .glass-panel {
      background: rgba(15, 15, 20, 0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.7); border-radius: 8px;
    }
    .glass-header {
      background: linear-gradient(to bottom, rgba(5,5,10,0.9), rgba(5,5,10,0.4));
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-category {
      background: rgba(0, 0, 0, 0.4); border-right: 1px solid rgba(255,255,255,0.05);
    }
    .epic-btn-hover:hover {
      background: rgba(217, 119, 6, 0.15); color: var(--epic-gold); border-color: rgba(217, 119, 6, 0.5);
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// --- RESTORED VANILLA PARTICLE ENGINE ---
function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bg = document.getElementById('bg-layer');
    let pts = [];
    let m = { x: 0, y: 0, active: false, sx: 0, sy: 0 };
    let drawing = false;
    let animationFrameId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor(x, y, color, size, vx, vy, life) {
        this.x = x; this.y = y; this.size = size;
        this.color = color; this.vx = vx; this.vy = vy; this.life = life;
      }
      draw() {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.globalCompositeOperation = 'screen';
        let g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        g.addColorStop(0, this.color); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const loopParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (m.active && !drawing && bg) {
        let tx = (m.x - window.innerWidth / 2) / 20;
        let ty = (m.y - window.innerHeight / 2) / 20;
        bg.style.transform = `translate(${-tx}px, ${-ty}px)`;
      }
      if (m.active && drawing) {
        pts.push(new Particle(m.x, m.y, '#9b1b1b', 65, (Math.random() - 0.5), (Math.random() - 0.5), 0.7));
        if (Math.random() > 0.6) pts.push(new Particle(m.x, m.y, '#00d4ff', 30, 0, 0, 0.5));
      }
      for (let i = pts.length - 1; i >= 0; i--) {
        let p = pts[i];
        p.x += p.vx; p.y += p.vy; p.life -= 0.02; p.size += 0.4;
        if (p.life <= 0) pts.splice(i, 1); else p.draw();
      }
      animationFrameId = requestAnimationFrame(loopParticles);
    };
    loopParticles();

    const startDraw = (e) => { let t = e.touches ? e.touches[0] : e; m.active = true; m.sx = t.clientX; m.sy = t.clientY; m.x = t.clientX; m.y = t.clientY; drawing = false; };
    const moveDraw = (e) => { let t = e.touches ? e.touches[0] : e; m.x = t.clientX; m.y = t.clientY; if (Math.abs(m.x - m.sx) > 5 || Math.abs(m.y - m.sy) > 5) drawing = true; };
    const endDraw = () => { m.active = false; drawing = false; if (bg) bg.style.transform = 'translate(0, 0)'; };

    window.addEventListener('mousedown', startDraw); window.addEventListener('mousemove', moveDraw); window.addEventListener('mouseup', endDraw);
    window.addEventListener('touchstart', startDraw); window.addEventListener('touchmove', moveDraw); window.addEventListener('touchend', endDraw);

    return () => {
      window.removeEventListener('resize', resize); window.removeEventListener('mousedown', startDraw); window.removeEventListener('mousemove', moveDraw);
      window.removeEventListener('mouseup', endDraw); window.removeEventListener('touchstart', startDraw); window.removeEventListener('touchmove', moveDraw);
      window.removeEventListener('touchend', endDraw); cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef}></canvas>;
}

function FateEngine() {
  const [roll, setRoll] = useState('--');
  const [dieType, setDieType] = useState('d20');
  const [showDice, setShowDice] = useState(false);

  const rollDice = (max) => {
    triggerHaptic('click'); const result = Math.floor(Math.random() * max) + 1; setDieType(`d${max}`); setRoll(result);
    if ((max === 20 && result === 20) || (max === 100 && result === 100)) triggerHaptic('calamity');
  };
  const dice = [4, 6, 8, 12, 20, 100];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${showDice ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'}`}>
        <button onClick={() => setShowDice(!showDice)} className="w-full h-12 glass-panel rounded-b-none border-b-0 flex items-center justify-between px-6 epic-btn-hover cursor-pointer">
            <span className="text-xs text-zinc-300 uppercase font-black tracking-widest flex items-center gap-2">
                <ChevronDown className={`transition-transform duration-300 ${showDice ? 'rotate-180' : ''}`} size={18}/> Fate Engine
            </span>
            <span className="text-amber-500 text-xs uppercase font-black tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 shadow-[0_0_10px_rgba(217,119,6,0.2)]">{dieType}: {roll}</span>
        </button>
        <div className="glass-panel rounded-t-none border-t-0 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-48 h-32 bg-black/50 border border-white/10 rounded-lg flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/20"></div>
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1 z-10">{dieType}</span>
                <span className={`text-6xl font-black z-10 ${roll === 20 && dieType === 'd20' ? 'text-amber-400 animate-pulse' : 'text-white'}`} style={{ textShadow: roll === 20 && dieType === 'd20' ? '0 0 20px rgba(217, 119, 6, 0.8)' : '0 2px 10px rgba(0,0,0,0.8)' }}>{roll}</span>
            </div>
            <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-3 w-full">
                {dice.map(d => (
                <button key={d} onClick={() => rollDice(d)} className="bg-white/5 border border-white/10 text-lg font-black text-zinc-300 py-4 rounded-lg transition-all uppercase epic-btn-hover hover:-translate-y-1 hover:shadow-lg">d{d}</button>
                ))}
            </div>
        </div>
    </div>
  );
}

export default function App() {
  const [uiVisible, setUiVisible] = useState(true);
  const [activeScreen, setActiveScreen] = useState('mainMenu');

  // --- RESTRUCTURED NAVIGATION (MAIN FIRST, RULES LAST) ---
  const navCategories = {
    "Main": [
      { id: 'mainMenu', name: 'Main Menu', icon: <Home size={14} />, screen: 'mainMenu' },
    ],
    "Live Engine": [
      { id: 'combat', name: 'Combat', icon: <Sword size={14} />, screen: 'combat' },
      { id: 'battle', name: 'Box Battle', icon: <Swords size={14} />, screen: 'battle' },
      { id: 'squad', name: 'Squad Tracker', icon: <Activity size={14} />, screen: 'squad' },
      { id: 'log', name: 'Action Log', icon: <ListOrdered size={14} />, screen: 'log' },
    ],
    "HQ & Loot": [
      { id: 'bank', name: 'Bank', icon: <Scale size={14} />, screen: 'bank' },
      { id: 'loot', name: 'Loot', icon: <Gem size={14} />, screen: 'loot' },
      { id: 'arsenal', name: 'Arsenal', icon: <Crosshair size={14} />, screen: 'arsenal' },
      { id: 'forge', name: 'Forge', icon: <Shield size={14} />, screen: 'forge' },
      { id: 'kits', name: 'Kits', icon: <ShoppingBag size={14} />, screen: 'kits' },
      { id: 'hq', name: 'HQ', icon: <Target size={14} />, screen: 'hq' },
    ],
    "Database": [
      { id: 'boss', name: 'Bosses', icon: <Scroll size={14} />, screen: 'boss' },
      { id: 'character', name: 'Create Character', icon: <User size={14} />, screen: 'character' },
      { id: 'systems', name: 'Systems', icon: <Users size={14} />, screen: 'systems' },
      { id: 'codex', name: 'Rules / FAQ', icon: <BookOpen size={14} />, screen: 'codex' },
    ]
  };

  const navBtnStyle = (screen) => `px-4 py-3 font-bold uppercase tracking-widest text-[10px] transition-all whitespace-nowrap flex items-center gap-2 border-b-2
    ${activeScreen === screen ? 'border-amber-500 text-amber-400 bg-white/5' : 'border-transparent text-zinc-400 hover:bg-white/5 hover:text-white'}
  `;

  return (
    <HollowRealmProvider>
      <CinematicStyles />
      <div id="bg-layer"></div>
      <InteractiveBackground />

      <div className="min-h-screen flex flex-col relative overflow-hidden bg-transparent">
        <header className="glass-header w-full p-4 flex justify-between items-center z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <img src="/IMG_5123.png" alt="The Hollow Realm" className="h-10 md:h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" onError={(e) => { e.target.style.display='none'; }} /> 
            <div className="hidden md:block">
               <h1 className="text-xl font-black text-white tracking-widest uppercase shadow-black drop-shadow-md">Hollow Realm</h1>
               <div className="text-[9px] text-amber-500 tracking-widest font-black uppercase">Live // Moon Squad</div>
            </div>
          </div>
        </header>

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

        <main className={`flex-1 p-4 md:p-8 overflow-y-auto relative z-10 ${!uiVisible ? 'hidden' : ''} pb-32`}>
          <div className='max-w-7xl mx-auto'>
            {/* MAIN */}
            {activeScreen === 'mainMenu' && <MainMenuTab />}
            
            {/* LIVE ENGINE */}
            {activeScreen === 'combat' && <LiveCombatHUD />}
            {activeScreen === 'battle' && <BoxBattleTab />}
            {activeScreen === 'squad' && <LiveSquadTracker />}
            {activeScreen === 'log' && <ActionLogTab />}

            {/* HQ & LOOT */}
            {activeScreen === 'bank' && <PlayerBankUI />}
            {activeScreen === 'loot' && <LootModeUI />}
            {activeScreen === 'arsenal' && <ExpandedArsenalUI />}
            {activeScreen === 'forge' && <ForgeSocketingUI />}
            {activeScreen === 'kits' && <FieldKitsTab />}
            {activeScreen === 'hq' && <HQUpgradesTab />}

            {/* DATABASE */}
            {activeScreen === 'boss' && <CalamityAndBossTab />}
            {activeScreen === 'character' && <CharacterForgeUI />}
            {activeScreen === 'systems' && <PlayerSystemsHUD />}
            {activeScreen === 'codex' && <RealmCodexTab />}
          </div>
        </main>

        <FateEngine />

        <button onClick={() => { triggerHaptic('click'); setUiVisible(!uiVisible); }} className="fixed bottom-[80px] right-4 z-40 glass-panel text-zinc-400 hover:text-white text-[10px] uppercase font-bold px-4 py-2 transition-all shadow-xl">
          Toggle UI [DEV]
        </button>
      </div>
    </HollowRealmProvider>
  );
}
