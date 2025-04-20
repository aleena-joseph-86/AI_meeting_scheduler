'use client';

import React, { useState } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import Link from 'next/link';  // Import Link for navigation
import styles from '@/app/components/auth/auth.module.scss'; // Updated to auth.module.scss

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log({ password, confirmPassword });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Reset Password</h2>

        <Input
          label="New Password"
          type="password"
          name="password"
          value={password}
          placeholder="Enter your new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm your new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPasswordForm;
