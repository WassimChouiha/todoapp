"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="w-[1200px] mx-[20%] ">
      <div className="border-b-2 border-transparent">
        <div className=" bg-gray-50 rounded-lg">
          <div className=" p-4">
            <nav className="flex justify-between">              
              <a
                className="px-4 py-2 mt-2 text-xl text-white bg-lime-500 font-semibold rounded-lg  hover:bg-lime-600 focus:bg-lime-600 focus:outline-none focus:shadow-outline"
                href="/my-task"
              >
                MyTask
              </a>
              <Button
                type="submit"
                className="px-4 py-2 mt-2 text-xl bg-red-500 font-semibold rounded-lg  hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:shadow-outline"
                onClick={() => {
                  console.log("ez");
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
