import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql, eq } from 'drizzle-orm';
import { FileText, Users, Heart, HardDrive, Plus, Clock, ExternalLink } from 'lucide-react';
import styles from './Dashboard.module.css';

export default async function AdminDashboardPage() {
  // Query metric counts directly from SQLite
  const articlesCount = (db.select({ count: sql`count(*)` }).from(schema.articles).get() as any)?.count || 0;
  const admissionsCount = (db.select({ count: sql`count(*)` }).from(schema.admissions).get() as any)?.count || 0;
  const mediaCount = (db.select({ count: sql`count(*)` }).from(schema.media).get() as any)?.count || 0;
  const donationsSum = (db.select({ total: sql`sum(amount)` }).from(schema.donationReports).where(eq(schema.donationReports.status, 'VERIFIED')).get() as any)?.total || 0;

  // Query latest 5 applicants
  const latestApplicants = db.select()
    .from(schema.admissions)
    .orderBy(sql`created_at DESC`)
    .limit(5)
    .all();

  // Query latest 5 articles
  const latestArticles = db.select({
    id: schema.articles.id,
    title: schema.articles.title,
    status: schema.articles.status,
    publishDate: schema.articles.publishDate
  })
    .from(schema.articles)
    .orderBy(sql`created_at DESC`)
    .limit(5)
    .all();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard Overview</h1>
          <p>Selamat datang di sistem manajemen konten Ma'had Bani Sulaiman.</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/articles" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Tulis Artikel</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.iconContainer} ${styles.blue}`}>
            <FileText size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Total Artikel</span>
            <h3>{articlesCount}</h3>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.iconContainer} ${styles.green}`}>
            <Users size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Pendaftar PPDB</span>
            <h3>{admissionsCount}</h3>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.iconContainer} ${styles.gold}`}>
            <Heart size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Dana Terkumpul</span>
            <h3>Rp {donationsSum.toLocaleString('id-ID')}</h3>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.iconContainer} ${styles.purple}`}>
            <HardDrive size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricTitle}>Pustaka Media</span>
            <h3>{mediaCount}</h3>
          </div>
        </div>
      </div>

      {/* Lists Split Row */}
      <div className={styles.splitGrid}>
        {/* Applicants List */}
        <div className={styles.listCard}>
          <div className={styles.cardHeader}>
            <h3>Pendaftar Mahasantri Baru</h3>
            <Link href="/admin/admissions" className={styles.viewAll}>
              <span>Semua</span>
              <ExternalLink size={12} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {latestApplicants.length === 0 ? (
              <p className={styles.empty}>Belum ada pendaftaran santri baru masuk.</p>
            ) : (
              <div className={styles.applicantsList}>
                {latestApplicants.map((app) => (
                  <div key={app.id} className={styles.applicantRow}>
                    <div className={styles.applicantInitial}>
                      {app.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.applicantDetails}>
                      <strong>{app.fullName}</strong>
                      <span>{app.program} &bull; {app.phone}</span>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[app.status.toLowerCase()]}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Articles List */}
        <div className={styles.listCard}>
          <div className={styles.cardHeader}>
            <h3>Artikel & Berita Terakhir</h3>
            <Link href="/admin/articles" className={styles.viewAll}>
              <span>Semua</span>
              <ExternalLink size={12} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {latestArticles.length === 0 ? (
              <p className={styles.empty}>Belum ada artikel yang ditulis.</p>
            ) : (
              <div className={styles.articlesList}>
                {latestArticles.map((art) => (
                  <div key={art.id} className={styles.articleRow}>
                    <div className={styles.articleDetails}>
                      <strong>{art.title}</strong>
                      <span className={styles.articleDate}>
                        <Clock size={12} />
                        {art.publishDate ? new Date(art.publishDate).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : ''}
                      </span>
                    </div>
                    <span className={`${styles.statusLabel} ${styles[art.status.toLowerCase()]}`}>
                      {art.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
