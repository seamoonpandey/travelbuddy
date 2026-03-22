import styles from "./HowItWorks.module.css";
import { MapPinIcon, UserIcon, UsersIcon } from "../icons";

const steps = [
  {
    icon: UserIcon,
    title: "Create Profile",
    description: "Sign up and fill out your travel preferences",
  },
  {
    icon: UsersIcon,
    title: "Find Buddies",
    description: "Connect with travelers sharing your interests",
  },
  {
    icon: MapPinIcon,
    title: "Plan Together",
    description: "Collaborate on itineraries and travel plans",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className="section-title">How It Works</h2>
      <div className={`container ${styles.grid}`}>
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className={styles.item}>
              <div className={styles.iconWrap}>
                <Icon size={36} />
              </div>
              <h3 className={styles.itemTitle}>{step.title}</h3>
              <p className={styles.itemText}>{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
