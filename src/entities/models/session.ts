import { z } from 'zod';

export const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;

export const userSessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  accessToken: z.string(),
  picture: z.string().url(),
});

export type UserSession = z.infer<typeof userSessionSchema>;
