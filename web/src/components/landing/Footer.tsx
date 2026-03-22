import styles from "./Footer.module.css";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h3 className={styles.title}>About TravelBuddy</h3>
          <p className={styles.textMuted}>
            Connecting travelers and creating unforgettable adventures together
            in Nepal.
          </p>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <TwitterIcon size={20} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className={styles.title}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="#" className={styles.textMuted}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className={styles.textMuted}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className={styles.textMuted}>
                Safety
              </a>
            </li>
            <li>
              <a href="#" className={styles.textMuted}>
                Support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>Contact Us</h3>
          <ul className={styles.linkList}>
            <li className={styles.textMuted}>Email: hello@travelbuddy.com</li>
            <li className={styles.textMuted}>Phone: +977 1234567890</li>
            <li className={styles.textMuted}>Address: Thamel, Kathmandu, Nepal</li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.divider}`}>
        (c) 2025 TravelBuddy. All Rights Reserved.
      </div>
    </footer>
  );
}
