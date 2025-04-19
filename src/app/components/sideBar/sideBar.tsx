"use client";

import styles from "./sideBar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaRobot } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link
            href="/home"
            className={pathname === "/home" ? styles.activeLink : ""}
          >
            <AiFillHome /> Home
          </Link>
        </li>
        <li>
          <Link
            href="/bot"
            className={pathname === "/bot" ? styles.activeLink : ""}
          >
            <FaRobot /> Bot
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className={pathname === "/profile" ? styles.activeLink : ""}
          >
            <FaUserCircle /> Profile
          </Link>
        </li>
        <li>
          <Link
            href="/calendar"
            className={pathname === "/calendar" ? styles.activeLink : ""}
          >
            <MdCalendarToday /> My Calendar
          </Link>
        </li>
        <li>
          <Link
            href="/meetings"
            className={pathname === "/meetings" ? styles.activeLink : ""}
          >
            <FaHandshake /> Meetings
          </Link>
        </li>
      </ul>
    </div>
  );
}
