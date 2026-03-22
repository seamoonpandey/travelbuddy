import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./AuthLayout.module.css";
import { CloseIcon, MapPinIcon } from "../icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formSide}>
        <div className={styles.formCard}>
          <div className={styles.topRow}>
            <div className={styles.brand}>
              <MapPinIcon size={22} className={styles.brandAccent} />
              <span className={styles.brandDark}>Travel</span>
              <span className={styles.brandAccent}>Buddy</span>
            </div>
            <Link href="/" className={styles.closeButton} aria-label="Close">
              <CloseIcon size={18} />
            </Link>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
        </div>
      </div>
      <div className={styles.imageSide}>
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
          alt="Travel"
          width={2000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
}
