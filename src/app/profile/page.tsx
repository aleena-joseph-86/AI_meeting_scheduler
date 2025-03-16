"use client";

import styles from "./page.module.scss";
import { FaUser, FaCode, FaLaptopCode, FaMoneyBillWave } from "react-icons/fa";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-section">
            <FaUser className="icon" />
            <h2>Name</h2>
            <p>Aleena Joseph</p>
          </div>
          <FaLaptopCode className="icon" />
          <h2>About Me</h2>
          <p>
            I am a 3rd-year BE CSE student exploring full-stack development with
            experience in the MEAN stack and Next.js.
          </p>
        </div>
        <div className="profile-section">
          <FaCode className="icon" />
          <h2>Experience</h2>
          <p>
            I have completed a few projects using MEAN stack and Next.js,
            building scalable and dynamic web applications.
          </p>
        </div>
        <div className="profile-section">
          <FaMoneyBillWave className="icon" />
          <h2>Pricing</h2>
          <p>I offer website development services at a minimal cost.</p>
        </div>
      </div>
    </div>
  );
}
