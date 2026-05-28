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
  const [items, setItems] = useState(() => {
    const savedData = localStorage.getItem('ausbildung_dashboard_data');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        return initialCsvData;
      }
    }
    return initialCsvData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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

  const total = items.length;
  const notApplied = items.filter(x => x.status === "not-applied").length;
  const applied = items.filter(x => x.status === "applied").length;
  const interviews = items.filter(x => x.status === "interview").length;
  const offers = items.filter(x => x.status === "offer").length;

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
    if (!newTrack || !newCompany) return alert("Please fill out both the Position Title and Company Name!");

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
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-sm font-bold tracking-wide uppercase text-white">Ausbildung</h1>
        </div>
        <nav className="flex-1 p-4">
          <div className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold">📊 Central Pipeline Board</div>
        </nav>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Career Pipeline Tracker</h2>
          <button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-lg">+ New Position</button>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><span className="text-[10px] uppercase font-bold text-gray-400">Total</span><div className="text-xl font-bold">{total}</div></div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><span className="text-[10px] uppercase font-bold text-slate-400">Not Applied</span><div className="text-xl font-bold">{notApplied}</div></div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><span className="text-[10px] uppercase font-bold text-blue-500">Applied</span><div className="text-xl font-bold">{applied}</div></div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><span className="text-[10px] uppercase font-bold text-amber-500">Interviews</span><div className="text-xl font-bold">{interviews}</div></div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"><span className="text-[10px] uppercase font-bold text-emerald-500">Offers</span><div className="text-xl font-bold">{offers}</div></div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full p-4 border-b border-gray-100 text-xs focus:outline-none" />
            <table className="w-full text-left text-xs">
              <thead><tr className="bg-gray-50 uppercase text-gray-400 font-bold"><th className="p-4">Track</th><th className="p-4">Stipend</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {items.filter(v => v.track.toLowerCase().includes(searchTerm.toLowerCase())).map(val => (
                  <tr key={val.id}>
                    <td className="p-4 font-semibold">{val.track}<div className="text-gray-400">{val.company}</div></td>
                    <td className="p-4">{val.gehalt}</td>
                    <td className="p-4">
                      <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="border rounded px-2 py-1">
                        <option value="not-applied">Not Applied</option><option value="applied">Applied</option><option value="interview">Interview</option><option value="offer">Offer</option><option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4"><button onClick={() => handleRecordDelete(val.id)} className="text-rose-500 font-bold">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateEntry} className="bg-white p-6 rounded-xl w-full max-w-sm space-y-3">
            <h4 className="font-bold">Add Position</h4>
            <input type="text" placeholder="Position Name" onChange={e => setNewTrack(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="text" placeholder="Company Name" onChange={e => setNewCompany(e.target.value)} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Save</button>
            <button type="button" onClick={() => setModalOpen(false)} className="w-full text-gray-400 text-xs">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
