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
    const savedData = localStorage.getItem('ausbildung_dashboard_data');
    return savedData ? JSON.parse(savedData) : initialCsvData;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [newTrack, setNewTrack] = useState("");
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    localStorage.setItem('ausbildung_dashboard_data', JSON.stringify(items));
  }, [items]);

  const handleStatusChange = (id, nextStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const handleRecordDelete = (id) => {
    if (window.confirm("Are you sure?")) setItems(items.filter(item => item.id !== id));
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    const entry = { id: Date.now(), status: "not-applied", track: newTrack, company: newCompany, email: "info@firm.de" };
    setItems([...items, entry]);
    setModalOpen(false);
  };

  // --- PASSWORD GATEKEEPER ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center w-80">
          <h2 className="mb-4 font-bold text-xl">Enter Password</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-4 rounded" />
          <button onClick={() => { if(password === "1234") setIsAuthenticated(true); }} className="bg-indigo-600 text-white px-6 py-2 rounded font-bold w-full">Access Dashboard</button>
        </div>
      </div>
    );
  }

  // --- FULL FUNCTIONAL DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Career Pipeline Tracker</h1>
      <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold mb-6">+ New Position</button>
      
      <table className="w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-sm uppercase text-gray-500">
          <tr>
            <th className="p-4">Position</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {items.map((val) => (
            <tr key={val.id}>
              <td className="p-4 font-bold text-lg">{val.track}</td>
              <td className="p-4 text-indigo-600 font-bold underline"><a href={`mailto:${val.email}`}>{val.email}</a></td>
              <td className="p-4">
                <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="p-2 border rounded font-bold">
                  <option value="not-applied">Not Applied</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                </select>
              </td>
              <td className="p-4"><button onClick={() => handleRecordDelete(val.id)} className="text-red-500 font-bold">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleCreateEntry} className="bg-white p-8 rounded-xl shadow-xl w-96">
            <input type="text" placeholder="Position" onChange={e => setNewTrack(e.target.value)} className="w-full p-2 border mb-4" required />
            <input type="text" placeholder="Company" onChange={e => setNewCompany(e.target.value)} className="w-full p-2 border mb-4" required />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
