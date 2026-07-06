'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Clock, MapPin } from 'lucide-react';
import styles from './PrayerWidget.module.css';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

// Bandung offline fallback timings (Kemenag standard)
const defaultTimings: PrayerTimes = {
  Fajr: '04:35',
  Sunrise: '05:55',
  Dhuhr: '11:51',
  Asr: '15:12',
  Maghrib: '17:48',
  Isha: '19:02'
};

export const PrayerWidget: React.FC = () => {
  const { t, language } = useLanguage();
  const [timings, setTimings] = useState<PrayerTimes>(defaultTimings);
  const [currentPrayer, setCurrentPrayer] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Clock tick
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch live timings for Bandung
    const fetchTimings = async () => {
      try {
        const cached = localStorage.getItem('prayer_times_today_v2');
        const cacheDate = localStorage.getItem('prayer_times_date_v2');
        const todayStr = new Date().toDateString();

        if (cached && cacheDate === todayStr) {
          setTimings(JSON.parse(cached));
          return;
        }

        const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Bandung&country=Indonesia&method=20');
        if (res.ok) {
          const json = await res.json();
          const apiTimings = json.data.timings;
          const cleaned: PrayerTimes = {
            Fajr: apiTimings.Fajr,
            Sunrise: apiTimings.Sunrise,
            Dhuhr: apiTimings.Dhuhr,
            Asr: apiTimings.Asr,
            Maghrib: apiTimings.Maghrib,
            Isha: apiTimings.Isha
          };
          setTimings(cleaned);
          localStorage.setItem('prayer_times_today_v2', JSON.stringify(cleaned));
          localStorage.setItem('prayer_times_date_v2', todayStr);
        }
      } catch (err) {
        console.warn('Could not fetch live prayer times, using fallback:', err);
      }
    };
    
    fetchTimings();
  }, []);

  // Calculate current & next prayer active state
  useEffect(() => {
    const parseTime = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      const date = new Date();
      date.setHours(h, m, 0, 0);
      return date;
    };

    const now = new Date();
    const fajr = parseTime(timings.Fajr);
    const sunrise = parseTime(timings.Sunrise);
    const dhuhr = parseTime(timings.Dhuhr);
    const asr = parseTime(timings.Asr);
    const maghrib = parseTime(timings.Maghrib);
    const isya = parseTime(timings.Isha);

    let active = '';
    let next = { name: '', time: '' };

    if (now < fajr) {
      active = 'Isha';
      next = { name: 'Fajr', time: timings.Fajr };
    } else if (now >= fajr && now < sunrise) {
      active = 'Fajr';
      next = { name: 'Sunrise', time: timings.Sunrise };
    } else if (now >= sunrise && now < dhuhr) {
      active = 'Sunrise';
      next = { name: 'Dhuhr', time: timings.Dhuhr };
    } else if (now >= dhuhr && now < asr) {
      active = 'Dhuhr';
      next = { name: 'Asr', time: timings.Asr };
    } else if (now >= asr && now < maghrib) {
      active = 'Asr';
      next = { name: 'Maghrib', time: timings.Maghrib };
    } else if (now >= maghrib && now < isya) {
      active = 'Maghrib';
      next = { name: 'Isha', time: timings.Isha };
    } else {
      active = 'Isha';
      next = { name: 'Fajr', time: timings.Fajr };
    }

    setCurrentPrayer(active);
    setNextPrayer(next);
  }, [timings, currentTime]);

  const prayerKeys: { key: keyof PrayerTimes; labelKey: string }[] = [
    { key: 'Fajr', labelKey: 'subuh' },
    { key: 'Sunrise', labelKey: 'syuruq' },
    { key: 'Dhuhr', labelKey: 'dzuhur' },
    { key: 'Asr', labelKey: 'ashar' },
    { key: 'Maghrib', labelKey: 'maghrib' },
    { key: 'Isha', labelKey: 'isya' }
  ];

  return (
    <div className={styles.widgetCard}>
      <div className={styles.header}>
        <div className={styles.location}>
          <MapPin size={14} className={styles.pin} />
          <span>Bandung, Jawa Barat</span>
        </div>
        <Clock size={16} className={styles.clockIcon} />
      </div>

      <div className={styles.timeDisplay}>
        <h2>{currentTime}</h2>
        {nextPrayer && (
          <p className={styles.nextText}>
            {language === 'id' ? 'Menuju' : 'Next'} <strong>{t(nextPrayer.name.toLowerCase())}</strong> @ {nextPrayer.time}
          </p>
        )}
      </div>

      <ul className={styles.prayerList}>
        {prayerKeys.map(({ key, labelKey }) => {
          const isCurrent = currentPrayer === key;
          return (
            <li key={key} className={`${styles.prayerRow} ${isCurrent ? styles.activeRow : ''}`}>
              <span className={styles.prayerName}>{t(labelKey)}</span>
              <span className={styles.prayerTime}>{timings[key]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
