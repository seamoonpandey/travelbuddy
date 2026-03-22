import React from "react";
import styles from "./FormInput.module.css";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export default function FormInput({
  id,
  name,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = true,
  icon,
}: FormInputProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`${styles.input} ${icon ? styles.inputWithIcon : ""} ${
            error ? styles.inputError : ""
          }`}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
