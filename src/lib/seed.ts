import { db } from './db';
import * as schema from './schema';
import { hashPassword } from './crypto';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Seed Users
    console.log('👤 Seeding users...');
    const seededUsers = [
      {
        name: 'Super Admin Bani Sulaiman',
        email: 'superadmin@banisulaiman.or.id',
        passwordHash: hashPassword('adminpass123'),
        role: 'SUPER_ADMIN',
      },
      {
        name: 'Admin Bani Sulaiman',
        email: 'admin@banisulaiman.or.id',
        passwordHash: hashPassword('adminpass123'),
        role: 'ADMIN',
      },
      {
        name: 'Editor Bani Sulaiman',
        email: 'editor@banisulaiman.or.id',
        passwordHash: hashPassword('editorpass123'),
        role: 'EDITOR',
      },
      {
        name: 'Author Bani Sulaiman',
        email: 'author@banisulaiman.or.id',
        passwordHash: hashPassword('authorpass123'),
        role: 'AUTHOR',
      },
    ];

    for (const u of seededUsers) {
      const existing = db.select().from(schema.users).where(sql`email = ${u.email}`).get();
      if (!existing) {
        db.insert(schema.users).values(u).run();
      }
    }

    // 2. Seed Site Settings
    console.log('⚙️ Seeding site settings...');
    const settings = {
      school_name: 'Ma\'had Tahfidz Bani Sulaiman',
      school_tagline: 'Pondok Pesantren Tahfidz Al-Quran dan Pembelajaran Bahasa Arab',
      school_address: 'Masjid Bani Sulaiman, Jl. Dago Pojok Tanggulan, Gg. 6, Cikalapa II RT 09 RW 03, Kel. Dago, Kec. Coblong, Kota Bandung, Jawa Barat 40135',
      school_email: 'admin@banisulaiman.or.id',
      school_phone_1: '+62 851-8321-2024',
      school_phone_2: '+62 815-7201-4321',
      school_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d472.0371105305936!2d107.61544543400078!3d-6.867006947296926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6e0b29aeb69%3A0x33acbf46ca35a161!2sMasjid%20Bani%20Sulaiman!5e0!3m2!1sid!2sid!4v1736053625572!5m2!1sid!2sid',
      school_whatsapp_pendaftaran: 'https://wa.me/6281572014321?text=Daftar_MBS_2025',
      
      site_history: `Diawali dari sebuah mimpi, harapan dan doa dari Keluarga Besar Eman Sulaiman yang ingin berkontribusi untuk umat dan bernilai ibadah di hadapan Allah.\n\nHarapan yang besar untuk mampu menebar kebaikan dan memberi manfaat bagi umat. Kami mencoba mewujudakan harapan dengan mulai berkiprah melalui kegiatan dakwah, pendidikan, pelatihan, kesehatan dan sosial.\n\nBismillah.. mulai dari pembangunan Masjid Bani Sulaiman tahun 2016. Setelah proses pembangunan berjalan, alhamdulillah, pada tanggal 20 Mei 2017 Masjid sudah berdiri dan diresmikan oleh H Oded M. Danial sebagai Wakil Walikota Bandung. Kehadiran masjid memberikan energi bagi kami untuk lebih memberikan manfaat dan keberkahan.\n\nSelanjutnya, di Bulan Juli 2022 kami wujudkan harapan, dengan mendirikan Ma’had Tahfizh Al-Qur'an dan Pendidikan Bahasa Arab. Kehadiran Ma’had Tahfizh Al-Qur'an sebagai upaya untuk mendidik dan membina generasi penghapal Al-Qur'an yang mampu menguasai Bahasa Arab dan mampu mengamalkannya dalam kehidupan sehari-hari.\n\nKami hadir di daerah Dago, Bandung Utara. Lingkungan yang asri, udara yang sejuk dan segar di tambah suara burung-burung dan gemericik air. Suasana yang tenang dan damai untuk belajar Al-Qur'an serta berlomba–lomba dalam menebar kebaikan. Fastabiqul Khairat.`,
      
      site_vision: 'Menjadi lembaga pendidikan yang menjadi pusat keunggulan dalam pembelajaran, pengajaran, dan pengamalan Al-Qur\'an, serta menjadi inspirasi bagi masyarakat dalam meningkatkan pemahaman dan kecintaan terhadap kitab suci Islam.',
      
      site_mission: JSON.stringify([
        'Mengajarkan dan membimbing para santri untuk memahami, menghafal, dan mengamalkan isi Al-Qur\'an dengan baik dan benar sesuai dengan ajaran Islam.',
        'Mengembangkan metode pembelajaran yang inovatif dan efektif untuk memfasilitasi proses pembelajaran Al-Qur\'an yang menyenangkan dan bermakna.',
        'Mendorong pengembangan keterampilan membaca, menulis, dan memahami bahasa Arab bagi para santri guna memperdalam pemahaman terhadap teks Al-Qur’an.',
        'Memfasilitasi pengalaman praktis dalam mengaplikasikan nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari melalui program-program pembinaan karakter dan kegiatan sosial.',
        'Menyediakan sarana dan prasarana yang memadai untuk mendukung pembelajaran Al-Qur\'an, termasuk perpustakaan khusus, ruang belajar yang nyaman, dan fasilitas teknologi yang mendukung.',
        'Membangun jaringan kerjasama dengan lembaga-lembaga terkait dan masyarakat untuk memperluas cakupan dan aksesibilitas pendidikan Al-Qur\'an yang berkualitas.'
      ]),
      
      stats_students: '45',
      stats_teachers: '6',
      stats_alumni: '120',
      stats_buildings: '2',
      
      // SEO defaults
      seo_meta_title: 'Ma\'had Tahfidz Bani Sulaiman - Bandung',
      seo_meta_description: 'Pondok Pesantren Tahfidz Al-Quran dan Pembelajaran Bahasa Arab di Dago, Bandung Utara.',
      seo_og_image: '/images/logo.jpg',
    };

    for (const [key, val] of Object.entries(settings)) {
      const existing = db.select().from(schema.siteSettings).where(sql`key = ${key}`).get();
      if (!existing) {
        db.insert(schema.siteSettings).values({ key, value: val }).run();
      } else {
        db.update(schema.siteSettings).set({ value: val }).where(sql`key = ${key}`).run();
      }
    }

    // 3. Seed Programs
    console.log('📚 Seeding programs...');
    const seededPrograms = [
      {
        title: 'Program Tahfidz Al-Qur\'an',
        description: 'Menghafal Al-Qur\'an 30 Juz secara mutqin dengan kurikulum terstruktur dan metode muraja\'ah teruji.',
        curriculum: 'Tahsin Tilawah, Menghafal Al-Qur\'an 30 Juz, Muraja\'ah Mingguan, Ujian Juz secara periodik.',
        duration: '2 Tahun',
        isOpen: true,
      },
      {
        title: 'Program Pendidikan Bahasa Arab',
        description: 'Pembelajaran komprehensif struktur bahasa Arab untuk mendukung pemahaman tafsir dan Al-Qur\'an.',
        curriculum: 'Nahwu (Tata Bahasa), Sharaf (Morfologi), Balaghah (Sastra), Muhadatsah (Percakapan sehari-hari).',
        duration: '1 Tahun',
        isOpen: true,
      },
      {
        title: 'Program Tambahan & Kajian Rutin',
        description: 'Pembekalan karakter kepemimpinan, kepribadian Islami, dan pelatihan keterampilan kemandirian.',
        curriculum: 'Kajian Kitab Akhlak, Fiqih Ibadah, Dauroh Ilmiah, Pelatihan Keterampilan Komputer & Dakwah.',
        duration: 'Sore/Akhir Pekan',
        isOpen: true,
      },
    ];

    for (const p of seededPrograms) {
      const existing = db.select().from(schema.programs).where(sql`title = ${p.title}`).get();
      if (!existing) {
        db.insert(schema.programs).values(p).run();
      }
    }

    // 4. Seed Teachers & Staff
    console.log('👨‍🏫 Seeding teachers...');
    const seededTeachers = [
      {
        name: 'H. Azis Asmana, Lc, M.Ag',
        position: 'Pembina Pesantren',
        biography: 'Mengampu bidang Fiqih Ibadah, Fiqih Muamalah, Ushul Fiqih, Fiqhud Da\'wah, dan Ulumul Qur\'an.',
        education: 'Lulusan S1 Universitas Islam Madinah & S2 UIN Sunan Gunung Djati Bandung.',
        type: 'TEACHER',
        order: 1,
      },
      {
        name: 'H. Sayid Muhammad Ramdhan, Lc, M.Ag',
        position: 'Mudir Ma\'had',
        biography: 'Mengampu bidang Akhlak dan Bahasa Arab (Muhadatsah / Hiwar).',
        education: 'Lulusan S1 Universitas Al-Azhar Kairo & S2 UIN Sunan Gunung Djati Bandung.',
        type: 'TEACHER',
        order: 2,
      },
      {
        name: 'H. Irwan Kurniawan, Lc, Dipl, M. Ed.',
        position: 'Staf Kurikulum',
        biography: 'Mengampu bidang Tauhid, Bahasa Arab (Nahwu, Sharaf, Balaghah), dan Mushthalah Hadits.',
        education: 'Lulusan S1 Universitas Islam Madinah & S2 Universitas di Mesir.',
        type: 'TEACHER',
        order: 3,
      },
      {
        name: 'Sandi Nugraha, S.Ag',
        position: 'Bagian Kesantrian',
        biography: 'Mengampu bimbingan Tahfidz, Tahsin Tilawah, dan kedisiplinan asrama santri.',
        education: 'Lulusan S1 Sarjana Agama Islam.',
        type: 'TEACHER',
        order: 4,
      },
      {
        name: 'Drs. H. Dadi Iskandar, MM',
        position: 'Pembina Yayasan',
        biography: 'Pembina utama dan pengarah manajemen Yayasan Bani Sulaiman.',
        education: 'Magister Manajemen.',
        type: 'FOUNDATION_BOARD',
        order: 1,
      },
      {
        name: 'H. Olih Solihin',
        position: 'Pendiri Yayasan',
        biography: 'Pendiri utama Yayasan Bani Sulaiman dan pemberi arah misi sosial-dakwah.',
        education: 'Tokoh Masyarakat.',
        type: 'FOUNDATION_BOARD',
        order: 2,
      },
      {
        name: 'Ipan Pahrudin, A.KS',
        position: 'Sekretaris Yayasan',
        biography: 'Mengatur administrasi legalitas, surat-menyurat, serta operasional kesekretariatan yayasan.',
        education: 'Ahli Kesejahteraan Sosial.',
        type: 'FOUNDATION_BOARD',
        order: 3,
      },
    ];

    for (const t of seededTeachers) {
      const existing = db.select().from(schema.teachers).where(sql`name = ${t.name}`).get();
      if (!existing) {
        db.insert(schema.teachers).values(t).run();
      }
    }

    // 5. Seed Donation Programs
    console.log('💝 Seeding donation programs...');
    const seededDonations = [
      {
        title: 'Pembangunan & Operasional Pesantren',
        description: 'Dukungan perluasan asrama, pemeliharaan Masjid Bani Sulaiman, serta kebutuhan pangan harian santri huffazh.',
        targetAmount: 500000000,
        raisedAmount: 75000000,
        isActive: true,
      },
      {
        title: 'Beasiswa Penuh Penghafal Al-Qur\'an',
        description: 'Sponsori beasiswa penuh biaya pendidikan, kitab, asrama, dan ujian kelayakan bagi santri ikhwan ber.',
        targetAmount: 150000000,
        raisedAmount: 42000000,
        isActive: true,
      },
    ];

    for (const d of seededDonations) {
      const existing = db.select().from(schema.donationPrograms).where(sql`title = ${d.title}`).get();
      if (!existing) {
        db.insert(schema.donationPrograms).values(d).run();
      }
    }

    console.log('✅ Database successfully seeded!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Helpers for sqlite matching (drizzle sql template literal)
import { sql } from 'drizzle-orm';

seed();
