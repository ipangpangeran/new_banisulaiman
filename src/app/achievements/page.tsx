import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { Award, Trophy, Star, ShieldCheck } from 'lucide-react';
import styles from './Achievements.module.css';

interface Achievement {
  id: number;
  title: string;
  description: string | null;
  date: Date | null;
}

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Juara I Musabaqah Hifzhil Qur\'an (MHQ) 10 Juz',
    description: 'Santri Ma\'had Bani Sulaiman meraih Juara I pada perlombaan MHQ tingkat Kota Bandung dalam rangka syiar Ramadhan.',
    date: new Date('2025-04-10')
  },
  {
    id: 2,
    title: 'Juara II Pidato Bahasa Arab Tingkat Jawa Barat',
    description: 'Prestasi gemilang diraih dalam kategori Pidato/Orasi Ilmiah Bahasa Arab tingkat Provinsi Jawa Barat yang diselenggarakan oleh UIN Bandung.',
    date: new Date('2025-02-18')
  },
  {
    id: 3,
    title: 'Sertifikasi Kelulusan Sanad Jazariyyah & Tuhfatul Athfal',
    description: 'Sebanyak 8 mahasantri berhasil menyelesaikan setoran matan tajwid Jazariyyah dan Tuhfatul Athfal secara lengkap dan bersanad.',
    date: new Date('2025-05-25')
  },
  {
    id: 4,
    title: 'Juara Harapan I Kaligrafi Kontemporer',
    description: 'Santri berbakat kami menorehkan prestasi dalam lomba seni lukis kaligrafi Al-Qur\'an tingkat Kota Bandung.',
    date: new Date('2025-03-05')
  }
];

export default async function AchievementsPage() {
  // Query achievements from SQLite
  const dbAchievements = db.select().from(schema.achievements).all() as unknown as Achievement[];
  
  const achievements = dbAchievements.length > 0 ? dbAchievements : mockAchievements;

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1> Mahasantri</h1>
          <p>Apresiasi Dedikasi, Prestasi Kompetisi, dan Sertifikasi Keagamaan</p>
        </div>
      </section>

      {/* Grid List */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {achievements.map((ach) => (
              <div key={ach.id} className={`${styles.achCard} card`}>
                <div className={styles.iconContainer}>
                  <Trophy className={styles.trophy} size={28} />
                </div>
                <div className={styles.info}>
                  {ach.date && (
                    <span className={styles.date}>
                      {new Date(ach.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                    </span>
                  )}
                  <h3>{ach.title}</h3>
                  <p>{ach.description}</p>
                  <div className={styles.certCheck}>
                    <ShieldCheck size={14} />
                    <span>Terverifikasi oleh Bagian Kesiswaan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
