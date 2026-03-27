import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const HollowRealmContext = createContext();

// 2. Create the Provider Component
export function HollowRealmProvider({ children }) {
  // GLOBAL ECONOMY STATE
  const [gmCoins, setGmCoins] = useState(50000);
  const [gmOre, setGmOre] = useState(10);
  const [bankBalance, setBankBalance] = useState(12500);
  const [weeklyWithdrawal, setWeeklyWithdrawal] = useState(15000);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'CREDIT', desc: 'Box Battle Payout (Champion Split)', amount: 8400, date: 'Today, 2:14 PM' },
    { id: 2, type: 'DEBIT', desc: 'HQ Upgrade: Level 2 Lockbox', amount: 8000, date: 'Yesterday, 9:00 PM' }
  ]);

  // GLOBAL SQUAD STATE (Merging Combat HUD and Infection Tracker)
  const [squad, setSquad] = useState([
    { id: 1, name: "Operative Alpha", class: "Warrior", hp: 12, maxHp: 12, lastDamage: 4, status: "Normal", isDefending: false, infection: 0 },
    { id: 2, name: "Echo Leader", class: "Healer", hp: 9, maxHp: 9, lastDamage: 0, status: "Casting", isDefending: false, infection: 1 },
    { id: 3, name: "Shadow Actual", class: "Rogue", hp: 2, maxHp: 8, lastDamage: 8, status: "Bleeding", isDefending: false, infection: 2 }
  ]);

  // Helper functions to modify global state
  const deductGmCoins = (amount) => setGmCoins(prev => Math.max(0, prev - amount));
  const updatePlayerHp = (id, newHp) => {
    setSquad(prev => prev.map(p => p.id === id ? { ...p, hp: newHp } : p));
  };
  const updatePlayerInfection = (id, level) => {
    setSquad(prev => prev.map(p => p.id === id ? { ...p, infection: level } : p));
  };

  return (
    <HollowRealmContext.Provider value={{
      gmCoins, setGmCoins, deductGmCoins,
      gmOre, setGmOre,
      bankBalance, setBankBalance,
      weeklyWithdrawal, setWeeklyWithdrawal,
      transactions, setTransactions,
      squad, setSquad, updatePlayerHp, updatePlayerInfection
    }}>
      {children}
    </HollowRealmContext.Provider>
  );
}

// 3. Custom Hook for easy access
export const useHollowRealm = () => useContext(HollowRealmContext);
