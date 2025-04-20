'use client';

import React from 'react';
import styles from '@/app/components/auth/auth.module.scss'; // Importing the SCSS styles

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, placeholder, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.inputField}
        required
      />
    </div>
  );
};

export default Input;
