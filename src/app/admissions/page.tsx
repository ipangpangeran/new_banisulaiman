import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { FileText, ClipboardList, AlertCircle, ArrowRight, Download, CheckSquare } from 'lucide-react';
import styles from './Admissions.module.css';

export default async function AdmissionsPage() {
  const requirements = [
    'Ikhwan (Laki-laki) lulusan SMA/sederajat.',
    'Usia maksimal 22 tahun pada saat pendaftaran.',
    'Belum menikah dan bersedia tidak menikah selama masa pendidikan dan pengabdian.',
    'Bersedia tinggal di asrama dan mengikuti tata tertib pondok.',
    'Mampu membaca Al-Qur\'an dengan baik dan sesuai dengan kaidah tajwid.',
    'Tidak memiliki penyakit menular dan tidak merokok.',
    'Mendapat izin dari orang tua/wali (dibuktikan dengan surat tertulis).',
    'Lulus seluruh rangkaian ujian seleksi (Tahfidz, wawancara, & akademik).'
  ];

  const steps = [
    { num: '1', title: 'Unduh & Isi Dokumen', desc: 'Unduh Surat Izin Orang Tua dan Surat Kesiapan, lalu cetak, tanda tangani di atas meterai, dan scan kembali ke format PDF.' },
    { num: '2', title: 'Pendaftaran Online', desc: 'Isi formulir pendaftaran digital langsung di website ini atau kirimkan berkas pendaftaran melalui WhatsApp Admin.' },
    { num: '3', title: 'Ujian Seleksi', desc: 'Ikuti tes seleksi lisan (membaca Al-Qur\'an, hafalan) dan wawancara lisan secara online atau langsung di Ma\'had.' },
    { num: '4', title: 'Pengumuman Kelulusan', desc: 'Hasil seleksi diumumkan melalui website, email, atau kontak WhatsApp resmi pendaftar.' }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Penerimaan Mahasantri Baru (PPDB)</h1>
          <p>Bergabunglah Bersama Kami Menjadi Generasi Penghafal Al-Qur'an Berakhlak Mulia</p>
        </div>
      </section>

      {/* Main Info Columns */}
      <section className="section">
        <div className="container">
          <div className={styles.infoLayout}>
            {/* Left Col: Requirements & Steps */}
            <div className={styles.mainCol}>
              <div className={styles.sectionBlock}>
                <div className={styles.blockTitle}>
                  <CheckSquare size={24} className={styles.titleIcon} />
                  <h2>Persyaratan Umum Pendaftaran</h2>
                </div>
                <ul className={styles.reqList}>
                  {requirements.map((req, idx) => (
                    <li key={idx}>
                      <AlertCircle size={16} className={styles.alertIcon} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sectionBlock} style={{ marginTop: '3.5rem' }}>
                <div className={styles.blockTitle}>
                  <ClipboardList size={24} className={styles.titleIcon} />
                  <h2>Alur & Prosedur Pendaftaran</h2>
                </div>
                <div className={styles.stepsGrid}>
                  {steps.map((s) => (
                    <div key={s.num} className={styles.stepCard}>
                      <span className={styles.stepNumber}>{s.num}</span>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Download forms & Tuition fees */}
            <aside className={styles.sidebar}>
              {/* Registration Actions Card */}
              <div className={styles.actionCard}>
                <h3>Daftar Sekarang</h3>
                <p>Isi formulir pendaftaran calon mahasantri baru secara online langsung melalui tautan di bawah ini.</p>
                <Link href="/registrasi" className="btn btn-accent w-100" style={{ justifyContent: 'center' }}>
                  <span>Form Pendaftaran Web</span>
                  <ArrowRight size={16} />
                </Link>
                <div className={styles.orDivider}>
                  <span>ATAU</span>
                </div>
                <a 
                  href="https://wa.me/6281572014321?text=Daftar_MBS_2025" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-outline w-100"
                  style={{ justifyContent: 'center' }}
                >
                  <span>Daftar via WhatsApp</span>
                </a>
              </div>

              {/* Download forms widget */}
              <div className={styles.widget}>
                <h3>Dokumen Persyaratan</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Unduh formulir surat izin orang tua dan surat kesediaan santri untuk dilampirkan saat registrasi.
                </p>
                <div className={styles.downloadList}>
                  <a href="/downloads/Surat-Izin-OrangTua.docx" download className={styles.downloadLink}>
                    <Download size={16} />
                    <span>Surat Izin Orang Tua (.docx)</span>
                  </a>
                  <a href="/downloads/Surat-Kesiapan.docx" download className={styles.downloadLink}>
                    <Download size={16} />
                    <span>Surat Kesiapan Santri (.docx)</span>
                  </a>
                </div>
              </div>

              {/* Cost widget */}
              <div className={styles.widget}>
                <h3>Biaya Pendidikan</h3>
                <div className={styles.costBadge}>FULL SCHOLARSHIP</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.5' }}>
                  Ma'had Bani Sulaiman diselenggarakan secara <strong>Gratis (100% Beasiswa Penuh)</strong> bagi mahasantri yang lolos seluruh tahapan ujian seleksi masuk. Beasiswa mencakup seluruh biaya kuliah, asrama, dan kebutuhan makan harian.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
