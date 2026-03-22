"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AuthForm.module.css";
import FormInput from "./FormInput";
import { MailIcon, LockIcon, UserIcon } from "../icons";
import { auth } from "@/lib/api";

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  isLoading: boolean;
  error?: string;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    isLoading: false,
  });
  const [errors, setErrors] = useState<Partial<RegisterFormState>>({});

  const validateForm = () => {
    const newErrors: Partial<RegisterFormState> = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.acceptTerms) {
      newErrors.error = "You must accept the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setFormData((prev) => ({ ...prev, isLoading: true }));
    try {
      await auth.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      window.location.reload();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setFormData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof RegisterFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormInput
        id="name"
        name="name"
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your full name"
        icon={<UserIcon size={18} />}
      />

      <FormInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        icon={<MailIcon size={18} />}
      />

      <FormInput
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
        icon={<LockIcon size={18} />}
      />

      <FormInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        icon={<LockIcon size={18} />}
      />

      <label className={styles.checkboxRow}>
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className={styles.checkbox}
        />
        <span>
          I agree to the{" "}
          <Link href="/termspage" className={styles.linkAccent}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacypage" className={styles.linkAccent}>
            Privacy Policy
          </Link>
        </span>
      </label>

      {errors.error && <p className={styles.inlineError}>{errors.error}</p>}

      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={formData.isLoading}
      >
        {formData.isLoading ? "Creating account..." : "Create Account"}
      </button>

      <div className={styles.divider}>
        <span>Or continue with</span>
      </div>

      <div className={styles.socialGrid}>
        <button type="button" className={styles.socialButton}>
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
            className={styles.socialIcon}
          />
          Google
        </button>
        <button type="button" className={styles.socialButton}>
          <Image
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            width={20}
            height={20}
            className={styles.socialIcon}
          />
          Facebook
        </button>
      </div>

      <p className={styles.footerText}>
        Already have an account?{" "}
        <Link href="/login" className={styles.linkAccent}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
