"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";
import FormInput from "./FormInput";
import { MailIcon, LockIcon } from "../icons";
import { auth } from "@/lib/api";

type AuthFormState = {
  email: string;
  password: string;
  isLoading: boolean;
};

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<AuthFormState>({
    email: "",
    password: "",
    isLoading: false,
  });
  const [errors, setErrors] = useState<Partial<AuthFormState>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<AuthFormState> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    if (!validateForm()) return;

    setFormData((prev) => ({ ...prev, isLoading: true }));

    try {
      await auth.login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (error) {
      const err = error as { status?: number };
      if (err?.status === 401) {
        setAuthError("Incorrect email or password.");
      } else {
        setAuthError("Login failed. Please try again.");
      }
      console.error("Login failed:", error);
    } finally {
      setFormData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AuthFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {authError && <div className={styles.error}>{authError}</div>}
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
        placeholder="Enter your password"
        icon={<LockIcon size={18} />}
      />

      <div className={styles.rememberRow}>
        <label className={styles.checkboxRow}>
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className={styles.checkbox}
          />
          Remember me
        </label>
        <Link href="/forgot-password" className={styles.linkAccent}>
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={formData.isLoading}
      >
        {formData.isLoading ? "Signing in..." : "Sign In"}
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
        Don&apos;t have an account?{" "}
        <Link href="/register" className={styles.linkAccent}>
          Sign up
        </Link>
      </p>
    </form>
  );
}
