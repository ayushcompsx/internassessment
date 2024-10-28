import { getUserSession } from '@/src/lib/session';
import { AuthProvider } from './__components__/auth-provider';
import { redirect } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const session = getUserSession();
  if (!session) redirect('/login');
  return (
    <AuthProvider session={session}>
      <main>{children}</main>
    </AuthProvider>
  );
};

export default AppLayout;
