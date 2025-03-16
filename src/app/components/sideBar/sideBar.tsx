"use client";

import styles from "./sideBar.module.scss";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <Link href="/home">Home</Link>
        <Link href="/bot">Bot</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/calendar">My Calendar</Link>
        <Link href="/meetings">Meetings</Link>
      </ul>
    </div>
  );
}
