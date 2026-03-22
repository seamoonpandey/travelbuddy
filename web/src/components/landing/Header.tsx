"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { CloseIcon, MapPinIcon, MenuIcon } from "../icons";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#destinations", label: "Destinations" },
  { href: "#find-buddies", label: "Find Buddies" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.dataset.menuOpen = "true";
      return () => {
        delete document.body.dataset.menuOpen;
      };
    }
    delete document.body.dataset.menuOpen;
    return undefined;
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <div className={styles.brandRow}>
            <Link href="/" className={styles.logo}>
              <MapPinIcon size={24} className={styles.logoTextAccent} />
              <span className={styles.logoTextDark}>Travel</span>
              <span className={styles.logoTextAccent}>Buddy</span>
            </Link>
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className={styles.actions}>
            <Link href="/dashboard" className="btn btn-outline">
              Login
            </Link>
            <Link href="/dashboard" className="btn btn-primary">
              Register
            </Link>
          </div>
          <button
            type="button"
            className={`btn btn-ghost btn-icon ${styles.menuButton}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </div>
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <div
          className={styles.mobileOverlay}
          role="presentation"
          onClick={() => setMenuOpen(false)}
        />
        <div className={styles.mobilePanel}>
          <div className={styles.mobileHeader}>
            <div className={styles.logo}>
              <MapPinIcon size={22} className={styles.logoTextAccent} />
              <span className={styles.logoTextDark}>Travel</span>
              <span className={styles.logoTextAccent}>Buddy</span>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <nav id="mobile-nav" className={styles.mobileNav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.mobileActions}>
            <Link
              href="/dashboard"
              className="btn btn-outline btn-full"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="btn btn-primary btn-full"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
