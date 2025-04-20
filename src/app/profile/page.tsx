import React from "react";
import styles from "./page.module.scss";
import { FaUser, FaEnvelope, FaInfoCircle, FaBriefcase, FaAward } from "react-icons/fa";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Profile</h1>
        <p>Manage settings for your profile</p>
      </div>

      <div className={styles.profileContent}>
        <ProfileSection icon={<FaUser />} label="Name" value="Vishalini Kamaraj" />
        <ProfileSection icon={<FaEnvelope />} label="Email" value="vishalinikamaraj286@gmail.com" />
        <ProfileSection icon={<FaBriefcase />} label="Profession" value="3rd Year BE CSE Student" />
        <ProfileSection icon={<FaAward />} label="Experience" value="MEAN Stack & Next.js Developer" />
        <ProfileSection
          icon={<FaInfoCircle />}
          label="About"
          value="I am passionate about full-stack development, specializing in the MEAN stack and Next.js. I enjoy building scalable and efficient web applications."
        />
      </div>
    </div>
  );
};

interface ProfileSectionProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ icon, label, value }) => {
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileLabel}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.labelText}>{label}</span>
      <span className={styles.colon}>:</span>
      </div>
      <p>{value}</p>
    </div>
  );
};

export default Profile;
