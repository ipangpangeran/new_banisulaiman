import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, and, like, sql } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

// GET: Returns list of media items with support for search and folder filtering
export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q') || '';
    const folder = searchParams.get('folder') || 'ALL';

    const conditions = [];
    if (search) {
      conditions.push(like(schema.media.fileName, `%${search}%`));
    }
    if (folder !== 'ALL') {
      conditions.push(eq(schema.media.folder, folder));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const list = db.select()
      .from(schema.media)
      .where(whereClause)
      .orderBy(sql`created_at DESC`)
      .all();

    return NextResponse.json(list, { status: 200 });

  } catch (error) {
    console.error('API Error in media GET:', error);
    return NextResponse.json({ message: 'Failed to fetch media list' }, { status: 500 });
  }
}

// POST: Handles file uploads & inserts metadata
export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    
    // Check if it is a delete action sent via POST (for fallback simplicity)
    const action = formData.get('action') as string;
    if (action === 'delete') {
      const id = parseInt(formData.get('id') as string || '0', 10);
      if (!id) {
        return NextResponse.json({ message: 'ID media wajib diisi.' }, { status: 400 });
      }

      // Check if admin or editor
      if (session.role === 'AUTHOR') {
        return NextResponse.json({ message: 'Hanya Admin atau Editor yang dapat menghapus media.' }, { status: 403 });
      }

      // Find file path
      const mediaItem = db.select().from(schema.media).where(eq(schema.media.id, id)).get();
      if (!mediaItem) {
        return NextResponse.json({ message: 'Media tidak ditemukan.' }, { status: 404 });
      }

      // Delete physical file
      try {
        const fullPath = path.join(process.cwd(), 'public', mediaItem.filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      } catch (err) {
        console.warn('Physical file deletion warning:', err);
      }

      // Delete database record
      db.delete(schema.media).where(eq(schema.media.id, id)).run();

      return NextResponse.json({ message: 'Media berhasil dihapus!' }, { status: 200 });
    }

    // Otherwise, parse upload files
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string || 'general';

    if (!file || file.size === 0) {
      return NextResponse.json({ message: 'File tidak valid atau kosong.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Ensure target folder exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean filename
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9]/g, '_');
    const uniqueName = `${Date.now()}-${baseName}${ext}`;
    const fullPath = path.join(uploadDir, uniqueName);
    
    // Save to disk
    fs.writeFileSync(fullPath, buffer);
    const filePath = `/uploads/${uniqueName}`;

    // Insert metadata record to database
    db.insert(schema.media).values({
      fileName: file.name,
      filePath,
      fileSize: file.size,
      mimeType: file.type,
      folder,
    }).run();

    return NextResponse.json({ message: 'Upload berhasil!', path: filePath }, { status: 200 });

  } catch (error) {
    console.error('API Error in media POST:', error);
    return NextResponse.json({ message: 'Gagal mengupload berkas ke server.' }, { status: 500 });
  }
}
