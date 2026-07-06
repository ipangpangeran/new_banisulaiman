'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Navigation
  nav_home: { id: 'Beranda', en: 'Home' },
  nav_about: { id: 'Tentang Kami', en: 'About' },
  nav_programs: { id: 'Program', en: 'Programs' },
  nav_news: { id: 'Artikel & Berita', en: 'News & Articles' },
  nav_activities: { id: 'Kegiatan', en: 'Activities' },
  nav_gallery: { id: 'Galeri', en: 'Gallery' },
  nav_teachers: { id: 'Pengajar', en: 'Teachers' },
  nav_achievements: { id: 'Prestasi', en: 'Achievements' },
  nav_admissions: { id: 'Pendaftaran', en: 'Admissions' },
  nav_donation: { id: 'Donasi', en: 'Donation' },
  nav_contact: { id: 'Kontak', en: 'Contact' },
  nav_admin: { id: 'Admin Panel', en: 'Admin Portal' },

  // Footer & Common headings
  footer_desc: { id: 'Pondok Pesantren Tahfidz Al-Quran dan Pembelajaran Bahasa Arab di Dago, Bandung.', en: 'Quran Memorization Boarding School and Arabic Language Learning in Dago, Bandung.' },
  footer_rights: { id: 'Hak Cipta Dilindungi.', en: 'All Rights Reserved.' },
  footer_quick_links: { id: 'Tautan Cepat', en: 'Quick Links' },
  footer_contact_info: { id: 'Informasi Kontak', en: 'Contact Info' },
  address: { id: 'Alamat', en: 'Address' },
  phone: { id: 'Telepon', en: 'Phone' },
  email: { id: 'Surel', en: 'Email' },
  office_hours: { id: 'Jam Kerja', en: 'Office Hours' },
  office_hours_val: { id: 'Senin - Sabtu: 08.00 - 16.00 WIB', en: 'Monday - Saturday: 08:00 - 16:00 WIB' },

  // Homepage Specific
  hero_welcome: { id: 'Selamat datang di', en: 'Welcome to' },
  hero_tagline: { id: 'Mendidik Generasi Qur\'ani, Berakhlak Mulia, dan Menguasai Bahasa Arab', en: 'Educating Quranic Generation, Noble Character, and Mastering Arabic Language' },
  btn_learn_more: { id: 'Pelajari Selengkapnya', en: 'Learn More' },
  btn_register_now: { id: 'Daftar Sekarang', en: 'Register Now' },
  btn_donate_now: { id: 'Donasi Sekarang', en: 'Donate Now' },
  section_about_title: { id: 'Sejarah Singkat Ma\'had', en: 'Brief History of Ma\'had' },
  section_vision_mission: { id: 'Visi dan Misi Kami', en: 'Our Vision and Mission' },
  vision: { id: 'Visi', en: 'Vision' },
  mission: { id: 'Misi', en: 'Mission' },
  section_programs_title: { id: 'Program Unggulan', en: 'Featured Programs' },
  section_stats_title: { id: 'Ma\'had Dalam Angka', en: 'Ma\'had In Numbers' },
  section_teachers_title: { id: 'Pengajar Pesantren', en: 'Our Instructors' },
  section_events_title: { id: 'Kegiatan Terkini', en: 'Latest Activities' },
  section_articles_title: { id: 'Artikel & Berita Terbaru', en: 'Latest Articles & News' },
  section_donation_title: { id: 'Salurkan Donasi Anda', en: 'Submit Your Donation' },
  section_donation_desc: { id: 'Bantu kami dalam melahirkan para penghafal Al-Qur\'an dan menyebarkan dakwah Islam yang bermanfaat bagi umat.', en: 'Help us in producing Quran memorizers and spreading the dawah of Islam that benefits the community.' },
  section_map_title: { id: 'Lokasi Kami', en: 'Our Location' },
  
  // Stats
  stats_students_label: { id: 'Santri Aktif', en: 'Active Students' },
  stats_teachers_label: { id: 'Ustadz & Pengajar', en: 'Teachers & Ustadzs' },
  stats_alumni_label: { id: 'Alumni Huffazh', en: 'Huffazh Alumni' },
  stats_buildings_label: { id: 'Gedung & Asrama', en: 'Buildings & Dorms' },
  
  // Contact page
  contact_form_title: { id: 'Kirim Pesan', en: 'Send a Message' },
  contact_name: { id: 'Nama Lengkap', en: 'Full Name' },
  contact_subject: { id: 'Subjek', en: 'Subject' },
  contact_message: { id: 'Pesan Anda', en: 'Your Message' },
  contact_send: { id: 'Kirim Pesan', en: 'Send Message' },
  contact_sending: { id: 'Mengirim...', en: 'Sending...' },
  contact_success: { id: 'Pesan Anda berhasil dikirim!', en: 'Your message has been sent successfully!' },
  contact_error: { id: 'Gagal mengirim pesan. Silakan coba lagi.', en: 'Failed to send message. Please try again.' },

  // PPDB (Admissions)
  admissions_requirements: { id: 'Persyaratan Umum', en: 'General Requirements' },
  admissions_flow: { id: 'Alur Pendaftaran', en: 'Registration Flow' },
  admissions_fee: { id: 'Biaya Pendidikan', en: 'Tuition Fee' },
  admissions_download: { id: 'Unduh Formulir', en: 'Download Forms' },
  admissions_online_cta: { id: 'Formulir Pendaftaran Online', en: 'Online Registration Form' },
  admissions_status_pending: { id: 'Menunggu', en: 'Pending' },
  admissions_status_approved: { id: 'Diterima', en: 'Approved' },
  admissions_status_rejected: { id: 'Ditolak', en: 'Rejected' },

  // Donation Specifics
  donation_programs: { id: 'Program Donasi Aktif', en: 'Active Donation Programs' },
  donation_bank_accounts: { id: 'Nomor Rekening Bank', en: 'Bank Accounts Info' },
  donation_qris: { id: 'Donasi Cepat QRIS', en: 'QRIS Quick Donation' },
  donation_reports: { id: 'Laporan Penerimaan Donasi', en: 'Donation Reports' },
  donor_name: { id: 'Nama Donatur', en: 'Donor Name' },
  donor_amount: { id: 'Jumlah Donasi', en: 'Donation Amount' },
  donor_date: { id: 'Tanggal', en: 'Date' },
  donor_status: { id: 'Status', en: 'Status' },
  donor_verified: { id: 'Terverifikasi', en: 'Verified' },
  donor_unverified: { id: 'Belum Terverifikasi', en: 'Unverified' },
  donor_anonymous: { id: 'Hamba Allah', en: 'Anonymous' },
  raised_of: { id: 'terkumpul dari', en: 'raised of' },

  // Prayer times
  prayer_schedule: { id: 'Jadwal Shalat Hari Ini', en: 'Today\'s Prayer Times' },
  subuh: { id: 'Subuh', en: 'Fajr' },
  syuruq: { id: 'Terbit', en: 'Sunrise' },
  dzuhur: { id: 'Dzuhur', en: 'Dhuhr' },
  ashar: { id: 'Ashar', en: 'Asr' },
  maghrib: { id: 'Maghrib', en: 'Maghrib' },
  isya: { id: 'Isya', en: 'Isha' },
  hijri_date: { id: 'Tanggal Hijriah', en: 'Hijri Date' },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang === 'id' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
