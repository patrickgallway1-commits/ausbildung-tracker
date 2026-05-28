import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com", address: "tesa SE, Norderstedt", deadline: "31.07.2026", gehalt: "1,150€ - 1,400€", earnings: "3,000€ -> 5,500€+" },
  { id: 3, status: "not-applied", track: "Elektroniker (Energie- und Gebäudetechnik)", company: "Adlershorst", email: "info@adlershorst.de", address: "Adlershorst, Norderstedt", deadline: "Ongoing", gehalt: "900€ - 1,200€", earnings: "2,600€ -> 4,800€+" },
  { id: 4, status: "not-applied", track: "Elektroniker für Betriebstechnik", company: "Hanseatic Power Solutions", email: "m.grenz@hps-power.com", address: "Hanseatic Power Solutions, Norderstedt", deadline: "Ongoing", gehalt: "1,050€ - 1,350€", earnings: "2,800€ -> 5,500€+" },
  { id: 5, status: "not-applied", track: "Informationselektroniker", company: "Fritsche Elektrotechnik", email: "mautsch@fritsche-elektro.de", address: "Fritsche Elektrotechnik, Norderstedt", deadline: "Ongoing", gehalt: "950€ - 1,250€", earnings: "2,700€ -> 5,000€+" },
  { id: 6, status: "not-applied", track: "Operationstechnische/r Assistent/in (OTA)", company: "UKE", email: "bewerbung@uke.de", address: "UKE, Hamburg", deadline: "Ongoing (09/2026)", gehalt: "1,490€ - 1,650€", earnings: "3,200€ -> 5,000€+" },
  { id: 7, status: "not-applied", track: "Operationstechnischer Assistent (OTA)", company: "Asklepios Wandsbek", email: "bewerbung.wandsbek@asklepios.com", address: "Asklepios Klinik Wandsbek, Hamburg", deadline: "Ongoing (2026)", gehalt: "1,450€ - 1,600€", earnings: "3,100€ -> 4,800€+" },
  { id: 8, status: "not-applied", track: "Kaufmann im Groß- und Außenhandelsmanagement", company: "Spaeter Gruppe", email: "careers@spaeter.de", address: "Spaeter Gruppe, Norderstedt", deadline: "Ongoing", gehalt: "1,000€ - 1,200€", earnings: "2,500€ -> 5,000€+" },
  { id: 9, status: "not-applied", track: "Kaufmann im Groß- und Außenhandel", company: "adp MERKUR GmbH", email: "bewerbung@merkur.de", address: "adp MERKUR GmbH, Norderstedt", deadline: "Ongoing", gehalt: "1,000€ - 1,200€", earnings: "2,500€ -> 5,000€+" },
  { id: 10, status: "not-applied", track: "Verwaltungsfachangestellte/r", company: "Stadt Norderstedt", email: "bewerbung@norderstedt.de", address: "Stadt Norderstedt", deadline: "Ongoing", gehalt: "1,100€ - 1,250€", earnings: "2,800€ -> 4,500€+" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ausbildung_tracker_data');
    return saved ? JSON.parse(saved) : initialCsvData;
  });

  useEffect(() => {
    localStorage.setItem('ausbildung_tracker_data', JSON.stringify(items));
  }, [items]);

  const handleStatusChange = (id, newStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleRecordDelete = (id) => {
    if (window.confirm("Are you sure?")) setItems(items.filter(item => item.id !== id));
  };

  // 1. PASSWORD GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login Required</h2>
          <input 
            type="password" 
            className="w-full p-3 border rounded mb-4" 
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="w-full bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-700"
            onClick={() => { if(password === "9843543456") setIsAuthenticated(true); }}
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  // 2. FULL ORIGINAL DASHBOARD LAYOUT
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Ausbildung Tracker</h1>
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="p-6">Position / Company</th>
              <th className="p-6">Email</th>
              <th className="p-6">Status</th>
              <th className="p-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-6">
                  <div className="font-bold text-base text-gray-900">{item.track}</div>
                  <div className="text-gray-500">{item.company}</div>
                </td>
                <td className="p-6 font-medium text-indigo-600">
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </td>
                <td className="p-6">
                  <select 
                    value={item.status} 
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="not-applied">Not Applied</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                  </select>
                </td>
                <td className="p-6">
                  <button onClick={() => handleRecordDelete(item.id)} className="text-red-500 font-bold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
