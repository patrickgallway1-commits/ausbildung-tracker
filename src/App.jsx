import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com", address: "tesa SE, Norderstedt", deadline: "31.07.2026", gehalt: "1,150€ - 1,400€", earnings: "3,000€ -> 5,500€+" }
];

export default function App() {
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
    const entry = { id: Date.now(), status: "not-applied", track: newTrack, company: newCompany, email: "info@firm.de", gehalt: "N/A" };
    setItems([...items, entry]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans text-lg flex flex-col md:flex-row">
      <aside className="w-64 bg-slate-900 text-slate-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Ausbildung</h1>
      </aside>

      <main className="flex-1 p-8">
        <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold mb-6">+ New Position</button>
        
        <table className="w-full bg-white border border-gray-200 shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">Position</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((val) => (
              <tr key={val.id} className="border-t">
                <td className="p-4 font-bold">{val.track}</td>
                <td className="p-4"><a href={`mailto:${val.email}`} className="text-indigo-600 underline">{val.email}</a></td>
                <td className="p-4">
                  <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="p-2 border rounded">
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
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleCreateEntry} className="bg-white p-8 rounded shadow-xl">
            <input type="text" placeholder="Position" onChange={e => setNewTrack(e.target.value)} className="block w-full p-2 border mb-4" required />
            <input type="text" placeholder="Company" onChange={e => setNewCompany(e.target.value)} className="block w-full p-2 border mb-4" required />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
