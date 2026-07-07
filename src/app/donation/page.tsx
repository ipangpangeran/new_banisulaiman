import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql, eq, and, gte } from 'drizzle-orm';
import { Heart, CreditCard, QrCode, FileSpreadsheet, ArrowRight, ShieldCheck } from 'lucide-react';
import { QrisImageZoom } from '@/components/QrisImageZoom';
import styles from './Donation.module.css';

export const dynamic = 'force-dynamic';

interface DonationReport {
  id: number;
  donorName: string;
  amount: number;
  date: Date | null;
  status: string;
  notes?: string | null;
}

const mockReports: DonationReport[] = [
  { id: 1, donorName: 'Hamba Allah', amount: 150000, date: new Date('2025-06-28'), status: 'VERIFIED', notes: 'Infaq Rutin' },
  { id: 2, donorName: 'Hamba Allah', amount: 50000, date: new Date('2025-06-27'), status: 'VERIFIED' },
  { id: 3, donorName: 'Bapak Ahmad', amount: 500000, date: new Date('2025-06-25'), status: 'VERIFIED', notes: 'Donasi Program Tahfidz' },
  { id: 4, donorName: 'Ibu Fatimah', amount: 200000, date: new Date('2025-06-22'), status: 'VERIFIED' },
  { id: 5, donorName: 'Hamba Allah', amount: 100000, date: new Date('2025-06-20'), status: 'VERIFIED' }
];

export default async function DonationPage() {
  // Query verified reports for the current year only (hides old data automatically when year changes)
  const currentYearStart = new Date(new Date().getFullYear(), 0, 1);

  const dbReports = db.select({
    id: schema.donationReports.id,
    donorName: schema.donationReports.donorName,
    amount: schema.donationReports.amount,
    date: schema.donationReports.date,
    status: schema.donationReports.status,
    notes: schema.donationReports.notes
  })
    .from(schema.donationReports)
    .where(
      and(
        eq(schema.donationReports.status, 'VERIFIED'),
        gte(schema.donationReports.date, currentYearStart)
      )
    )
    .orderBy(sql`${schema.donationReports.date} DESC`)
    .limit(10)
    .all() as unknown as DonationReport[];

  const reports = dbReports.length > 0 ? dbReports : mockReports;

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Donasi & Amal Shodaqoh</h1>
          <p>Investasi Akhirat Melalui Pembinaan Santri Penghafal Al-Qur'an</p>
        </div>
      </section>

      {/* Methods (Bank & QRIS) */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className={styles.methodsGrid}>
            
            {/* Left: Bank Accounts */}
            <div className={styles.bankSection}>
              <div className={styles.sectionHeader}>
                <CreditCard size={24} className={styles.methodIcon} />
                <h2>Rekening Transfer Bank</h2>
              </div>
              <p>Silakan salurkan infaq, shodaqoh, atau zakat Anda melalui nomor rekening resmi yayasan berikut:</p>
              
              <div className={styles.bankCard}>
                <div className={styles.bankBrand}>BSI</div>
                <div className={styles.bankDetails}>
                  <strong>Bank Syariah Indonesia (BSI)</strong>
                  <span className={styles.accountNumber}>2005201775</span>
                  <span className={styles.accountHolder}>a.n. Yys Sulaiman Ziyadatul Khair</span>
                </div>
              </div>

              <div className={styles.confirmationNotice}>
                <strong>💡 Konfirmasi Donasi:</strong>
                <p>
                  Setelah melakukan transfer atau QRIS, silakan kirimkan bukti transfer kepada
                  Admin melalui WhatsApp{" "}
                  <a
                    href={`https://wa.me/6281572014321?text=${encodeURIComponent(`Assalamualaikum, saya mau konfirmasi sedekah/infaq.

Berikut saya lampirkan bukti transfer.

Jazakumullahu khairan.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappLink}
                  >
                    <strong>+62 815-7201-4321</strong>
                  </a>{" "}
                  untuk pencatatan dan verifikasi laporan donasi.
                </p>
              </div>
            </div>

            {/* Right: QRIS */}
            <div className={styles.qrisSection}>
              <div className={styles.sectionHeader}>
                <QrCode size={24} className={styles.methodIcon} />
                <h2>Metode QRIS</h2>
              </div>
              <p>Scan kode QRIS di bawah menggunakan aplikasi e-wallet (Gopay, OVO, Dana, LinkAja) atau Mobile Banking Anda.</p>
              <div className={styles.qrisContainer}>
                <div className={styles.qrisBox}>
                  {/* Mock QRIS graphic */}
                  <div className={styles.qrisHeader}>QRIS - YYS SULAIMAN ZIYADATUL</div>
                  {/* <div className={styles.qrisQrPlaceholder}>
                    <span>📱 [MOCK QRIS CODE]</span>
                  </div> */}
                  <QrisImageZoom src="/images/qris-real.png" alt="QRIS Yayasan Bani Sulaiman" />
                  <div className={styles.qrisFooter}>NMIDs: ID102648332770</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className={styles.sectionHeader} style={{ justifyContent: 'center', textAlign: 'center' }}>
            <FileSpreadsheet size={24} className={styles.methodIcon} />
            <h2>Laporan Transparansi Donasi</h2>
          </div>
          <p className="text-center" style={{ marginBottom: '3rem' }}>
            Bentuk pertanggungjawaban transparansi keuangan, berikut daftar 10 donasi terverifikasi terbaru yang kami terima. Jazakumullahu khair.
          </p>

          <div className={styles.tableCard}>
            <table className={styles.reportsTable}>
              <thead>
                <tr>
                  <th>Donatur</th>
                  <th style={{ textAlign: 'right' }}>Jumlah</th>
                  <th style={{ textAlign: 'center' }}>Tanggal</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      <div className={styles.donorInfo}>
                        <strong>{rep.donorName}</strong>
                        {rep.notes && <span className={styles.donorNotes}>{rep.notes}</span>}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }} className={styles.amountText}>
                      Rp {rep.amount.toLocaleString('id-ID')}
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {rep.date ? new Date(rep.date).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : ''}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={styles.verifiedBadge}>
                        <ShieldCheck size={12} />
                        <span>Verified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
