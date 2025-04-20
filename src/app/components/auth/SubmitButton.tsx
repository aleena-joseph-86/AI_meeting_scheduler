'use client';

import React from 'react';
import styles from '@/app/components/auth/auth.module.scss';

interface SubmitButtonProps {
  label: string;
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, isLoading }) => {
  return (
    <button type="submit" className={styles.button} disabled={isLoading}>
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default SubmitButton;
