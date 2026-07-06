import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql } from 'drizzle-orm';
import { Clock, Calendar, Video, BookOpen, Smile, Award } from 'lucide-react';
import styles from './Activities.module.css';

interface PageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  eventDate: Date;
  type: 'DAILY' | 'WEEKLY' | 'ANNUAL';
  videoUrl?: string | null;
}

const fallbackActivities: Activity[] = [
  {
    id: 101,
    title: 'Hafalan & Setoran Al-Qur\'an Harian',
    description: 'Santri melakukan setoran hafalan baru (ziyadah) dan muraja\'ah hafalan lama setiap ba\'da Subuh dan ba\'da Ashar langsung di hadapan pembimbing tahfidz.',
    eventDate: new Date(),
    type: 'DAILY'
  },
  {
    id: 102,
    title: 'Kajian Kitab & Pembelajaran Bahasa Arab',
    description: 'KBM reguler mempelajari gramatika bahasa Arab (Nahwu, Sharaf, Balaghah) serta pemahaman kitab akhlak ba\'da Maghrib.',
    eventDate: new Date(),
    type: 'DAILY'
  },
  {
    id: 103,
    title: 'Halaqah Tasmi\' Pekanan',
    description: 'Program membacakan hafalan Al-Qur\'an beberapa juz sekali duduk di hadapan santri lainnya untuk melatih kekuatan hafalan (mutqin) dan kepercayaan diri.',
    eventDate: new Date(),
    type: 'WEEKLY'
  },
  {
    id: 104,
    title: 'Olahraga & Kebersihan Lingkungan (Roan)',
    description: 'Kegiatan olahraga futsal bersama untuk menjaga kebugaran jasmani, dilanjutkan dengan kerja bakti membersihkan lingkungan masjid dan asrama.',
    eventDate: new Date(),
    type: 'WEEKLY'
  },
  {
    id: 105,
    title: 'Dauroh Ilmiah & Pelatihan Dakwah',
    description: 'Seminar intensif bertema keislaman dengan mengundang ulama dan asatidzah luar untuk memperluas wawasan keilmuan dan metodologi dakwah mahasantri.',
    eventDate: new Date(),
    type: 'ANNUAL'
  },
  {
    id: 106,
    title: 'Wisuda Huffazh & Kelulusan Santri',
    description: 'Prosesi wisuda pelepasan mahasantri yang telah menyelesaikan hafalan Al-Qur\'an 30 Juz dan masa pengabdian mengajar.',
    eventDate: new Date(),
    type: 'ANNUAL'
  }
];

export default async function ActivitiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeType = params.type || 'ALL';

  // 1. Query activities from DB
  let dbActivities = db.select().from(schema.activities).all() as unknown as Activity[];
  
  // Combine db results and fallbacks if db is empty
  const allActivities = dbActivities.length > 0 ? dbActivities : fallbackActivities;

  // Filter based on selected query type
  const filteredActivities = activeType === 'ALL' 
    ? allActivities 
    : allActivities.filter(a => a.type === activeType);

  const filterTabs = [
    { type: 'ALL', label: 'Semua Kegiatan' },
    { type: 'DAILY', label: 'Harian' },
    { type: 'WEEKLY', label: 'Mingguan' },
    { type: 'ANNUAL', label: 'Tahunan' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Jadwal & Kegiatan</h1>
          <p>Aktivitas Harian, Mingguan, dan Program Tahunan Mahasantri</p>
        </div>
      </section>

      {/* Tabs Filter */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className={styles.tabsList}>
            {filterTabs.map((tab) => (
              <Link
                key={tab.type}
                href={`/activities?type=${tab.type}`}
                className={`${styles.tabBtn} ${activeType === tab.type ? styles.activeTab : ''}`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section">
        <div className="container">
          <div className={styles.timeline}>
            {filteredActivities.length === 0 ? (
              <p className={styles.empty}>Tidak ada kegiatan dalam kategori ini.</p>
            ) : (
              filteredActivities.map((act, index) => {
                const isEven = index % 2 === 0;
                
                // Get display badge based on type
                let typeLabel = 'Harian';
                let icon = <Clock size={16} />;
                if (act.type === 'WEEKLY') {
                  typeLabel = 'Mingguan';
                  icon = <BookOpen size={16} />;
                } else if (act.type === 'ANNUAL') {
                  typeLabel = 'Tahunan';
                  icon = <Award size={16} />;
                }

                return (
                  <div key={act.id} className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`}>
                    <div className={styles.timelineIcon}>
                      {act.type === 'DAILY' ? '🕒' : act.type === 'WEEKLY' ? '📚' : '🎓'}
                    </div>
                    <div className={`${styles.timelineContent} card`}>
                      <div className={styles.headerRow}>
                        <span className={`${styles.badge} ${styles[act.type.toLowerCase()]}`}>
                          {icon}
                          <span>{typeLabel}</span>
                        </span>
                        {act.type === 'ANNUAL' && (
                          <span className={styles.date}>
                            {new Date(act.eventDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <h3>{act.title}</h3>
                      <p>{act.description}</p>
                      {act.videoUrl && (
                        <div className={styles.videoLink}>
                          <Video size={14} />
                          <a href={act.videoUrl} target="_blank" rel="noreferrer">
                            Tonton Video Dokumentasi
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
