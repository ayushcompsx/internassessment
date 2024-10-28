'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { emailAndPasswordSchema } from '@/src/schema/email-password.schema';
import type { EmailAndPassword } from '@/src/schema/email-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { loginWithEmailAndPassword } from './actions';
import { useToast } from '@/components/hooks/use-toast';

interface LoginFormProps {}
export const LoginForm = ({}: LoginFormProps) => {
  const form = useForm<EmailAndPassword>({
    resolver: zodResolver(emailAndPasswordSchema),
  });
  const { toast } = useToast();
  const handleSubmit = async (data: EmailAndPassword) => {
    const res = await loginWithEmailAndPassword(data);
    if (res.error) {
      toast({
        title: 'Error',
        description: res.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        id="login"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input type="email" placeholder="abc@gmail.com" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className="space-y-4 text-center">
        <Button form="login" type="submit" className="w-full">
          Login
        </Button>
        <Separator className="w-1/2 mx-auto" />
        <Button asChild>
          <Link href={'/login/google'}>
            <FcGoogle />
            Continue with Google
          </Link>
        </Button>
      </div>
    </Form>
  );
};
