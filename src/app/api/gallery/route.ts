import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

// GET: Returns all gallery items joined with media table
export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const items = db.select({
      id: schema.galleryItems.id,
      type: schema.galleryItems.type,
      videoUrl: schema.galleryItems.videoUrl,
      mediaId: schema.galleryItems.mediaId,
      filePath: schema.media.filePath,
      fileName: schema.media.fileName,
      fileSize: schema.media.fileSize,
      caption: schema.galleryItems.caption,
      createdAt: schema.galleryItems.createdAt
    })
      .from(schema.galleryItems)
      .leftJoin(schema.media, eq(schema.galleryItems.mediaId, schema.media.id))
      .orderBy(sql`${schema.galleryItems.createdAt} DESC`)
      .all();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('API Error in GET gallery:', error);
    return NextResponse.json({ message: 'Gagal mengambil data galeri' }, { status: 500 });
  }
}

// POST: Handles photo upload (up to 5MB) or YouTube URL insertion
export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden. Hanya administrator yang dapat menambah media galeri.' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ message: 'Mime Type must be multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();
    const type = formData.get('type') as 'PHOTO' | 'VIDEO';
    const caption = formData.get('caption') as string || null;

    if (type === 'PHOTO') {
      const file = formData.get('file') as File | null;

      if (!file || file.size === 0) {
        return NextResponse.json({ message: 'File foto tidak valid atau kosong.' }, { status: 400 });
      }

      // Check size limit: max 10 MB (10 * 1024 * 1024 bytes)
      const maxSizeBytes = 10 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return NextResponse.json({ message: 'Ukuran file foto melebihi batas maksimal (maks 10 MB).' }, { status: 400 });
      }

      // Read file buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Ensure uploads directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique name
      const ext = path.extname(file.name);
      const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9]/g, '_');
      const uniqueName = `gallery-${Date.now()}-${baseName}${ext}`;
      const fullPath = path.join(uploadDir, uniqueName);

      // Write physical file
      fs.writeFileSync(fullPath, buffer);
      const filePath = `/uploads/${uniqueName}`;

      // Insert media record first
      const mediaResult = db.insert(schema.media).values({
        fileName: file.name,
        filePath,
        fileSize: file.size,
        mimeType: file.type,
        folder: 'gallery'
      }).run();

      // Retrieve inserted media row id
      const lastInsertIdResult = db.select({ id: schema.media.id })
        .from(schema.media)
        .where(eq(schema.media.filePath, filePath))
        .get();

      if (!lastInsertIdResult) {
        return NextResponse.json({ message: 'Gagal mencatat metadata foto.' }, { status: 500 });
      }

      // Insert gallery item record
      db.insert(schema.galleryItems).values({
        type: 'PHOTO',
        mediaId: lastInsertIdResult.id,
        videoUrl: null,
        caption: caption || null
      }).run();

      return NextResponse.json({ message: 'Foto galeri berhasil diunggah!' }, { status: 200 });

    } else if (type === 'VIDEO') {
      const videoUrl = formData.get('videoUrl') as string;

      if (!videoUrl || !videoUrl.trim()) {
        return NextResponse.json({ message: 'Link URL video YouTube wajib diisi.' }, { status: 400 });
      }

      // Clean YouTube Link (Convert standard watch urls to embed if possible)
      let cleanedUrl = videoUrl.trim();
      if (cleanedUrl.includes('youtube.com/watch?v=')) {
        const videoId = cleanedUrl.split('v=')[1]?.split('&')[0];
        if (videoId) cleanedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (cleanedUrl.includes('youtu.be/')) {
        const videoId = cleanedUrl.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) cleanedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      // Insert gallery item
      db.insert(schema.galleryItems).values({
        type: 'VIDEO',
        mediaId: null,
        videoUrl: cleanedUrl,
        caption: caption || null
      }).run();

      return NextResponse.json({ message: 'Link Video YouTube berhasil ditambahkan!' }, { status: 200 });
    } else if (type === 'INSTAGRAM') {
      const videoUrl = formData.get('videoUrl') as string;

      if (!videoUrl || !videoUrl.trim()) {
        return NextResponse.json({ message: 'Link URL Instagram feed/reels wajib diisi.' }, { status: 400 });
      }

      // Convert standard Instagram link to clean iframe embed link
      let cleanedUrl = videoUrl.trim();
      // Remove trailing slash if present to make parsing consistent
      if (cleanedUrl.endsWith('/')) {
        cleanedUrl = cleanedUrl.slice(0, -1);
      }

      // Extract shortcode (post/reel id) from URL
      // Formats: instagram.com/p/SHORTCODE, instagram.com/reel/SHORTCODE, instagram.com/tv/SHORTCODE
      const matches = cleanedUrl.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9-_]+)/i);
      if (matches && matches[2]) {
        cleanedUrl = `https://www.instagram.com/p/${matches[2]}/embed`;
      } else {
        // Fallback or append /embed if not already ending with it
        if (!cleanedUrl.endsWith('/embed')) {
          cleanedUrl = `${cleanedUrl}/embed`;
        }
      }

      // Insert gallery item as type INSTAGRAM
      db.insert(schema.galleryItems).values({
        type: 'INSTAGRAM',
        mediaId: null,
        videoUrl: cleanedUrl,
        caption: caption || null
      }).run();

      return NextResponse.json({ message: 'Link Instagram berhasil ditambahkan!' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Tipe galeri tidak didukung.' }, { status: 400 });

  } catch (error) {
    console.error('API Error in POST gallery:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan sistem internal.' }, { status: 500 });
  }
}

// DELETE: Deletes gallery item and physical file if photo
export async function DELETE(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden. Hanya administrator yang dapat menghapus media galeri.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '0', 10);

    if (!id) {
      return NextResponse.json({ message: 'ID media galeri wajib diisi.' }, { status: 400 });
    }

    // Retrieve gallery item details
    const item = db.select()
      .from(schema.galleryItems)
      .where(eq(schema.galleryItems.id, id))
      .get();

    if (!item) {
      return NextResponse.json({ message: 'Media galeri tidak ditemukan.' }, { status: 404 });
    }

    // Delete gallery item row first to satisfy foreign key constraints
    db.delete(schema.galleryItems).where(eq(schema.galleryItems.id, id)).run();

    // If photo, delete physical file and media record second
    if (item.type === 'PHOTO' && item.mediaId) {
      const mediaItem = db.select()
        .from(schema.media)
        .where(eq(schema.media.id, item.mediaId))
        .get();

      if (mediaItem) {
        // Delete physical file
        try {
          const fullPath = path.join(process.cwd(), 'public', mediaItem.filePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        } catch (err) {
          console.warn('Physical file deletion warning in gallery delete:', err);
        }

        // Delete database media row
        db.delete(schema.media).where(eq(schema.media.id, item.mediaId)).run();
      }
    }

    return NextResponse.json({ message: 'Media galeri berhasil dihapus!' }, { status: 200 });

  } catch (error) {
    console.error('API Error in DELETE gallery:', error);
    return NextResponse.json({ message: 'Gagal menghapus media galeri.' }, { status: 500 });
  }
}
