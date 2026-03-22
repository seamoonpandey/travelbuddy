import Image from "next/image";
import Link from "next/link";
import styles from "./MeetFellowTravellers.module.css";

const travelers = [
  {
    name: "Rae Lil Black",
    image: "/images/landing/people/1.png",
    destination: "Backpacking across Southeast Asia",
    interests: "Food, Nightlife, Beaches",
  },
  {
    name: "Sydney Sweeney",
    image: "/images/landing/people/4.png",
    destination: "Exploring European cities",
    interests: "Art, Fashion, History",
  },
  {
    name: "Tru Kait",
    image: "/images/landing/people/2.png",
    destination: "Adventure in South America",
    interests: "Hiking, Wildlife, Culture",
  },
];

export default function MeetFellowTravellers() {
  return (
    <section className={styles.section}>
      <h2 className="section-title">Meet Fellow Travelers</h2>
      <div className={`container ${styles.grid}`}>
        {travelers.map((traveler) => (
          <div key={traveler.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <Image
                src={traveler.image}
                alt={traveler.name}
                width={200}
                height={200}
                className={styles.avatar}
              />
              <div>
                <h3 className={styles.cardTitle}>{traveler.name}</h3>
                <p className={styles.cardSubtext}>{traveler.destination}</p>
              </div>
            </div>
            <p className={styles.cardText}>{traveler.interests}</p>
            <Link href="/login" className="btn btn-primary btn-full">
              Connect
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
