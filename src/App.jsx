{/* Find this section in your code and replace it with this: */}
                <thead className="bg-gray-50/40 text-gray-500 border-b border-gray-200 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4 pl-6">Ausbildung Track & Company</th>
                    <th className="p-4">Stipend Details</th>
                    <th className="p-4">Logistics & Limit</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Progress Monitor</th>
                    <th className="p-4 pr-6 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 text-sm"> {/* Changed text-gray-600 to text-gray-700 and text-xs to text-sm */}
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
                            <div className="font-semibold text-slate-900 text-base">{val.track}</div> {/* Increased to text-base */}
                            <div className="text-sm text-slate-500 mt-0.5 font-medium">{val.company}</div> {/* Increased to text-sm */}
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-slate-800">💰 {val.gehalt}</div>
                            <div className="text-xs text-indigo-600 mt-0.5 font-medium">🚀 Scale: {val.earnings}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-500 font-medium truncate max-w-[200px]" title={val.address}>📍 {val.address}</div>
                            <div className="text-xs text-amber-600 font-semibold mt-0.5">📅 Deadline: {val.deadline}</div>
                          </td>
                          <td className="p-4">
                            {/* HERE is the email fix you wanted */}
                            <a href={`mailto:${val.email}`} className="text-indigo-600 font-semibold hover:underline">{val.email}</a>
                          </td>
                          <td className="p-4">
                            <select 
                              value={val.status} 
                              onChange={(e) => handleStatusChange(val.id, e.target.value)}
                              className={`text-sm font-bold py-1.5 px-3 border rounded-md focus:outline-none cursor-pointer tracking-wide ${colorMap}`}
                            >
                              <option value="not-applied">Not Applied</option>
                              <option value="applied">Applied</option>
                              <option value="interview">Interview Appointed</option>
                              <option value="offer">Offer Confirmed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button onClick={() => handleRecordDelete(val.id)} className="text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-md transition-all">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
