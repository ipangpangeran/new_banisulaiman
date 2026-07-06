'use client';

import React, { useState, useEffect } from 'react';
import { Search, Eye, Download, CheckCircle, XCircle, Clock, X, Phone, Mail, FileText } from 'lucide-react';
import styles from './Admissions.module.css';

interface Applicant {
  id: number;
  fullName: string;
  birthInfo: string;
  age: number;
  ktpAddress: string;
  domisiliAddress: string;
  maritalStatus: string;
  program: string;
  activity: string;
  activityOther: string | null;
  phone: string;
  email: string;
  lastEducation: string;
  educationOther: string | null;
  graduationYear: string;
  hafalanJuz: string;
  fatherName: string;
  fatherJob: string;
  motherName: string;
  motherJob: string;
  reason: string;
  suratIzinOrtuPath: string | null;
  suratKesiapanPath: string | null;
  status: string; // PENDING, APPROVED, REJECTED
  createdAt: string;
}

export default function AdminAdmissionsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected applicant detail modal state
  const [selectedApp, setSelectedApp] = useState<Applicant | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchApplicants = async () => {
    try {
      const res = await fetch('/api/admissions');
      if (res.ok) {
        const data = await res.json();
        setApplicants(data);
      }
    } catch (err) {
      console.error('Error fetching admissions data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status: newStatus }),
      });

      if (res.ok) {
        // Update local list
        setApplicants((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        // Update currently selected modal details
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      } else {
        const json = await res.json();
        alert(json.message || 'Gagal mengubah status pendaftaran.');
      }
    } catch (err) {
      alert('Masalah koneksi jaringan.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Filter lists based on Search input & Dropdowns
  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.phone.includes(searchTerm) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = programFilter === 'ALL' || app.program === programFilter;
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;

    return matchesSearch && matchesProgram && matchesStatus;
  });

  if (loading) {
    return <div className={styles.loading}>Memuat Data Manager PPDB...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Manajemen Pendaftaran (PPDB)</h1>
          <p>Verifikasi berkas calon mahasantri, kelola status kelulusan seleksi, dan data kesiswaan.</p>
        </div>
      </div>

      {/* Filters Area */}
      <div className={styles.filtersCard}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Cari nama, HP, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterDropdowns}>
          <select 
            value={programFilter} 
            onChange={(e) => setProgramFilter(e.target.value)}
            className={styles.select}
          >
            <option value="ALL">Semua Program</option>
            <option value="Beasiswa">Program Beasiswa</option>
            <option value="Karantina">Karantina Tahfidz</option>
            <option value="Ma'had Ilmi">Ma'had Ilmi</option>
          </select>

          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.select}
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {/* Applications list table */}
      <div className={styles.tableCard}>
        {filteredApplicants.length === 0 ? (
          <div className={styles.empty}>Tidak ada berkas pendaftaran yang cocok.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nama Lengkap</th>
                <th>Program Pilihan</th>
                <th>No. HP / WA</th>
                <th>Pendidikan</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <strong>{app.fullName}</strong>
                      <span>Usia: {app.age} Tahun &bull; {app.email}</span>
                    </div>
                  </td>
                  <td>{app.program}</td>
                  <td>{app.phone}</td>
                  <td>{app.lastEducation}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[app.status.toLowerCase()]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => setSelectedApp(app)} className={styles.viewBtn}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Overlay Modal */}
      {selectedApp && (
        <div className={styles.modalOverlay} onClick={() => setSelectedApp(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Detail Calon Mahasantri</h2>
              <button onClick={() => setSelectedApp(null)} className={styles.closeBtn} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Section 1: Profil */}
              <div className={styles.detailSection}>
                <h3>1. Data Pribadi</h3>
                <div className={styles.detailGrid}>
                  <div><strong>Nama Lengkap:</strong> {selectedApp.fullName}</div>
                  <div><strong>Tempat, Tgl Lahir:</strong> {selectedApp.birthInfo}</div>
                  <div><strong>Usia:</strong> {selectedApp.age} Tahun</div>
                  <div><strong>Status Pernikahan:</strong> {selectedApp.maritalStatus}</div>
                  <div><strong>No. HP / WhatsApp:</strong> <a href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}`} target="_blank" className={styles.waLink}><Phone size={12} /> {selectedApp.phone}</a></div>
                  <div><strong>Email:</strong> <a href={`mailto:${selectedApp.email}`} className={styles.waLink}><Mail size={12} /> {selectedApp.email}</a></div>
                </div>
                <div style={{ marginTop: '0.75rem' }}><strong>Alamat KTP:</strong> {selectedApp.ktpAddress}</div>
                <div style={{ marginTop: '0.5rem' }}><strong>Alamat Domisili:</strong> {selectedApp.domisiliAddress}</div>
              </div>

              {/* Section 2: Akademik */}
              <div className={styles.detailSection}>
                <h3>2. Riwayat Pendidikan & Pilihan Program</h3>
                <div className={styles.detailGrid}>
                  <div><strong>Pendidikan Terakhir:</strong> {selectedApp.lastEducation === 'Other' ? selectedApp.educationOther : selectedApp.lastEducation}</div>
                  <div><strong>Tahun Lulus:</strong> {selectedApp.graduationYear}</div>
                  <div><strong>Program Pilihan:</strong> {selectedApp.program}</div>
                  <div><strong>Jumlah Hafalan:</strong> {selectedApp.hafalanJuz}</div>
                  <div><strong>Aktivitas Saat Ini:</strong> {selectedApp.activity === 'Other' ? selectedApp.activityOther : selectedApp.activity}</div>
                </div>
                <div style={{ marginTop: '0.75rem' }}><strong>Alasan Masuk Ma'had:</strong> {selectedApp.reason}</div>
              </div>

              {/* Section 3: Orang Tua */}
              <div className={styles.detailSection}>
                <h3>3. Data Orang Tua</h3>
                <div className={styles.detailGrid}>
                  <div><strong>Nama Ayah:</strong> {selectedApp.fatherName}</div>
                  <div><strong>Pekerjaan Ayah:</strong> {selectedApp.fatherJob}</div>
                  <div><strong>Nama Ibu:</strong> {selectedApp.motherName}</div>
                  <div><strong>Pekerjaan Ibu:</strong> {selectedApp.motherJob}</div>
                </div>
              </div>

              {/* Section 4: Attachments */}
              <div className={styles.detailSection}>
                <h3>4. Berkas Lampiran</h3>
                <div className={styles.attachments}>
                  {selectedApp.suratIzinOrtuPath ? (
                    <a href={selectedApp.suratIzinOrtuPath} target="_blank" rel="noreferrer" className={styles.attachBtn}>
                      <FileText size={16} />
                      <span>Surat Izin Orang Tua (Scan PDF)</span>
                    </a>
                  ) : (
                    <span className={styles.noAttach}>Surat Izin Orang Tua tidak diunggah.</span>
                  )}
                  
                  {selectedApp.suratKesiapanPath ? (
                    <a href={selectedApp.suratKesiapanPath} target="_blank" rel="noreferrer" className={styles.attachBtn}>
                      <FileText size={16} />
                      <span>Surat Kesiapan Santri (Scan PDF)</span>
                    </a>
                  ) : (
                    <span className={styles.noAttach}>Surat Kesiapan Santri tidak diunggah.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar (Update status) */}
            <div className={styles.modalFooter}>
              <div className={styles.statusUpdater}>
                <span>Ubah Status Seleksi:</span>
                <div className={styles.updaterBtns}>
                  <button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'APPROVED')} 
                    className={`${styles.footerBtn} ${styles.btnApprove}`}
                    disabled={updatingStatus}
                  >
                    <CheckCircle size={14} />
                    <span>Lulus / Terima</span>
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'REJECTED')} 
                    className={`${styles.footerBtn} ${styles.btnReject}`}
                    disabled={updatingStatus}
                  >
                    <XCircle size={14} />
                    <span>Tolak berkas</span>
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'PENDING')} 
                    className={`${styles.footerBtn} ${styles.btnPending}`}
                    disabled={updatingStatus}
                  >
                    <Clock size={14} />
                    <span>Pending</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
