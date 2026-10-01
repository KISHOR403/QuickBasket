import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, parseSessionToken } from '@/lib/auth';

export async function GET() {
  const cookie = cookies().get(ADMIN_COOKIE_NAME);
  if (!cookie?.value) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const user = parseSessionToken(cookie.value);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  return NextResponse.json({ authenticated: true, user });
}
