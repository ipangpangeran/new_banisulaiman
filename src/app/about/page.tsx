import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql } from 'drizzle-orm';
import { Award, BookOpen, Building, CheckCircle2, Shield, Users } from 'lucide-react';
import styles from './About.module.css';

function getSetting(settings: any[], key: string, fallback: string = ''): string {
  const found = settings.find(s => s.key === key);
  return found ? found.value : fallback;
}

export default async function AboutPage() {
  const settingsList = db.select().from(schema.siteSettings).all();
  const teachersList = db.select().from(schema.teachers).orderBy(schema.teachers.order).all();

  const schoolName = getSetting(settingsList, 'school_name', "Ma'had Tahfidz Bani Sulaiman");
  const historyText = getSetting(settingsList, 'site_history', '');
  const visionText = getSetting(settingsList, 'site_vision', '');
  let missionList: string[] = [];
  try {
    missionList = JSON.parse(getSetting(settingsList, 'site_mission', '[]'));
  } catch (e) {
    missionList = [];
  }

  const foundationBoard = (teachersList as any[]).filter(t => t.type === 'FOUNDATION_BOARD');
  const instructors = (teachersList as any[]).filter(t => t.type === 'TEACHER');

  const facilities = [
    { title: 'Masjid Bani Sulaiman', desc: 'Masjid utama berkapasitas 300 jamaah yang diresmikan tahun 2017 sebagai pusat ibadah dan kajian Al-Qur\'an.', emoji: '🕌' },
    { title: 'Asrama Mahasantri', desc: 'Fasilitas kamar tinggal yang asri, bersih, dan representatif untuk mendukung kenyamanan santri selama tinggal.', emoji: '🏢' },
    { title: 'Ruang Kelas Representatif', desc: 'Kelas belajar yang nyaman dengan sirkulasi udara sejuk khas daerah Dago Pojok Bandung.', emoji: '🏫' },
    { title: 'Perpustakaan Islam', desc: 'Menyediakan referensi kitab-kitab tafsir, hadits, fikih, kamus bahasa Arab, serta literatur pendukung lainnya.', emoji: '📚' }
  ];

  const philosophies = [
    { title: 'Keseimbangan Keilmuan', desc: 'Menyelaraskan hafalan Al-Qur\'an mutqin dengan pemahaman bahasa Arab mendalam (Nahwu, Sharaf, Balaghah) untuk menafsirkan maknanya.', icon: <BookOpen size={24} /> },
    { title: 'Pembinaan Karakter Mandiri', desc: 'Membiasakan akhlak mulia, adab menuntut ilmu, kepemimpinan, dan kemandirian dalam aktivitas kehidupan berasrama sehari-hari.', icon: <Users size={24} /> },
    { title: 'Fastabiqul Khairat', desc: 'Mendorong santri untuk saling berlomba dalam kebaikan, menebar kebermanfaatan, serta berkontribusi nyata bagi dakwah umat.', icon: <Award size={24} /> }
  ];

  return (
    <div className={styles.aboutWrapper}>
      {/* Banner */}
      <section className={styles.aboutBanner}>
        <div className="container text-center">
          <h1>Tentang Kami</h1>
          <p>Profil Lengkap Ma'had Tahfidz Bani Sulaiman Bandung</p>
        </div>
      </section>

      {/* Sejarah & Filosofi */}
      <section className="section">
        <div className="container">
          <div className={styles.historyGrid}>
            <div>
              <h2 className={styles.sectionSub}>Sejarah Ma'had</h2>
              <div className={styles.divider} />
              {historyText.split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraphText}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className={styles.sectionSub}>Filosofi Pendidikan</h2>
              <div className={styles.divider} />
              <div className={styles.philosophyList}>
                {philosophies.map((p, idx) => (
                  <div key={idx} className={styles.philosophyItem}>
                    <div className={styles.philoIcon}>{p.icon}</div>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className={styles.visionMissionGrid}>
            <div className={styles.visionBox}>
              <h2 className={styles.sectionSub}>Visi Kami</h2>
              <div className={styles.divider} />
              <p className={styles.visionText}>{visionText}</p>
            </div>
            
            <div className={styles.missionBox}>
              <h2 className={styles.sectionSub}>Misi Kami</h2>
              <div className={styles.divider} />
              <ol className={styles.missionList}>
                {missionList.map((m, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur & Kepemimpinan */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Struktur & Pengurus Yayasan</h2>
          
          <div className={styles.boardGrid}>
            {foundationBoard.map((board) => (
              <div key={board.id} className={`${styles.boardCard} card`}>
                <span className={styles.boardEmoji}>👴</span>
                <h4>{board.name}</h4>
                <span className={styles.boardPosition}>{board.position}</span>
                <p>{board.biography}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.boardSectionTitle} style={{ marginTop: '4rem', textAlign: 'center', marginBottom: '2rem' }}>
            Struktur Pelaksana Akademik (Asatidzah)
          </h3>
          <div className={styles.asatidzahGrid}>
            {instructors.map((ins) => (
              <div key={ins.id} className={styles.asatidzahItem}>
                <div className={styles.asatidzahAvatar}>🕌</div>
                <div>
                  <h4>{ins.name}</h4>
                  <span className={styles.asatidzahPos}>{ins.position}</span>
                  <p>{ins.biography}</p>
                  <small>{ins.education}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="section section-bg-alt">
        <div className="container">
          <h2 className="section-title">Fasilitas Pesantren</h2>
          <div className="grid grid-2">
            {facilities.map((fac, idx) => (
              <div key={idx} className={styles.facilityCard}>
                <span className={styles.facilityEmoji}>{fac.emoji}</span>
                <div className={styles.facilityInfo}>
                  <h4>{fac.title}</h4>
                  <p>{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Akreditasi & Legalitas */}
      <section className="section">
        <div className="container text-center">
          <div className={styles.accreditationCard}>
            <Shield size={48} className={styles.accredIcon} />
            <h2>Legalitas & Izin Operasional</h2>
            <p>
              Ma'had Tahfidz Bani Sulaiman berada di bawah naungan Yayasan Bani Sulaiman Bandung dan telah terdaftar secara resmi di Kementerian Agama Republik Indonesia (Kemenag RI) untuk program penyelenggaraan pendidikan keagamaan non-formal pondok pesantren.
            </p>
            <div className={styles.legalInfo}>
              <span>Nomor Statistik Pondok Pesantren (NSPP)</span>
              <strong>Menyusul / Sedang Proses Verifikasi Kemenag Kota Bandung</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
