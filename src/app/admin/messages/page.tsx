'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, X, AlertCircle, CheckCircle2, MessageSquare, Clock, ArrowRight, Save } from 'lucide-react';
import styles from './Messages.module.css';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED';
  notes: string | null;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNREAD' | 'READ' | 'REPLIED'>('ALL');

  // Modal / Detail states
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [statusInput, setStatusInput] = useState<'UNREAD' | 'READ' | 'REPLIED'>('UNREAD');
  const [notesInput, setNotesInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error fetching admin messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update status or notes in the database
  const handleUpdateMessage = async (id: number, status: string, notes: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes: notes.trim() })
      });

      if (res.ok) {
        // Refresh local details and table list
        await fetchMessages();
        
        // Update selectedMsg locally to reflect the change in modal
        setSelectedMsg((prev) => {
          if (!prev || prev.id !== id) return prev;
          return { ...prev, status: status as any, notes: notes.trim() || null };
        });
      } else {
        const data = await res.json();
        alert(data.message || 'Gagal menyimpan pembaruan.');
      }
    } catch (err) {
      console.error('Error updating message:', err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  // Delete message from database
  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan masuk ini secara permanen?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSelectedMsg(null);
        fetchMessages();
      } else {
        const data = await res.json();
        alert(data.message || 'Gagal menghapus pesan.');
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  // Open detail modal and auto-mark as READ if current status is UNREAD
  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    setStatusInput(msg.status);
    setNotesInput(msg.notes || '');

    if (msg.status === 'UNREAD') {
      handleUpdateMessage(msg.id, 'READ', msg.notes || '');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (statusFilter === 'ALL') return true;
    return msg.status === statusFilter;
  });

  const getStatusBadge = (status: 'UNREAD' | 'READ' | 'REPLIED') => {
    switch (status) {
      case 'UNREAD':
        return <span className={`${styles.statusBadge} ${styles.badgeUnread}`}>Belum Dibaca</span>;
      case 'READ':
        return <span className={`${styles.statusBadge} ${styles.badgeRead}`}>Dibaca</span>;
      case 'REPLIED':
        return <span className={`${styles.statusBadge} ${styles.badgeReplied}`}>Dibalas</span>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Manajemen Pesan Masuk</h1>
          <p>Tinjau dan tindak lanjuti pesan-pesan yang dikirimkan oleh publik/pengunjung dari formulir kontak website.</p>
        </div>
      </div>

      {/* Filter Row */}
      <div className={styles.filtersRow}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Menampilkan {filteredMessages.length} dari {messages.length} pesan
        </span>
        <div className={styles.filterTabs}>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`${styles.filterBtn} ${statusFilter === 'ALL' ? styles.activeFilter : ''}`}
          >
            Semua
          </button>
          <button
            onClick={() => setStatusFilter('UNREAD')}
            className={`${styles.filterBtn} ${statusFilter === 'UNREAD' ? styles.activeFilter : ''}`}
          >
            Belum Dibaca
          </button>
          <button
            onClick={() => setStatusFilter('READ')}
            className={`${styles.filterBtn} ${statusFilter === 'READ' ? styles.activeFilter : ''}`}
          >
            Dibaca
          </button>
          <button
            onClick={() => setStatusFilter('REPLIED')}
            className={`${styles.filterBtn} ${statusFilter === 'REPLIED' ? styles.activeFilter : ''}`}
          >
            Dibalas
          </button>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className={styles.loading}>Sedang memuat data pesan masuk...</div>
      ) : filteredMessages.length === 0 ? (
        <div className={styles.empty}>
          <Mail size={36} style={{ color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '0.5rem' }} />
          <p>Tidak ada pesan masuk untuk kategori filter ini.</p>
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.messagesTable}>
            <thead>
              <tr>
                <th>Pengirim</th>
                <th>Subjek</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg) => {
                const isUnread = msg.status === 'UNREAD';
                const messageDate = new Date(msg.createdAt).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <tr key={msg.id} className={isUnread ? styles.unreadRow : ''}>
                    <td>
                      <div className={styles.senderCol}>
                        <span className={styles.senderName}>{msg.name}</span>
                        <span className={styles.senderMeta}>{msg.phone} &bull; {msg.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.subjectText} title={msg.subject}>
                        {msg.subject}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {messageDate}
                    </td>
                    <td>
                      {getStatusBadge(msg.status)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.actionGroup} style={{ justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenMessage(msg)}
                          className={styles.actionBtn}
                        >
                          Baca Pesan
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className={styles.deleteBtn}
                          title="Hapus Pesan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Details Modal */}
      {selectedMsg && (
        <div className={styles.modalOverlay} onClick={() => setSelectedMsg(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Detail Pesan Masuk</h2>
              <button onClick={() => setSelectedMsg(null)} className={styles.closeBtn} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Pengirim</span>
                  <span className={styles.metaValue}>{selectedMsg.name}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Surel (Email)</span>
                  <span className={styles.metaValue}>{selectedMsg.email}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>WhatsApp (Phone)</span>
                  <span className={styles.metaValue}>
                    <a href={`https://wa.me/${selectedMsg.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                      {selectedMsg.phone}
                    </a>
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Tanggal Masuk</span>
                  <span className={styles.metaValue}>
                    {new Date(selectedMsg.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Subjek Pesan</span>
                <span className={styles.metaValue} style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{selectedMsg.subject}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Isi Pesan</span>
                <div className={styles.messageContent}>{selectedMsg.message}</div>
              </div>

              {/* Follow-up Section */}
              <div className={styles.followUpSection}>
                <span className={styles.followUpTitle}>Tindak Lanjut & Catatan Admin</span>
                
                <div className={styles.formRow}>
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Ubah Status Tindak Lanjut
                  </label>
                  <select
                    className="form-control"
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value as any)}
                  >
                    <option value="READ">Dibaca (Tunda Follow-up)</option>
                    <option value="REPLIED">Dibalas (Selesai Follow-up)</option>
                    <option value="UNREAD">Belum Dibaca (Tandai Ulang)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                    Catatan Follow-up Internal
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Contoh: Sudah dihubungi via WA untuk pendaftaran atau sudah dibalas pertanyaannya."
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={() => handleDeleteMessage(selectedMsg.id)}
                className="btn btn-outline"
                style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)', marginRight: 'auto' }}
              >
                Hapus Pesan
              </button>
              
              <button
                onClick={() => setSelectedMsg(null)}
                className="btn btn-outline"
              >
                Tutup
              </button>

              <button
                onClick={() => handleUpdateMessage(selectedMsg.id, statusInput, notesInput)}
                className="btn btn-primary"
                disabled={saving}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Save size={14} />
                <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
