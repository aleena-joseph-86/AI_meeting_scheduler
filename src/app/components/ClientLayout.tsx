"use client";

import { useState } from "react";
import Sidebar from "./sideBar/sideBar";
import Header from "./header/header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />
      <Header toggleSidebar={toggleSidebar} />
      <main
        style={{
          marginLeft: isSidebarOpen ? "230px" : "0",
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
