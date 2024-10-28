import { LoginForm } from './__components__/login-form';
import { Card } from '@/components/ui/card';
const LoginPage = () => {
  return (
    <div className="flex justify-center items-center space-y-4 min-h-screen">
      <Card className="max-w-96 flex-grow p-10">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Login to continue
        </h1>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
