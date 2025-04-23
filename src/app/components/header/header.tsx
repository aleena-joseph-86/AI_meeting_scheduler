"use client";

import styles from "./header.module.scss";
import { FaBars, FaRobot, FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <FaBars className={styles.hamburger} onClick={toggleSidebar} />
        <FaRobot className={styles.robotIcon} />
        <h1 className={styles.title}>AI Meeting Scheduler</h1>
      </div>
      <div className={styles.right}>
        <FaUserCircle className={styles.userIcon} />
        <span className={styles.userName}>Aleena Joseph</span>
      </div>
    </header>
  );
}
