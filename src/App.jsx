import React, { useState, useEffect } from 'react';

// Pre-loaded baseline rows from your original csv dataset
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

const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="mb-4 font-bold text-xl">Enter Password</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button 
            onClick={() => { if(password === "9843543456%") setIsAuthenticated(true); }}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col md:flex-row">
      {/* Structural Sidebar Menu Component */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white tracking-wider">A</div>
            <div>
              <h1 className="text-sm font-bold tracking-wide uppercase text-white">Ausbildung</h1>
              <p className="text-[11px] text-slate-400">Application Workspace</p>
            </div>
          </div>
          <span className="bg-indigo-500/10 px-2 py-0.5 rounded text-[11px] font-bold text-indigo-400 ring-1 ring-indigo-500/20">Active</span>
        </div>
        <nav className="flex-1 p-4">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-xs">
            📊 Central Pipeline Board
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
          Loaded: 10 Records
        </div>
      </aside>

      {/* Main Stream Window Container */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl tracking-tight">Career Pipeline Tracker</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage and organize your professional application trajectories natively.</p>
          </div>
          <button onClick={() => setModalOpen(true)} className="sm:ml-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-xs tracking-wide transition-all self-start sm:self-center">
            + New Position
          </button>
        </header>

        {/* Responsive Content Core */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1">
          {/* Statistical Aggregator Dashboard Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total Rows</span>
              <div className="text-xl font-bold mt-1 text-gray-900">{total}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Not Applied</span>
              <div className="text-xl font-bold mt-1 text-slate-600">{notApplied}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-blue-500 tracking-wider">Applied</span>
              <div className="text-xl font-bold mt-1 text-blue-600">{applied}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-amber-500 tracking-wider">Interviews</span>
              <div className="text-xl font-bold mt-1 text-amber-600">{interviews}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs col-span-2 lg:col-span-1">
              <span className="text-[10px] font-bold uppercase text-emerald-500 tracking-wider">Offers Received</span>
              <div className="text-xl font-bold mt-1 text-emerald-600">{offers}</div>
            </div>
          </div>

          {/* Database Control Center Panel */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Vacancies Master Register</h3>
              <input 
                type="text" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by position, firm, or location..." 
                className="w-full sm:w-72 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Core Operational Data Grid View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/40 text-gray-400 border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider">
                    <th className="p-4 pl-6">Ausbildung Track & Company</th>
                    <th className="p-4">Stipend Details</th>
                    <th className="p-4">Logistics & Limit</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Progress Monitor</th>
                    <th className="p-4 pr-6 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {items
                    .filter(val => 
                      val.track.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      val.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      val.address.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((val) => {
                      let colorMap = "bg-slate-50 text-slate-700 border-slate-200";
                      if (val.status === 'applied') colorMap = "bg-blue-50 text-blue-700 border-blue-200";
                      if (val.status === 'interview') colorMap = "bg-amber-50 text-amber-700 border-amber-200";
                      if (val.status === 'offer') colorMap = "bg-emerald-50 text-emerald-700 border-emerald-200";
                      if (val.status === 'rejected') colorMap = "bg-rose-50 text-rose-700 border-rose-200";

                      return (
                        <tr key={val.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="font-semibold text-slate-900 text-sm">{val.track}</div>
                            <div className="text-xs text-slate-400 mt-0.5 font-medium">{val.company}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-slate-800">💰 {val.gehalt}</div>
                            <div className="text-[11px] text-indigo-600 mt-0.5 font-medium">🚀 Scale: {val.earnings}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-500 font-medium truncate max-w-[180px]" title={val.address}>📍 {val.address}</div>
                            <div className="text-[11px] text-amber-600 font-semibold mt-0.5">📅 Deadline: {val.deadline}</div>
                          </td>
                          <td className="p-4">
  <a href={`mailto:${val.email}`} className="text-indigo-600 font-semibold hover:underline">✉️ {val.email}</a>
</td>
                          <td className="p-4">
                            <select 
                              value={val.status} 
                              onChange={(e) => handleStatusChange(val.id, e.target.value)}
                              className={`text-[11px] font-bold py-1 px-2 border rounded-md focus:outline-none cursor-pointer tracking-wide ${colorMap}`}
                            >
                              <option value="not-applied">Not Applied</option>
                              <option value="applied">Applied</option>
                              <option value="interview">Interview Appointed</option>
                              <option value="offer">Offer Confirmed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button onClick={() => handleRecordDelete(val.id)} className="text-[10px] font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-md transition-all">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Overlay Component Sheet */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">Create Tracking Reference Record</h4>
            <form onSubmit={handleCreateEntry} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Position Name</label>
                <input type="text" value={newTrack} onChange={e => setNewTrack(e.target.value)} placeholder="e.g. Fachinformatiker" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Company / Firm</label>
                <input type="text" value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="e.g. Acme Corp" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Monthly Pay</label>
                  <input type="text" value={newGehalt} onChange={e => setNewGehalt(e.target.value)} placeholder="e.g. 1,200€" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Future Salary</label>
                  <input type="text" value={newEarnings} onChange={e => setNewEarnings(e.target.value)} placeholder="e.g. 4,500€" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Location Address</label>
                <input type="text" value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="e.g. Hamburg, DE" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">HR Email</label>
                  <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="jobs@firm.de" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Deadline Limit</label>
                  <input type="text" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} placeholder="Ongoing" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-5">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs transition-colors">Save Position</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
