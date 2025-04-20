"use client"; // This ensures it's a client component

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring this only runs on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, mounted]);

  if (!mounted || status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard, {session?.user?.email}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
}
