"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { getSession } from "next-auth/react";


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
      <div className={styles.card}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.photoWrapper}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpIXDQhwlRXpvJNgJCACmhLwL-GM11NtNDw&s"
              alt="Profile"
              className={styles.profilePhoto}
            />
          </div>

          <div className={styles.section}>
            <h3>Summary</h3>
            <p>{profile.summary}</p>
          </div>

          <div className={styles.section}>
            <h3>Skills</h3>
            <ul className={styles.skillsList}>
              {profile.skills.map((skill, index) => (
                <li key={index} className={styles.skillTag}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.header}>
            <div>
              <h2>{profile.name}</h2>
              <p>{profile.education}</p>
            </div>
          </div>

          <div className={styles.tabs}>
            <span className={styles.activeTab}>About</span>
          </div>

          <div className={styles.info}>
            <ProfileRow label="Name" value={profile.name} />
            <ProfileRow  label="Email" value={profile.email} />
            <ProfileRow  label="Profession" value={profile.profession} />
            <ProfileRow  label="Domain" value={profile.domain} />
            <ProfileRow  label="Experience" value={profile.experience} />
            <ProfileRow  label="Available Time" value={profile.available_time} />
            <ProfileRow  label="Years of Experience" value={`${profile.years_of_experience} years`} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileRowProps {
  label: string;
  value: string;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ label, value }) => (
  <div className={styles.infoRow}>
    <strong>
      {label}
    </strong>
    <span>{value}</span>
  </div>
);

export default Profile;
