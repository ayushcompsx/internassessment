import type { User } from '@/src/entities/models/user';

export interface IUserRepository {
  createUser: (user: User) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}
