import type { IUserRepository } from '@/src/application/repositories/user.repository.interface';
import type { User } from '@/src/entities/models/user';

export class UserRepository implements IUserRepository {
  async createUser(user: User) {
    return {} as User;
  }
  async deleteUser(id: string) {}
}
