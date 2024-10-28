import { cookies } from 'next/headers';
import { handleGoogleCallback } from '@/src/interface-adapters/controllers/auth/auth.controller';
import { OAuthError } from '@/src/entities/errors/auth';
import { env } from '@/src/config';

const OPTIONS = {
  path: '/',
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  maxAge: 60 * 200, // 200 minutes
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  const codeVerifier = cookies().get('google_code_verifier')?.value ?? null;

  if (!code || !state || state !== storedState || !codeVerifier) {
    return new Response('Please restart the process.', { status: 400 });
  }

  try {
    const response = await handleGoogleCallback(code, codeVerifier);
    cookies().set('accessToken', response.accessToken, {
      ...OPTIONS,
      sameSite: 'lax',
    });
    cookies().set('refreshToken', response.refreshToken, {
      ...OPTIONS,
      sameSite: 'lax',
    });
    cookies().set(
      'user',
      JSON.stringify({
        id: response.googleId,
        name: response.name,
        picture: response.picture,
        email: response.email,
      }),
      { ...OPTIONS, sameSite: 'lax', httpOnly: false }
    );
  } catch (err) {
    if (err instanceof OAuthError) {
      return new Response('Please restart the process.', { status: 400 });
    }
  }

  /* CHECK IF USER EXISTS IN YOUR DB WITH THIS CREDS, IF NOT CREATE AND THEN REDIRECT ELSE LOGIN */

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/app',
    },
  });
}
