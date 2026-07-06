'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Calendar } from 'lucide-react';
import styles from './HijriCalendar.module.css';

interface HijriDate {
  day: number;
  month: string;
  year: number;
}

export const HijriCalendar: React.FC = () => {
  const { language } = useLanguage();
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [gregorian, setGregorian] = useState<string>('');

  useEffect(() => {
    // Gregorian representation
    const now = new Date();
    const gregStr = now.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setGregorian(gregStr);

    // Calculate Hijri Date using astronomical conversion formula
    const calculateHijri = () => {
      // 1. Julian Date
      const m = now.getMonth() + 1;
      const d = now.getDate();
      const y = now.getFullYear();
      
      let jd = 0;
      if (m <= 2) {
        jd = Math.floor((365.25 * (y - 1))) + Math.floor((30.6001 * (m + 13))) + d + 1720994.5;
      } else {
        jd = Math.floor((365.25 * y)) + Math.floor((30.6001 * (m + 1))) + d + 1720994.5;
      }
      
      // Calculate cycle and year
      const l = jd - 1948440 + 10632;
      const n = Math.floor((l - 1) / 10631);
      const l2 = l - 10631 * n + 354;
      const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
      const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
      
      // Calculate month and day
      const hm = Math.floor((24 * l3) / 709);
      const hd = l3 - Math.floor((709 * hm) / 24);
      const hy = 30 * n + j - 30;

      const monthsID = [
        'Muharram', 'Safar', 'Rabi\'ul Awwal', 'Rabi\'ul Akhir', 'Jumadil Ula', 'Jumadil Akhirah',
        'Rajab', 'Sya\'ban', 'Ramadhan', 'Syawwal', 'Dzulqa\'dah', 'Dzulhijjah'
      ];
      
      const monthsEN = [
        'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani',
        'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qada', 'Dhu al-Hijjah'
      ];

      const monthName = language === 'id' ? monthsID[hm - 1] : monthsEN[hm - 1];

      setHijri({
        day: hd,
        month: monthName,
        year: hy
      });
    };

    calculateHijri();
  }, [language]);

  if (!hijri) return null;

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Calendar className={styles.icon} size={20} />
      </div>
      <div className={styles.info}>
        <div className={styles.hijri}>
          {hijri.day} {hijri.month} {hijri.year} H
        </div>
        <div className={styles.gregorian}>
          {gregorian}
        </div>
      </div>
    </div>
  );
};
