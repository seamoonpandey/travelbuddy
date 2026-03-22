import Image from "next/image";
import Link from "next/link";
import styles from "./PopularDestinations.module.css";
import { StarIcon } from "../icons";

const destinations = [
  {
    name: "Pokhara",
    image: "/images/landing/destinations/pokhara.png",
    description: "Paradise with Mountain Views",
    travelers: 245,
  },
  {
    name: "Kathmandu",
    image: "/images/landing/destinations/ktm.png",
    description: "Cultural Heart of Nepal",
    travelers: 312,
  },
  {
    name: "Chitwan",
    image: "/images/landing/destinations/chitwan.png",
    description: "Wildlife Safari Adventure",
    travelers: 178,
  },
];

export default function PopularDestinations() {
  return (
    <div className={styles.grid}>
      {destinations.map((destination) => (
        <div key={destination.name} className={styles.card}>
          <Image
            src={destination.image}
            alt={destination.name}
            width={1000}
            height={1000}
            className={styles.cardImage}
          />
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{destination.name}</h3>
            <p className={styles.cardText}>{destination.description}</p>
            <div className={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} size={18} />
              ))}
              <span className={styles.ratingText}>
                {destination.travelers} Travelers
              </span>
            </div>
            <Link href="/login" className="btn btn-primary btn-full">
              View More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
