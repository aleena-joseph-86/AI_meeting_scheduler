"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./header.module.scss";
import { FaBars, FaRobot, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {session && <FaBars className={styles.hamburger} onClick={toggleSidebar} />}
        <FaRobot className={styles.robotIcon} />
        <h1 className={styles.title}>AI Meeting Scheduler</h1>
      </div>

      {pathname !== "/login" && (
        <div className={styles.right}>
          {session ? (
            <>
              <FaUserCircle className={styles.userIcon} />
              <span className={styles.userName}>{session.user?.name}</span>
              <button className={styles.signOutButton} onClick={() => signOut()}>
                Sign out
              </button>
            </>
          ) : (
            <button className={styles.signInButton} onClick={() => signIn("google")}>
              Sign in with Google
            </button>
          )}
        </div>
      )}
    </header>
  );
}
