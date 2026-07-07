import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ message: 'Semua input wajib diisi.' }, { status: 400 });
    }

    // Console logging as audit trail / stdout monitoring
    console.log(`📩 New Contact Message Received:
    Name: ${name}
    Email: ${email}
    WhatsApp: ${phone}
    Subject: ${subject}
    Message: ${message}
    `);

    // Save submission to database
    db.insert(schema.contactMessages).values({
      name,
      email,
      phone,
      subject,
      message,
      status: 'UNREAD'
    }).run();
    
    return NextResponse.json({ message: 'Pesan terkirim' }, { status: 200 });

  } catch (error) {
    console.error('API Error submitting contact form:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal.' }, { status: 500 });
  }
}
