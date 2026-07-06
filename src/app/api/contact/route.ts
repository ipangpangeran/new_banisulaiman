import { NextRequest, NextResponse } from 'next/server';

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

    // In a production server, this endpoint would trigger SMTP/nodemailer
    // or send a Telegram bot / Whatsapp notification.
    
    return NextResponse.json({ message: 'Pesan terkirim' }, { status: 200 });

  } catch (error) {
    console.error('API Error submitting contact form:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal.' }, { status: 500 });
  }
}
