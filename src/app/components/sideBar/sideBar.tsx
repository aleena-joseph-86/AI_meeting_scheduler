"use client";

import styles from "./sideBar.module.scss";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaRobot } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <Link href="/home"><AiFillHome />Home</Link>
        <Link href="/bot"><FaRobot />Bot</Link>
        <Link href="/profile"><FaUserCircle />Profile</Link>
        <Link href="/calendar"> <MdCalendarToday />My Calendar</Link>
        <Link href="/meetings"><FaHandshake />Meetings</Link>
      </ul>
    </div>
  );
}
