import React from "react";
import { ArrowRight, MessageSquare, ShieldCheck, Zap, Globe2 } from "lucide-react";

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9FAFB] to-white py-16 sm:py-24 border-b border-gray-100">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E21E26]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E21E26]/3 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-100 px-3.5 py-1 rounded-full">
              <span className="w-2 h-2 bg-[#E21E26] rounded-full animate-ping" />
              <span className="text-xs font-semibold text-[#E21E26] uppercase tracking-wider">
                Solusi Bisnis Digital B2B Terbaik
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
              Akselerasi Masa Depan Bisnis Anda Bersama{" "}
              <span className="text-[#E21E26]">Telkomsel Enterprise</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl font-light leading-relaxed">
              Tingkatkan efisiensi operasional dan kembangkan potensi bisnis Anda melalui layanan digital terbaru yang didesain khusus untuk korporasi: Jaringan 5G Terluas, Solusi IoT Cerdas, Cloud SaaS Produktif, serta Cyber Security Tangguh.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#konsultasi"
                className="inline-flex items-center justify-center space-x-2 bg-[#E21E26] text-white hover:bg-[#c1151c] font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-red-500/10 transition-all text-sm group"
              >
                <span>Mulai Konsultasi Bisnis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center space-x-2 bg-white text-gray-800 hover:text-[#E21E26] border border-gray-200 hover:border-[#E21E26] font-semibold px-6 py-3.5 rounded-xl transition-all text-sm shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya digiBiz AI Assistant</span>
              </button>
            </div>

            {/* Quick trust trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 max-w-lg">
              <div className="flex items-center space-x-2">
                <Globe2 className="w-5 h-5 text-[#E21E26]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">99.9%</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">SLA Jaringan</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#E21E26]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">30K+</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Klien Korporat</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#E21E26]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">&lt; 24 Jam</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Respon Konsultasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase - Floating Card Collage */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-sm h-96">
              
              {/* Back ambient pattern */}
              <div className="absolute inset-0 bg-[#E21E26]/5 rounded-3xl transform rotate-3 scale-105 border border-dashed border-[#E21E26]/20" />
              
              {/* Main Card */}
              <div className="absolute top-4 left-4 right-4 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition-all hover:scale-[1.02]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#E21E26]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-none">Telkomsel 5G IoT</h3>
                    <p className="text-xs text-gray-400 mt-1">Smart Logistics & Automations</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span>Kecepatan Data</span>
                    <span className="font-semibold text-green-600">Hingga 1 Gbps</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span>Konektivitas Armada</span>
                    <span className="font-semibold text-gray-900">12,450 Unit Aktif</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sistem Enkripsi</span>
                    <span className="font-semibold text-gray-900">E2EE Secured</span>
                  </div>
                </div>
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-semibold flex items-center justify-between">
                  <span>Akselerasi Industri 4.0</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Decorative side cards to show B2B solutions */}
              <div className="absolute bottom-4 -left-6 bg-gray-900 text-white rounded-xl shadow-lg p-4 max-w-[180px] border border-gray-800 transition-all hover:-translate-y-1">
                <span className="text-[10px] text-[#E21E26] font-bold uppercase tracking-wider block mb-1">
                  Keamanan Siber
                </span>
                <p className="text-xs font-bold leading-tight mb-2">
                  Antisipasi Kebocoran Data Korporat.
                </p>
                <div className="flex items-center space-x-1.5 text-[10px] text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Sistem Aktif</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-4 bg-white text-gray-800 rounded-xl shadow-lg p-4 max-w-[200px] border border-gray-100 transition-all hover:translate-y-1">
                <div className="flex items-center space-x-2 mb-1.5">
                  <div className="w-2 h-2 bg-[#E21E26] rounded-full" />
                  <span className="text-[10px] text-gray-500 font-semibold uppercase">Cloud SaaS</span>
                </div>
                <p className="text-xs font-bold leading-tight text-gray-900">
                  Google Workspace & MS Office 365
                </p>
                <span className="text-[10px] text-green-600 block mt-1 font-semibold">
                  Satu Tagihan Terpadu
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
