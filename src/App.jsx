import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" }
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

  useEffect(() => { localStorage.setItem('ausbildung_dashboard_data', JSON.stringify(items)); }, [items]);

  const handleEdit = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleStatusChange = (id, nextStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const handleRecordDelete = (id) => { if (window.confirm("Delete?")) setItems(items.filter(item => item.id !== id)); };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    setItems([...items, { id: Date.now(), status: "not-applied", ...formData }]);
    setModalOpen(false);
    setFormData({ track: "", company: "", gehalt: "", earnings: "", address: "", email: "", deadline: "" });
  };

  // Status-to-Color Map for Row Backgrounds
  const getRowColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-50/50 hover:bg-blue-100/50';
      case 'interview': return 'bg-amber-50/50 hover:bg-amber-100/50';
      case 'offer': return 'bg-emerald-100/50 hover:bg-emerald-200/50';
      case 'rejected': return 'bg-rose-50/50 hover:bg-rose-100/50';
      default: return 'bg-white hover:bg-slate-50';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-emerald-100">
          <h2 className="text-2xl font-bold mb-6 text-emerald-900">Secure Access</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border border-emerald-200 rounded-2xl mb-4 text-center focus:ring-4 focus:ring-emerald-200 outline-none" placeholder="Enter PIN" />
          <button onClick={() => { if(password === "1234") setIsAuthenticated(true); }} className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all">Unlock Pipeline</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 p-4 md:p-8 font-sans text-slate-800">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-900">Career Pipeline</h1>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-800 transition-transform hover:-translate-y-1">+ New Position</button>
      </header>

      <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-emerald-50/50">
            <tr className="text-emerald-900 font-bold uppercase text-[10px] tracking-widest text-left">
              <th className="p-6">Position</th><th className="p-6">Salary Details</th><th className="p-6">Logistics</th><th className="p-6">Status</th><th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {items.map((val) => (
              <tr key={val.id} className={`${getRowColor(val.status)} transition-all`}>
                <td className="p-6 font-bold">{val.track}<div className="text-emerald-600 font-medium text-xs">{val.company}</div></td>
                <td className="p-6 space-y-1">
                  <input className="bg-transparent border-b border-dashed border-emerald-300 w-full outline-none font-bold text-emerald-800" value={val.gehalt} onChange={(e) => handleEdit(val.id, 'gehalt', e.target.value)} />
                  <input className="bg-transparent border-b border-dashed border-emerald-300 w-full outline-none text-xs text-emerald-600" value={val.earnings} onChange={(e) => handleEdit(val.id, 'earnings', e.target.value)} />
                </td>
                <td className="p-6 text-xs text-slate-500">📍 {val.address}<br/>📧 {val.email}<br/>📅 {val.deadline}</td>
                <td className="p-6">
                  <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="bg-emerald-900 text-white p-2 rounded-xl text-xs font-bold outline-none cursor-pointer">
                    <option value="not-applied">Not Applied</option><option value="applied">Applied</option><option value="interview">Interview</option><option value="offer">Offer</option><option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-6 text-right"><button onClick={() => handleRecordDelete(val.id)} className="text-rose-500 font-bold hover:scale-110 transition-transform">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateEntry} className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl relative grid grid-cols-2 gap-4">
            <button type="button" onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-emerald-900 font-bold text-xl">&times;</button>
            <h3 className="col-span-2 text-2xl font-bold mb-2">New Position</h3>
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Position" onChange={e => setFormData({...formData, track: e.target.value})} required />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Company" onChange={e => setFormData({...formData, company: e.target.value})} required />
            <input className="p-3 border rounded-xl" placeholder="Monthly Pay" onChange={e => setFormData({...formData, gehalt: e.target.value})} />
            <input className="p-3 border rounded-xl" placeholder="Future Salary" onChange={e => setFormData({...formData, earnings: e.target.value})} />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Location/Address" onChange={e => setFormData({...formData, address: e.target.value})} />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="HR Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input className="col-span-2 p-3 border rounded-xl" placeholder="Deadline" onChange={e => setFormData({...formData, deadline: e.target.value})} />
            <button type="submit" className="col-span-2 bg-emerald-700 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800">Add to Pipeline</button>
          </form>
        </div>
      )}
    </div>
  );
}
