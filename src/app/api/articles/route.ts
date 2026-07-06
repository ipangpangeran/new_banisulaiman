import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const articles = db.select({
      id: schema.articles.id,
      title: schema.articles.title,
      slug: schema.articles.slug,
      summary: schema.articles.summary,
      status: schema.articles.status,
      publishDate: schema.articles.publishDate,
      categoryName: schema.categories.name,
    })
      .from(schema.articles)
      .leftJoin(schema.categories, eq(schema.articles.categoryId, schema.categories.id))
      .all();
      
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authorize session
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized. Silakan login kembali.' }, { status: 401 });
    }

    const payload = await req.json();
    const { action, id, title, slug, summary, content, categoryId, status } = payload;

    // 2. CREATE ARTICLE
    if (action === 'create') {
      if (!title || !slug || !content) {
        return NextResponse.json({ message: 'Judul, slug, dan isi konten wajib diisi.' }, { status: 400 });
      }

      // Check if slug is unique
      const existing = db.select().from(schema.articles).where(eq(schema.articles.slug, slug)).get();
      if (existing) {
        return NextResponse.json({ message: 'Slug URL sudah digunakan oleh artikel lain.' }, { status: 400 });
      }

      db.insert(schema.articles).values({
        title,
        slug,
        summary: summary || title.substring(0, 100) + '...',
        content,
        categoryId: categoryId ? parseInt(categoryId, 10) : null,
        status: status || 'DRAFT',
        authorId: session.userId,
      }).run();

      return NextResponse.json({ message: 'Artikel berhasil dibuat!' }, { status: 200 });
    }

    // 3. UPDATE ARTICLE
    if (action === 'update') {
      if (!id || !title || !slug || !content) {
        return NextResponse.json({ message: 'ID, judul, slug, dan isi konten wajib diisi.' }, { status: 400 });
      }

      // Check if slug conflicts with another post
      const conflicting = db.select()
        .from(schema.articles)
        .where(and(eq(schema.articles.slug, slug), eq(schema.articles.id, id)))
        .get();
      
      const slugExists = db.select().from(schema.articles).where(eq(schema.articles.slug, slug)).get();
      if (slugExists && !conflicting) {
        return NextResponse.json({ message: 'Slug URL sudah digunakan oleh artikel lain.' }, { status: 400 });
      }

      db.update(schema.articles).set({
        title,
        slug,
        summary: summary || title.substring(0, 100) + '...',
        content,
        categoryId: categoryId ? parseInt(categoryId, 10) : null,
        status: status || 'DRAFT',
        updatedAt: new Date(),
      }).where(eq(schema.articles.id, id)).run();

      return NextResponse.json({ message: 'Artikel berhasil diperbarui!' }, { status: 200 });
    }

    // 4. DELETE ARTICLE
    if (action === 'delete') {
      if (!id) {
        return NextResponse.json({ message: 'ID artikel wajib disertakan.' }, { status: 400 });
      }

      // Strict role check for deletion if needed (Admin & Editor only)
      if (session.role === 'AUTHOR') {
        return NextResponse.json({ message: 'Hanya Administrator atau Editor yang dapat menghapus artikel.' }, { status: 403 });
      }

      db.delete(schema.articles).where(eq(schema.articles.id, id)).run();
      return NextResponse.json({ message: 'Artikel berhasil dihapus!' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Aksi tidak dikenal.' }, { status: 400 });

  } catch (error) {
    console.error('API Error in articles endpoint:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan sistem internal.' }, { status: 500 });
  }
}
