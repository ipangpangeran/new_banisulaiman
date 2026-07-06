'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PhoneCall } from 'lucide-react';
import styles from './WhatsappFloat.module.css';

export const WhatsappFloat: React.FC = () => {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href="https://wa.me/6281572014321?text=Bismillah,%20Assalamualaikum.%20Saya%20ingin%20bertanya%20tentang%20pendaftaran%20Ma'had%20Bani%20Sulaiman."
      target="_blank"
      rel="noreferrer"
      className={styles.floatButton}
      title="Hubungi kami via WhatsApp"
      aria-label="WhatsApp Support"
    >
      <div className={styles.pulse} />
      <span className={styles.icon}>💬</span>
      <span className={styles.tooltip}>WhatsApp Info</span>
    </a>
  );
};
