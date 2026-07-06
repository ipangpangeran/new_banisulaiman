'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './Registrasi.module.css';

export default function RegistrasiPage() {
  const router = useRouter();
  
  // Form input states
  const [formData, setFormData] = useState({
    nama: '',
    tempat_tanggal_lahir: '',
    usia: '',
    alamat_lengkap: '',
    alamat_domisili: '',
    status_perkawinan: 'Belum',
    program: 'Beasiswa',
    aktivitas: 'Sekolah',
    aktivitas_other: '',
    no_hp: '',
    email: '',
    pendidikan_terakhir: 'SMA',
    pendidikan_other: '',
    tahun_kelulusan: '',
    jumlah_hafalan: '',
    nama_ayah: '',
    pekerjaan_ayah: '',
    nama_ibu: '',
    pekerjaan_ibu: '',
    alasan: '',
  });

  const [suratIzin, setSuratIzin] = useState<File | null>(null);
  const [suratKesiapan, setSuratKesiapan] = useState<File | null>(null);
  
  // Other input triggers
  const [showAktivitasOther, setShowAktivitasOther] = useState(false);
  const [showPendidikanOther, setShowPendidikanOther] = useState(false);

  // Status indicators
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'izin' | 'kesiapan') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('File harus berupa PDF');
        e.target.value = '';
        return;
      }
      if (fileType === 'izin') {
        setSuratIzin(file);
      } else {
        setSuratKesiapan(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Create FormData payload
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, val);
      });
      if (suratIzin) payload.append('surat_izin_ortu', suratIzin);
      if (suratKesiapan) payload.append('surat_kesiapan', suratKesiapan);

      const response = await fetch('/api/admissions', {
        method: 'POST',
        body: payload,
      });

      const resJson = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setErrorMsg(resJson.message || 'Gagal mengirim pendaftaran. Silakan periksa kembali berkas dan data Anda.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan. Silakan hubungi admin via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '5rem 0', maxWidth: '600px' }}>
        <div className={styles.successCard}>
          <CheckCircle2 className={styles.successIcon} size={64} />
          <h2>Pendaftaran Berhasil Terkirim!</h2>
          <p>
            Alhamdulillah, berkas pendaftaran calon mahasantri Anda telah masuk ke sistem kami. Tim administrasi akan melakukan verifikasi berkas dan menghubungi Anda melalui email atau WhatsApp untuk jadwal ujian seleksi selanjutnya.
          </p>
          <div className={styles.successActions}>
            <Link href="/" className="btn btn-primary">
              Kembali ke Beranda
            </Link>
            <a 
              href="https://wa.me/6281572014321?text=Bismillah,%20saya%20sudah%20melakukan%20pendaftaran%20online%20via%20web" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary"
            >
              Hubungi Admin WA
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <Link href="/admissions" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Kembali ke Informasi PPDB</span>
        </Link>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ</span>
            <h2>Formulir Pendaftaran Mahasantri Baru</h2>
            <p>Silakan lengkapi seluruh data pribadi, riwayat pendidikan, dan berkas surat pernyataan di bawah.</p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger d-flex align-items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Section 1: Data Diri */}
            <div className={styles.sectionBlock}>
              <h3>1. Data Pribadi Calon Mahasantri</h3>
              
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap Sesuai KTP</label>
                  <input type="text" name="nama" className="form-control" value={formData.nama} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Tempat, Tanggal Lahir</label>
                  <input type="text" name="tempat_tanggal_lahir" placeholder="Contoh: Bandung, 15 Juni 2004" className="form-control" value={formData.tempat_tanggal_lahir} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Usia (Tahun)</label>
                  <input type="number" name="usia" className="form-control" value={formData.usia} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Status Perkawinan</label>
                  <select name="status_perkawinan" className="form-control" value={formData.status_perkawinan} onChange={handleChange}>
                    <option value="Belum">Belum Menikah</option>
                    <option value="Sudah">Sudah Menikah</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">No. HP / WhatsApp Pendaftar</label>
                  <input type="text" name="no_hp" placeholder="Contoh: 08123456789" className="form-control" value={formData.no_hp} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Aktif</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Sesuai KTP</label>
                <input type="text" name="alamat_lengkap" className="form-control" value={formData.alamat_lengkap} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Domisili Sekarang</label>
                <input type="text" name="alamat_domisili" className="form-control" value={formData.alamat_domisili} onChange={handleChange} required />
              </div>
            </div>

            {/* Section 2: Program & Aktivitas */}
            <div className={styles.sectionBlock}>
              <h3>2. Program & Aktivitas Pilihan</h3>
              
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Program Pilihan</label>
                  <select name="program" className="form-control" value={formData.program} onChange={handleChange}>
                    <option value="Beasiswa">Huffazh - Program Beasiswa Penuh (Ikhwan)</option>
                    <option value="Karantina">Karantina Tahfidz Akhir Pekan</option>
                    <option value="Ma'had Ilmi">Ma'had Ilmi Reguler</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Aktivitas Saat Ini</label>
                  <select 
                    name="aktivitas" 
                    className="form-control" 
                    value={formData.aktivitas} 
                    onChange={(e) => {
                      handleChange(e);
                      setShowAktivitasOther(e.target.value === 'Other');
                    }}
                  >
                    <option value="Sekolah">Sekolah / Pelajar</option>
                    <option value="Kuliah">Kuliah / Mahasiswa</option>
                    <option value="Kerja">Bekerja / Karyawan</option>
                    <option value="Other">Lainnya (Tuliskan)</option>
                  </select>
                </div>
              </div>

              {showAktivitasOther && (
                <div className="form-group">
                  <label className="form-label">Tuliskan Aktivitas Lainnya</label>
                  <input type="text" name="aktivitas_other" className="form-control" value={formData.aktivitas_other} onChange={handleChange} required />
                </div>
              )}
            </div>

            {/* Section 3: Akademik & Hafalan */}
            <div className={styles.sectionBlock}>
              <h3>3. Riwayat Akademik & Hafalan</h3>
              
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Pendidikan Terakhir</label>
                  <select 
                    name="pendidikan_terakhir" 
                    className="form-control" 
                    value={formData.pendidikan_terakhir} 
                    onChange={(e) => {
                      handleChange(e);
                      setShowPendidikanOther(e.target.value === 'Other');
                    }}
                  >
                    <option value="SMA">SMA / MA / SMK / Sederajat</option>
                    <option value="SMP">SMP / MTs / Sederajat</option>
                    <option value="Kuliah">Diploma / Sarjana (S1)</option>
                    <option value="Pesantren">Pondok Pesantren</option>
                    <option value="Other">Lainnya (Tuliskan)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Tahun Kelulusan</label>
                  <input type="text" name="tahun_kelulusan" placeholder="Contoh: 2024" className="form-control" value={formData.tahun_kelulusan} onChange={handleChange} required />
                </div>
              </div>

              {showPendidikanOther && (
                <div className="form-group">
                  <label className="form-label">Tuliskan Pendidikan Terakhir Lainnya</label>
                  <input type="text" name="pendidikan_other" className="form-control" value={formData.pendidikan_other} onChange={handleChange} required />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Jumlah Hafalan Saat Ini (Juz)</label>
                <input type="text" name="jumlah_hafalan" placeholder="Tuliskan angka juz, contoh: 2 Juz, atau 'Belum ada'" className="form-control" value={formData.jumlah_hafalan} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Alasan Masuk Ma'had Tahfidz</label>
                <textarea name="alasan" rows={3} className="form-control" value={formData.alasan} onChange={handleChange} required />
              </div>
            </div>

            {/* Section 4: Data Orang Tua */}
            <div className={styles.sectionBlock}>
              <h3>4. Informasi Orang Tua / Wali</h3>
              
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap Ayah</label>
                  <input type="text" name="nama_ayah" className="form-control" value={formData.nama_ayah} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Pekerjaan Ayah</label>
                  <input type="text" name="pekerjaan_ayah" className="form-control" value={formData.pekerjaan_ayah} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Lengkap Ibu</label>
                  <input type="text" name="nama_ibu" className="form-control" value={formData.nama_ibu} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Pekerjaan Ibu</label>
                  <input type="text" name="pekerjaan_ibu" className="form-control" value={formData.pekerjaan_ibu} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Section 5: Lampiran Dokumen */}
            <div className={styles.sectionBlock}>
              <h3>5. Lampiran Berkas Pernyataan (PDF)</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Silakan cetak dan isi formulir surat izin orang tua dan kesanggupan mahasantri. Tanda tangani, kemudian scan dalam format PDF dengan ukuran maksimal 2MB per file.
              </p>

              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Surat Izin Orang Tua (PDF)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="application/pdf" 
                    onChange={(e) => handleFileChange(e, 'izin')} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Surat Kesiapan Santri (PDF)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="application/pdf" 
                    onChange={(e) => handleFileChange(e, 'kesiapan')} 
                    required 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100" 
              style={{ padding: '1rem', justifyContent: 'center', fontSize: '1.05rem' }}
              disabled={loading}
            >
              {loading ? 'Sedang Mengirim Data Pendaftaran...' : 'Kirim Berkas Pendaftaran'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
