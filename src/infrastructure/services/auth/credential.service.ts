'server-only';
import type { ICredentialAuthService } from '@/src/application/services/authentication.service.interface';
import type { User } from '@/src/entities/models/user';

export class CredentialAuthService implements ICredentialAuthService {
  async signIn(email: string, password: string): Promise<User> {
    throw new Error('not implemented');
  }

  async createAccount(email: string, password: string): Promise<void> {
    throw new Error('not implemented');
  }

  async resetPassword(email: string): Promise<void> {
    throw new Error('not implemented');
  }

  async getUserProfile(token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
