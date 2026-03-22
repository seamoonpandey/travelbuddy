import styles from "./page.module.css";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import PopularDestinations from "@/components/landing/PopularDestinations";
import ExpandedDestinations from "@/components/landing/ExpandedDestinations";
import HowItWorks from "@/components/landing/HowItWorks";
import FindTravelBuddies from "@/components/landing/FindTravelBuddies";
import MeetFellowTravellers from "@/components/landing/MeetFellowTravellers";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className={`${styles.page} travelbuddy-page`}>
      <div className={styles.snapStart}>
        <Header />
      </div>
      <div className={styles.snapStart}>
        <Hero />
      </div>
      <section
        id="destinations"
        className={`${styles.section} ${styles.snapStart}`}
      >
        <h2 className="section-title">Popular Destinations in Nepal</h2>
        <div className="container">
          <PopularDestinations />
          <ExpandedDestinations />
        </div>
      </section>
      <div className={styles.snapStart}>
        <HowItWorks />
      </div>
      <div className={styles.snapStart}>
        <FindTravelBuddies />
      </div>
      <div className={styles.snapStart}>
        <MeetFellowTravellers />
      </div>
      <div className={styles.snapStart}>
        <Footer />
      </div>
    </div>
  );
}
