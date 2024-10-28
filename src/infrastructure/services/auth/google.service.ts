'server-only';
import type { IOAuthService } from '@/src/application/services/authentication.service.interface';
import { OAuthError } from '@/src/entities/errors/auth';
import { Google, generateState, generateCodeVerifier } from 'arctic';
import { env } from '@/src/config';

export class GoogleAuthService implements IOAuthService {
  private client: Google;
  constructor() {
    this.client = new Google(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.APP_URL}/login/google/callback`
    );
  }

  generateState(): string {
    const state = generateState();
    return state;
  }
  codeVerifier(): string {
    const verifier = generateCodeVerifier();
    return verifier;
  }

  async createAuthorizationUrl(
    state: string,
    codeVerifier: string
  ): Promise<URL> {
    const url: URL = await this.client.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ['openid', 'profile', 'email'],
      }
    );
    url.searchParams.set('access_type', 'offline');
    return url;
  }

  async validateCode(
    state: string,
    codeVerifier: string
  ): Promise<{
    accessToken: string;
    refreshToken: string | null;
    idToken: string;
    accessTokenExpiresAt: Date;
  }> {
    const { accessToken, idToken, refreshToken, accessTokenExpiresAt } =
      await this.client.validateAuthorizationCode(state, codeVerifier);

    return {
      accessToken,
      refreshToken,
      idToken,
      accessTokenExpiresAt,
    };
  }
  async refreshAccessToken(
    accessToken: string
  ): Promise<{ accessToken: string; accessTokenExpiresAt: Date }> {
    try {
      const tokens = await this.client.refreshAccessToken(accessToken);
      const { accessToken: newAccessToken, accessTokenExpiresAt } = tokens;

      return {
        accessToken: newAccessToken,
        accessTokenExpiresAt: accessTokenExpiresAt,
      };
    } catch (err) {
      console.error('Error refreshing access token:', err);
      throw new OAuthError(
        'Unable to refresh access Token. Please login again'
      );
    }
  }
}
