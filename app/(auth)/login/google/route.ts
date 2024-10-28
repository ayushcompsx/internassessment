import { initiateWithGoogle } from '@/src/interface-adapters/controllers/auth/auth.controller';
import { cookies } from 'next/headers';
import { env } from '@/src/config';
export async function GET(): Promise<Response> {
  const { state, codeVerifier, url } = await initiateWithGoogle();
  cookies().set('google_oauth_state', state, {
    path: '/',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax',
  });

  cookies().set('google_code_verifier', codeVerifier, {
    path: '/',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax',
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
