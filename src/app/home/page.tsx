import Profile from "../profile/page";
import Calendar from "../calendar/page";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div className="item">
        <Profile />
      </div>
      <div className="item">
        <Calendar />
      </div>
    </div>
  );
}
