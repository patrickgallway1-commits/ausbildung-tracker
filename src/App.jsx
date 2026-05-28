import React, { useState, useEffect } from 'react';

// Your original data
const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com", address: "tesa SE, Norderstedt", deadline: "31.07.2026", gehalt: "1,150€ - 1,400€", earnings: "3,000€ -> 5,500€+" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState(initialCsvData);

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

  // --- FULL DASHBOARD CONTENT ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Career Pipeline Tracker</h1>
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm uppercase text-gray-500">
            <tr>
              <th className="p-6">Position</th>
              <th className="p-6">Contact</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((val) => (
              <tr key={val.id}>
                <td className="p-6">
                  <div className="font-bold text-lg">{val.track}</div>
                  <div className="text-gray-500">{val.company}</div>
                </td>
                <td className="p-6 text-indigo-600 font-bold hover:underline">
                  <a href={`mailto:${val.email}`}>{val.email}</a>
                </td>
                <td className="p-6 font-bold">{val.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
