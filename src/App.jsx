import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState(initialCsvData);
  const [modalOpen, setModalOpen] = useState(false);

  // Password Logic
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="mb-4 font-bold text-xl">Enter Password</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button 
            onClick={() => { if(password === "1234") setIsAuthenticated(true); }}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Career Pipeline</h1>
      <table className="w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-sm uppercase text-gray-500">
          <tr>
            <th className="p-6">Position</th>
            <th className="p-6">Contact</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((val) => (
            <tr key={val.id}>
              <td className="p-6 font-bold">{val.track}</td>
              <td className="p-6 text-indigo-600">{val.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
