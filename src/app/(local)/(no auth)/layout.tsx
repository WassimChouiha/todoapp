import Navbar from "@/app/(local)/(no auth)/NavBar";
import React from "react";

interface NoAuthLayoutProps {
  children: React.ReactNode;
}

export default async function NoAuthLayout({ children }: NoAuthLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
