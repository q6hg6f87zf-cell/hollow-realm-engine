import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHollowRealm } from './HollowRealmContext';

export default function PlayerBankUI({ playerName = "Moon Squad Operative", initialBalance = 12500 }) {
const { bankBalance, setBankBalance, weeklyWithdrawal, setWeeklyWithdrawal, transactions, setTransactions } = useHollowRealm();
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, transfer, cashout
  // Tracking the 44,999c limit

  // Wire Transfer State
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('Echo Leader (Healer)');

  // Hardcoded withdrawal tiers (TikTok True Valuations)
  const withdrawalTiers = [
    { name: "Flying Jets", cost: 5000, val: "~$75 CAD" },
    { name: "Interstellar", cost: 10000, val: "~$150 CAD" },
    { name: "Rose Nebula", cost: 15000, val: "~$225 CAD" },
    { name: "Premium Shuttle", cost: 20000, val: "~$300 CAD" },
    { name: "Lion", cost: 29999, val: "~$450 CAD" },
    { name: "Leon and Lion", cost: 34999, val: "~$525 CAD" },
    { name: "TikTok Universe", cost: 44999, val: "~$675 CAD" }
  ];

  // Dynamic Ledger Data
 
    { id: 1, type: 'CREDIT', desc: 'Box Battle Payout (Champion Split)', amount: 8400, date: 'Today, 2:14 PM' },
    { id: 2, type: 'DEBIT', desc: 'HQ Upgrade: Level 2 Lockbox', amount: 8000, date: 'Yesterday, 9:00 PM' },
    { id: 3, type: 'DEBIT', desc: 'Standard Action (Attack)', amount: 500, date: 'Yesterday, 8:45 PM' }
  ]);

  const squadMembers = [
    "Echo Leader (Healer)", 
    "Shadow Actual (Rogue)", 
    "Vanguard One (Warrior)", 
    "The Merchant (Banker)",
    "Nylah the Dredge (NPC)"
  ];

  const handleCashOut = (tier) => {
    if (weeklyWithdrawal + tier.cost >= 44999) {
      alert("⚠️ WITHDRAWAL DENIED: 44,999c Weekly Limit Reached. Account is on a 7-day lockdown.");
      return;
    }
    if (balance >= tier.cost) {
      setBalance(prev => prev - tier.cost);
      setWeeklyWithdrawal(prev => prev + tier.cost);
      
      // Update Ledger
      const newTx = {
        id: Date.now(),
        type: 'DEBIT',
        desc: `TikTok Payout Withdrawal: ${tier.name}`,
        amount: tier.cost,
        date: 'Just Now'
      };
      setTransactions([newTx, ...transactions]);
      
      alert(`Transferring ${tier.cost}c. Awaiting GM TikTok Gift Drop: ${tier.name}.`);
    } else {
      alert("INSUFFICIENT FUNDS: You cannot afford this withdrawal tier.");
    }
  };

  const handleWireTransfer = (e) => {
    e.preventDefault();
    const amount = parseInt(transferAmount);
    
    if (!amount || amount <= 0) {
      alert("Invalid transfer amount.");
      return;
    }
    if (amount > balance) {
      alert("INSUFFICIENT FUNDS: Wire transfer failed.");
      return;
    }

    // Execute Transfer
    setBalance(prev => prev - amount);
    
    // Update Ledger
    const newTx = {
      id: Date.now(),
      type: 'DEBIT',
      desc: `Wire Transfer to ${transferTarget}`,
      amount: amount,
      date: 'Just Now'
    };
    setTransactions([newTx, ...transactions]);
    setTransferAmount('');
    
    alert(`SUCCESS: ${amount.toLocaleString()}c wired to ${transferTarget}.`);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '420px', // Mobile-app sizing
      margin: '0 auto',
      backgroundColor: '#0a081e',
      color: '#e8e0ff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
      fontFamily: '"Inter", sans-serif',
      border: '1px solid rgba(138, 90, 220, 0.2)'
    }}>
      
      {/* APP HEADER */}
      <header style={{ padding: '20px', backgroundColor: '#13102b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, color: '#6a638b', fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '1px' }}>Hollow Realm Banking</h4>
          <h3 style={{ margin: '5px 0 0 0', color: '#c8c0e8' }}>{playerName}</h3>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8a5adc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {playerName.charAt(0)}
        </div>
      </header>

      {/* THE BALANCE CARD */}
      <div style={{ padding: '30px 20px', background: 'linear-gradient(135deg, #2a264e 0%, #1a163a 100%)', textAlign: 'center', borderBottom: '1px solid #13102b' }}>
        <p style={{ margin: 0, color: '#b388ff', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Balance</p>
        <motion.h1 
          key={balance}
          initial={{ scale: 1.1, color: '#fff' }}
          animate={{ scale: 1, color: '#ffd54f' }}
          style={{ margin: '10px 0', fontSize: '3.5em', textShadow: '0 5px 15px rgba(255, 213, 79, 0.2)' }}
        >
          {balance.toLocaleString()}c
        </motion.h1>
        <p style={{ margin: 0, fontSize: '0.8em', color: '#6a638b' }}>Secured via Lv. 2 Bunkhouse Lockbox</p>
      </div>

      {/* QUICK ACTIONS NAVIGATION */}
      <div style={{ display: 'flex', padding: '15px', gap: '10px', backgroundColor: '#13102b', borderBottom: '1px solid rgba(138, 90, 220, 0.1)' }}>
        <button onClick={() => setActiveTab('dashboard')} style={quickActionBtn(activeTab === 'dashboard')}>Ledger</button>
        <button onClick={() => setActiveTab('transfer')} style={quickActionBtn(activeTab === 'transfer')}>Transfer</button>
        <button onClick={() => setActiveTab('cashout')} style={quickActionBtn(activeTab === 'cashout')}>Cash Out</button>
      </div>

      {/* TAB CONTENT AREA */}
      <div style={{ height: '400px', padding: '20px', overflowY: 'auto', position: 'relative' }}>
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LEDGER (TRANSACTION HISTORY) */}
          {activeTab === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h4 style={{ marginTop: 0, color: '#b388ff', borderBottom: '1px solid rgba(138, 90, 220, 0.3)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Activity</h4>
              {transactions.map(tx => (
                <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ flex: 1, paddingRight: '15px' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9em', lineHeight: '1.4' }}>{tx.desc}</p>
                    <p style={{ margin: '5px 0 0 0', color: '#6a638b', fontSize: '0.75em' }}>{tx.date}</p>
                  </div>
                  <div style={{ fontWeight: 'black', fontSize: '1.1em', color: tx.type === 'CREDIT' ? '#66bb6a' : '#ef5350' }}>
                    {tx.type === 'CREDIT' ? '+' : '-'}{tx.amount.toLocaleString()}c
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: SQUAD WIRE TRANSFER */}
          {activeTab === 'transfer' && (
            <motion.div key="trans" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h4 style={{ marginTop: 0, color: '#4fc3f7', borderBottom: '1px solid rgba(79, 195, 247, 0.3)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Peer-to-Peer Wire</h4>
              
              <form onSubmit={handleWireTransfer} style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8em', color: '#6a638b', marginBottom: '8px', textTransform: 'uppercase' }}>Recipient Identity</label>
                  <select 
                    value={transferTarget}
                    onChange={(e) => setTransferTarget(e.target.value)}
                    style={{ width: '100%', padding: '15px', backgroundColor: '#1a163a', border: '1px solid #2a264e', borderRadius: '8px', color: 'white', outline: 'none', fontWeight: 'bold' }}
                  >
                    {squadMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', fontSize: '0.8em', color: '#6a638b', marginBottom: '8px', textTransform: 'uppercase' }}>Amount (c)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5000"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    style={{ width: '100%', padding: '15px', backgroundColor: '#1a163a', border: '1px solid #2a264e', borderRadius: '8px', color: '#ffd54f', outline: 'none', fontSize: '1.5em', fontWeight: 'black', textAlign: 'center' }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ width: '100%', padding: '18px', backgroundColor: '#4fc3f7', color: '#0a081e', border: 'none', borderRadius: '8px', fontWeight: 'black', fontSize: '1.1em', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px' }}
                >
                  Authorize Transfer
                </button>
              </form>
            </motion.div>
          )}

          {/* TAB 3: CASH OUT (TIKTOK PAYOUTS) */}
          {activeTab === 'cashout' && (
            <motion.div key="cash" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h4 style={{ marginTop: 0, color: '#ef5350', borderBottom: '1px solid rgba(239, 83, 80, 0.3)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>TikTok Withdrawal Portal</h4>
              
              {/* Cooldown Tracker */}
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(239, 83, 80, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 83, 80, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: '8px' }}>
                  <span style={{ color: '#ffcdd2', textTransform: 'uppercase' }}>7-Day Limit</span>
                  <span style={{ color: '#ef5350', fontWeight: 'bold' }}>{weeklyWithdrawal.toLocaleString()}c / 44,999c</span>
                </div>
                {/* Progress Bar */}
                <div style={{ width: '100%', height: '6px', backgroundColor: '#13102b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${(weeklyWithdrawal / 44999) * 100}%`, height: '100%', backgroundColor: '#ef5350' }} />
                </div>
              </div>

              {/* Payout Tiers */}
              <div style={{ paddingBottom: '20px' }}>
                {withdrawalTiers.map(tier => (
                  <button 
                    key={tier.name}
                    onClick={() => handleCashOut(tier)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', marginBottom: '10px', backgroundColor: '#1a163a', border: '1px solid #2a264e', borderRadius: '8px', color: 'white', cursor: 'pointer', transition: 'border 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.border = '1px solid #ef5350'}
                    onMouseOut={(e) => e.currentTarget.style.border = '1px solid #2a264e'}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', fontSize: '1.1em' }}>{tier.name}</span>
                      <span style={{ color: '#6a638b', fontSize: '0.8em' }}>True Valuation: {tier.val}</span>
                    </div>
                    <span style={{ color: '#ef5350', fontWeight: 'black', fontSize: '1.1em' }}>-{tier.cost.toLocaleString()}c</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// Styling helper for the top navigation buttons
const quickActionBtn = (isActive) => ({
  flex: 1,
  padding: '12px',
  backgroundColor: isActive ? '#2a264e' : 'transparent',
  color: isActive ? '#ffd54f' : '#6a638b',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontSize: '0.85em',
  transition: 'all 0.2s ease-in-out',
  boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.3)' : 'none'
});
