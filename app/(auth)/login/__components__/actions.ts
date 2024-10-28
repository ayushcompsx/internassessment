'use server';
import type { EmailAndPassword } from '@/src/schema/email-password.schema';
import { credentialController } from '@/src/interface-adapters/controllers/auth/auth.controller';
import {
  InvalidCredentialsError,
  UnauthorizedError,
} from '@/src/entities/errors/auth';
import { InputParseError } from '@/src/entities/errors/common';
import { redirect } from 'next/navigation';

export const loginWithEmailAndPassword = async (data: EmailAndPassword) => {
  try {
    const user = await credentialController(data);
  } catch (err: unknown) {
    if (err instanceof InputParseError) {
      return {
        error: err.message,
      };
    }
    if (err instanceof InvalidCredentialsError) {
      return { error: 'Invalid Credentials' };
    }
    if (err instanceof UnauthorizedError) {
      return { error: 'Not Enough Permission' };
    }
    return {
      error: 'Some unknown error occured, please try again later.',
    };
  }
  redirect('/app');
};
