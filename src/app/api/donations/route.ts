import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

// GET: Fetch all donation reports and programs for the admin panel
export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch reports
    const reports = db.select()
      .from(schema.donationReports)
      .orderBy(sql`${schema.donationReports.date} DESC`)
      .all();

    // Fetch active programs
    const programs = db.select()
      .from(schema.donationPrograms)
      .where(eq(schema.donationPrograms.isActive, true))
      .all();

    return NextResponse.json({ reports, programs }, { status: 200 });
  } catch (error) {
    console.error('API Error in GET donations:', error);
    return NextResponse.json({ message: 'Gagal mengambil data donasi' }, { status: 500 });
  }
}

// POST: Add a new donation report
export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { donorName, amount, date, status, notes, programId, paymentMethod } = body;

    if (!donorName || !amount) {
      return NextResponse.json({ message: 'Nama donatur dan jumlah donasi wajib diisi.' }, { status: 400 });
    }

    // Insert record
    db.insert(schema.donationReports).values({
      donorName,
      amount: parseInt(amount, 10),
      date: date ? new Date(date) : new Date(),
      status: status || 'VERIFIED',
      paymentMethod: paymentMethod || 'TRANSFER',
      notes: notes || null,
      programId: programId ? parseInt(programId, 10) : null
    }).run();

    return NextResponse.json({ message: 'Donasi berhasil ditambahkan!' }, { status: 200 });
  } catch (error) {
    console.error('API Error in POST donations:', error);
    return NextResponse.json({ message: 'Gagal menambahkan donasi' }, { status: 500 });
  }
}

// PUT: Edit an existing donation report
export async function PUT(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, donorName, amount, date, status, notes, programId, paymentMethod } = body;

    if (!id || !donorName || !amount) {
      return NextResponse.json({ message: 'ID, Nama donatur, dan jumlah donasi wajib diisi.' }, { status: 400 });
    }

    db.update(schema.donationReports)
      .set({
        donorName,
        amount: parseInt(amount, 10),
        date: date ? new Date(date) : new Date(),
        status: status || 'VERIFIED',
        paymentMethod: paymentMethod || 'TRANSFER',
        notes: notes || null,
        programId: programId ? parseInt(programId, 10) : null
      })
      .where(eq(schema.donationReports.id, parseInt(id, 10)))
      .run();

    return NextResponse.json({ message: 'Donasi berhasil diperbarui!' }, { status: 200 });
  } catch (error) {
    console.error('API Error in PUT donations:', error);
    return NextResponse.json({ message: 'Gagal memperbarui donasi' }, { status: 500 });
  }
}

// DELETE: Remove an existing donation report
export async function DELETE(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID donasi wajib disertakan.' }, { status: 400 });
    }

    db.delete(schema.donationReports)
      .where(eq(schema.donationReports.id, parseInt(id, 10)))
      .run();

    return NextResponse.json({ message: 'Donasi berhasil dihapus!' }, { status: 200 });
  } catch (error) {
    console.error('API Error in DELETE donations:', error);
    return NextResponse.json({ message: 'Gagal menghapus donasi' }, { status: 500 });
  }
}
