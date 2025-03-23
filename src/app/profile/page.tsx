"use client";

import styles from "./page.module.scss";
import { FaUser, FaEnvelope, FaInfoCircle, FaBriefcase, FaAward } from "react-icons/fa";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage settings for your profile</p>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <FaUser className="icon" />
          <h2>Name:</h2>
          <p>Vishalini Kamaraj</p>
        </div>

        <div className="profile-section">
          <FaEnvelope className="icon" />
          <h2>Email:</h2>
          <p>vishalinikamaraj286@gmail.com</p>
        </div>

        <div className="profile-section">
          <FaBriefcase className="icon" />
          <h2>Profession:</h2>
          <p>3rd Year BE CSE Student</p>
        </div>

        <div className="profile-section">
          <FaAward className="icon" />
          <h2>Experience:</h2>
          <p>MEAN Stack & Next.js Developer</p>
        </div>

        <div className="profile-section">
          <FaInfoCircle className="icon" />
          <h2>About:</h2>
          <p>
            I am passionate about full-stack development, specializing in the
            MEAN stack and Next.js. I enjoy building scalable and efficient web
            applications.
          </p>
        </div>
      </div>
    </div>
  );
}
