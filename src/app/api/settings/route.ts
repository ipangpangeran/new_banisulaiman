import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql, eq } from 'drizzle-orm';
import { getRequestSession } from '@/lib/auth';

// GET: Returns settings as an object of key-value
export async function GET(req: NextRequest) {
  try {
    const list = db.select().from(schema.siteSettings).all();
    const settingsObj: Record<string, string> = {};
    list.forEach((s) => {
      settingsObj[s.key] = s.value;
    });
    return NextResponse.json(settingsObj, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve settings.' }, { status: 500 });
  }
}

// POST: Updates site settings (restricted to authenticated admins)
export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden. Hanya administrator yang dapat mengubah pengaturan umum.' }, { status: 403 });
    }

    const payload = await req.json();

    // Iterate through key-values and update/insert
    for (const [key, value] of Object.entries(payload)) {
      if (typeof value !== 'string') continue;
      
      const existing = db.select().from(schema.siteSettings).where(eq(schema.siteSettings.key, key)).get();
      if (existing) {
        db.update(schema.siteSettings)
          .set({ value })
          .where(eq(schema.siteSettings.key, key))
          .run();
      } else {
        db.insert(schema.siteSettings)
          .values({ key, value })
          .run();
      }
    }

    return NextResponse.json({ message: 'Pengaturan website berhasil diperbarui!' }, { status: 200 });

  } catch (error) {
    console.error('API Error updating settings:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan sistem internal.' }, { status: 500 });
  }
}
