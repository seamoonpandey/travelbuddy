import Image from "next/image";
import Link from "next/link";
import styles from "./FindTravelBuddies.module.css";
import { CameraIcon, CompassIcon, GlobeIcon } from "../icons";

const highlightFeatures = [
  {
    icon: GlobeIcon,
    title: "Destination Matching",
    description: "Find travelers heading to the same places",
  },
  {
    icon: CameraIcon,
    title: "Interest Alignment",
    description: "Connect based on shared travel interests",
  },
  {
    icon: CompassIcon,
    title: "Travel Style Compatibility",
    description: "Match with travelers who travel like you do",
  },
];

const secondaryCards = [
  {
    title: "Group Travel",
    description:
      "Join existing travel groups or create your own. Perfect for solo travelers looking for company.",
    cta: "Join a Group",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="9"
          cy="7"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M22 21v-2a4 4 0 0 0-3-3.87"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Local Guides",
    description:
      "Connect with experienced local guides who can show you the hidden gems of Nepal.",
    cta: "Find Guides",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="10"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Travel Stories",
    description:
      "Read authentic travel experiences and tips from fellow travelers who've been there.",
    cta: "Read Stories",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 15h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function FindTravelBuddies() {
  return (
    <section id="find-buddies" className={styles.section}>
      <div className="container">
        <h2 className="section-title">Find Your Perfect Travel Buddy</h2>
        <div className={styles.card}>
          <div className={styles.mainGrid}>
            <div>
              <h3 className={styles.subtitle}>
                Match with like-minded travelers
              </h3>
              <p className={styles.text}>
                Our smart matching algorithm connects you with travelers who
                share your interests, travel style, and destination preferences.
                Find the perfect companion for your next adventure!
              </p>
              <div className={styles.featureList}>
                {highlightFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className={styles.feature}>
                      <div className={styles.featureIcon}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className={styles.featureTitle}>
                          {feature.title}
                        </div>
                        <div className={styles.featureText}>
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Find Your Match
                </Link>
              </div>
            </div>
            <div className={styles.imageGrid}>
              {[1, 2, 3, 4].map((num, index) => (
                <Image
                  key={num}
                  src={`/images/landing/people/${num}.png`}
                  alt={`Traveler ${num}`}
                  width={500}
                  height={500}
                  className={`${styles.imageTile} ${
                    index % 2 === 1 ? styles.imageOffset : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.secondaryGrid}>
          {secondaryCards.map((card) => (
            <div key={card.title} className={styles.secondaryCard}>
              <div className={styles.secondaryHeader}>
                <div className={styles.secondaryIcon}>{card.icon}</div>
                <h3 className={styles.secondaryTitle}>{card.title}</h3>
              </div>
              <p className={styles.secondaryText}>{card.description}</p>
              <Link href="/register" className="btn btn-outline btn-full">
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
