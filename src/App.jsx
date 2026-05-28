import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com", address: "tesa SE, Norderstedt", deadline: "31.07.2026", gehalt: "1,150€ - 1,400€", earnings: "3,000€ -> 5,500€+" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ausbildung_dashboard_data');
    return saved ? JSON.parse(saved) : initialCsvData;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ track: "", company: "", gehalt: "", earnings: "", address: "", email: "", deadline: "" });

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
    const entry = { id: Date.now(), status: "not-applied", ...formData };
    setItems([...items, entry]);
    setModalOpen(false);
    setFormData({ track: "", company: "", gehalt: "", earnings: "", address: "", email: "", deadline: "" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-4">Access Restricted</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Password" />
          <button onClick={() => { if(password === "1234") setIsAuthenticated(true); }} className="w-full bg-indigo-600 text-white p-2 rounded font-bold">Unlock</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Career Pipeline Tracker</h1>
      <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded mb-6 font-bold">+ New Position</button>
      
      <table className="w-full bg-white border shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-gray-100 uppercase text-xs text-gray-500">
          <tr><th className="p-4">Track & Company</th><th className="p-4">Pay/Scale</th><th className="p-4">Logistics</th><th className="p-4">Contact</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
        </thead>
        <tbody className="divide-y text-xs">
          {items.map((val) => {
            let rowColor = "bg-white"; // Default original white background
            if (val.status === 'applied') rowColor = "bg-blue-50";
            if (val.status === 'interview') rowColor = "bg-amber-50";
            if (val.status === 'offer') rowColor = "bg-emerald-50";
            if (val.status === 'rejected') rowColor = "bg-rose-50";
            
            return (
              <tr key={val.id} className={`${rowColor} hover:opacity-90`}>
                <td className="p-4 font-bold">{val.track}<div className="font-normal text-gray-500">{val.company}</div></td>
                <td className="p-4">💰 {val.gehalt}<br/><span className="text-indigo-600">🚀 {val.earnings}</span></td>
                <td className="p-4">📍 {val.address}<br/><span className="text-amber-600">📅 {val.deadline}</span></td>
                <td className="p-4 text-indigo-600 underline"><a href={`mailto:${val.email}`}>{val.email}</a></td>
                <td className="p-4">
                  <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="p-1 border rounded font-bold bg-white">
                    <option value="not-applied">Not Applied</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-4"><button onClick={() => handleRecordDelete(val.id)} className="text-red-500 font-bold">Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateEntry} className="bg-white p-6 rounded-lg w-full max-w-md grid grid-cols-2 gap-3">
            <input className="col-span-2 p-2 border rounded" placeholder="Position" onChange={e => setFormData({...formData, track: e.target.value})} required />
            <input className="col-span-2 p-2 border rounded" placeholder="Company" onChange={e => setFormData({...formData, company: e.target.value})} required />
            <input className="p-2 border rounded" placeholder="Monthly Pay" onChange={e => setFormData({...formData, gehalt: e.target.value})} />
            <input className="p-2 border rounded" placeholder="Future Salary" onChange={e => setFormData({...formData, earnings: e.target.value})} />
            <input className="col-span-2 p-2 border rounded" placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} />
            <input className="col-span-2 p-2 border rounded" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input className="col-span-2 p-2 border rounded" placeholder="Deadline" onChange={e => setFormData({...formData, deadline: e.target.value})} />
            <button type="submit" className="col-span-2 bg-indigo-600 text-white p-2 rounded">Save Position</button>
          </form>
        </div>
      )}
    </div>
  );
}
