import React, { createContext, useContext, useState, useEffect } from 'react';

const HollowRealmContext = createContext();

export const useHollowRealm = () => useContext(HollowRealmContext);

export const HollowRealmProvider = ({ children }) => {
  // --- LOCAL STORAGE INITIALIZATION ---
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('hollow_realm_players');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('hollow_realm_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [gmCoins, setGmCoins] = useState(() => {
    const saved = localStorage.getItem('hollow_realm_gmCoins');
    return saved ? parseInt(saved, 10) : 0;
  });

  // --- AUTO-SAVE HOOKS ---
  // Every time these variables change, they are instantly written to the browser's hard drive.
  useEffect(() => {
    localStorage.setItem('hollow_realm_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('hollow_realm_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('hollow_realm_gmCoins', gmCoins.toString());
  }, [gmCoins]);

  // --- LOGGING ENGINE ---
  const addLog = (logEntry) => {
    const newLog = {
      ...logEntry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    // Pushes the newest log to the absolute top of the feed
    setLogs(prev => [newLog, ...prev]);
  };

  const clearLogs = () => {
    if(window.confirm("WARNING: Are you sure you want to wipe the session log?")) {
      setLogs([]);
    }
  };

  return (
    <HollowRealmContext.Provider value={{ 
      players, setPlayers, 
      logs, addLog, clearLogs, 
      gmCoins, setGmCoins 
    }}>
      {children}
    </HollowRealmContext.Provider>
  );
};
