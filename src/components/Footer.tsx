'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Suppress public footer in admin panel
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    // Simulate newsletter subscription
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.patternOverlay} />
      <div className={`container ${styles.footerGrid}`}>
        {/* Col 1: Brand */}
        <div className={styles.colBrand}>
          <div className={styles.logo}>
            <img src="/images/logo-yayasan.png" alt="Yayasan Sulaiman Ziyadatul Khair" className={styles.logoImg} />
          </div>
          <p className={styles.brandDesc}>{t('footer_desc')}</p>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className={styles.colLinks}>
          <h5 className={styles.colTitle}>{t('footer_quick_links')}</h5>
          <ul className={styles.linkList}>
            <li><Link href="/">{t('nav_home')}</Link></li>
            <li><Link href="/about">{t('nav_about')}</Link></li>
            <li><Link href="/programs">{t('nav_programs')}</Link></li>
            <li><Link href="/admissions">{t('nav_admissions')}</Link></li>
            <li><Link href="/donation">{t('nav_donation')}</Link></li>
            <li><Link href="/contact">{t('nav_contact')}</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div className={styles.colContact}>
          <h5 className={styles.colTitle}>{t('footer_contact_info')}</h5>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={16} className={styles.contactIcon} />
              <span className={styles.contactText}>
                Masjid Bani Sulaiman, Jl. Dago Pojok Tanggulan, Gg. 6, Bandung, Jawa Barat 40135
              </span>
            </li>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <span className={styles.contactText}>+62 851-8321-2024</span>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <span className={styles.contactText}>admin@banisulaiman.or.id</span>
            </li>
            <li>
              <Clock size={16} className={styles.contactIcon} />
              <span className={styles.contactText}>
                <strong>{t('office_hours')}:</strong><br />
                {t('office_hours_val')}
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className={styles.colNewsletter}>
          <h5 className={styles.colTitle}>Newsletter</h5>
          <p className={styles.newsletterDesc}>
            {language === 'id' 
              ? 'Dapatkan berita terbaru, pengumuman, dan artikel dakwah langsung ke email Anda.' 
              : 'Get the latest news, announcements, and dawah articles straight to your inbox.'}
          </p>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <input
              type="email"
              placeholder={language === 'id' ? 'Alamat Email' : 'Email Address'}
              className={styles.newsletterInput}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
            <button type="submit" className={styles.newsletterSubmit} aria-label="Subscribe">
              <Send size={14} />
            </button>
          </form>
          {subscribed && (
            <p className={styles.subscribeSuccess}>
              🎉 {language === 'id' ? 'Terima kasih telah berlangganan!' : 'Thanks for subscribing!'}
            </p>
          )}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <span>&copy; {new Date().getFullYear()} Ma'had Tahfidz Bani Sulaiman. {t('footer_rights')}</span>
          <span className={styles.credits}>Bandung, West Java</span>
        </div>
      </div>
    </footer>
  );
};
