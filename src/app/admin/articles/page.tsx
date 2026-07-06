'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Calendar, Eye, EyeOff } from 'lucide-react';
import styles from './Articles.module.css';

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: string;
  publishDate: string | null;
  categoryName: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function AdminArticlesPage() {
  const router = useRouter();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [currentId, setCurrentId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('DRAFT');

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Fetch articles and categories
  const fetchData = async () => {
    try {
      const artRes = await fetch('/api/articles');
      const catsRes = await fetch('/api/categories'); // Let's make sure we write /api/categories as well

      if (artRes.ok) {
        const artData = await artRes.json();
        setArticles(artData);
      }
      
      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-slug generation from Title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (isCreating) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // collapse multiple hyphens
      setSlug(generatedSlug);
    }
  };

  const handleEditClick = async (artId: number) => {
    setLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      // Find full article content. Let's fetch details from API
      const res = await fetch(`/api/articles`);
      if (res.ok) {
        const list = await res.json();
        // Since we fetch the list, we can just find it, but the list doesn't have content body to save payload size.
        // Let's create an endpoint to fetch a single article details or retrieve it from list.
        // Wait, let's create a POST endpoint action: 'get_detail' inside /api/articles to retrieve full details!
        const detailRes = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_detail', id: artId })
        });
        
        if (detailRes.ok) {
          const detail = await detailRes.json();
          setCurrentId(detail.id);
          setTitle(detail.title);
          setSlug(detail.slug);
          setSummary(detail.summary || '');
          setContent(detail.content || '');
          setCategoryId(detail.categoryId ? String(detail.categoryId) : '');
          setStatus(detail.status || 'DRAFT');
          setIsEditing(true);
          setIsCreating(false);
        }
      }
    } catch (err) {
      setFormError('Gagal memuat data artikel.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setCurrentId(null);
    setTitle('');
    setSlug('');
    setSummary('');
    setContent('');
    setCategoryId(categories.length > 0 ? String(categories[0].id) : '');
    setStatus('DRAFT');
    setFormError('');
    setFormSuccess('');
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setFormError('');
    setFormSuccess('');
  };

  // Text Selection Wrappers (HTML injection)
  const wrapText = (tagOpen: string, tagClose: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = tagOpen + selectedText + tagClose;

    setContent(text.substring(0, start) + replacement + text.substring(end));
    
    // Focus back and set cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selectedText.length);
    }, 0);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    setFormSuccess('');

    const action = isCreating ? 'create' : 'update';
    const payload = {
      action,
      id: currentId,
      title,
      slug,
      summary,
      content,
      categoryId: categoryId ? parseInt(categoryId, 10) : null,
      status
    };

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      if (res.ok) {
        setFormSuccess(resJson.message);
        fetchData();
        setTimeout(() => {
          setIsCreating(false);
          setIsEditing(false);
        }, 1500);
      } else {
        setFormError(resJson.message || 'Terjadi kesalahan saat menyimpan artikel.');
      }
    } catch (err) {
      setFormError('Masalah koneksi jaringan.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (artId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: artId }),
      });

      const resJson = await res.json();

      if (res.ok) {
        alert(resJson.message);
        fetchData();
      } else {
        alert(resJson.message || 'Gagal menghapus artikel.');
      }
    } catch (err) {
      alert('Masalah koneksi jaringan.');
    }
  };

  if (loading && articles.length === 0) {
    return <div className={styles.loading}>Memuat Data Manager Artikel...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Manajemen Artikel & Berita</h1>
          <p>Tulis kajian Islami, publikasikan warta kegiatan pesantren, dan kelola draf blog.</p>
        </div>
        {!isCreating && !isEditing && (
          <button onClick={handleCreateClick} className="btn btn-primary">
            <Plus size={16} />
            <span>Tulis Artikel Baru</span>
          </button>
        )}
      </div>

      {/* 1. Article Editor Form (Create / Edit) */}
      {(isCreating || isEditing) && (
        <div className={styles.editorCard}>
          <div className={styles.editorHeader}>
            <h2>{isCreating ? 'Tulis Artikel Baru' : 'Edit Artikel'}</h2>
            <button onClick={handleCancel} className={styles.closeBtn} aria-label="Cancel">
              <X size={20} />
            </button>
          </div>

          {formError && (
            <div className="alert alert-danger">
              <span>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div className="alert alert-success">
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSave} className={styles.editorForm}>
            <div className={styles.formGrid}>
              <div className="form-group">
                <label className="form-label">Judul Artikel</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={title} 
                  onChange={handleTitleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL Slug (URL SEO)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select 
                  className="form-control" 
                  value={categoryId} 
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Pilih Kategori...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status Penerbitan</label>
                <select 
                  className="form-control" 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="DRAFT">Draf (Disimpan Intern)</option>
                  <option value="PUBLISHED">Published (Tampil di Web)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Ringkasan Excerpt (Tampil di daftar blog)</label>
              <textarea 
                rows={2} 
                className="form-control" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                placeholder="Tulis ringkasan singkat artikel di sini..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Isi Konten Artikel</label>
              
              {/* Rich Text Toolbar */}
              <div className={styles.toolbar}>
                <button type="button" onClick={() => wrapText('<strong>', '</strong>')} title="Bold"><b>B</b></button>
                <button type="button" onClick={() => wrapText('<em>', '</em>')} title="Italic"><i>I</i></button>
                <button type="button" onClick={() => wrapText('<h2>', '</h2>')} title="Heading 2">H2</button>
                <button type="button" onClick={() => wrapText('<h3>', '</h3>')} title="Heading 3">H3</button>
                <button type="button" onClick={() => wrapText('<blockquote>', '</blockquote>')} title="Blockquote">Quote</button>
                <button 
                  type="button" 
                  onClick={() => {
                    const url = prompt('Masukkan URL Link:');
                    if (url) wrapText(`<a href="${url}" target="_blank">`, '</a>');
                  }} 
                  title="Insert Link"
                >
                  Link
                </button>
              </div>

              <textarea 
                ref={contentRef}
                rows={12} 
                className={`${formControlStyles()} ${styles.codeArea}`} 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required
                placeholder="Tulis isi konten menggunakan HTML/Teks biasa..."
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <Save size={16} />
                <span>{submitting ? 'Menyimpan...' : 'Simpan Artikel'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Articles List Table */}
      {!isCreating && !isEditing && (
        <div className={styles.tableCard}>
          {articles.length === 0 ? (
            <div className={styles.empty}>
              <p>Belum ada artikel yang ditulis. Silakan klik "Tulis Artikel Baru" untuk memulai.</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul Artikel</th>
                  <th>Kategori</th>
                  <th>Tanggal Tulis</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((art) => (
                  <tr key={art.id}>
                    <td className={styles.articleTitleCell}>
                      <strong>{art.title}</strong>
                      <span className={styles.slugUrl}>/{art.slug}</span>
                    </td>
                    <td>
                      <span className={styles.catBadge}>{art.categoryName || 'Tanpa Kategori'}</span>
                    </td>
                    <td className={styles.dateCell}>
                      <Calendar size={13} />
                      <span>
                        {art.publishDate ? new Date(art.publishDate).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : ''}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusLabel} ${styles[art.status.toLowerCase()]}`}>
                        {art.status === 'PUBLISHED' ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{art.status}</span>
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button onClick={() => handleEditClick(art.id)} className={styles.editBtn} title="Edit Artikel">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(art.id)} className={styles.deleteBtn} title="Hapus Artikel">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

// Simple helper to avoid duplicating boilerplate classname strings
function formControlStyles() {
  return 'form-control';
}
