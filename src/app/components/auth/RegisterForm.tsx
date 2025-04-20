'use client';

import React, { useState } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import Link from 'next/link';  // Import Link for navigation
import styles from '@/app/components/auth/auth.module.scss'; // Updated to auth.module.scss

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log({ email, password, confirmPassword });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>

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

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <SubmitButton label="Register" isLoading={loading} />

        <div className={styles.linkContainer}>
          <Link href="/login" className={styles.link}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
