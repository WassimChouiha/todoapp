"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div className="w-[1200px] mx-[20%] ">
      <div className="border-b-2 border-transparent">
        <div className=" bg-gray-50 rounded-lg">
          <div className=" p-4">
            <nav className="flex justify-between">              
              <Link
                className="px-4 py-2 mt-2 text-xl text-white bg-lime-500 font-semibold rounded-lg  hover:bg-lime-600 focus:bg-lime-600 focus:outline-none focus:shadow-outline"
                href="/dashboard/my-task"
              >
                MyTask
              </Link>
              <Button                
                className="px-4 py-2 mt-2 text-xl bg-red-500 font-semibold rounded-lg  hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:shadow-outline"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
