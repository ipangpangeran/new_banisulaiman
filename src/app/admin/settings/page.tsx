'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Settings, ListPlus, BookOpen } from 'lucide-react';
import styles from './Settings.module.css';

export default function AdminSettingsPage() {
  // Config inputs state
  const [inputs, setInputs] = useState({
    school_name: '',
    school_tagline: '',
    school_address: '',
    school_email: '',
    school_phone_1: '',
    school_phone_2: '',
    school_maps_embed: '',
    site_history: '',
    site_vision: '',
    stats_students: '',
    stats_teachers: '',
    stats_alumni: '',
    stats_buildings: '',
    hadith_text: '',
    hadith_narrator: '',
  });

  const [missionInput, setMissionInput] = useState('');
  
  // Status states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        
        setInputs({
          school_name: data.school_name || '',
          school_tagline: data.school_tagline || '',
          school_address: data.school_address || '',
          school_email: data.school_email || '',
          school_phone_1: data.school_phone_1 || '',
          school_phone_2: data.school_phone_2 || '',
          school_maps_embed: data.school_maps_embed || '',
          site_history: data.site_history || '',
          site_vision: data.site_vision || '',
          stats_students: data.stats_students || '0',
          stats_teachers: data.stats_teachers || '0',
          stats_alumni: data.stats_alumni || '0',
          stats_buildings: data.stats_buildings || '0',
          hadith_text: data.hadith_text || '',
          hadith_narrator: data.hadith_narrator || '',
        });

        // Parse mission lists
        if (data.site_mission) {
          try {
            const arr = JSON.parse(data.site_mission);
            if (Array.isArray(arr)) {
              setMissionInput(arr.join('\n'));
            }
          } catch (e) {
            setMissionInput(data.site_mission);
          }
        }
      }
    } catch (err) {
      setErrorMsg('Gagal mengambil data pengaturan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Parse mission lines
    const missionArray = missionInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const payload = {
      ...inputs,
      site_mission: JSON.stringify(missionArray)
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      if (res.ok) {
        setSuccessMsg(resJson.message);
      } else {
        setErrorMsg(resJson.message || 'Gagal menyimpan pengaturan.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Memuat Data Pengaturan...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Pengaturan Website</h1>
          <p>Ubah profil sekolah, kontak WhatsApp, koordinat peta, deskripsi sejarah, dan visi misi pesantren.</p>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success d-flex align-items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger d-flex align-items-center gap-2">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className={styles.form}>
        {/* Section 1: Profil Sekolah */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <Settings className={styles.secIcon} size={18} />
            <h2>Profil & Identitas Sekolah</h2>
          </div>
          
          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label">Nama Lembaga / Pesantren</label>
              <input type="text" name="school_name" className="form-control" value={inputs.school_name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Slogan / Tagline Sekolah</label>
              <input type="text" name="school_tagline" className="form-control" value={inputs.school_tagline} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Section 2: Informasi Kontak */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <Settings className={styles.secIcon} size={18} />
            <h2>Informasi Hubungan & Peta Google Maps</h2>
          </div>

          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label">Email Hubungan</label>
              <input type="email" name="school_email" className="form-control" value={inputs.school_email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor WhatsApp Utama</label>
              <input type="text" name="school_phone_1" className="form-control" value={inputs.school_phone_1} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor WhatsApp Cadangan</label>
              <input type="text" name="school_phone_2" className="form-control" value={inputs.school_phone_2} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Alamat Lengkap</label>
            <input type="text" name="school_address" className="form-control" value={inputs.school_address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Google Maps Embed Link (Src URL saja)</label>
            <textarea rows={2} name="school_maps_embed" className={styles.codeTextarea} value={inputs.school_maps_embed} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." />
          </div>
        </div>

        {/* Section 3: Sejarah & Visi Misi */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <ListPlus className={styles.secIcon} size={18} />
            <h2>Manajemen Sejarah, Visi & Misi</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Sejarah Pendirian (Gunakan baris kosong untuk paragraf baru)</label>
            <textarea rows={6} name="site_history" className="form-control" value={inputs.site_history} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Kalimat Visi Utama</label>
            <textarea rows={2} name="site_vision" className="form-control" value={inputs.site_vision} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Butir-Butir Misi (Tuliskan satu misi per baris/line)</label>
            <textarea rows={5} className="form-control" value={missionInput} onChange={(e) => setMissionInput(e.target.value)} placeholder="Misi 1&#10;Misi 2&#10;Misi 3" />
          </div>
        </div>

        {/* Section: Mutiara Hikmah */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <BookOpen className={styles.secIcon} size={18} />
            <h2>Mutiara Hikmah (Halaman Utama)</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Teks Hadits / Kutipan Hari Ini</label>
            <textarea rows={3} name="hadith_text" className="form-control" value={inputs.hadith_text} onChange={handleChange} placeholder="Contoh: Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya." required />
          </div>

          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label className="form-label">Perawi / Riwayat / Sumber</label>
            <input type="text" name="hadith_narrator" className="form-control" value={inputs.hadith_narrator} onChange={handleChange} placeholder="Contoh: HR. Bukhari" required />
          </div>
        </div>

        {/* Section 4: Statistik Data */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <Settings className={styles.secIcon} size={18} />
            <h2>Statistik Tampilan Angka Pesantren</h2>
          </div>
          
          <div className={styles.statsGrid}>
            <div className="form-group">
              <label className="form-label">Jumlah Santri Aktif</label>
              <input type="number" name="stats_students" className="form-control" value={inputs.stats_students} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Jumlah Ustadz & Pengajar</label>
              <input type="number" name="stats_teachers" className="form-control" value={inputs.stats_teachers} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Jumlah Alumni Huffazh</label>
              <input type="number" name="stats_alumni" className="form-control" value={inputs.stats_alumni} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Jumlah Bangunan Gedung</label>
              <input type="number" name="stats_buildings" className="form-control" value={inputs.stats_buildings} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" style={{ padding: '1rem', justifyContent: 'center', fontSize: '1.05rem' }} disabled={submitting}>
          <Save size={18} />
          <span>{submitting ? 'Menyimpan Pengaturan...' : 'Terapkan Pengaturan Website'}</span>
        </button>
      </form>
    </div>
  );
}
