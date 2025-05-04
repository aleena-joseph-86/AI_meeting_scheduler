"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "./sideBar/sideBar";
import Header from "./header/header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session && <Sidebar isOpen={isSidebarOpen} />}
      <Header toggleSidebar={toggleSidebar} />
      <main
        style={{
          marginLeft: session && isSidebarOpen ? "230px" : "0",
          marginTop: "60px",
          padding: "1rem",
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </>
  );
}
