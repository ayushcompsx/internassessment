interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return <main>{children}</main>;
};

export default AuthenticationLayout;
