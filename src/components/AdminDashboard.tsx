import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Users, MessageSquare, Briefcase, Mail, CheckCircle, 
  Clock, AlertCircle, RefreshCw, Sparkles, LayoutGrid, Eye, Trash2, ShieldAlert, MailOpen
} from "lucide-react";
import { AdminStats, ContactSubmission, EmailLog } from "../types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"contacts" | "emails" | "analytics">("contacts");
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error("Gagal memuat statistik admin:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (contactId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchStats(); // reload stats
      }
    } catch (err) {
      console.error("Gagal memperbarui status:", err);
    }
  };

  const handleSimulateTraffic = async () => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/simulate-traffic", { method: "POST" });
      if (res.ok) {
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetState = async () => {
    if (!window.confirm("Apakah Anda yakin ingin mereset basis data admin ke setelan bawaan?")) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/reset", { method: "POST" });
      if (res.ok) {
        fetchStats();
        setSelectedEmail(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-10 h-10 text-[#E21E26] animate-spin" />
        <span className="text-sm text-gray-500 font-semibold">Memuat Portal Analitik Admin...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900">Gagal Terkoneksi dengan Server Admin</h3>
        <p className="text-xs text-gray-500 max-w-sm">Pastikan server backend Anda berjalan dengan baik dan rute `/api/admin/stats` dapat diakses.</p>
        <button onClick={fetchStats} className="bg-[#E21E26] text-white px-4 py-2 rounded-xl text-xs font-bold">
          Coba Lagi
        </button>
      </div>
    );
  }

  // Calculate sum counts for metric cards
  const totalVisitors = stats.trafficStats.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalChats = stats.trafficStats.reduce((acc, curr) => acc + curr.chats, 0);
  const totalInquiries = stats.contacts.length;
  const totalEmails = stats.emailLogs.length;

  // Custom SVG line coordinates helper for traffic stats graph
  const maxVal = Math.max(...stats.trafficStats.map(pt => pt.visitors), 800);
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = 30;

  const getPoints = (dataKey: "visitors" | "chats") => {
    return stats.trafficStats.map((pt, i) => {
      const x = padding + (i / (stats.trafficStats.length - 1)) * (chartWidth - padding * 2);
      const val = pt[dataKey];
      const y = chartHeight - padding - (val / maxVal) * (chartHeight - padding * 2);
      return { x, y };
    });
  };

  const visitorPoints = getPoints("visitors");
  const chatPoints = getPoints("chats");

  return (
    <div className="min-h-screen bg-gray-50 text-left">
      
      {/* Admin Header Banner */}
      <div className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E21E26]">
                Telkomsel Enterprise Hub • Monitoring Panel
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">Portal Analitik Interaksi Pelanggan</h1>
            <p className="text-xs text-gray-400 mt-1">Memantau metrik pengunjung, statistik chat AI real-time, pengajuan konsultasi, dan log sistem email notifikasi otomatis.</p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Simulation Controls */}
            <button
              onClick={handleSimulateTraffic}
              disabled={actionLoading}
              className="flex items-center space-x-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2.5 rounded-xl border border-white/10 transition-all disabled:opacity-50"
            >
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span>Simulasi Trafik</span>
            </button>

            <button
              onClick={handleResetState}
              disabled={actionLoading}
              className="flex items-center space-x-1.5 text-xs font-bold bg-red-600/10 hover:bg-red-600/20 text-[#E21E26] px-3.5 py-2.5 rounded-xl border border-red-600/20 transition-all disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Total Pengunjung</span>
              <span className="text-2xl font-black text-gray-900">{totalVisitors.toLocaleString()}</span>
              <span className="text-[10px] text-green-600 font-bold block">↑ 14.2% dibanding kemarin</span>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Chatbot Interaksi</span>
              <span className="text-2xl font-black text-gray-900">{totalChats.toLocaleString()}</span>
              <span className="text-[10px] text-green-600 font-bold block">↓ 2.5% tingkat melambung</span>
            </div>
            <div className="w-12 h-12 bg-red-50 text-[#E21E26] rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Kontak Konsultasi</span>
              <span className="text-2xl font-black text-gray-900">{totalInquiries}</span>
              <span className="text-[10px] text-green-600 font-bold block">100% tersimpan aman</span>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Email Notifikasi</span>
              <span className="text-2xl font-black text-gray-900">{totalEmails} Logs</span>
              <span className="text-[10px] text-green-600 font-bold block">Otomatis terkirim instan</span>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Analytics & Quick Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Custom SVG Traffic Trend Graph */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Grafik Perkembangan Trafik Mingguan</h3>
                  <p className="text-[10px] text-gray-400">Analitik 7 hari terakhir kunjungan mandiri dan interaksi chatbot AI</p>
                </div>
                <div className="flex items-center space-x-3 text-[10px] font-semibold">
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                    <span>Pengunjung</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-[#E21E26] rounded-full" />
                    <span>Chatbot AI</span>
                  </div>
                </div>
              </div>

              {/* Pure SVG Line Chart */}
              <div className="relative w-full overflow-x-auto">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full min-w-[480px]">
                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#f3f4f6" strokeWidth={1} />
                  <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#f3f4f6" strokeWidth={1} />
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#e5e7eb" strokeWidth={1} />
                  
                  {/* Visitor Path Area */}
                  <path
                    d={`
                      M ${visitorPoints[0].x} ${chartHeight - padding}
                      ${visitorPoints.map(p => `L ${p.x} ${p.y}`).join(" ")}
                      L ${visitorPoints[visitorPoints.length - 1].x} ${chartHeight - padding} Z
                    `}
                    fill="rgba(59, 130, 246, 0.05)"
                  />
                  {/* Chat Path Area */}
                  <path
                    d={`
                      M ${chatPoints[0].x} ${chartHeight - padding}
                      ${chatPoints.map(p => `L ${p.x} ${p.y}`).join(" ")}
                      L ${chatPoints[chatPoints.length - 1].x} ${chartHeight - padding} Z
                    `}
                    fill="rgba(226, 30, 38, 0.05)"
                  />

                  {/* Line Draw */}
                  <polyline points={visitorPoints.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#3b82f6" strokeWidth={2.5} />
                  <polyline points={chatPoints.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#E21E26" strokeWidth={2.5} />

                  {/* Data Dots */}
                  {visitorPoints.map((p, i) => (
                    <circle key={`v-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />
                  ))}
                  {chatPoints.map((p, i) => (
                    <circle key={`c-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#E21E26" stroke="#fff" strokeWidth={1.5} />
                  ))}

                  {/* Date labels */}
                  {stats.trafficStats.map((pt, i) => {
                    const x = padding + (i / (stats.trafficStats.length - 1)) * (chartWidth - padding * 2);
                    return (
                      <text key={`l-${i}`} x={x} y={chartHeight - 8} fontSize="9" fill="#9ca3af" textAnchor="middle" fontWeight="bold">
                        {pt.date}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 mr-1 shrink-0" />
                <span>Rata-rata <strong>{(totalVisitors / stats.trafficStats.length).toFixed(0)}</strong> pengunjung harian</span>
              </span>
              <span>Terakhir diperbarui: Baru saja</span>
            </div>
          </div>

          {/* Chat Topics / Segment Distribution */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Segmentasi Topik Chatbot</h3>
              <p className="text-[10px] text-gray-400 mb-6">Distribusi minat calon klien berdasarkan analisis teks pertanyaan AI</p>
              
              <div className="space-y-4">
                {Object.entries(stats.chatCategories).map(([key, value]) => {
                  const vals = Object.values(stats.chatCategories) as number[];
                  const total = vals.reduce((a, b) => a + b, 0);
                  const pct = total > 0 ? ((value as number) / total) * 100 : 0;
                  
                  // Color codes
                  let barColor = "bg-gray-400";
                  if (key === "connectivity") barColor = "bg-blue-500";
                  else if (key === "iot") barColor = "bg-[#E21E26]";
                  else if (key === "cloud") barColor = "bg-green-500";
                  else if (key === "security") barColor = "bg-purple-500";

                  return (
                    <div key={key} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center text-gray-700 font-medium capitalize">
                        <span>{key === "general" ? "Umum / Profil" : key}</span>
                        <span className="font-semibold">{value} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 text-[10px] text-gray-400">
              *Metrik mengalir dinamis setiap ada pesan masuk ke chatbot.
            </div>
          </div>

        </div>

        {/* Interactive Tabs Menu for Log Databases */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`text-xs font-bold px-5 py-3 border-b-2 transition-all ${
              activeTab === "contacts"
                ? "border-[#E21E26] text-[#E21E26]"
                : "border-transparent text-gray-400 hover:text-gray-900"
            }`}
          >
            Daftar Pengajuan Calon Klien ({stats.contacts.length})
          </button>

          <button
            onClick={() => setActiveTab("emails")}
            className={`text-xs font-bold px-5 py-3 border-b-2 transition-all ${
              activeTab === "emails"
                ? "border-[#E21E26] text-[#E21E26]"
                : "border-transparent text-gray-400 hover:text-gray-900"
            }`}
          >
            Log Notifikasi Email Otomatis ({stats.emailLogs.length})
          </button>
        </div>

        {/* Tab 1: Contacts Log */}
        {activeTab === "contacts" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Daftar Kontak Konsultasi Bisnis B2B</h3>
            </div>

            {stats.contacts.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                Belum ada pengajuan masuk. Gunakan formulir di halaman utama untuk memasukkan data baru.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100/50 text-gray-500 font-bold border-b border-gray-100">
                      <th className="p-4">Tanggal Masuk</th>
                      <th className="p-4">Klien & Perusahaan</th>
                      <th className="p-4">Detail Kontak</th>
                      <th className="p-4">Solusi Diminati</th>
                      <th className="p-4">Detail Kebutuhan</th>
                      <th className="p-4">Status Hub</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 text-gray-500 whitespace-nowrap">
                          {new Date(contact.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{contact.name}</div>
                          <div className="text-[10px] text-gray-500 font-medium uppercase mt-0.5">{contact.company}</div>
                        </td>
                        <td className="p-4 space-y-0.5">
                          <div>{contact.email}</div>
                          <div className="text-gray-400 font-mono">{contact.phone}</div>
                        </td>
                        <td className="p-4 font-semibold text-[#E21E26]">
                          {contact.serviceOfInterest}
                        </td>
                        <td className="p-4 text-gray-600 max-w-xs font-light">
                          <div className="line-clamp-2" title={contact.message}>{contact.message}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={contact.status}
                            onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                            className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border focus:ring-1 focus:ring-[#E21E26] outline-none cursor-pointer ${
                              contact.status === "New" 
                                ? "bg-red-50 text-red-600 border-red-100" 
                                : contact.status === "Followed Up" 
                                ? "bg-yellow-50 text-yellow-700 border-yellow-100" 
                                : "bg-green-50 text-green-700 border-green-100"
                            }`}
                          >
                            <option value="New">Baru (New)</option>
                            <option value="Followed Up">Ditindaklanjuti</option>
                            <option value="Completed">Selesai (Completed)</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Email Logs */}
        {activeTab === "emails" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Logs List Table */}
            <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase">Antrean Log Outbox Sistem Email Otomatis</h3>
              </div>

              {stats.emailLogs.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-xs">
                  Belum ada log pengiriman email keluar.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100/50 text-gray-500 font-bold border-b border-gray-100">
                        <th className="p-3">Waktu Kirim</th>
                        <th className="p-3">Penerima (To)</th>
                        <th className="p-3">Subjek Email</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stats.emailLogs.map((log) => (
                        <tr key={log.id} className={`hover:bg-gray-50/50 transition-colors ${selectedEmail?.id === log.id ? "bg-red-50/20" : ""}`}>
                          <td className="p-3 text-gray-400 whitespace-nowrap">
                            {new Date(log.sentAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="p-3 font-semibold text-gray-700 max-w-[120px] truncate" title={log.to}>
                            {log.to}
                          </td>
                          <td className="p-3 text-gray-600 max-w-[160px] truncate" title={log.subject}>
                            {log.subject}
                          </td>
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-extrabold bg-green-100 text-green-800 uppercase">
                              {log.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setSelectedEmail(log)}
                              className="text-gray-500 hover:text-[#E21E26] p-1 rounded hover:bg-gray-100"
                              title="Inspeksi Konten Email"
                            >
                              <Eye className="w-4 h-4 mx-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Email Emulator Previewer */}
            <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs min-h-[380px] flex flex-col justify-between">
              <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center">
                  <MailOpen className="w-3.5 h-3.5 mr-1 text-green-400" />
                  <span>Emulator Layar Email Outbound</span>
                </span>
                {selectedEmail && (
                  <span className="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded font-extrabold">
                    LOG SUCCESS
                  </span>
                )}
              </div>

              {selectedEmail ? (
                /* Styled email layout viewer */
                <div className="flex-1 p-5 space-y-4 text-left">
                  {/* Header metadata */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1.5 text-xs">
                    <div><span className="text-gray-400 font-semibold inline-block w-12">Kepada:</span> <strong>{selectedEmail.to}</strong></div>
                    <div><span className="text-gray-400 font-semibold inline-block w-12">Subjek:</span> <span className="text-[#E21E26] font-bold">{selectedEmail.subject}</span></div>
                    <div><span className="text-gray-400 font-semibold inline-block w-12">Sent:</span> <span className="text-gray-500 font-mono">{new Date(selectedEmail.sentAt).toLocaleString("id-ID")}</span></div>
                  </div>

                  {/* Body content (HTML parsed directly or rendered raw inside sandbox layout wrapper) */}
                  <div 
                    className="border border-gray-100 rounded-xl p-4 min-h-[180px] bg-white overflow-y-auto max-h-[300px] text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                  />
                  
                  <div className="text-[10px] text-gray-400 text-center font-semibold">
                    ⚡ Otomatisasi email dipicu dalam millisecond setelah form diklik.
                  </div>
                </div>
              ) : (
                /* Placeholder empty state */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
                  <Mail className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-xs font-semibold">Silakan pilih item di log outbox untuk melihat visualisasi format email HTML yang otomatis dikirim ke klien / admin.</p>
                </div>
              )}

              <div className="p-3.5 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 font-light text-center">
                Sistem simulasi menggunakan template responsif HTML PT Telkomsel Enterprise.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
