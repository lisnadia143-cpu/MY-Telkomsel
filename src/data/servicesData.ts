import { ServiceItem } from "../types";

export const servicesData: ServiceItem[] = [
  {
    id: "sd-wan",
    title: "Telkomsel SD-WAN",
    description: "Solusi jaringan WAN berbasis software yang aman, fleksibel, dan hemat biaya untuk menghubungkan ratusan kantor cabang secara andal.",
    category: "connectivity",
    iconName: "Network",
    features: [
      "Optimasi rute trafik otomatis berbasis aplikasi",
      "Sistem keamanan terintegrasi (Next-Gen Firewall)",
      "Zero-Touch Provisioning (ZTP) untuk instalasi cepat",
      "Dashboard monitoring jaringan terpusat"
    ],
    benefits: "Menghemat biaya operasional jaringan hingga 40% sekaligus meningkatkan performa koneksi aplikasi cloud korporat.",
    badge: "Populer"
  },
  {
    id: "iot-control-center",
    title: "IoT Control Center",
    description: "Platform manajemen konektivitas SIM IoT berskala besar dengan visibilitas penuh, pengamanan mandiri, dan integrasi API yang mudah.",
    category: "iot",
    iconName: "Cpu",
    features: [
      "Manajemen daur hidup SIM (Aktivasi, Deaktivasi, Suspensi) instan",
      "Pendeteksi anomali konsumsi data otomatis",
      "Koneksi aman melalui VPN APN khusus",
      "Laporan analitik penggunaan real-time"
    ],
    benefits: "Memberikan kontrol mutlak terhadap ribuan perangkat pintar/mesin perusahaan Anda untuk meminimalkan risiko lonjakan biaya tak terduga.",
    badge: "Unggulan"
  },
  {
    id: "iot-fleet-tracker",
    title: "IoT Fleet Tracker",
    description: "Solusi pelacakan armada logistik real-time berbasis sensor cerdas untuk memantau rute, perilaku pengemudi, hingga kondisi suhu muatan.",
    category: "iot",
    iconName: "Truck",
    features: [
      "Pelacakan lokasi akurat dengan Geofencing",
      "Analisis efisiensi bahan bakar dan idling mesin",
      "Sensor suhu & kelembaban untuk cold chain logistics",
      "Notifikasi instan untuk perilaku mengemudi berisiko"
    ],
    benefits: "Meningkatkan keselamatan armada, meminimalkan kerusakan muatan sensitif, dan mengoptimalkan ketepatan waktu pengiriman barang."
  },
  {
    id: "cloud-saas",
    title: "Telkomsel Cloud SaaS & Productivity",
    description: "Bundling perangkat kolaborasi digital kelas dunia seperti Google Workspace dan Microsoft 365, terintegrasi paket data korporat Telkomsel.",
    category: "cloud",
    iconName: "Cloud",
    features: [
      "Lisensi resmi Google Workspace atau Microsoft 365",
      "Kuota data khusus kolaborasi super besar",
      "Satu tagihan terpadu (Single Billing)",
      "Dukungan teknis lokal 24/7 dari tim ahli"
    ],
    benefits: "Memudahkan administrasi lisensi karyawan serta menjamin kolaborasi kerja tim yang produktif dari mana saja tanpa kendala kuota."
  },
  {
    id: "fiveg-private",
    title: "5G Private Network",
    description: "Jaringan seluler 5G privat eksklusif dengan latensi ultra rendah dan keamanan militer untuk otomasi industri berat, tambang, dan area kilang.",
    category: "connectivity",
    iconName: "Radio",
    features: [
      "Frekuensi radio khusus yang didedikasikan di area pabrik",
      "Latensi kurang dari 10 milidetik (sub-10ms)",
      "Kapasitas koneksi jutaan perangkat IoT industri per km²",
      "Edge Computing terintegrasi lokal"
    ],
    benefits: "Memungkinkan otomatisasi penuh robot industri, operasi drone monitoring otonom, dan keselamatan operasional berbasis video AI.",
    badge: "Baru"
  },
  {
    id: "myads",
    title: "Telkomsel MyAds",
    description: "Platform iklan digital bertarget yang memanfaatkan basis data pelanggan Telkomsel terbesar untuk mengirimkan promosi relevan secara akurat.",
    category: "marketing",
    iconName: "Megaphone",
    features: [
      "Targeting berbasis lokasi real-time (LBA)",
      "Penyaringan demografi makro, hobi, dan jenis perangkat",
      "Format variatif: SMS Broadcast, MMS, USSD, Push Notification",
      "Analitik konversi kampanye yang transparan"
    ],
    benefits: "Menjangkau calon pembeli potensial di momen yang tepat dengan tingkat keterbacaan (Open Rate) SMS hingga 98%."
  },
  {
    id: "cyber-security",
    title: "Mobile Threat Defense",
    description: "Proteksi komprehensif untuk perangkat seluler karyawan Anda dari ancaman malware, phising, modifikasi sistem, dan intersepsi jaringan Wi-Fi publik.",
    category: "security",
    iconName: "ShieldAlert",
    features: [
      "Deteksi ancaman berbasis AI lokal di perangkat",
      "Analisis kerentanan aplikasi sebelum diunduh",
      "Pencegahan koneksi ke jaringan Wi-Fi berbahaya",
      "Sinkronisasi kebijakan keamanan dengan MDM/UEM"
    ],
    benefits: "Mengamankan data kredensial korporasi dan informasi sensitif klien dari kebocoran akibat serangan peretasan pada perangkat mobile karyawan."
  }
];
