import React, { useState } from "react";
import { servicesData } from "../data/servicesData";
import { ServiceItem } from "../types";
import { 
  Network, Cpu, Truck, Cloud, Radio, Megaphone, ShieldAlert,
  ArrowRight, Check, X, ShieldCheck, HeartHandshake, Info
} from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: "all", name: "Semua Solusi" },
    { id: "connectivity", name: "Konektivitas & 5G" },
    { id: "iot", name: "Internet of Things" },
    { id: "cloud", name: "Cloud & Productivity" },
    { id: "security", name: "Cyber Security" },
    { id: "marketing", name: "Digital Marketing" },
  ];

  const filteredServices = activeTab === "all"
    ? servicesData
    : servicesData.filter(s => s.category === activeTab);

  const getIcon = (name: string) => {
    switch (name) {
      case "Network": return <Network className="w-6 h-6" />;
      case "Cpu": return <Cpu className="w-6 h-6" />;
      case "Truck": return <Truck className="w-6 h-6" />;
      case "Cloud": return <Cloud className="w-6 h-6" />;
      case "Radio": return <Radio className="w-6 h-6" />;
      case "Megaphone": return <Megaphone className="w-6 h-6" />;
      case "ShieldAlert": return <ShieldAlert className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const handleSelectForConsultation = (title: string) => {
    onSelectService(title);
    setSelectedService(null);
    // Smooth scroll to contact form
    const formElement = document.getElementById("konsultasi");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="layanan" className="py-20 bg-gray-50/50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#E21E26] uppercase tracking-widest block bg-red-50 py-1.5 px-3.5 rounded-full w-fit mx-auto">
            Portofolio B2B Terbaru
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Layanan Digital Terbaru & Solusi Bisnis Korporat
          </h2>
          <p className="text-sm text-gray-500 font-light">
            Solusi digital terlengkap dari PT Telkomsel yang dirancang secara kokoh, andal, dan siap diintegrasikan untuk mempercepat transformasi industri Anda.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all border ${
                activeTab === cat.id
                  ? "bg-[#E21E26] text-white border-transparent shadow-md shadow-red-500/10"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div id="solusi" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-mt-20">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-red-100 shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E21E26] flex items-center justify-center transition-all group-hover:scale-110">
                    {getIcon(service.iconName)}
                  </div>
                  {/* Optional Badge */}
                  {service.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#E21E26]/10 text-[#E21E26] uppercase tracking-wide">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#E21E26] transition-colors mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-500 font-light line-clamp-3 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-gray-800 hover:text-[#E21E26] inline-flex items-center space-x-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5 mr-0.5" />
                  <span>Detail Spesifikasi</span>
                </button>

                <button
                  onClick={() => handleSelectForConsultation(service.title)}
                  className="text-xs font-bold text-[#E21E26] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1"
                >
                  <span>Konsultasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Slide-over for Service Detail */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 transform transition-all animate-scale-up">
              
              {/* Header */}
              <div className="bg-[#E21E26] text-white p-6 relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-semibold opacity-90">
                    {selectedService.category}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">{selectedService.title}</h3>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Deskripsi Layanan
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {selectedService.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Fitur Utama
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-700">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mr-2 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                  <h4 className="text-xs font-bold text-[#E21E26] uppercase tracking-wider mb-1.5 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    <span>Manfaat Bisnis Utama</span>
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed font-light">
                    {selectedService.benefits}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-1/3 text-xs font-bold py-2.5 rounded-xl bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all text-center"
                >
                  Tutup
                </button>
                <button
                  onClick={() => handleSelectForConsultation(selectedService.title)}
                  className="w-full sm:w-2/3 text-xs font-extrabold py-2.5 rounded-xl bg-[#E21E26] text-white hover:bg-[#c1151c] shadow-md shadow-red-500/10 transition-all flex items-center justify-center space-x-1.5"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Dapatkan Proposal & Konsultasi</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
