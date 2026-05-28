import React, { useState, useEffect } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);

  // --- PASSWORD GATEKEEPER BLOCK ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="mb-4 font-bold text-xl">Enter Password</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
          />
          <button 
            onClick={() => { if(password === "1234") setIsAuthenticated(true); }}
            className="bg-indigo-600 text-white px-4 py-2 rounded w-full font-bold"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD CONTENT BLOCK ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Career Pipeline</h1>
      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <p className="text-lg">Welcome to your dashboard!</p>
        {/* Your content goes here */}
      </div>
    </div>
  );
}
