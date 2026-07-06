'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroSlider.module.css';

export const HeroSlider: React.FC = () => {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      emoji: '🕌',
      titleID: 'Selamat Datang di Ma\'had Bani Sulaiman',
      titleEN: 'Welcome to Ma\'had Bani Sulaiman',
      descID: 'Pondok Pesantren Tahfidz Al-Qur\'an dan Pembelajaran Bahasa Arab di Dago, Bandung Utara.',
      descEN: 'Quran Memorization Boarding School and Arabic Language Learning in Dago, North Bandung.',
      ctaTextID: 'Tentang Kami',
      ctaTextEN: 'About Us',
      ctaLink: '/about',
      bgGradient: "linear-gradient(rgba(7, 37, 23, 0.8), rgba(13, 62, 38, 0.9)), url('/images/masjid.jpg') center/cover no-repeat"
    },
    {
      emoji: '🎓',
      titleID: 'Program Beasiswa Penuh Ikhwan',
      titleEN: 'Full Scholarship Program for Ikhwan',
      descID: 'Pendidikan gratis bagi santri berpotensi untuk menghafal Al-Qur\'an dan menguasai literatur bahasa Arab.',
      descEN: 'Free education for promising students to memorize the Quran and master Arabic literature.',
      ctaTextID: 'Info Pendaftaran',
      ctaTextEN: 'Admissions Info',
      ctaLink: '/admissions',
      bgGradient: "linear-gradient(rgba(9, 49, 41, 0.8), rgba(6, 78, 59, 0.9)), url('/images/bg-home.jpg') center/cover no-repeat"
    },
    {
      emoji: '📈',
      titleID: 'Menebar Kebaikan & Donasi Umat',
      titleEN: 'Spreading Goodness & Community Donation',
      descID: 'Salurkan donasi Anda untuk membiayai operasional santri penghafal Quran dan pembangunan asrama.',
      descEN: 'Channel your donations to fund Quran memorizer operations and dormitory expansions.',
      ctaTextID: 'Donasi Sekarang',
      ctaTextEN: 'Donate Now',
      ctaLink: '/donation',
      bgGradient: "linear-gradient(rgba(36, 34, 11, 0.85), rgba(63, 57, 15, 0.95)), url('/images/masjid-bg.jpg') center/cover no-repeat"
    }
  ];

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.sliderSection}>
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`${styles.slide} ${idx === current ? styles.activeSlide : ''}`}
          style={{ background: slide.bgGradient }}
        >
          {/* Subtle Islamic Grid overlay */}
          <div className={styles.geometricPattern} />
          
          <div className={`container ${styles.slideContainer}`}>
            <div className={styles.contentBox}>
              <span className={styles.slideEmoji}>{slide.emoji}</span>
              <h1 className={styles.slideTitle}>
                {language === 'id' ? slide.titleID : slide.titleEN}
              </h1>
              <p className={styles.slideDesc}>
                {language === 'id' ? slide.descID : slide.descEN}
              </p>
              <div className={styles.btnGroup}>
                <Link href={slide.ctaLink} className="btn btn-accent">
                  {language === 'id' ? slide.ctaTextID : slide.ctaTextEN}
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={{ color: 'white', borderColor: 'white' }}>
                  {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Control Arrows */}
      <button className={styles.arrowLeft} onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button className={styles.arrowRight} onClick={nextSlide} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className={styles.dots}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
