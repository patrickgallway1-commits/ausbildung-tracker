import React, { useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // --- PASSWORD GATEKEEPER ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="mb-4 font-bold text-xl">Enter Password</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
          />
          <button 
            onClick={() => { if(password === "1234") setIsAuthenticated(true); }}
            className="bg-indigo-600 text-white px-6 py-2 rounded font-bold w-full"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Career Pipeline Tracker</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p>Dashboard is now active and protected.</p>
      </div>
    </div>
  );
}
