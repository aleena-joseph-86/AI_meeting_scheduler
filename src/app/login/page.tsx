"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./login.module.scss";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>AI Meeting Scheduler</h1>
        <p className={styles.tagline}>Your intelligent meeting assistant</p>
        <button className={styles.googleButton} onClick={() => signIn("google", { callbackUrl: "/" })}>
          <img src="/google-icon.svg" alt="Google" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
