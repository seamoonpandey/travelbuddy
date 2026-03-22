"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./ExpandedDestinations.module.css";
import { StarIcon } from "../icons";

const destinations = [
  {
    name: "Everest Base Camp",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600",
    type: "Trekking",
    rating: 4.9,
  },
  {
    name: "Annapurna Circuit",
    image:
      "https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&w=600",
    type: "Trekking",
    rating: 4.8,
  },
  {
    name: "Lumbini",
    image:
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=600",
    type: "Cultural",
    rating: 4.7,
  },
  {
    name: "Nagarkot",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600",
    type: "Scenic",
    rating: 4.6,
  },
  {
    name: "Chitwan National Park",
    image:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600",
    type: "Wildlife",
    rating: 4.8,
  },
  {
    name: "Pokhara",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600",
    type: "Adventure",
    rating: 4.9,
  },
  {
    name: "Mustang Valley",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600",
    type: "Cultural",
    rating: 4.7,
  },
  {
    name: "Langtang Valley",
    image:
      "https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&w=600",
    type: "Trekking",
    rating: 4.8,
  },
];

export default function ExpandedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const perPage = 4;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? destinations.length - perPage : prev - perPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + perPage >= destinations.length ? 0 : prev + perPage
    );
  };

  const visibleDestinations = destinations.slice(
    currentIndex,
    currentIndex + perPage
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.headerTitle}>Explore More Destinations</h3>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            onClick={handlePrev}
            aria-label="Previous destinations"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="m15 18-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.controlButton}
            onClick={handleNext}
            aria-label="Next destinations"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {visibleDestinations.map((destination) => (
          <div key={destination.name} className={styles.card}>
            <div className={styles.cardImageWrap}>
              <Image
                src={destination.image}
                alt={destination.name}
                width={1000}
                height={1000}
                className={styles.cardImage}
              />
              <div className={styles.badge}>{destination.type}</div>
            </div>
            <div className={styles.cardBody}>
              <h4 className={styles.cardTitle}>{destination.name}</h4>
              <div className={styles.ratingRow}>
                <StarIcon size={16} />
                <span className={styles.ratingText}>{destination.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cta}>
        <Link href="/login" className="btn btn-outline">
          View All Destinations
        </Link>
      </div>
    </div>
  );
}
