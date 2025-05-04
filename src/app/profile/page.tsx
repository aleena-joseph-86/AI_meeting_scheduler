"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { getSession } from "next-auth/react";
import {
  FaUser,
  FaEnvelope,
  FaInfoCircle,
  FaBriefcase,
  FaAward,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

interface ProfileData {
  name: string;
  email: string;
  education: string;
  profession: string;
  domain: string;
  skills: string[];
  experience: string;
  years_of_experience: number;
  available_time: string;
  summary: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const session = await getSession();
        const email = session?.user?.email;

        if (!email) {
          console.error("No email in session");
          return;
        }

        const res = await fetch(`/api/profile?email=${email}`);
        const data = await res.json();

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found. Please create your profile!</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Profile</h1>
        <p>Manage your account and settings</p>
      </div>

      <div className={styles.profileContent}>
        <ProfileSection icon={<FaUser />} label="Name" value={profile.name} />
        <ProfileSection icon={<FaEnvelope />} label="Email" value={profile.email} />
        <ProfileSection icon={<FaBriefcase />} label="Profession" value={profile.profession} />
        <ProfileSection icon={<FaGlobe />} label="Domain" value={profile.domain} />
        <ProfileSection icon={<FaAward />} label="Years of Experience" value={`${profile.years_of_experience} years`} />
        <ProfileSection icon={<FaClock />} label="Available Time" value={profile.available_time} />
        <ProfileSection icon={<FaInfoCircle />} label="Education" value={profile.education} />
        <ProfileSection icon={<FaInfoCircle />} label="Experience" value={profile.experience} />
        <ProfileSection icon={<FaInfoCircle />} label="Summary" value={profile.summary} />

        <div className={styles.skillsSection}>
          <h2>Skills</h2>
          <div className={styles.skillsList}>
            {profile.skills.map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileSectionProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ icon, label, value }) => (
  <div className={styles.profileSection}>
    <div className={styles.profileLabel}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.labelText}>{label}</span>
      <span className={styles.colon}>:</span>
    </div>
    <p>{value}</p>
  </div>
);

export default Profile;
