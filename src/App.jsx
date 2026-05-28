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
    return savedData ? JSON.parse(savedData) : initialCsvData;
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
    if (window.confirm("Are you sure?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    const entry = { id: Date.now(), status: "not-applied", track: newTrack, company: newCompany, gehalt: newGehalt || "N/A", earnings: newEarnings || "N/A", address: newAddress || "N/A", email: newEmail || "info@firm.de", deadline: newDeadline || "Ongoing" };
    setItems([...items, entry]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col md:flex-row text-lg">
      <aside className="w-full md:w-72 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white">Ausbildung</h1>
          <p className="text-sm text-slate-400">Application Workspace</p>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Career Pipeline Tracker</h2>
          </div>
          <button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
            + New Position
          </button>
        </header>

        <div className="grid grid-cols-5 gap-6 mb-8">
            {[ {label: 'Total', val: total}, {label: 'Not Applied', val: notApplied}, {label: 'Applied', val: applied}, {label: 'Interviews', val: interviews}, {label: 'Offers', val: offers} ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <span className="text-sm font-bold uppercase text-gray-400">{stat.label}</span>
                    <div className="text-4xl font-bold mt-2">{stat.val}</div>
                </div>
            ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-sm font-bold uppercase text-gray-500">
                <th className="p-6">Position & Company</th>
                <th className="p-6">Salary Info</th>
                <th className="p-6">Contact</th>
                <th className="p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((val) => (
                <tr key={val.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <div className="font-semibold text-lg">{val.track}</div>
                    <div className="text-sm text-slate-500">{val.company}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-medium text-slate-800">{val.gehalt}</div>
                  </td>
                  <td className="p-6">
                    <a href={`mailto:${val.email}`} className="text-indigo-600 font-semibold hover:underline">{val.email}</a>
                  </td>
                  <td className="p-6">
                    <select value={val.status} onChange={(e) => handleStatusChange(val.id, e.target.value)} className="text-lg font-bold p-2 border rounded-md">
                      <option value="not-applied">Not Applied</option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-8">
            <h4 className="text-xl font-bold mb-6">Create New Record</h4>
            <form onSubmit={handleCreateEntry} className="space-y-4">
              <input type="text" placeholder="Position Name" onChange={e => setNewTrack(e.target.value)} className="w-full p-3 border rounded-lg" required />
              <input type="text" placeholder="Company Name" onChange={e => setNewCompany(e.target.value)} className="w-full p-3 border rounded-lg" required />
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
