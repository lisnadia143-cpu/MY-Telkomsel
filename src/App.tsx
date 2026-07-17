import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";
import AdminDashboard from "./components/AdminDashboard";
import { MessageSquare, PhoneCall, MapPin, ShieldCheck, Mail } from "lucide-react";

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState("");

  const handleSelectService = (serviceTitle: string) => {
    setPreSelectedService(serviceTitle);
    // Automatically toggle chat open to initiate context
    setIsChatOpen(true);
  };

  const handleContactSuccess = () => {
    // Optionally trigger something or clear pre-selection
    setPreSelectedService("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#E21E26] selection:text-white">
      {/* Dynamic Navbar */}
      <Navbar 
        isAdminView={isAdminView} 
        setIsAdminView={setIsAdminView} 
        onOpenChat={() => setIsChatOpen(true)} 
      />

      {/* Main View Router */}
      {isAdminView ? (
        /* Portal Admin Panel */
        <main className="flex-1">
          <AdminDashboard />
        </main>
      ) : (
        /* Customer-facing Landing Page */
        <main className="flex-1">
          <Hero onOpenChat={() => setIsChatOpen(true)} />
          
          <Services onSelectService={handleSelectService} />
          
          <ContactForm 
            preSelectedService={preSelectedService} 
            onSuccess={handleContactSuccess} 
          />

          {/* Core Trust Pillar Infographic Section */}
          <section className="bg-gray-900 text-white py-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                
                <div className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#E21E26] text-white flex items-center justify-center mx-auto md:mx-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">Infrastruktur Terpercaya</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Didukung lebih dari 250,000 BTS di seluruh Indonesia, menjamin redundansi jaringan prima untuk kelancaran operasional cabang bisnis Anda.
                  </p>
                </div>

                <div className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#E21E26] text-white flex items-center justify-center mx-auto md:mx-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">24/7 Corporate Support</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Layanan pelanggan korporat khusus siaga membantu penyelesaian isu teknis jaringan maupun konfigurasi server cloud Anda kapan saja.
                  </p>
                </div>

                <div className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#E21E26] text-white flex items-center justify-center mx-auto md:mx-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">Lokal Data Center (SLA Tinggi)</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Kedaulatan data sensitif terjamin dengan penempatan server cloud dan kontrol IoT di dalam negeri, mematuhi regulasi ketat perbankan & pemerintah.
                  </p>
                </div>

              </div>
            </div>
          </section>
        </main>
      )}

      {/* Dynamic Floating Chat Trigger (Only visible in user-view and when chat is closed) */}
      {!isAdminView && !isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#E21E26] hover:bg-[#c1151c] text-white p-4 rounded-full shadow-2xl flex items-center justify-center space-x-2 border border-red-500/10 hover:scale-105 transition-all animate-bounce"
          title="Tanya digiBiz Assistant"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-extrabold pr-1">Tanya digiBiz AI</span>
        </button>
      )}

      {/* Conversational Floating Chatbot widget */}
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => {
          setIsChatOpen(false);
          setPreSelectedService("");
        }} 
        serviceSelectedFromHero={preSelectedService}
      />

      {/* Enterprise Brand Footer */}
      <footer className="bg-gray-950 text-white border-t border-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            
            {/* Branding */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#E21E26] flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                  T
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold tracking-tight text-white text-base leading-none">
                    Telkomsel
                  </span>
                  <span className="text-[9px] font-semibold text-[#E21E26] uppercase tracking-widest leading-none mt-0.5">
                    Enterprise
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                PT Telekomunikasi Selular (Telkomsel) adalah penyedia solusi telekomunikasi seluler dan layanan digital B2B terbesar di Indonesia, berkomitmen memperkuat kedaulatan digital nasional.
              </p>
            </div>

            {/* Address */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Kantor Pusat</h4>
              <div className="flex items-start space-x-2 text-[11px] text-gray-400">
                <MapPin className="w-4 h-4 text-[#E21E26] shrink-0 mt-0.5" />
                <p className="font-light">
                  Telkomsel Smart Office, Menara Mulia Lantai 18,<br />
                  Jl. Jend. Gatot Subroto Kav. 52, Jakarta Selatan 12710,<br />
                  DKI Jakarta, Indonesia.
                </p>
              </div>
            </div>

            {/* Quick Contact info */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Hubungan Bisnis</h4>
              <div className="space-y-2 text-[11px] text-gray-400 font-light">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#E21E26]" />
                  <span>enterprise@telkomsel.co.id</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-[#E21E26]" />
                  <span>Call Center: 188 (Panggilan Bisnis)</span>
                </div>
              </div>
            </div>

          </div>

          <hr className="border-gray-900 my-8" />

          {/* Copy Rights */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            <span>© 2026 PT Telekomunikasi Selular. Seluruh Hak Cipta Dilindungi.</span>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Pusat Bantuan B2B</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
