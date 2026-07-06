'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { Menu, X, Sun, Moon, Globe, ShieldAlert } from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scrolled header background behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/about', label: t('nav_about') },
    { href: '/programs', label: t('nav_programs') },
    { href: '/news', label: t('nav_news') },
    { href: '/activities', label: t('nav_activities') },
    { href: '/gallery', label: t('nav_gallery') },
    { href: '/teachers', label: t('nav_teachers') },
    { href: '/achievements', label: t('nav_achievements') },
    { href: '/admissions', label: t('nav_admissions') },
    { href: '/donation', label: t('nav_donation') },
    { href: '/contact', label: t('nav_contact') },
  ];

  // Don't show public header in admin portal (handled inside admin layout)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.topBar}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className={styles.topContact}>
            <span>📍 Bandung, Indonesia</span>
            <span className={styles.separator}>|</span>
            <span>📞 +62 851-8321-2024</span>
          </div>
          <div className={styles.topActions}>
            <button 
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')} 
              className={styles.topBtn}
              aria-label="Change language"
            >
              <Globe size={13} />
              <span>{language === 'id' ? 'English' : 'Bahasa'}</span>
            </button>
            <span className={styles.separator}>|</span>
            <Link href="/admin/login" className={styles.topBtn}>
              <span>{t('nav_admin')}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/images/logo-icon.png" alt="Bani Sulaiman Logo" className={styles.logoImg} />
            <div className={styles.logoTextStack}>
              <span className={styles.logoLine1}>Ma'had Tahfidz</span>
              <span className={styles.logoLine2}>Al Quran</span>
              <span className={styles.logoLine3}>Bani Sulaiman</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icon Controls */}
          <div className={styles.controls}>
            <button onClick={toggleTheme} className={styles.iconBtn} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={styles.menuBtn} 
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu Utama</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`${styles.mobileNavLink} ${pathname === link.href ? styles.mobileActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.drawerDivider} />
          <button 
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className={styles.mobileDrawerAction}
          >
            <Globe size={18} />
            <span>{language === 'id' ? 'Ubah ke English' : 'Change to Bahasa'}</span>
          </button>
          <button 
            onClick={toggleTheme}
            className={styles.mobileDrawerAction}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}</span>
          </button>
          <Link href="/admin/login" className={styles.mobileDrawerAction}>
            <ShieldAlert size={18} />
            <span>{t('nav_admin')}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
