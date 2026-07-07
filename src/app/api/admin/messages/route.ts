import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

// GET: Returns all contact messages sorted by createdAt DESC
export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const messages = db.select()
      .from(schema.contactMessages)
      .orderBy(sql`${schema.contactMessages.createdAt} DESC`)
      .all();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('API Error in GET admin messages:', error);
    return NextResponse.json({ message: 'Gagal mengambil data pesan masuk.' }, { status: 500 });
  }
}

// PUT: Updates status or notes of a specific message
export async function PUT(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden. Hanya administrator yang dapat memperbarui status pesan.' }, { status: 403 });
    }

    const { id, status, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'ID pesan wajib disertakan.' }, { status: 400 });
    }

    // Verify message exists
    const message = db.select()
      .from(schema.contactMessages)
      .where(eq(schema.contactMessages.id, id))
      .get();

    if (!message) {
      return NextResponse.json({ message: 'Pesan tidak ditemukan.' }, { status: 404 });
    }

    // Prepare update parameters
    const updateValues: Record<string, any> = {};
    if (status !== undefined) updateValues.status = status;
    if (notes !== undefined) updateValues.notes = notes;

    db.update(schema.contactMessages)
      .set(updateValues)
      .where(eq(schema.contactMessages.id, id))
      .run();

    return NextResponse.json({ message: 'Status pesan berhasil diperbarui!' }, { status: 200 });

  } catch (error) {
    console.error('API Error in PUT admin messages:', error);
    return NextResponse.json({ message: 'Gagal memperbarui data pesan.' }, { status: 500 });
  }
}

// DELETE: Deletes a specific message by its ID
export async function DELETE(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden. Hanya administrator yang dapat menghapus pesan.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '0', 10);

    if (!id) {
      return NextResponse.json({ message: 'ID pesan wajib disertakan.' }, { status: 400 });
    }

    // Verify message exists
    const message = db.select()
      .from(schema.contactMessages)
      .where(eq(schema.contactMessages.id, id))
      .get();

    if (!message) {
      return NextResponse.json({ message: 'Pesan tidak ditemukan.' }, { status: 404 });
    }

    // Delete message
    db.delete(schema.contactMessages)
      .where(eq(schema.contactMessages.id, id))
      .run();

    return NextResponse.json({ message: 'Pesan berhasil dihapus!' }, { status: 200 });

  } catch (error) {
    console.error('API Error in DELETE admin messages:', error);
    return NextResponse.json({ message: 'Gagal menghapus pesan.' }, { status: 500 });
  }
}
