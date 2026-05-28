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
    if (window.confirm("Delete this entry?")) setItems(items.filter(item => item.id !== id));
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm border border-slate-100 text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Secure Access</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter PIN" />
          <button onClick={() => { if(password === "1234") setIsAuthenticated(true); }} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Unlock Pipeline</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-800">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Career Pipeline</h1>
          <p className="text-slate-500 mt-1">Manage your application journey.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">+ Add Position</button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-left text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <th className="p-6">Position</th><th className="p-6">Salary Details</th><th className="p-6">Logistics</th><th className="p-6">Contact</th><th className="p-6">Status</th><th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((val) => {
              let rowStyle = "bg-white";
              if (val.status === 'applied') rowStyle = "bg-blue-50/30";
              if (val.status === 'interview') rowStyle = "bg-amber-50/30";
              if (val.status === 'offer') rowStyle = "bg-emerald-50/30";
              if (val.status === 'rejected') rowStyle = "bg-rose-50/30";
              
              return (
                <tr key={val.id} className={`${rowStyle} transition-colors`}>
                  <td className="p-6 font-bold text-slate-900">{val.track}<div className="font-medium text-slate-400 text-xs">{val.company}</div></td>
                  <td className="p-6 text-slate-600">💰 {val.gehalt}<br/><span className="text-indigo-600 font-semibold text-xs">🚀 {val.earnings}</span></td>
                  <td className="p-6 text-slate-600">📍 {val.address}<br/><span className="text-amber-600 font-semibold text-xs">📅 {val.deadline}</span></td>
                  <td className="p-6 text-indigo-600 font-medium underline"><a href={`mailto:${val.email}`}>{val.email}</a></td>
                  <td className="p-6">
                    <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="p-2 border border-slate-200 rounded-lg font-bold text-xs bg-white focus:ring-2 focus:ring-indigo-100 outline-none">
                      <option value="not-applied">Not Applied</option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-6 text-right"><button onClick={() => handleRecordDelete(val.id)} className="text-rose-400 font-bold hover:text-rose-600">Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateEntry} className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl grid grid-cols-2 gap-4">
            <h3 className="col-span-2 text-xl font-bold mb-2">New Position</h3>
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Position Title" onChange={e => setFormData({...formData, track: e.target.value})} required />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Company Name" onChange={e => setFormData({...formData, company: e.target.value})} required />
            <input className="p-3 border rounded-xl" placeholder="Monthly Pay" onChange={e => setFormData({...formData, gehalt: e.target.value})} />
            <input className="p-3 border rounded-xl" placeholder="Future Salary" onChange={e => setFormData({...formData, earnings: e.target.value})} />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="HR Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Deadline" onChange={e => setFormData({...formData, deadline: e.target.value})} />
            <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 text-slate-500 font-bold">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Add to Pipeline</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
