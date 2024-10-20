"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="w-4/6 mx-auto border-b-2 border-transparent bg-gray-100 rounded-lg px-4 py-2">
      <nav className="flex  items-center justify-between">
        <Link
          className="px-4 py-2 mt-2 text-3xl flex items-center gap-2 font-semibold rounded-lg text-lime-600 bg-transparent focus:outline-none focus:shadow-outline"
          href="/dashboard/my-task"
        >
          <Image width={50} height={50} alt="logo" src="./../Vector.svg" />
          Lists
        </Link>
        <Button
          className="px-4 py-2 mt-2 text-xl bg-red-500 font-semibold rounded-lg hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:shadow-outline"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;
