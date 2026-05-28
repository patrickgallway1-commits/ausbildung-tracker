import React, { useState, useEffect, useRef } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const passwordRef = useRef(null);
  
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ausbildung_dashboard_data');
    return saved ? JSON.parse(saved) : initialCsvData;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ track: "", company: "", gehalt: "", earnings: "", address: "", email: "", deadline: "" });

  useEffect(() => { localStorage.setItem('ausbildung_dashboard_data', JSON.stringify(items)); }, [items]);

  const handleEdit = (id, field, value) => { setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item)); };
  const handleStatusChange = (id, nextStatus) => { setItems(items.map(item => item.id === id ? { ...item, status: nextStatus } : item)); };
  const handleRecordDelete = (id) => { if (window.confirm("Delete this entry?")) setItems(items.filter(item => item.id !== id)); };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    setItems([...items, { id: Date.now(), status: "not-applied", ...formData }]);
    setModalOpen(false);
    setFormData({ track: "", company: "", gehalt: "", earnings: "", address: "", email: "", deadline: "" });
  };

  const rowColors = {
    applied: 'bg-green-200/50',
    interview: 'bg-yellow-200/50',
    offer: 'bg-green-400/50',
    rejected: 'bg-red-900/20',
    'not-applied': 'bg-amber-800/20'
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-emerald-300">
          <h2 className="text-2xl font-bold mb-6 text-emerald-950">Secure Access</h2>
          <input type="password" ref={passwordRef} className="w-full p-4 border border-emerald-400 rounded-2xl mb-4 text-center focus:ring-4 focus:ring-emerald-400 outline-none" placeholder="Enter PIN" />
          <button onClick={() => { if(passwordRef.current.value === "9843543456%") setIsAuthenticated(true); else passwordRef.current.value = ""; }} className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-950 transition-all">Unlock Pipeline</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-100 p-4 md:p-8 font-sans text-[16px] text-slate-900">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-extrabold text-emerald-950">Career Pipeline</h1>
        
        {/* Compact Legend - Pirelli Style */}
        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="px-3 py-1 rounded-full bg-green-200/50">Applied</span>
            <span className="px-3 py-1 rounded-full bg-yellow-200/50">Interview</span>
            <span className="px-3 py-1 rounded-full bg-green-400/50">Offer</span>
            <span className="px-3 py-1 rounded-full bg-red-900/20">Rejected</span>
            <span className="px-3 py-1 rounded-full bg-amber-800/20">Not Applied</span>
        </div>

        <div className="flex gap-3">
            <button onClick={() => setEditMode(!editMode)} className={`px-6 py-3 rounded-2xl font-bold transition-all ${editMode ? 'bg-amber-600 text-white' : 'bg-emerald-900 text-white'}`}>
                {editMode ? '🔒 Lock' : '🔓 Unlock'}
            </button>
            <button onClick={() => setModalOpen(true)} className="bg-emerald-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-950 transition-all">+ New</button>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-lg border border-emerald-300 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-200">
            <tr className="text-emerald-950 font-bold uppercase text-[12px] tracking-widest text-left">
              <th className="p-6">Position</th><th className="p-6">Salary Details {editMode && <span className="text-amber-700">(Edit On)</span>}</th><th className="p-6">Logistics</th><th className="p-6">Status</th><th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-200">
            {items.map((val) => (
              <tr key={val.id} className={`${rowColors[val.status]} hover:opacity-80 transition-opacity`}>
                <td className="p-6 font-bold">{val.track}<div className="text-emerald-900 font-medium text-sm">{val.company}</div></td>
                <td className="p-6 space-y-1">
                  <input disabled={!editMode} className={`bg-transparent w-full outline-none font-bold text-emerald-950 ${editMode ? 'border-b border-emerald-500' : ''}`} value={val.gehalt} onChange={(e) => handleEdit(val.id, 'gehalt', e.target.value)} />
                  <input disabled={!editMode} className={`bg-transparent w-full outline-none text-sm text-emerald-800 ${editMode ? 'border-b border-emerald-500' : ''}`} value={val.earnings} onChange={(e) => handleEdit(val.id, 'earnings', e.target.value)} />
                </td>
                <td className="p-6 text-sm text-slate-800">📍 {val.address}<br/>📧 {val.email}<br/>📅 {val.deadline}</td>
                <td className="p-6">
                  <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="bg-emerald-950 text-white p-3 rounded-xl text-sm font-bold outline-none cursor-pointer">
                    <option value="not-applied">Not Applied</option><option value="applied">Applied</option><option value="interview">Interview</option><option value="offer">Offer</option><option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-6 text-right"><button onClick={() => handleRecordDelete(val.id)} className="text-rose-800 font-bold hover:scale-110 transition-transform">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
