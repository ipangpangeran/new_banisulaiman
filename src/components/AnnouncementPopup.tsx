'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { X, Calendar, BellRing } from 'lucide-react';
import styles from './AnnouncementPopup.module.css';

export const AnnouncementPopup: React.FC = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide popup on admin routes
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('popup_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Trigger popup shortly after loading
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('popup_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close popup">
          <X size={18} />
        </button>
        <div className={styles.header}>
          <div className={styles.badge}>
            <BellRing size={16} />
            <span>PENGUMUMAN</span>
          </div>
          <h3>
            {language === 'id' 
              ? 'Pendaftaran Mahasantri Baru T.A 2025/2026 Telah Dibuka!' 
              : 'Admissions for New Students A.Y 2025/2026 Are Open!'}
          </h3>
        </div>
        <div className={styles.body}>
          <p>
            {language === 'id' 
              ? 'Ma\'had Tahfidz Al-Qur\'an & Pendidikan Bahasa Arab Bani Sulaiman Bandung membuka pendaftaran Huffazh Program Full Beasiswa Khusus Ikhwan (Laki-laki).' 
              : 'Ma\'had Tahfidz Al-Qur\'an & Arabic Language Education Bani Sulaiman Bandung opens admissions for the Huffazh Program (Full Scholarship, Ikhwan only).'}
          </p>
          <div className={styles.dateInfo}>
            <Calendar size={14} />
            <span>
              {language === 'id' ? 'Pendaftaran Online via Web / WhatsApp' : 'Online Registration via Web / WhatsApp'}
            </span>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.dismissBtn} onClick={handleClose}>
            {language === 'id' ? 'Nanti Saja' : 'Later'}
          </button>
          <Link href="/admissions" className={styles.actionBtn} onClick={handleClose}>
            {language === 'id' ? 'Daftar Sekarang' : 'Apply Now'}
          </Link>
        </div>
      </div>
    </div>
  );
};
