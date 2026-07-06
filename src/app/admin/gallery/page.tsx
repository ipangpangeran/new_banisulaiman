'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Video, Image as ImageIcon, CheckCircle2, AlertCircle, Play, Film, Calendar } from 'lucide-react';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: number;
  type: 'PHOTO' | 'VIDEO' | 'INSTAGRAM';
  videoUrl: string | null;
  mediaId: number | null;
  filePath: string | null;
  fileName: string | null;
  fileSize: number | null;
  caption: string | null;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'PHOTO' | 'VIDEO' | 'INSTAGRAM'>('ALL');

  // Form states
  const [activeTab, setActiveTab] = useState<'PHOTO' | 'VIDEO' | 'INSTAGRAM'>('PHOTO');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const payload = new FormData();
    payload.append('type', activeTab);
    payload.append('caption', caption.trim());

    if (activeTab === 'PHOTO') {
      if (!uploadFile) {
        setFormError('Silakan pilih file foto terlebih dahulu.');
        return;
      }

      // Client-side file size validation: max 10 MB (10 * 1024 * 1024 bytes)
      const maxSizeBytes = 10 * 1024 * 1024;
      if (uploadFile.size > maxSizeBytes) {
        setFormError(`Ukuran file foto melebihi batas maksimal 10 MB. (File Anda: ${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB)`);
        return;
      }

      payload.append('file', uploadFile);
    } else {
      if (!videoUrl.trim()) {
        setFormError(activeTab === 'INSTAGRAM' ? 'Silakan masukkan link video Instagram.' : 'Silakan masukkan link video YouTube.');
        return;
      }
      payload.append('videoUrl', videoUrl);
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (res.ok) {
        setFormSuccess(data.message || 'Media galeri berhasil ditambahkan!');
        setUploadFile(null);
        setVideoUrl('');
        setCaption('');
        
        // Reset file input element
        const fileInput = document.getElementById('galleryFileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        fetchItems();
      } else {
        setFormError(data.message || 'Gagal menyimpan media galeri.');
      }
    } catch (err) {
      console.error('Error submitting gallery form:', err);
      setFormError('Terjadi masalah jaringan.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus media galeri ini secara permanen?')) {
      return;
    }

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        fetchItems();
        alert(data.message || 'Media berhasil dihapus.');
      } else {
        alert(data.message || 'Gagal menghapus media.');
      }
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  const getYoutubeThumbnail = (url: string | null) => {
    if (!url) return null;
    // Extract video ID from youtube embed link
    const parts = url.split('/embed/');
    if (parts.length > 1) {
      const videoId = parts[1].split('?')[0];
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }
    return null;
  };

  const filteredItems = items.filter((item) => {
    if (typeFilter === 'ALL') return true;
    return item.type === typeFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Manajemen Galeri Media</h1>
          <p>Unggah dokumentasi foto pesantren (maks 10MB) dan simpan link video YouTube untuk ditampilkan di halaman galeri publik.</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Side: Browser of media items */}
        <div className={styles.browserCol}>
          <div className={styles.filtersRow}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Menampilkan {filteredItems.length} dari {items.length} media
            </span>
            <div className={styles.typeFilterTabs}>
              <button
                onClick={() => setTypeFilter('ALL')}
                className={`${styles.filterBtn} ${typeFilter === 'ALL' ? styles.activeFilter : ''}`}
              >
                Semua
              </button>
              <button
                onClick={() => setTypeFilter('PHOTO')}
                className={`${styles.filterBtn} ${typeFilter === 'PHOTO' ? styles.activeFilter : ''}`}
              >
                Foto
              </button>
              <button
                onClick={() => setTypeFilter('VIDEO')}
                className={`${styles.filterBtn} ${typeFilter === 'VIDEO' ? styles.activeFilter : ''}`}
              >
                YouTube
              </button>
              <button
                onClick={() => setTypeFilter('INSTAGRAM')}
                className={`${styles.filterBtn} ${typeFilter === 'INSTAGRAM' ? styles.activeFilter : ''}`}
              >
                Instagram
              </button>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>Sedang memuat data galeri...</div>
          ) : filteredItems.length === 0 ? (
            <div className={styles.empty}>
              <Film size={36} style={{ color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '0.5rem' }} />
              <p>Tidak ada media galeri ditemukan untuk filter ini.</p>
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {filteredItems.map((item) => {
                const isPhoto = item.type === 'PHOTO';
                const youtubeThumb = getYoutubeThumbnail(item.videoUrl);
                const isInstagram = item.type === 'INSTAGRAM';
                const sizeKb = item.fileSize ? Math.round(item.fileSize / 1024) : 0;

                return (
                  <div key={item.id} className={`${styles.mediaCard} card`}>
                    <span
                      className={`${styles.cardBadge} ${
                        isPhoto ? styles.badgePhoto : isInstagram ? styles.badgeInstagram || styles.badgeVideo : styles.badgeVideo
                      }`}
                    >
                      {item.type}
                    </span>

                    <div className={styles.cardPreview}>
                      {isPhoto ? (
                        item.filePath ? (
                          <img src={item.filePath} alt={item.fileName || ''} className={styles.previewImg} loading="lazy" />
                        ) : (
                          <ImageIcon size={40} className={styles.fileIcon} />
                        )
                      ) : isInstagram ? (
                        <div style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </div>
                      ) : youtubeThumb ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <img src={youtubeThumb} alt="YouTube Thumbnail" className={styles.previewImg} loading="lazy" />
                           <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)' }}>
                             <Play size={28} className={styles.videoIconWrapper} style={{ color: 'white' }} />
                           </div>
                        </div>
                      ) : (
                        <Video size={40} className={styles.fileIcon} />
                      )}
                    </div>

                    <div className={styles.cardInfo}>
                      <div className={styles.cardText}>
                        {isPhoto ? (
                          <>
                            <strong>File:</strong> {item.fileName}<br />
                            <strong>Size:</strong> {sizeKb} KB
                          </>
                        ) : isInstagram ? (
                          <>
                            <strong>Link:</strong> <a href={item.videoUrl || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                              Instagram Post/Reel
                            </a>
                          </>
                        ) : (
                          <>
                            <strong>Link:</strong> <a href={item.videoUrl || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                              YouTube Video
                            </a>
                          </>
                        )}
                        {item.caption && (
                          <div style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Keterangan: "{item.caption}"
                          </div>
                        )}
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.dateLabel}>
                          {new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={styles.deleteBtn}
                          title="Hapus Media"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Form Card (Tabs: Foto / Video) */}
        <div className={styles.uploadCol}>
          <div className={styles.formCard}>
            <div className={styles.formTabs}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('PHOTO');
                  setFormError('');
                  setFormSuccess('');
                }}
                className={`${styles.tabBtn} ${activeTab === 'PHOTO' ? styles.activeTab : ''}`}
              >
                <ImageIcon size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                <span>Upload Foto</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('VIDEO');
                  setFormError('');
                  setFormSuccess('');
                }}
                className={`${styles.tabBtn} ${activeTab === 'VIDEO' ? styles.activeTab : ''}`}
              >
                <Video size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                <span>Link YouTube</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('INSTAGRAM');
                  setFormError('');
                  setFormSuccess('');
                }}
                className={`${styles.tabBtn} ${activeTab === 'INSTAGRAM' ? styles.activeTab : ''}`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.35rem', verticalAlign: 'middle', display: 'inline-block' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Link Instagram</span>
              </button>
            </div>

            <div className={styles.formBody}>
              <h3>{activeTab === 'PHOTO' ? 'Tambah Foto Baru' : activeTab === 'VIDEO' ? 'Tambah Video YouTube' : 'Tambah Link Instagram'}</h3>
              
              {formError && (
                <div className={`${styles.alert} ${styles.alertError}`}>
                  <AlertCircle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className={`${styles.alert} ${styles.alertSuccess}`}>
                  <CheckCircle2 size={15} />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className={styles.form}>
                {activeTab === 'PHOTO' ? (
                  <>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Keterangan / Caption</label>
                      <input
                        type="text"
                        className="form-control"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Contoh: Kegiatan Belajar Santri"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pilih Foto</label>
                      <input
                        type="file"
                        id="galleryFileInput"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                        required
                      />
                      <small className={styles.fileHelper}>
                        Format yang didukung: JPG, PNG, WEBP, GIF. Ukuran file maksimal **10 MB**.
                      </small>
                    </div>
                  </>
                ) : activeTab === 'VIDEO' ? (
                  <>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Keterangan / Caption</label>
                      <input
                        type="text"
                        className="form-control"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Contoh: Video Profil Pesantren"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">URL / Link Video YouTube</label>
                      <input
                        type="url"
                        className="form-control"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Contoh: https://www.youtube.com/watch?v=..."
                        required
                      />
                      <small className={styles.fileHelper}>
                        Masukkan link video YouTube reguler atau singkat (share link). Sistem otomatis mengonversinya menjadi format embed yang responsif.
                      </small>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Keterangan / Caption</label>
                      <input
                        type="text"
                        className="form-control"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Contoh: Reels Kegiatan Wisuda Huffazh"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">URL / Link Instagram (Feed / Reels)</label>
                      <input
                        type="url"
                        className="form-control"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Contoh: https://www.instagram.com/reel/C_abc123/"
                        required
                      />
                      <small className={styles.fileHelper}>
                        Masukkan link Instagram Feed atau Reels video. Sistem otomatis membersihkan parameter pelacak dan merendernya dalam aspect ratio vertikal 9:16.
                      </small>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                  disabled={submitting}
                >
                  <Upload size={16} />
                  <span>{submitting ? 'Menyimpan...' : 'Simpan Media'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
