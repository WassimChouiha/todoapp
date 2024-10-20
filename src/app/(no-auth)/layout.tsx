import Navbar from "@/app/(no-auth)/NavBar";
import React from "react";

interface NoAuthLayoutProps {
  children: React.ReactNode;
}

export default async function NoAuthLayout({ children }: NoAuthLayoutProps) {
  return (
    <div className="font-manrope">
      <Navbar />
      {children}
    </div>
  );
}
