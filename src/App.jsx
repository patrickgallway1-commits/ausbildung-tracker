import React, { useState, useEffect } from 'react';

const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com", address: "tesa SE, Norderstedt", deadline: "31.07.2026", gehalt: "1,150€ - 1,400€", earnings: "3,000€ -> 5,500€+" },
  { id: 3, status: "not-applied", track: "Elektroniker (Energie- und Gebäudetechnik)", company: "Adlershorst", email: "info@adlershorst.de", address: "Adlershorst, Norderstedt", deadline: "Ongoing", gehalt: "900€ - 1,200€", earnings: "2,600€ -> 4,800€+" }
];

export default function App() {
  const [items, setItems] = useState(() => {
    const savedData = localStorage.getItem('ausbildung_dashboard_data');
    return savedData ? JSON.parse(savedData) : initialCsvData;
  });

  const [searchTerm, setSearchTerm] = useState("");
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
    if (window.confirm("Delete this record?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    const entry = { id: Date.now(), status: "not-applied", track: newTrack, company: newCompany, email: "N/A", gehalt: "N/A" };
    setItems([...items, entry]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans text-lg flex flex-col md:flex-row">
      <aside className="w-64 bg-slate-900 text-slate-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Ausbildung</h1>
        <p className="text-sm text-slate-400">Application Workspace</p>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Career Pipeline</h2>
          <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold">+ New Position</button>
        </header>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm uppercase text-gray-500">
              <tr>
                <th className="p-6">Position</th>
                <th className="p-6">Contact</th>
                <th className="p-6">Status</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((val) => {
                let color = "bg-slate-100 text-slate-700";
                if (val.status === 'applied') color = "bg-blue-100 text-blue-700";
                if (val.status === 'interview') color = "bg-amber-100 text-amber-700";
                if (val.status === 'offer') color = "bg-emerald-100 text-emerald-700";
                
                return (
                  <tr key={val.id} className="hover:bg-gray-50">
                    <td className="p-6">
                      <div className="font-bold text-xl">{val.track}</div>
                      <div className="text-gray-500">{val.company}</div>
                    </td>
                    <td className="p-6">
                      <a href={`mailto:${val.email}`} className="text-indigo-600 font-bold hover:underline">{val.email}</a>
                    </td>
                    <td className="p-6">
                      <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className={`${color} font-bold p-3 rounded-lg cursor-pointer`}>
                        <option value="not-applied">Not Applied</option>
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                      </select>
                    </td>
                    <td className="p-6">
                      <button onClick={() => handleRecordDelete(val.id)} className="text-red-500 font-bold hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <form onSubmit={handleCreateEntry} className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h4 className="text-2xl font-bold mb-4">Add Position</h4>
            <input type="text" placeholder="Position Name" onChange={e => setNewTrack(e.target.value)} className="w-full p-4 border rounded-lg" required />
            <input type="text" placeholder="Company Name" onChange={e => setNewCompany(e.target.value)} className="w-full p-4 border rounded-lg" required />
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
