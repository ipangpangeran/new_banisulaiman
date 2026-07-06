import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql } from 'drizzle-orm';
import { HeroSlider } from '@/components/HeroSlider';
import { PrayerWidget } from '@/components/PrayerWidget';
import { HijriCalendar } from '@/components/HijriCalendar';
import { BookOpen, Award, CheckCircle2, MapPin, Phone, Mail, Heart, Calendar } from 'lucide-react';
import styles from './Home.module.css';

// Server-side helper to retrieve site configurations
function getSetting(settings: any[], key: string, fallback: string = ''): string {
  const found = settings.find(s => s.key === key);
  return found ? found.value : fallback;
}

export default async function HomePage() {
  // 1. Fetch configurations & entities from SQLite
  const settingsList = db.select().from(schema.siteSettings).all();
  const programsList = db.select().from(schema.programs).all();
  const teachersList = db.select().from(schema.teachers).orderBy(schema.teachers.order).all();
  const donationList = db.select().from(schema.donationPrograms).where(sql`is_active = 1`).all();
  
  // Fetch latest 3 published articles
  const articlesList = db.select()
    .from(schema.articles)
    .where(sql`status = 'PUBLISHED'`)
    .orderBy(sql`created_at DESC`)
    .limit(3)
    .all();

  // Parse list settings
  const schoolName = getSetting(settingsList, 'school_name', "Ma'had Tahfidz Bani Sulaiman");
  const schoolTagline = getSetting(settingsList, 'school_tagline', "Pondok Pesantren Tahfidz Al-Quran dan Pembelajaran Bahasa Arab");
  const historyText = getSetting(settingsList, 'site_history', '');
  const visionText = getSetting(settingsList, 'site_vision', '');
  let missionList: string[] = [];
  try {
    missionList = JSON.parse(getSetting(settingsList, 'site_mission', '[]'));
  } catch (e) {
    missionList = [];
  }

  const stats = {
    students: getSetting(settingsList, 'stats_students', '45'),
    teachers: getSetting(settingsList, 'stats_teachers', '6'),
    alumni: getSetting(settingsList, 'stats_alumni', '120'),
    buildings: getSetting(settingsList, 'stats_buildings', '2'),
  };

  const mapUrl = getSetting(settingsList, 'school_maps_embed');
  const schoolEmail = getSetting(settingsList, 'school_email', 'admin@banisulaiman.or.id');
  const schoolPhone1 = getSetting(settingsList, 'school_phone_1', '+62 851-8321-2024');

  return (
    <div className={styles.homeWrapper}>
      {/* 1. Hero Sliders */}
      <HeroSlider />

      {/* 2. Hijri & Prayer Widgets Section */}
      <section className={styles.widgetBar}>
        <div className="container">
          <div className={styles.widgetGrid}>
            <div className={styles.widgetCol}>
              <HijriCalendar />
            </div>
            <div className={styles.widgetCol}>
              <div className={styles.welcomeBanner}>
                <span className={styles.welcomeSubtitle}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ</span>
                <h2>{schoolName}</h2>
                <p>{schoolTagline}</p>
              </div>
            </div>
            <div className={styles.widgetCol}>
              <PrayerWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sejarah & Visi Misi */}
      <section className="section">
        <div className="container">
          <div className={styles.historyGrid}>
            {/* Sejarah */}
            <div className={styles.historyTextCol}>
              <h2 className={styles.subTitle}>Sejarah Berdirinya Ma'had</h2>
              <div className={styles.divider} />
              {historyText.split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraphText}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Visi Misi */}
            <div className={styles.visionCol}>
              <div className={styles.visionCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>👁️</span>
                  <h3>Visi</h3>
                </div>
                <p>{visionText}</p>
              </div>

              <div className={styles.missionCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>🎯</span>
                  <h3>Misi</h3>
                </div>
                <ol className={styles.missionList}>
                  {missionList.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Programs Section */}
      <section className="section section-bg-alt">
        <div className="container">
          <h2 className="section-title">Program Pendidikan</h2>
          <div className="grid grid-3">
            {programsList.map((program) => (
              <div key={program.id} className="card">
                <div className={styles.programImagePlaceholder}>
                  <BookOpen size={40} className={styles.programIcon} />
                </div>
                <div className={styles.programBody}>
                  <span className={styles.programDuration}>{program.duration}</span>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <div className={styles.curriculumBox}>
                    <strong>Kurikulum:</strong>
                    <p>{program.curriculum}</p>
                  </div>
                  <div className={styles.programFooter}>
                    <span className={`${styles.statusBadge} ${program.isOpen ? styles.statusOpen : styles.statusClosed}`}>
                      {program.isOpen ? 'Pendaftaran Buka' : 'Pendaftaran Tutup'}
                    </span>
                    <Link href="/admissions" className={styles.programLink}>
                      Detail &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistics Banner */}
      <section className={styles.statsBanner}>
        <div className={styles.statsPattern} />
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{stats.students}</span>
            <span className={styles.statLabel}>Santri Aktif</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{stats.teachers}</span>
            <span className={styles.statLabel}>Ustadz & Pengajar</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{stats.alumni}</span>
            <span className={styles.statLabel}>Alumni Huffazh</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{stats.buildings}</span>
            <span className={styles.statLabel}>Gedung & Asrama</span>
          </div>
        </div>
      </section>

      {/* 6. Teachers list preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Pengajar Kami</h2>
          <div className="grid grid-4">
            {teachersList.filter(t => t.type === 'TEACHER').slice(0, 4).map((teacher) => (
              <div key={teacher.id} className={`${styles.teacherCard} card`}>
                <div className={styles.avatarPlaceholder}>
                  <span>👳</span>
                </div>
                <div className={styles.teacherBody}>
                  <h4>{teacher.name}</h4>
                  <span className={styles.teacherPos}>{teacher.position}</span>
                  <p className={styles.teacherBio}>{teacher.biography}</p>
                  <span className={styles.teacherEdu}>{teacher.education}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/teachers" className="btn btn-secondary">
              Lihat Seluruh Pengajar & Staff
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Articles Feed Preview */}
      <section className="section section-bg-alt">
        <div className="container">
          <h2 className="section-title">Artikel & Berita Terbaru</h2>
          {articlesList.length === 0 ? (
            <div className={styles.emptyArticles}>
              <p>Belum ada artikel terbaru yang diterbitkan.</p>
              <Link href="/news" className="btn btn-outline">
                Kunjungi Blog
              </Link>
            </div>
          ) : (
            <div className="grid grid-3">
              {articlesList.map((article) => (
                <div key={article.id} className="card">
                  <div className={styles.articleImagePlaceholder}>
                    <Calendar size={32} className={styles.articleIcon} />
                  </div>
                  <div className={styles.articleBody}>
                    <span className={styles.articleDate}>
                      {article.publishDate ? new Date(article.publishDate).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : ''}
                    </span>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <Link href={`/news/${article.slug}`} className={styles.articleLink}>
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 8. Donation CTA Section */}
      <section className={styles.donationCta}>
        <div className="container">
          <div className={styles.donationCtaGrid}>
            <div className={styles.donationInfoCol}>
              <div className={styles.donationBadge}>
                <Heart size={16} />
                <span>DONASI & SHODAQOH</span>
              </div>
              <h2>Mendukung Pendidikan Para Penghafal Al-Qur'an</h2>
              <p>
                Melalui infaq dan shodaqoh Anda, Ma'had Bani Sulaiman dapat terus menyediakan fasilitas asrama yang layak, konsumsi harian santri, kitab-kitab pelajaran, serta beasiswa penuh bagi calon huffazh dari seluruh Indonesia.
              </p>
              <div className={styles.donationBanks}>
                <div className={styles.bankItem}>
                  <strong>Bank Syariah Indonesia (BSI)</strong>
                  <span>7182903829 a.n. Yayasan Bani Sulaiman</span>
                </div>
              </div>
              <Link href="/donation" className="btn btn-accent" style={{ marginTop: '1.5rem' }}>
                Salurkan Donasi
              </Link>
            </div>
            
            <div className={styles.donationProgramsCol}>
              <h3>Program Donasi Aktif</h3>
              <div className={styles.programList}>
                {donationList.slice(0, 2).map((prog) => {
                  const percent = prog.targetAmount ? Math.min(100, Math.round((prog.raisedAmount / prog.targetAmount) * 100)) : 0;
                  return (
                    <div key={prog.id} className={styles.miniProgCard}>
                      <h4>{prog.title}</h4>
                      <p>{prog.description}</p>
                      {prog.targetAmount && (
                        <div className={styles.progressSection}>
                          <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                          </div>
                          <div className={styles.progressLabels}>
                            <span>Rp {prog.raisedAmount.toLocaleString('id-ID')}</span>
                            <span>{percent}% dari Rp {prog.targetAmount.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact Info & Maps */}
      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactDetailsCol}>
              <h2 className={styles.subTitle}>Hubungi Kami</h2>
              <div className={styles.divider} />
              <p className={styles.contactIntro}>
                Punya pertanyaan mengenai program pendidikan, beasiswa, pendaftaran, atau donasi? Tim administrasi kami siap melayani Anda.
              </p>
              <ul className={styles.contactInfoList}>
                <li>
                  <MapPin size={20} className={styles.infoIcon} />
                  <div>
                    <strong>Alamat Ma'had:</strong>
                    <span>{getSetting(settingsList, 'school_address')}</span>
                  </div>
                </li>
                <li>
                  <Phone size={20} className={styles.infoIcon} />
                  <div>
                    <strong>WhatsApp Pendaftaran:</strong>
                    <span>{schoolPhone1}</span>
                  </div>
                </li>
                <li>
                  <Mail size={20} className={styles.infoIcon} />
                  <div>
                    <strong>Email Resmi:</strong>
                    <span>{schoolEmail}</span>
                  </div>
                </li>
              </ul>
              <div className={styles.contactCta}>
                <Link href="/contact" className="btn btn-primary">
                  Form Kontak & Whatsapp Direct
                </Link>
              </div>
            </div>
            
            <div className={styles.mapsCol}>
              {mapUrl ? (
                <div className={styles.iframeWrapper}>
                  <iframe 
                    src={mapUrl} 
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className={styles.mapPlaceholder}>
                  <span>📍 Lokasi Google Maps</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
