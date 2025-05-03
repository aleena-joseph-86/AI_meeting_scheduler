"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "./page.module.scss";

const Profile: React.FC = () => {
  const [photo, setPhoto] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpIXDQhwlRXpvJNgJCACmhLwL-GM11NtNDw&s"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Vishalini Kamaraj");
  const [email, setEmail] = useState("vishalinikamaraj286@gmail.com");
  const [phone, setPhone] = useState("123 456 7890");
  const [profession, setProfession] = useState("MEAN Stack & Next.js Developer");

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <div className={styles.leftSection}>
          <div className={styles.photoWrapper}>
            <img src={photo} alt="Profile" className={styles.profilePhoto} />
            <label htmlFor="photoUpload" className={styles.changePhoto}>
              Change Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="photoUpload"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
          </div>

          <div className={styles.section}>
            <h3>summary</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, accusamus maxime delectus aliquid repellat rem ratione minima eligendi amet id illum soluta asperiores optio, molestiae voluptatum omnis iure maiores laudantium.</p>
          </div>

          <div className={styles.section}>
            <h3>Skills</h3>
            <ul>
              <li>Web Designer</li>
              <li>Web Developer</li>
              <li>WordPress</li>
              <li>WooCommerce</li>
              <li>PHP, .Net</li>
            </ul>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.header}>
            <div>
              {isEditing ? (
                <input value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <h2>{name}</h2>
              )}
              <p>3rd Year BE CSE Student</p>
            </div>
            <button className={styles.editBtn} onClick={handleEditToggle}>
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>

          <div className={styles.tabs}>
            <span className={styles.activeTab}>About</span>
            {/* <span className={styles.inactiveTab}>Timeline</span> */}
          </div>

          <div className={styles.info}>
            <InfoRow label="User ID" value="Visha123" />
            <InfoRow label="Name" value={name} editable={isEditing} onChange={setName} />
            <InfoRow label="Email" value={email} editable={isEditing} onChange={setEmail} />
            <InfoRow label="Phone" value={phone} editable={isEditing} onChange={setPhone} />
            <InfoRow label="Profession" value={profession} editable={isEditing} onChange={setProfession} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (val: string) => void;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, editable = false, onChange }) => (
  <div className={styles.infoRow}>
    <strong>{label}</strong>
    {editable && onChange ? (
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <span>{value}</span>
    )}
  </div>
);

export default Profile;
