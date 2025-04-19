"use client";

import styles from "./header.module.scss";
import { FaRobot, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="header-left">
        <FaRobot className="robot-icon" />
        <h1>AI Meeting Scheduler</h1>
      </div>
      <div className="header-right">
        <FaUserCircle className="user-icon" />
        <span>Visalini Kamaraj</span>
      </div>
    </header>
  );
}
