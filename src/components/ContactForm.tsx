import React, { useState, useEffect } from "react";
import { servicesData } from "../data/servicesData";
import { 
  Send, User, Building, Mail, Phone, Briefcase, MessageSquare, 
  CheckCircle, ArrowUpRight, ArrowRight, Loader2, MailOpen, Bell
} from "lucide-react";

interface ContactFormProps {
  preSelectedService: string;
  onSuccess: () => void;
}

export default function ContactForm({ preSelectedService, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceOfInterest: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync pre-selected service from parent interaction
  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, serviceOfInterest: preSelectedService }));
    }
  }, [preSelectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          serviceOfInterest: "",
          message: ""
        });
        // Call parent notify
        onSuccess();
      } else {
        throw new Error(data.error || "Gagal mengirimkan pengajuan.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Koneksi terganggu. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="konsultasi" className="py-20 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Informational Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#E21E26] uppercase tracking-widest block bg-red-50 py-1.5 px-3.5 rounded-full w-fit">
                Hubungi Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Konsultasikan Kebutuhan Teknologi Korporat Anda
              </h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Tim spesialis B2B dan Account Manager Telkomsel Enterprise siap mendengarkan tantangan bisnis Anda, menganalisis kebutuhan infrastruktur, serta menyusun proposal solusi teknologi terbaik yang disesuaikan khusus untuk perusahaan Anda.
              </p>
            </div>

            {/* SLA Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#E21E26] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Penugasan Account Manager Dedikasi</h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">Setiap perusahaan klien didampingi oleh satu Account Manager ahli untuk komunikasi yang fokus.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#E21E26] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Analisis Kebutuhan Gratis</h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">Kami menyediakan sesi pemetaan teknis awal (technical assessment) tanpa dipungut biaya apapun.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#E21E26] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Email Notifikasi Otomatis Terintegrasi</h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">Setiap formulir yang dikirim langsung memicu sistem email tanda terima instan ke kotak masuk Anda dan tim kami.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <span>Butuh solusi cepat? Gunakan AI Chatbot kami.</span>
              <span className="font-semibold text-[#E21E26] flex items-center">
                <span>Chatbot AI</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-gray-50/50 rounded-2xl border border-gray-100 p-6 sm:p-8 flex flex-col justify-center relative min-h-[480px]">
            
            {submitSuccess ? (
              /* Success State Card overlay inside form box */
              <div className="text-center space-y-6 py-8 animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Pengajuan Berhasil Dikirim!</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Formulir konsultasi Anda telah tersimpan secara akurat di basis data Telkomsel Enterprise.
                  </p>
                </div>

                {/* Automation highlight simulation */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 max-w-md mx-auto text-left space-y-3 shadow-xs">
                  <span className="text-[10px] font-bold text-[#E21E26] uppercase tracking-wider flex items-center">
                    <Bell className="w-3.5 h-3.5 mr-1" />
                    <span>Sistem Email Notifikasi Terpicu</span>
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    Sesuai dengan standardisasi otomasi kami, sistem notifikasi email otomatis saat ini telah dikirim ke:
                  </p>
                  <div className="space-y-1.5 text-[10px] font-mono text-gray-500">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span>Admin: <strong>admin-enterprise@telkomsel.co.id</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span>Klien: Konfirmasi penerimaan instan ke email terdaftar</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 block pt-1 border-t border-gray-50">
                    *Detail logs email outbox dapat dipantau langsung di Portal Admin di navbar atas.
                  </span>
                </div>

                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-[#E21E26] text-white hover:bg-[#c1151c] font-bold text-xs px-6 py-2.5 rounded-full transition-colors"
                >
                  Kirim Pengajuan Baru
                </button>
              </div>
            ) : (
              /* Actual Interactive Form */
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                
                {errorMessage && (
                  <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg border border-red-100 font-semibold">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Contoh: Andi Wijaya"
                        className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">Nama Perusahaan / Instansi</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Contoh: PT Telkom Indonesia"
                        className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">Alamat Email Bisnis</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Contoh: andi@bumn.co.id"
                        className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">No. Telepon / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Contoh: 08112345678"
                        className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Solusi Bisnis yang Diminati</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      name="serviceOfInterest"
                      required
                      value={formData.serviceOfInterest}
                      onChange={handleChange}
                      className="w-full text-xs pl-9 pr-4 py-3 bg-white border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">-- Silakan Pilih Layanan Utama --</option>
                      {servicesData.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title} ({svc.category.toUpperCase()})
                        </option>
                      ))}
                      <option value="Kustom Solusi Lainnya">Lainnya / Konsultasi Desain Jaringan Khusus</option>
                    </select>
                    {/* custom caret styling */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <span className="text-[10px] text-gray-400">▼</span>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Detail Tantangan & Kebutuhan Bisnis</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Contoh: Kami berencana mengintegrasikan pelacakan IoT untuk 50 armada distribusi truk logistik kami. Mohon dihubungi dengan proposal penawaran harga..."
                      className="w-full text-xs pl-9 pr-4 py-3 bg-white border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E21E26] text-white hover:bg-[#c1151c] font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-red-500/10 transition-all flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memproses Pengajuan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Formulir Pengajuan Konsultasi</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
