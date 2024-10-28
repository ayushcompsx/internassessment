import { z } from 'zod';
export const emailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type EmailAndPassword = z.infer<typeof emailAndPasswordSchema>;
