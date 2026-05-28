import React, { useState, useEffect, useRef } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const passwordRef = useRef(null);
  
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ausbildung_dashboard_data');
    return saved ? JSON.parse(saved) : initialCsvData;
  });

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

  // Status Colors
  const rowColors = {
    applied: 'bg-orange-600/30',      // Dark Orange
    interview: 'bg-yellow-300',       // Neon Yellow
    offer: 'bg-emerald-800/40',       // Dark Green
    rejected: 'bg-red-900/60',        // Crimson/Dark Red
    'not-applied': 'bg-white'         // White
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-emerald-300">
          <h2 className="text-2xl font-bold mb-6 text-emerald-950">Secure Access</h2>
          <input type="password" ref={passwordRef} className="w-full p-4 border border-emerald-400 rounded-2xl mb-4 text-center focus:ring-4 focus:ring-emerald-400 outline-none" placeholder="Enter PIN" />
          <button onClick={() => { if(passwordRef.current.value === "1234") setIsAuthenticated(true); else passwordRef.current.value = ""; }} className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-950 transition-all">Unlock Pipeline</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-100 p-4 md:p-8 font-sans text-[16px] text-slate-900">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-extrabold text-emerald-950">Career Pipeline</h1>
        
        {/* Clearly Visible Stroke-Box Legend */}
        <div className="border-2 border-emerald-900 p-4 rounded-2xl bg-white shadow-lg flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2"><span className="w-4 h-4 border border-black bg-red-900"></span> Rejected</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 border border-black bg-emerald-800"></span> Offered</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 border border-black bg-white"></span> Not Applied</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 border border-black bg-orange-600"></span> Applied</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 border border-black bg-yellow-300"></span> Interview</div>
        </div>

        <div className="flex gap-3">
            <button onClick={() => setEditMode(!editMode)} className={`px-6 py-3 rounded-2xl font-bold transition-all ${editMode ? 'bg-amber-600 text-white' : 'bg-emerald-900 text-white'}`}>
                {editMode ? '🔒 Lock' : '🔓 Unlock'}
            </button>
            <button onClick={() => setModalOpen(true)} className="bg-emerald-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-950 transition-all">+ New Position</button>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-lg border border-emerald-300 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-200">
            <tr className="text-emerald-950 font-bold uppercase text-[12px] tracking-widest text-left">
              <th className="p-6">Position</th><th className="p-6">Salary Details</th><th className="p-6">Location</th><th className="p-6">Status</th><th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-200">
            {items.map((val) => (
              <tr key={val.id} className={`${rowColors[val.status]} transition-colors`}>
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

      {modalOpen && (
        <div className="fixed inset-0 bg-emerald-950/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateEntry} className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl relative grid grid-cols-2 gap-4 border border-emerald-300">
            <button type="button" onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-emerald-950 font-bold text-xl">&times;</button>
            <h3 className="col-span-2 text-2xl font-bold mb-2">New Position</h3>
            <input className="col-span-2 p-4 border border-emerald-200 rounded-xl" placeholder="Position" onChange={e => setFormData({...formData, track: e.target.value})} required />
            <input className="col-span-2 p-4 border border-emerald-200 rounded-xl" placeholder="Company" onChange={e => setFormData({...formData, company: e.target.value})} required />
            <input className="p-4 border border-emerald-200 rounded-xl" placeholder="Monthly Pay" onChange={e => setFormData({...formData, gehalt: e.target.value})} />
            <input className="p-4 border border-emerald-200 rounded-xl" placeholder="Future Salary" onChange={e => setFormData({...formData, earnings: e.target.value})} />
            <input className="col-span-2 p-4 border border-emerald-200 rounded-xl" placeholder="Location" onChange={e => setFormData({...formData, address: e.target.value})} />
            <input className="col-span-2 p-4 border border-emerald-200 rounded-xl" placeholder="HR Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input className="col-span-2 p-4 border border-emerald-200 rounded-xl" placeholder="Deadline" onChange={e => setFormData({...formData, deadline: e.target.value})} />
            <button type="submit" className="col-span-2 bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-950">Add to Pipeline</button>
          </form>
        </div>
      )}
    </div>
  );
}
