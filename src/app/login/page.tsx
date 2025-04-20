// src/app/login/page.tsx
import React from 'react';
import LoginForm from '@/app/components/auth/LoginForm';

export const metadata = {
  title: 'Login | MyApp',
};

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

