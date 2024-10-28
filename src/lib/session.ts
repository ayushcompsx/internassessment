import { cookies } from 'next/headers';
import type { UserSession } from '../entities/models/session';
import type { User } from '../entities/models/user';

export const getUserSession = (): UserSession | null => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken')?.value || null;
  const userCookie = cookieStore.get('user')?.value || null;

  if (userCookie && accessToken) {
    try {
      const user = JSON.parse(userCookie) as User; // Parse user cookie into User type
      return {
        accessToken: accessToken,
        ...user,
      };
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }
  return null;
};
