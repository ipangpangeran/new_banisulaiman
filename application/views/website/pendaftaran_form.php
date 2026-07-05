<main class="blogs blogssec bg-white our_bogs">

<div class="header">
    <div class="inner-header flex">
        <h1 class="font-judul mt-3">- Registrasi -</h1>
    </div>
    <!--Waves Container-->
    <div>
        <svg class="waves" xmlns="loginhttp://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
    </div>
    <!--Waves end-->
</div>

<div class="container mt-5">
    <div class="card shadow-lg">
        <div class="card-header bg-form text-white">
            <h3 class="text-center">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ</h3>
            <h4 class="text-center">Form Pendaftaran Calon Mahasantri</h4>
        </div>
        <div class="card-body">
            <?php 
                if ($this->session->flashdata('success')): ?>
                <div class="alert alert-success" id="flash-message"><?= $this->session->flashdata('success'); ?></div>
            <?php elseif ($this->session->flashdata('error')): ?>
                <div class="alert alert-danger" id="flash-message"><?= $this->session->flashdata('error'); ?></div>
            <?php endif; ?>

            <?= form_open_multipart('pendaftaran/submit'); ?>
            
            <div class="mb-3">
                <label class="form-label font_label">Nama Lengkap</label>
                <input type="text" name="nama" class="form-control" value="<?= set_value('nama'); ?>">
                <?= form_error('nama', '<small class="text-danger">', '</small>'); ?>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Tempat, Tanggal Lahir</label>
                <input type="text" name="tempat_tanggal_lahir" class="form-control" placeholder="Jakarta, 17-08-1945" value="<?= set_value('tempat_tanggal_lahir'); ?>">
                <?= form_error('tempat_tanggal_lahir', '<small class="text-danger">', '</small>'); ?>
            </div>    
            
            <div class="mb-3">
                <label class="form-label font_label">Usia</label>
                <input type="number" name="usia" class="form-control" value="<?= set_value('usia'); ?>">
                <?= form_error('usia', '<small class="text-danger">', '</small>'); ?>
            </div>
                        
            <div class="mb-3">
                <label class="form-label font_label">Alamat Sesuai KTP</label>
                <input type="text" name="alamat_lengkap" class="form-control" value="<?= set_value('alamat_lengkap'); ?>">
                <?= form_error('alamat_lengkap', '<small class="text-danger">', '</small>'); ?>
            </div>
                                    
            <div class="mb-3">
                <label class="form-label font_label">Alamat Domisili</label>
                <input type="text" name="alamat_domisili" class="form-control" value="<?= set_value('alamat_domisili'); ?>">
                <?= form_error('alamat_domisili', '<small class="text-danger">', '</small>'); ?>
            </div>
            
            <div class="mb-3">
                <label class="form-label font_label">Status Perkawinan</label>
                <select name="status_perkawinan" class="form-control">
                    <option value="Sudah" <?= set_select('status_perkawinan', 'Sudah'); ?>>Sudah</option>
                    <option value="Belum" <?= set_select('status_perkawinan', 'Belum'); ?>>Belum</option>
                </select>
            </div>
            
            <div class="mb-3">
                <label class="form-label font_label">Program</label>
                <select name="program" class="form-control">
                    <option value="Beasiswa" <?= set_select('program', 'Beasiswa'); ?>>Beasiswa</option>
                    <option value="Karantina" <?= set_select('program', 'Karantina'); ?>>Karantina</option>
                    <option value="Ma'had Ilmi" <?= set_select('program', "Ma'had Ilmi"); ?>>Ma'had Ilmi</option>
                </select>
            </div>
            
            <div class="mb-3">
                <label class="form-label font_label">Aktivitas</label>
                <div>
                    <input type="radio" name="aktivitas" value="Kerja" <?= set_radio('aktivitas', 'Kerja'); ?>> Kerja
                    <input type="radio" name="aktivitas" value="Kuliah" <?= set_radio('aktivitas', 'Kuliah'); ?>> Kuliah
                    <input type="radio" name="aktivitas" value="Sekolah" <?= set_radio('aktivitas', 'Sekolah'); ?>> Sekolah
                    <input type="radio" name="aktivitas" value="Other" <?= set_radio('aktivitas', 'Other'); ?> onclick="toggleInput('aktivitas_other', true)"> Other
                    <input type="text" name="aktivitas_other" id="aktivitas_other" class="form-control mt-2" placeholder="Masukkan aktivitas lain..." style="display: none;">
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">No HP / WA</label>
                <input type="text" name="no_hp" class="form-control" value="<?= set_value('no_hp'); ?>">
                <?= form_error('no_hp', '<small class="text-danger">', '</small>'); ?>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Email</label>
                <input type="text" name="email" class="form-control" value="<?= set_value('email'); ?>">
                <?= form_error('email', '<small class="text-danger">', '</small>'); ?>
            </div>
            
            <div class="mb-3">
                <label class="form-label font_label">Pendidikan Terakhir</label>
                <div>
                    <input type="radio" name="pendidikan_terakhir" value="Kuliah" <?= set_radio('pendidikan_terakhir', 'Kuliah'); ?>> Kuliah
                    <input type="radio" name="pendidikan_terakhir" value="SMA" <?= set_radio('pendidikan_terakhir', 'SMA'); ?>> SMA
                    <input type="radio" name="pendidikan_terakhir" value="SMP" <?= set_radio('pendidikan_terakhir', 'SMP'); ?>> SMP
                    <input type="radio" name="pendidikan_terakhir" value="Pesantren" <?= set_radio('pendidikan_terakhir', 'Pesantren'); ?>> Pesantren
                    <input type="radio" name="pendidikan_terakhir" value="Other" <?= set_radio('pendidikan_terakhir', 'Other'); ?> onclick="toggleInput('pendidikan_other', true)"> Other
                    <input type="text" name="pendidikan_other" id="pendidikan_other" class="form-control mt-2" placeholder="Masukkan pendidikan lain..." style="display: none;">
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Tahun Kelulusan</label>
                <input type="text" name="tahun_kelulusan" class="form-control" value="<?= set_value('tahun_kelulusan'); ?>">
                <?= form_error('tahun_kelulusan', '<small class="text-danger">', '</small>'); ?>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Jumlah Hafalan (Juz)</label>
                <input type="text" name="jumlah_hafalan" class="form-control" value="<?= set_value('jumlah_hafalan'); ?>">
                <?= form_error('jumlah_hafalan', '<small class="text-danger">', '</small>'); ?>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Nama Ayah</label>
                <input type="text" name="nama_ayah" class="form-control" value="<?= set_value('nama_ayah'); ?>">
                <?= form_error('nama_ayah', '<small class="text-danger">', '</small>'); ?>
            </div>
            
            <div class="mb-3">
                <label class="form-label font_label">Pekerjaan Ayah</label>
                <input type="text" name="pekerjaan_ayah" class="form-control" value="<?= set_value('pekerjaan_ayah'); ?>">
                <?= form_error('pekerjaan_ayah', '<small class="text-danger">', '</small>'); ?>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Nama Ibu</label>
                <input type="text" name="nama_ibu" class="form-control" value="<?= set_value('nama_ibu'); ?>">
                <?= form_error('nama_ibu', '<small class="text-danger">', '</small>'); ?>
            </div>
            
            <div class="mb-3">
                <label class="form-label font_label">Pekerjaan Ibu</label>
                <input type="text" name="pekerjaan_ibu" class="form-control" value="<?= set_value('pekerjaan_ibu'); ?>">
                <?= form_error('pekerjaan_ibu', '<small class="text-danger">', '</small>'); ?>
            </div>
                        
            <div class="mb-3">
                <label class="form-label font_label">Alasan Masuk Ma'had</label>
                <input type="text" name="alasan" class="form-control" value="<?= set_value('alasan'); ?>">
                <?= form_error('alasan', '<small class="text-danger">', '</small>'); ?>
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Surat Izin Orang Tua (PDF)</label>
                <input type="file" name="surat_izin_ortu" class="form-control" accept=".pdf">
            </div>

            <div class="mb-3">
                <label class="form-label font_label">Surat Kesiapan (PDF)</label>
                <input type="file" name="surat_kesiapan" class="form-control" accept=".pdf">
            </div>

            <button type="submit" class="btn btn-form w-100">Daftar</button>

            <?= form_close(); ?>
        </div>
    </div>
</div>

<script>
    setTimeout(function() {
        let flashMessage = document.getElementById('flash-message');
        if (flashMessage) {
            flashMessage.style.display = 'none';
        }
    }, 3000);

    // Hapus flash message dari session setelah ditampilkan
    window.onload = function() {
        <?php $this->session->set_flashdata('success', null); ?>
        <?php $this->session->set_flashdata('error', null); ?>
    };

    function toggleInput(id, show) {
        document.getElementById(id).style.display = show ? 'block' : 'none';
    }
</script>

</main>
