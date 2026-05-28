import React, { useState, useEffect } from 'react';

// Pre-loaded baseline rows
const initialCsvData = [
  { id: 1, status: "not-applied", track: "Fachinformatiker (Systemintegration)", company: "ITA Systeme", email: "bewerbung@ita-systeme.de", address: "Oststr. 83, 22844 Norderstedt", deadline: "Ongoing (2027)", gehalt: "1,100€ - 1,300€", earnings: "2,800€ -> 6,000€+" },
  { id: 2, status: "not-applied", track: "Chemielaborant (m/w/d)", company: "tesa SE", email: "recruiting@tesa.com", address: "tesa SE, Norderstedt", deadline: "31.07.2026", gehalt: "1,150€ - 1,400€", earnings: "3,000€ -> 5,500€+" }
];

export default function App() {
  const [items, setItems] = useState(() => {
    const savedData = localStorage.getItem('ausbildung_dashboard_data');
    return savedData ? JSON.parse(savedData) : initialCsvData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Form hooks
  const [newTrack, setNewTrack] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newGehalt, setNewGehalt] = useState("");
  const [newEarnings, setNewEarnings] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  useEffect(() => {
    localStorage.setItem('ausbildung_dashboard_data', JSON.stringify(items));
  }, [items]);

  const handleStatusChange = (id, nextStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const handleRecordDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!newTrack || !newCompany) return alert("Please fill out Position and Company!");

    const entry = {
      id: Date.now(),
      status: "not-applied",
      track: newTrack,
      company: newCompany,
      gehalt: newGehalt || "N/A",
      earnings: newEarnings || "N/A",
      address: newAddress || "N/A",
      email: newEmail || "info@firm.de",
      deadline: newDeadline || "Ongoing"
    };

    setItems([...items, entry]);
    setModalOpen(false);
    setNewTrack(""); setNewCompany(""); setNewGehalt(""); 
    setNewEarnings(""); setNewAddress(""); setNewEmail(""); setNewDeadline("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col md:flex-row">
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Career Pipeline Tracker</h2>
          <button 
            onClick={() => setModalOpen(true)} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-lg"
          >
            + New Position
          </button>
        </header>

        <div className="p-8">
           {/* Table Body */}
           <table className="w-full text-left border-collapse text-xs">
            {/* ... (Add your table header and logic here) ... */}
           </table>
        </div>
      </main>

      {/* Modal - Ensure this is rendered at the root level */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
            <h4 className="font-bold mb-4">Create New Record</h4>
            <form onSubmit={handleCreateEntry} className="space-y-3">
              <input type="text" value={newTrack} onChange={e => setNewTrack(e.target.value)} placeholder="Position Name" className="w-full px-2 py-1 border rounded" required />
              <input type="text" value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="Company Name" className="w-full px-2 py-1 border rounded" required />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Save Position</button>
              <button type="button" onClick={() => setModalOpen(false)} className="text-gray-500 text-xs w-full">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
