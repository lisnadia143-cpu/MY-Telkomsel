import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store with realistic initial seeding
let contacts: any[] = [
  {
    id: "cnt-1",
    name: "Andi Wijaya",
    company: "PT Bank Central Indonesia Tbk",
    email: "andi.wijaya@bci.co.id",
    phone: "08112233445",
    serviceOfInterest: "Telkomsel SD-WAN & Security",
    message: "Halo, kami tertarik untuk menerapkan sistem konektivitas kantor cabang yang aman menggunakan SD-WAN Telkomsel di 150 cabang kami. Mohon proposal dan penjadwalan presentasi teknis.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Followed Up"
  },
  {
    id: "cnt-2",
    name: "Rina Kartika",
    company: "PT Logistik Indonesia Maju",
    email: "rina@limlogistics.id",
    phone: "08129988776",
    serviceOfInterest: "Telkomsel IoT Fleet Tracker",
    message: "Kami membutuhkan solusi pelacakan armada truk kontainer kami secara real-time yang terintegrasi dengan sensor suhu kargo. Berapa biaya instalasi per unit armada?",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "New"
  },
  {
    id: "cnt-3",
    name: "Budi Santoso",
    company: "PT Pertamina Energi Baru",
    email: "budi.s@pertamina-eb.com",
    phone: "08134455667",
    serviceOfInterest: "Telkomsel 5G Private Network",
    message: "Tertarik menjajaki implementasi 5G Private Network untuk area kilang offshore kami guna mengotomatisasi IoT industri dan drone monitoring.",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: "New"
  }
];

let emailLogs: any[] = [
  {
    id: "eml-1",
    to: "admin-enterprise@telkomsel.co.id",
    subject: "🔔 [NOTIFIKASI] Pengajuan Konsultasi Bisnis Baru - PT Bank Central Indonesia Tbk",
    body: "<h3>Notifikasi Kontak Masuk Baru</h3><p><strong>Nama:</strong> Andi Wijaya<br><strong>Perusahaan:</strong> PT Bank Central Indonesia Tbk<br><strong>Email:</strong> andi.wijaya@bci.co.id<br><strong>Telepon:</strong> 08112233445<br><strong>Solusi:</strong> Telkomsel SD-WAN & Security<br><strong>Pesan:</strong> Halo, kami tertarik untuk menerapkan sistem konektivitas kantor cabang yang aman...</p><p><em>Email ini dikirimkan secara otomatis oleh sistem Telkomsel Enterprise Hub.</em></p>",
    sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Sent"
  },
  {
    id: "eml-2",
    to: "andi.wijaya@bci.co.id",
    subject: "Konfirmasi Penerimaan Konsultasi Solusi - Telkomsel Enterprise",
    body: "<p>Yth. Bp/Ibu Andi Wijaya,</p><p>Terima kasih telah menghubungi Telkomsel Enterprise. Pengajuan konsultasi Anda mengenai <strong>Telkomsel SD-WAN & Security</strong> telah kami terima.</p><p>Account Manager kami akan segera menghubungi Anda dalam waktu maksimal 1x24 jam kerja untuk mendiskusikan kebutuhan PT Bank Central Indonesia Tbk secara mendalam.</p><p>Salam hangat,<br><strong>Telkomsel Enterprise Team</strong></p>",
    sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Sent"
  },
  {
    id: "eml-3",
    to: "admin-enterprise@telkomsel.co.id",
    subject: "🔔 [NOTIFIKASI] Pengajuan Konsultasi Bisnis Baru - PT Logistik Indonesia Maju",
    body: "<h3>Notifikasi Kontak Masuk Baru</h3><p><strong>Nama:</strong> Rina Kartika<br><strong>Perusahaan:</strong> PT Logistik Indonesia Maju<br><strong>Solusi:</strong> Telkomsel IoT Fleet Tracker<br><strong>Pesan:</strong> Kami membutuhkan solusi pelacakan armada truk kontainer kami...</p>",
    sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Sent"
  },
  {
    id: "eml-4",
    to: "rina@limlogistics.id",
    subject: "Konfirmasi Penerimaan Konsultasi Solusi - Telkomsel Enterprise",
    body: "<p>Yth. Bp/Ibu Rina Kartika,</p><p>Terima kasih atas pengajuan Anda mengenai <strong>Telkomsel IoT Fleet Tracker</strong>. Account Manager kami akan segera menghubungi Anda...</p>",
    sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Sent"
  },
  {
    id: "eml-5",
    to: "admin-enterprise@telkomsel.co.id",
    subject: "🔔 [NOTIFIKASI] Pengajuan Konsultasi Bisnis Baru - PT Pertamina Energi Baru",
    body: "<h3>Notifikasi Kontak Masuk Baru</h3><p><strong>Nama:</strong> Budi Santoso<br><strong>Perusahaan:</strong> PT Pertamina Energi Baru<br><strong>Solusi:</strong> Telkomsel 5G Private Network</p>",
    sentAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: "Sent"
  }
];

// Seeded traffic stats over 7 days
let trafficStats = [
  { date: "11 Jul", visitors: 320, chats: 112, inquiries: 4 },
  { date: "12 Jul", visitors: 280, chats: 95, inquiries: 3 },
  { date: "13 Jul", visitors: 450, chats: 168, inquiries: 8 },
  { date: "14 Jul", visitors: 510, chats: 194, inquiries: 12 },
  { date: "15 Jul", visitors: 480, chats: 155, inquiries: 6 },
  { date: "16 Jul", visitors: 620, chats: 242, inquiries: 15 },
  { date: "17 Jul", visitors: 290, chats: 98, inquiries: 5 }, // today (so far)
];

// Seeded chatbot topic counts
let chatCategories = {
  connectivity: 154,
  iot: 112,
  cloud: 85,
  security: 62,
  general: 45
};

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // If API key is empty or placeholder, we will return null to trigger mock responses
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API Endpoints

// Contact Form Consultation Submission
app.post("/api/contact", (req, res) => {
  const { name, company, email, phone, serviceOfInterest, message } = req.body;

  if (!name || !company || !email || !phone || !serviceOfInterest || !message) {
    return res.status(400).json({ error: "Semua field formulir harus diisi." });
  }

  const newContact = {
    id: `cnt-${Date.now()}`,
    name,
    company,
    email,
    phone,
    serviceOfInterest,
    message,
    createdAt: new Date().toISOString(),
    status: "New"
  };

  contacts.unshift(newContact);

  // Auto-generate Email Notifications
  const adminEmail = {
    id: `eml-admin-${Date.now()}`,
    to: "admin-enterprise@telkomsel.co.id",
    subject: `🔔 [NOTIFIKASI] Pengajuan Konsultasi Bisnis Baru - ${company}`,
    body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #E21E26; border-bottom: 2px solid #E21E26; padding-bottom: 10px; margin-top: 0;">Konsultasi Bisnis Masuk</h2>
        <p>Halo Admin Telkomsel Enterprise,</p>
        <p>Telah masuk pengajuan konsultasi bisnis baru dari calon klien korporat dengan detail berikut:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 30%;">Nama Lengkap</td><td>: ${name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Perusahaan</td><td>: ${company}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Alamat Email</td><td>: ${email}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">No. Telepon</td><td>: ${phone}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #E21E26;">Solusi Diminati</td><td>: <strong>${serviceOfInterest}</strong></td></tr>
        </table>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #E21E26; border-radius: 4px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 8px 0; color: #333;">Detail Pesan:</h4>
          <p style="margin: 0; font-style: italic; color: #555;">"${message}"</p>
        </div>
        <p>Mohon segera tugaskan Account Manager (AM) terkait untuk merespon dalam waktu 1x24 jam.</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 11px; color: #777; margin: 0;">Email otomatis ini dikirim oleh Sistem Hub Korporat Telkomsel Enterprise.</p>
      </div>
    `,
    sentAt: new Date().toISOString(),
    status: "Sent" as const
  };

  const clientEmail = {
    id: `eml-client-${Date.now()}`,
    to: email,
    subject: "Konfirmasi Penerimaan Pengajuan Konsultasi Bisnis - Telkomsel Enterprise",
    body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #E21E26; margin: 0;">Telkomsel Enterprise</h2>
          <p style="font-size: 13px; color: #777; margin: 5px 0 0 0;">Solusi Bisnis Masa Depan untuk Akselerasi Korporat Anda</p>
        </div>
        <p>Yth. Bp/Ibu <strong>${name}</strong>,</p>
        <p>Mewakili <strong>${company}</strong>,</p>
        <p>Terima kasih telah mengajukan permohonan konsultasi solusi bisnis mengenai <strong>${serviceOfInterest}</strong> bersama Telkomsel Enterprise.</p>
        <p>Kami sangat menghargai ketertarikan Anda. Saat ini tim internal kami sedang menganalisis kebutuhan awal perusahaan Anda. <strong>Account Manager kami akan segera menghubungi Anda dalam waktu 1x24 jam kerja</strong> melalui nomor telepon <strong>${phone}</strong> atau email ini untuk mengagendakan konsultasi mendalam.</p>
        <p>Sembari menunggu, Anda dapat menjelajahi ragam portofolio solusi kami di katalog digital Telkomsel Enterprise.</p>
        <p>Salam hangat,</p>
        <p style="margin-bottom: 0; font-weight: bold;">Enterprise Business Relations</p>
        <p style="margin-top: 0; color: #E21E26; font-weight: bold;">PT Telekomunikasi Selular (Telkomsel)</p>
      </div>
    `,
    sentAt: new Date().toISOString(),
    status: "Sent" as const
  };

  emailLogs.unshift(adminEmail, clientEmail);

  // Update stats
  const todayStat = trafficStats[trafficStats.length - 1];
  if (todayStat) {
    todayStat.inquiries += 1;
  }

  res.status(200).json({ success: true, message: "Pesan terkirim dan email notifikasi otomatis berhasil dipicu." });
});

// Chatbot Interaction Handler with Gemini API
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong." });
  }

  // Update stats
  const todayStat = trafficStats[trafficStats.length - 1];
  if (todayStat) {
    todayStat.chats += 1;
  }

  // Segment interest based on message text keywords
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes("iot") || lowerMsg.includes("sensor") || lowerMsg.includes("fleet") || lowerMsg.includes("tracker")) {
    chatCategories.iot += 1;
  } else if (lowerMsg.includes("cloud") || lowerMsg.includes("saas") || lowerMsg.includes("hosting") || lowerMsg.includes("storage")) {
    chatCategories.cloud += 1;
  } else if (lowerMsg.includes("aman") || lowerMsg.includes("cyber") || lowerMsg.includes("security") || lowerMsg.includes("sandi") || lowerMsg.includes("hacker")) {
    chatCategories.security += 1;
  } else if (lowerMsg.includes("internet") || lowerMsg.includes("sd-wan") || lowerMsg.includes("jaringan") || lowerMsg.includes("5g") || lowerMsg.includes("koneksi")) {
    chatCategories.connectivity += 1;
  } else {
    chatCategories.general += 1;
  }

  const systemInstruction = `
    Anda adalah digiBiz Assistant, AI Virtual Assistant resmi dari PT Telkomsel Enterprise.
    Tugas Anda adalah membantu calon klien korporat (B2B) dan pelanggan bisnis dalam memahami solusi digital, jaringan, dan layanan teknologi Telkomsel.

    PRINSIP UTAMA:
    1. Ramah, profesional, solutif, dan menjawab dalam Bahasa Indonesia yang formal dan sopan.
    2. Fokus murni pada kebutuhan bisnis B2B (bukan B2C untuk pulsa/kuota personal biasa, tapi jika ditanya tentang layanan korporat seperti MyGroup, Halo Enterprise, jelaskan dengan ramah).
    3. Promosikan solusi-solusi utama Telkomsel Enterprise jika relevan dengan pertanyaan:
       - Konektivitas: Telkomsel SD-WAN (mengamankan jaringan cabang), 5G Private Network (untuk industri manufaktur/offshore), Telkomsel MyGroup (komunikasi gratis antar karyawan).
       - IoT (Internet of Things): Telkomsel IoT Control Center (manajemen kartu SIM IoT skala besar), IoT Fleet Tracker (pelacak armada logistik logistik), IoT Smart Connectivity.
       - Cloud & SaaS: Telkomsel Cloud SaaS, Google Workspace/Microsoft 365 dari Telkomsel, Cloud hosting terintegrasi.
       - Security: Cyber Security Protection, Mobile Threat Defense.
       - Digital Marketing: Telkomsel MyAds (iklan SMS/digital terarah), LinkAja B2B.
    4. Jika pelanggan tertarik untuk melakukan konsultasi atau berminat terhadap solusi tertentu, arahkan mereka dengan sopan untuk mengisi "Formulir Konsultasi Bisnis" di halaman bawah agar tim Account Manager bisa menghubungi mereka dalam 1x24 jam.

    INFORMASI PENTING:
    - Kantor Pusat Telkomsel Smart Office berada di Jakarta.
    - Telkomsel adalah operator seluler terbesar di Indonesia yang kini memimpin transformasi digital nasional dengan jaringan 5G terluas.
  `;

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Mock Response Mode (when GEMINI_API_KEY is not configured or is a placeholder)
      console.log("Gemini API key is not set or placeholder. Running in mock response mode.");
      
      let mockReply = "";
      if (lowerMsg.includes("halo") || lowerMsg.includes("hi") || lowerMsg.includes("pagi") || lowerMsg.includes("siang") || lowerMsg.includes("sore")) {
        mockReply = "Halo! Saya digiBiz Assistant dari Telkomsel Enterprise. Ada yang bisa saya bantu terkait solusi bisnis dan layanan digital korporat hari ini?";
      } else if (lowerMsg.includes("iot") || lowerMsg.includes("fleet") || lowerMsg.includes("tracker")) {
        mockReply = "Telkomsel Enterprise memiliki solusi IoT terlengkap, di antaranya **Telkomsel IoT Control Center** untuk mengelola konektivitas SIM IoT Anda secara aman, dan **IoT Fleet Tracker** untuk memantau rute, konsumsi bahan bakar, dan kondisi armada logistik Anda secara real-time. Apakah Anda tertarik untuk mengintegrasikan sensor tertentu, atau ingin menjadwalkan konsultasi gratis?";
      } else if (lowerMsg.includes("sd-wan") || lowerMsg.includes("internet") || lowerMsg.includes("jaringan") || lowerMsg.includes("5g")) {
        mockReply = "Untuk konektivitas bisnis terintegrasi, kami menawarkan **Telkomsel SD-WAN** yang secara otomatis mengoptimalkan rute data kantor cabang Anda dengan aman dan efisien, serta **5G Private Network** untuk koneksi latensi super rendah di area industri. Anda juga dapat menggunakan solusi **MyGroup** untuk nelpon dan SMS gratis sepuasnya antar karyawan perusahaan Anda.";
      } else if (lowerMsg.includes("cloud") || lowerMsg.includes("saas")) {
        mockReply = "Solusi **Telkomsel Cloud & SaaS** membantu perusahaan bertransformasi digital secara cepat tanpa investasi infrastruktur fisik besar. Kami menyediakan bundling lisensi Google Workspace, Microsoft 365, serta platform cloud tangguh untuk menjamin kolaborasi bisnis Anda berjalan lancar di mana saja. Silakan isi formulir konsultasi di bawah untuk penawaran harga khusus korporat.";
      } else if (lowerMsg.includes("keamanan") || lowerMsg.includes("cyber") || lowerMsg.includes("security")) {
        mockReply = "Keamanan siber adalah prioritas utama kami. Solusi **Cyber Security Telkomsel** mencakup *Mobile Threat Defense* untuk melindungi gawai karyawan dari serangan siber, serta manajemen keamanan jaringan yang kokoh untuk mencegah kebocoran data sensitif perusahaan Anda.";
      } else if (lowerMsg.includes("harga") || lowerMsg.includes("biaya") || lowerMsg.includes("daftar")) {
        mockReply = "Tarif layanan Telkomsel Enterprise bersifat fleksibel dan disesuaikan dengan skala serta kebutuhan spesifik korporasi Anda. Silakan isi **Formulir Konsultasi Bisnis** di halaman landing page kami, dan tim Account Manager kami akan segera menghubungi Anda dengan penawaran proposal harga yang kompetitif.";
      } else {
        mockReply = "Terima kasih atas pertanyaan Anda. Sebagai digiBiz Assistant dari Telkomsel Enterprise, saya menyarankan solusi terintegrasi seperti SD-WAN untuk konektivitas, IoT Fleet Tracker untuk logistik, atau Telkomsel Cloud untuk kolaborasi kerja. Anda bisa menanyakan detail layanan tersebut, atau mengisi formulir konsultasi di bawah agar Account Manager kami dapat membantu merancang solusi optimal untuk perusahaan Anda.";
      }

      // Prepend a subtle badge indicating Mock Mode
      mockReply = `[digiBiz AI Assistant]: ${mockReply}`;
      return res.status(200).json({ reply: mockReply, isMock: true });
    }

    // Call real Gemini API
    // Format history from client to match what's needed for model contents
    // Let's build a clean list of content messages for the chat.
    const contents: any[] = [];
    
    // Add history if present
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content || msg.text }]
        });
      });
    }
    
    // Add the current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Maaf, saya sedang mengalami kendala teknis. Mohon tanyakan kembali beberapa saat lagi.";
    res.status(200).json({ reply, isMock: false });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Gagal berkomunikasi dengan chatbot AI.",
      details: error.message,
      reply: "Maaf, sistem AI kami sedang tidak merespon. Mohon hubungi kami melalui formulir kontak di bawah atau gunakan simulasi pertanyaan umum."
    });
  }
});

// Admin Dashboard stats & data endpoint
app.get("/api/admin/stats", (req, res) => {
  res.status(200).json({
    trafficStats,
    chatCategories,
    contacts,
    emailLogs
  });
});

// Admin Endpoint to update contact status
app.patch("/api/admin/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const contact = contacts.find(c => c.id === id);
  if (contact) {
    contact.status = status;
    return res.status(200).json({ success: true, contact });
  }

  res.status(404).json({ error: "Kontak tidak ditemukan." });
});

// Admin Endpoint to simulate a new visitor click/event to mock realistic traffic spikes
app.post("/api/admin/simulate-traffic", (req, res) => {
  const todayStat = trafficStats[trafficStats.length - 1];
  if (todayStat) {
    todayStat.visitors += Math.floor(Math.random() * 20) + 5;
    todayStat.chats += Math.floor(Math.random() * 5);
    return res.status(200).json({ success: true, todayStat });
  }
  res.status(500).json({ error: "Gagal mensimulasikan trafik hari ini." });
});

// Admin Endpoint to reset state back to defaults
app.post("/api/admin/reset", (req, res) => {
  contacts = [
    {
      id: "cnt-1",
      name: "Andi Wijaya",
      company: "PT Bank Central Indonesia Tbk",
      email: "andi.wijaya@bci.co.id",
      phone: "08112233445",
      serviceOfInterest: "Telkomsel SD-WAN & Security",
      message: "Halo, kami tertarik untuk menerapkan sistem konektivitas kantor cabang yang aman menggunakan SD-WAN Telkomsel di 150 cabang kami...",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Followed Up"
    }
  ];
  emailLogs = [
    {
      id: "eml-1",
      to: "admin-enterprise@telkomsel.co.id",
      subject: "🔔 [NOTIFIKASI] Pengajuan Konsultasi Bisnis Baru - PT Bank Central Indonesia Tbk",
      body: "...",
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Sent"
    }
  ];
  trafficStats = [
    { date: "11 Jul", visitors: 320, chats: 112, inquiries: 4 },
    { date: "12 Jul", visitors: 280, chats: 95, inquiries: 3 },
    { date: "13 Jul", visitors: 450, chats: 168, inquiries: 8 },
    { date: "14 Jul", visitors: 510, chats: 194, inquiries: 12 },
    { date: "15 Jul", visitors: 480, chats: 155, inquiries: 6 },
    { date: "16 Jul", visitors: 620, chats: 242, inquiries: 15 },
    { date: "17 Jul", visitors: 290, chats: 98, inquiries: 5 },
  ];
  chatCategories = {
    connectivity: 154,
    iot: 112,
    cloud: 85,
    security: 62,
    general: 45
  };

  res.status(200).json({ success: true, message: "State berhasil direset ke pengaturan bawaan." });
});

// Vite Server Integration for Dev & Fallback for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] PT Telkomsel Enterprise Hub running on port ${PORT}`);
  });
}

startServer();
