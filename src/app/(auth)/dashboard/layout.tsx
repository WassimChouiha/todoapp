import React from "react";
import Navbar from "./NavBar";


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
