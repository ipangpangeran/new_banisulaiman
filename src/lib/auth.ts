import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'secret-key-12345-bani-sulaiman-pesantren-modern'
);

interface JWTSession {
  userId: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Creates and signs a new JWT session token.
 */
export async function createSessionToken(payload: JWTSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // Session valid for 2 hours
    .sign(SECRET_KEY);
}

/**
 * Verifies a JWT token and decodes the payload.
 */
export async function verifySessionToken(token: string): Promise<JWTSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ['HS256']
    });
    return payload as unknown as JWTSession;
  } catch (err) {
    return null;
  }
}

/**
 * Extracts and verifies the session token from cookies of an incoming request.
 */
export async function getRequestSession(req: NextRequest): Promise<JWTSession | null> {
  const token = req.cookies.get('session_token')?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
