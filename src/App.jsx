import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ausbildung_tracker_data');
    return saved ? JSON.parse(saved) : initialCsvData;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [newTrack, setNewTrack] = useState("");
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    localStorage.setItem('ausbildung_tracker_data', JSON.stringify(items));
  }, [items]);

  const handleStatusChange = (id, newStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleRecordDelete = (id) => {
    if (window.confirm("Are you sure?")) setItems(items.filter(item => item.id !== id));
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    const entry = { id: Date.now(), status: "not-applied", track: newTrack, company: newCompany, email: "info@firm.de" };
    setItems([...items, entry]);
    setModalOpen(false);
    setNewTrack("");
    setNewCompany("");
  };

  // --- PASSWORD GATE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-4">Enter Password</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
          <button onClick={() => { if(password === "9843543456") setIsAuthenticated(true); }} className="w-full bg-indigo-600 text-white p-2 rounded font-bold">Access</button>
        </div>
      </div>
    );
  }

  // --- FULL DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Career Pipeline Tracker</h1>
      <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded mb-6">+ New Position</button>
      
      <table className="w-full bg-white border shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-gray-100 uppercase text-sm text-gray-500">
          <tr><th className="p-4">Position</th><th className="p-4">Contact</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
        </thead>
        <tbody className="divide-y text-sm">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="p-4 font-bold">{item.track} <br/><span className="text-gray-500 font-normal">{item.company}</span></td>
              <td className="p-4 text-indigo-600 underline"><a href={`mailto:${item.email}`}>{item.email}</a></td>
              <td className="p-4">
                <select value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)} className="p-1 border rounded">
                  <option value="not-applied">Not Applied</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                </select>
              </td>
              <td className="p-4"><button onClick={() => handleRecordDelete(item.id)} className="text-red-500 font-bold">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleCreateEntry} className="bg-white p-6 rounded-lg w-80">
            <input type="text" placeholder="Position" onChange={e => setNewTrack(e.target.value)} className="w-full p-2 border mb-2" required />
            <input type="text" placeholder="Company" onChange={e => setNewCompany(e.target.value)} className="w-full p-2 border mb-4" required />
            <button type="submit" className="bg-indigo-600 text-white w-full p-2 rounded">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}
