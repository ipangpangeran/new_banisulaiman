import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { BookOpen, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import styles from './Programs.module.css';

export default async function ProgramsPage() {
  const programsList = db.select().from(schema.programs).all();

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Program Pendidikan</h1>
          <p>Kurikulum Unggulan Penghafal Al-Qur'an & Bahasa Arab</p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="section">
        <div className="container">
          <div className={styles.programGrid}>
            {programsList.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <GraduationCap size={28} />
                  </div>
                  <div className={styles.headerInfo}>
                    <h2>{program.title}</h2>
                    <div className={styles.metadata}>
                      <div className={styles.metaItem}>
                        <Clock size={14} />
                        <span>Masa Pendidikan: {program.duration}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={`${styles.statusDot} ${program.isOpen ? styles.openDot : styles.closedDot}`} />
                        <span>Status: {program.isOpen ? 'Pendaftaran Buka' : 'Pendaftaran Tutup'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.description}>
                    <h3>Deskripsi Program</h3>
                    <p>{program.description}</p>
                  </div>
                  
                  <div className={styles.curriculum}>
                    <h3>Materi & Kurikulum Utama</h3>
                    <ul className={styles.currList}>
                      {program.curriculum.split(',').map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle size={16} className={styles.checkIcon} />
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {program.isOpen ? (
                    <Link href="/admissions" className="btn btn-primary">
                      Daftar Program Ini
                    </Link>
                  ) : (
                    <button className="btn btn-outline" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                      Pendaftaran Ditutup
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Beasiswa Section */}
      <section className="section section-bg-alt">
        <div className="container text-center">
          <div className={styles.scholarshipCard}>
            <div className={styles.badge}>FULL SCHOLARSHIP</div>
            <h2>Program Khusus Full Beasiswa Ikhwan</h2>
            <p>
              Kami membuka kesempatan bagi para pemuda (ikhwan) berusia maksimal 22 tahun yang memiliki tekad kuat untuk menghafal Al-Qur'an dan mempelajari ilmu-ilmu syar'i. Peserta yang lolos seleksi akan mendapatkan fasilitas beasiswa penuh mencakup biaya pendidikan, asrama, makan, dan ujian kelayakan secara gratis.
            </p>
            <div className={styles.scholarshipCta}>
              <Link href="/admissions" className="btn btn-accent">
                Lihat Syarat & Alur Pendaftaran
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
