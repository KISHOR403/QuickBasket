import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_USER,
  ADMIN_CREDENTIALS,
  createSessionToken,
  AdminUser,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, email, password, role, storeId } = body;

    const inputIdentifier = (username || email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();

    // Check credentials against the required admin username/email and password
    const isIdentifierValid =
      inputIdentifier === ADMIN_CREDENTIALS.username.toLowerCase() ||
      inputIdentifier === ADMIN_CREDENTIALS.email.toLowerCase();

    const isPasswordValid = inputPassword === ADMIN_CREDENTIALS.password;

    if (!isIdentifierValid || !isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid administrator credentials. Username: kishorgogoi, Password: Moikun@0',
        },
        { status: 401 }
      );
    }

    const user: AdminUser = {
      ...DEFAULT_ADMIN_USER,
      name: 'kishorgogoi',
      email: ADMIN_CREDENTIALS.email,
      role: role || DEFAULT_ADMIN_USER.role,
      storeId: storeId || DEFAULT_ADMIN_USER.storeId,
    };

    const token = createSessionToken(user);

    cookies().set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication processing failed' },
      { status: 500 }
    );
  }
}
