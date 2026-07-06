'use client';

import React, { useState, useEffect } from 'react';
import { Search, Upload, Trash2, Copy, FileText, Image as ImageIcon, CheckCircle2, X } from 'lucide-react';
import styles from './Media.module.css';

interface MediaItem {
  id: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  folder: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFolder, setActiveFolder] = useState('ALL');

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState('general');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  // Selected preview state
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await fetch(`/api/media?q=${searchTerm}&folder=${activeFolder}`);
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error('Error fetching media library:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [searchTerm, activeFolder]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setUploadMsg('');

    const payload = new FormData();
    payload.append('file', uploadFile);
    payload.append('folder', uploadFolder);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadMsg('Berkas berhasil diupload!');
        setUploadFile(null);
        // Reset file input element
        const fileInput = document.getElementById('mediaFileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchMedia();
      } else {
        setUploadMsg(data.message || 'Gagal mengupload berkas.');
      }
    } catch (err) {
      setUploadMsg('Terjadi masalah jaringan.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berkas ini secara permanen?')) return;

    const payload = new FormData();
    payload.append('action', 'delete');
    payload.append('id', String(id));

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: payload,
      });

      if (res.ok) {
        alert('Berkas berhasil dihapus!');
        setSelectedMedia(null);
        fetchMedia();
      } else {
        const data = await res.json();
        alert(data.message || 'Gagal menghapus berkas.');
      }
    } catch (err) {
      alert('Masalah koneksi jaringan.');
    }
  };

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(window.location.origin + path);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const folders = [
    { type: 'ALL', label: 'Semua Berkas' },
    { type: 'general', label: 'General' },
    { type: 'blog', label: 'Blog / Artikel' },
    { type: 'admissions', label: 'PPDB Admissions' },
    { type: 'gallery', label: 'Galeri Media' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Pustaka Media (Media Library)</h1>
          <p>Unggah, kategorisasi, cari, dan salin URL berkas gambar dan PDF untuk digunakan di website.</p>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className={styles.mainGrid}>
        
        {/* Left Col: Upload Manager & Browser */}
        <div className={styles.browserCol}>
          
          {/* Filters Row */}
          <div className={styles.filtersRow}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Cari nama berkas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.folderTabs}>
              {folders.map((f) => (
                <button
                  key={f.type}
                  onClick={() => setActiveFolder(f.type)}
                  className={`${styles.folderBtn} ${activeFolder === f.type ? styles.activeFolder : ''}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Media Grid Cards */}
          {loading && mediaList.length === 0 ? (
            <div className={styles.loading}>Memuat pustaka media...</div>
          ) : mediaList.length === 0 ? (
            <div className={styles.empty}>Belum ada berkas media. Terapkan upload di sebelah kanan untuk menambahkan.</div>
          ) : (
            <div className={styles.mediaGrid}>
              {mediaList.map((media) => {
                const isImage = media.mimeType.startsWith('image/');
                const sizeKb = Math.round(media.fileSize / 1024);
                
                return (
                  <div 
                    key={media.id} 
                    className={`${styles.mediaCard} card`}
                    onClick={() => setSelectedMedia(media)}
                  >
                    <div className={styles.cardPreview}>
                      {isImage ? (
                        <img src={media.filePath} alt={media.fileName} className={styles.cardImg} loading="lazy" />
                      ) : (
                        <FileText size={48} className={styles.fileIcon} />
                      )}
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.fileName}>{media.fileName}</span>
                      <span className={styles.fileSize}>{sizeKb} KB &bull; {media.folder}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Upload Box */}
        <div className={styles.uploadCol}>
          <div className={styles.uploadCard}>
            <h3>Unggah Berkas Baru</h3>
            {uploadMsg && (
              <div className="alert alert-info" style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
                <span>{uploadMsg}</span>
              </div>
            )}
            <form onSubmit={handleUploadSubmit} className={styles.uploadForm}>
              <div className="form-group">
                <label className="form-label">Berkas File</label>
                <input
                  type="file"
                  id="mediaFileInput"
                  className="form-control"
                  onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kategori Folder</label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="form-control"
                >
                  <option value="general">General</option>
                  <option value="blog">Blog / Artikel</option>
                  <option value="admissions">PPDB Admissions</option>
                  <option value="gallery">Galeri Media</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{ justifyContent: 'center' }} disabled={uploading}>
                <Upload size={16} />
                <span>{uploading ? 'Mengunggah...' : 'Unggah Berkas'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className={styles.modalOverlay} onClick={() => setSelectedMedia(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Detail Berkas Media</h2>
              <button onClick={() => setSelectedMedia(null)} className={styles.closeBtn} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalPreview}>
                {selectedMedia.mimeType.startsWith('image/') ? (
                  <img src={selectedMedia.filePath} alt={selectedMedia.fileName} className={styles.previewImg} />
                ) : (
                  <FileText size={80} className={styles.largeFileIcon} />
                )}
              </div>
              
              <div className={styles.modalInfo}>
                <div className={styles.infoRow}><strong>Nama Berkas:</strong> {selectedMedia.fileName}</div>
                <div className={styles.infoRow}><strong>URL Path:</strong> <code>{selectedMedia.filePath}</code></div>
                <div className={styles.infoRow}><strong>Tipe MIME:</strong> {selectedMedia.mimeType}</div>
                <div className={styles.infoRow}><strong>Ukuran Berkas:</strong> {Math.round(selectedMedia.fileSize / 1024)} KB</div>
                <div className={styles.infoRow}><strong>Folder:</strong> {selectedMedia.folder}</div>
                <div className={styles.infoRow}><strong>Tanggal Upload:</strong> {new Date(selectedMedia.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={() => handleDelete(selectedMedia.id)} className={styles.deleteBtn}>
                <Trash2 size={14} />
                <span>Hapus Berkas</span>
              </button>
              
              <button onClick={() => copyToClipboard(selectedMedia.filePath)} className={`${styles.copyBtn} btn btn-outline`}>
                {copySuccess ? <CheckCircle2 size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                <span>{copySuccess ? 'Link Disalin!' : 'Salin URL Lengkap'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
