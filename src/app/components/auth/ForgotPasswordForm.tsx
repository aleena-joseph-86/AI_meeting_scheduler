'use client';

import React, { useState } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import Link from 'next/link';  // Import Link for navigation
import styles from '@/app/components/auth/auth.module.scss'; // Updated to auth.module.scss

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log({ email });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Forgot Password</h2>

        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <SubmitButton label="Reset Password" isLoading={loading} />

        <div className={styles.linkContainer}>
          <Link href="/login" className={styles.link}>
            Remembered your password? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
