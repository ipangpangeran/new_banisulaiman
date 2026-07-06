import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);

    if (!session) {
      return NextResponse.json({ authenticated: false, message: 'Sesi tidak valid atau telah berakhir.' }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: session
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ authenticated: false, message: 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
