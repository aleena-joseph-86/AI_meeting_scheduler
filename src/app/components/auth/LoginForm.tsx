'use client';

import React, { useState } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import Link from 'next/link';  // Import Link for navigation
import styles from '@/app/components/auth/auth.module.scss'; // Updated to auth.module.scss

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log({ email, password });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>

        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <SubmitButton label="Login" isLoading={loading} />

        <div className={styles.linkContainer}>
          <Link href="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
          <Link href="/register" className={styles.link}>
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
