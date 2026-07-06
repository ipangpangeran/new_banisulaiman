import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

// GET: Retrieve all admissions (restricted to logged-in admins)
export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const applications = db.select()
      .from(schema.admissions)
      .orderBy(sql`created_at DESC`)
      .all();
      
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error('API Error fetching admissions:', error);
    return NextResponse.json({ message: 'Failed to fetch admissions' }, { status: 500 });
  }
}

// POST: Handles public registration or admin updates
export async function POST(req: NextRequest) {
  try {
    // Check if it's an admin update request first by trying to parse JSON
    const session = await getRequestSession(req);
    
    // Check Content-Type to see if it's json or multipart
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json') && session) {
      const payload = await req.json();
      const { action, id, status } = payload;
      
      if (action === 'update_status' && id && status) {
        // Strict role validation (admin only)
        if (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN') {
          return NextResponse.json({ message: 'Forbidden. Hanya Admin yang dapat memproses status pendaftaran.' }, { status: 403 });
        }
        
        db.update(schema.admissions)
          .set({ status })
          .where(eq(schema.admissions.id, id))
          .run();
          
        return NextResponse.json({ message: 'Status pendaftaran berhasil diperbarui!' }, { status: 200 });
      }
    }

    // Otherwise, handle public multipart registration form submission
    const formData = await req.formData();

    const fullName = formData.get('nama') as string;
    const birthInfo = formData.get('tempat_tanggal_lahir') as string;
    const age = parseInt(formData.get('usia') as string || '0', 10);
    const ktpAddress = formData.get('alamat_lengkap') as string;
    const domisiliAddress = formData.get('alamat_domisili') as string;
    const maritalStatus = formData.get('status_perkawinan') as string;
    const program = formData.get('program') as string;
    const activity = formData.get('aktivitas') as string;
    const activityOther = formData.get('aktivitas_other') as string || null;
    const phone = formData.get('no_hp') as string;
    const email = formData.get('email') as string;
    const lastEducation = formData.get('pendidikan_terakhir') as string;
    const educationOther = formData.get('pendidikan_other') as string || null;
    const graduationYear = formData.get('tahun_kelulusan') as string;
    const hafalanJuz = formData.get('jumlah_hafalan') as string;
    const fatherName = formData.get('nama_ayah') as string;
    const fatherJob = formData.get('pekerjaan_ayah') as string;
    const motherName = formData.get('nama_ibu') as string;
    const motherJob = formData.get('pekerjaan_ibu') as string;
    const reason = formData.get('alasan') as string;

    if (!fullName || !birthInfo || !phone || !email) {
      return NextResponse.json({ message: 'Mohon isi seluruh data wajib.' }, { status: 400 });
    }

    const suratIzinFile = formData.get('surat_izin_ortu') as File | null;
    const suratKesiapanFile = formData.get('surat_kesiapan') as File | null;

    let suratIzinOrtuPath: string | null = null;
    let suratKesiapanPath: string | null = null;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (suratIzinFile && suratIzinFile.size > 0) {
      const buffer = Buffer.from(await suratIzinFile.arrayBuffer());
      const ext = path.extname(suratIzinFile.name) || '.pdf';
      const cleanName = `${Date.now()}-izin-${fullName.toLowerCase().replace(/[^a-z0-9]/g, '_')}${ext}`;
      const fullPath = path.join(uploadDir, cleanName);
      fs.writeFileSync(fullPath, buffer);
      suratIzinOrtuPath = `/uploads/${cleanName}`;
    }

    if (suratKesiapanFile && suratKesiapanFile.size > 0) {
      const buffer = Buffer.from(await suratKesiapanFile.arrayBuffer());
      const ext = path.extname(suratKesiapanFile.name) || '.pdf';
      const cleanName = `${Date.now()}-kesiapan-${fullName.toLowerCase().replace(/[^a-z0-9]/g, '_')}${ext}`;
      const fullPath = path.join(uploadDir, cleanName);
      fs.writeFileSync(fullPath, buffer);
      suratKesiapanPath = `/uploads/${cleanName}`;
    }

    db.insert(schema.admissions).values({
      fullName,
      birthInfo,
      age,
      ktpAddress,
      domisiliAddress,
      maritalStatus,
      program,
      activity,
      activityOther,
      phone,
      email,
      lastEducation,
      educationOther,
      graduationYear,
      hafalanJuz,
      fatherName,
      fatherJob,
      motherName,
      motherJob,
      reason,
      suratIzinOrtuPath,
      suratKesiapanPath,
      status: 'PENDING',
    }).run();

    return NextResponse.json({ message: 'Pendaftaran berhasil dikirim' }, { status: 200 });

  } catch (error) {
    console.error('API Error in admissions handler:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan sistem internal.' }, { status: 500 });
  }
}
