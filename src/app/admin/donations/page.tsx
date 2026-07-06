'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save, X, Calendar, DollarSign, Heart } from 'lucide-react';
import styles from './Donations.module.css';

interface DonationReport {
  id: number;
  donorName: string;
  amount: number;
  date: string;
  status: string;
  notes: string | null;
  programId: number | null;
  paymentMethod: string;
}

interface DonationProgram {
  id: number;
  title: string;
  isActive: boolean;
}

export default function AdminDonationsPage() {
  const router = useRouter();

  const [reports, setReports] = useState<DonationReport[]>([]);
  const [programs, setPrograms] = useState<DonationProgram[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Field states
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [donorName, setDonorName] = useState('Hamba Allah');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [programId, setProgramId] = useState('');
  const [status, setStatus] = useState('VERIFIED');
  const [paymentMethod, setPaymentMethod] = useState('TRANSFER');
  const [notes, setNotes] = useState('');

  // Fetch reports and programs
  const fetchData = async () => {
    try {
      const res = await fetch('/api/donations');
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
        setPrograms(data.programs || []);
      } else {
        console.error('Failed to fetch donations data');
      }
    } catch (err) {
      console.error('Error fetching donations data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setDonorName('Hamba Allah');
    setAmount('');
    // Set default date to today's date formatted as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setProgramId('');
    setStatus('VERIFIED');
    setPaymentMethod('TRANSFER');
    setNotes('');
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const openEditModal = (report: DonationReport) => {
    setModalMode('edit');
    setCurrentId(report.id);
    setDonorName(report.donorName);
    setAmount(report.amount.toString());
    // Format report date object to YYYY-MM-DD
    const reportDate = new Date(report.date).toISOString().split('T')[0];
    setDate(reportDate);
    setProgramId(report.programId ? report.programId.toString() : '');
    setStatus(report.status);
    setPaymentMethod(report.paymentMethod || 'TRANSFER');
    setNotes(report.notes || '');
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!donorName.trim()) {
      setFormError('Nama donatur wajib diisi.');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setFormError('Jumlah donasi harus berupa angka positif.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        id: currentId,
        donorName,
        amount: Number(amount),
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        programId: programId ? Number(programId) : null,
        status,
        paymentMethod,
        notes: notes.trim() || null,
      };

      const method = modalMode === 'create' ? 'POST' : 'PUT';
      const response = await fetch('/api/donations', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok) {
        setFormSuccess(resData.message || 'Data donasi berhasil disimpan!');
        fetchData();
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1200);
      } else {
        setFormError(resData.message || 'Gagal menyimpan data donasi.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormError('Terjadi kesalahan koneksi internet.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data transaksi donasi ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/donations?id=${id}`, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (response.ok) {
        fetchData();
        alert(resData.message || 'Transaksi donasi berhasil dihapus.');
      } else {
        alert(resData.message || 'Gagal menghapus transaksi donasi.');
      }
    } catch (err) {
      console.error('Error deleting donation:', err);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getProgramTitle = (id: number | null) => {
    if (!id) return null;
    const prog = programs.find((p) => p.id === id);
    return prog ? prog.title : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Laporan Transaksi Donasi</h1>
          <p>Kelola data laporan transparansi donasi yang masuk ke Yayasan / Ma'had.</p>
        </div>
        <button onClick={openCreateModal} className={styles.addBtn}>
          <Plus size={16} />
          <span>Tambah Transaksi</span>
        </button>
      </div>

      {loading ? (
        <div className={styles.card}>
          <div className={styles.loading}>Sedang memuat data laporan donasi...</div>
        </div>
      ) : reports.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.empty}>
            <Heart size={40} className={styles.emptyIcon} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
            <p>Belum ada data transaksi donasi terdaftar.</p>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donatur</th>
                  <th>Jumlah</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className={styles.donaturInfo}>
                        <span className={styles.donaturName}>{report.donorName}</span>
                        {getProgramTitle(report.programId) && (
                          <span className={styles.donaturNotes}>
                            Program: <span className={styles.programTag}>{getProgramTitle(report.programId)}</span>
                          </span>
                        )}
                        {report.notes && (
                          <span className={styles.donaturNotes}>Catatan: "{report.notes}"</span>
                        )}
                        <span className={styles.donaturNotes}>
                          Sumber Dana: <strong style={{ color: 'var(--primary)' }}>{report.paymentMethod}</strong>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.amount}>{formatCurrency(report.amount)}</span>
                    </td>
                    <td>
                      <span className={styles.date}>{formatDate(report.date)}</span>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          report.status === 'VERIFIED' ? styles.badgeVerified : styles.badgePending
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          onClick={() => openEditModal(report)}
                          className={`${styles.iconBtn} ${styles.editBtn}`}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Dialog Modal */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{modalMode === 'create' ? 'Tambah Transaksi Donasi' : 'Edit Transaksi Donasi'}</h2>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className={styles.modalBody}>
                {formError && <div className={`${styles.alert} ${styles.alertError} mb-3`}>{formError}</div>}
                {formSuccess && <div className={`${styles.alert} ${styles.alertSuccess} mb-3`}>{formSuccess}</div>}

                <div className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="donorName">Nama Donatur</label>
                    <input
                      type="text"
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Contoh: Hamba Allah / Bapak Ahmad"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="amount">Jumlah Donasi (Rp)</label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Contoh: 150000"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="date">Tanggal Transaksi</label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="programId">Program Kampanye (Opsional)</label>
                    <select
                      id="programId"
                      value={programId}
                      onChange={(e) => setProgramId(e.target.value)}
                      className={styles.select}
                    >
                      <option value="">-- Umum / Tanpa Kampanye Khusus --</option>
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status Verifikasi</label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className={styles.select}
                    >
                      <option value="VERIFIED">VERIFIED (Terverifikasi & Tampil di Web)</option>
                      <option value="PENDING">PENDING (Menunggu Verifikasi)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="paymentMethod">Sumber Dana</label>
                    <select
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className={styles.select}
                    >
                      <option value="TRANSFER">Transfer Bank</option>
                      <option value="QRIS">QRIS</option>
                      <option value="CASH">Tunai / Cash</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="notes">Catatan Tambahan (Opsional)</label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Infaq rutin bulanan"
                      className={styles.textarea}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelBtn}
                  disabled={submitting}
                >
                  Batal
                </button>
                <button type="submit" className={styles.saveBtn} disabled={submitting}>
                  <div className="d-flex align-items-center gap-1">
                    <Save size={14} />
                    <span>{submitting ? 'Menyimpan...' : 'Simpan'}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
