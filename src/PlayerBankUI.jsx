import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHollowRealm } from './HollowRealmContext';

export default function PlayerBankUI({ playerName = "Moon Squad Operative" }) {
  const { 
    bankBalance, 
    setBankBalance, 
    weeklyWithdrawal, 
    setWeeklyWithdrawal, 
    transactions, 
    setTransactions 
  } = useHollowRealm();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('Echo Leader (Healer)');

  const withdrawalTiers = [
    { name: "Flying Jets", cost: 5000, val: "~$75 CAD" },
    { name: "Interstellar", cost: 10000, val: "~$150 CAD" },
    { name: "Rose Nebula", cost: 15000, val: "~$225 CAD" },
    { name: "Premium Shuttle", cost: 20000, val: "~$300 CAD" },
    { name: "Lion", cost: 29999, val: "~$450 CAD" },
    { name: "Leon and Lion", cost: 34999, val: "~$525 CAD" },
    { name: "TikTok Universe", cost: 44999, val: "~$675 CAD" }
  ];

  const squadMembers = [
    "Echo Leader (Healer)", 
    "Shadow Actual (Rogue)", 
    "Vanguard One (Warrior)", 
    "The Merchant (Banker)",
    "Nylah the Dredge (NPC)"
  ];

  const handleCashOut = (tier) => {
    if (weeklyWithdrawal + tier.cost > 44999) {
      alert("⚠️ WITHDRAWAL DENIED: 44,999c Weekly Limit Reached. Account is on a 7-day lockdown.");
      return;
    }
    if (bankBalance >= tier.cost) {
      setBankBalance(prev => prev - tier.cost);
      setWeeklyWithdrawal(prev => prev + tier.cost);
      
      const newTx = {
        id: Date.now(),
        type: 'DEBIT',
        desc: `TikTok Payout: ${tier.name}`,
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
    
    if (!amount || amount <= 0) return alert("Invalid transfer amount.");
    if (amount > bankBalance) return alert("INSUFFICIENT FUNDS: Wire transfer failed.");

    setBankBalance(prev => prev - amount);
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
    transition: 'all 0.2s ease-in-out'
  });

  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#0a081e] text-[#e8e0ff] rounded-[24px] overflow-hidden border border-purple-900/20 shadow-2xl">
      
      <header className="p-5 bg-[#13102b] flex justify-between items-center">
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-[#6a638b] m-0">Hollow Realm Banking</h4>
          <h3 className="text-lg m-0 text-[#c8c0e8]">{playerName}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#8a5adc] flex items-center justify-center font-bold">
          {playerName.charAt(0)}
        </div>
      </header>

      <div className="p-8 bg-gradient-to-br from-[#2a264e] to-[#1a163a] text-center border-b border-[#13102b]">
        <p className="text-xs uppercase tracking-widest text-[#b388ff] mb-2">Available Balance</p>
        <h1 className="text-5xl font-black text-[#ffd54f] drop-shadow-lg">
          {bankBalance.toLocaleString()}c
        </h1>
        <p className="text-[10px] text-[#6a638b] mt-2 italic">Secured via Moon Squad Vault</p>
      </div>

      <nav className="flex p-4 gap-2 bg-[#13102b] border-b border-purple-900/10">
        <button onClick={() => setActiveTab('dashboard')} style={quickActionBtn(activeTab === 'dashboard')}>Ledger</button>
        <button onClick={() => setActiveTab('transfer')} style={quickActionBtn(activeTab === 'transfer')}>Transfer</button>
        <button onClick={() => setActiveTab('cashout')} style={quickActionBtn(activeTab === 'cashout')}>Cash Out</button>
      </nav>

      <div className="h-[400px] p-5 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h4 className="text-xs uppercase tracking-widest text-[#b388ff] border-b border-purple-900/30 pb-2 mb-4">Recent Activity</h4>
              {transactions.map(tx => (
                <div key={tx.id} className="flex justify-between items-center py-3 border-b border-white/5">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-bold m-0">{tx.desc}</p>
                    <p className="text-[10px] text-[#6a638b] m-0">{tx.date}</p>
                  </div>
                  <div className={`font-black text-sm ${tx.type === 'CREDIT' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'CREDIT' ? '+' : '-'}{tx.amount.toLocaleString()}c
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'transfer' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="text-xs uppercase tracking-widest text-[#4fc3f7] border-b border-[#4fc3f7]/30 pb-2 mb-4">Peer-to-Peer Wire</h4>
              <form onSubmit={handleWireTransfer} className="space-y-4">
                <select 
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  className="w-full p-4 bg-[#1a163a] border border-[#2a264e] rounded-lg text-white font-bold outline-none"
                >
                  {squadMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
                <input 
                  type="number" 
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full p-4 bg-[#1a163a] border border-[#2a264e] rounded-lg text-[#ffd54f] text-2xl font-black text-center outline-none"
                  placeholder="0"
                />
                <button type="submit" className="w-full p-4 bg-[#4fc3f7] text-[#0a081e] rounded-lg font-black uppercase tracking-widest">Authorize Wire</button>
              </form>
            </motion.div>
          )}

          {activeTab === 'cashout' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="text-xs uppercase tracking-widest text-[#ef5350] border-b border-[#ef5350]/30 pb-2 mb-4">TikTok Withdrawal Portal</h4>
              <div className="mb-4 p-4 bg-red-950/10 rounded-lg border border-red-900/30">
                <div className="flex justify-between text-[10px] mb-2 uppercase font-bold text-red-400">
                  <span>Weekly Limit</span>
                  <span>{weeklyWithdrawal.toLocaleString()} / 44,999c</span>
                </div>
                <div className="w-full h-1 bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(weeklyWithdrawal / 44999) * 100}%` }} />
                </div>
              </div>
              <div className="space-y-2 pb-6">
                {withdrawalTiers.map(tier => (
                  <button key={tier.name} onClick={() => handleCashOut(tier)} className="w-full flex justify-between items-center p-4 bg-[#1a163a] border border-[#2a264e] rounded-lg hover:border-red-500 transition-colors">
                    <div className="text-left">
                      <span className="font-bold block text-sm">{tier.name}</span>
                      <span className="text-[10px] text-[#6a638b]">{tier.val}</span>
                    </div>
                    <span className="text-red-500 font-black">-{tier.cost.toLocaleString()}c</span>
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
