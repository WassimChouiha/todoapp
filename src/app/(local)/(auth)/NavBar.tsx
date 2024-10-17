"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="w-[1200px] mx-[20%] ">
      <div className="border-b-2 border-transparent">
        <div className="text-black dark:text-gray-200 bg-gray-300 rounded-lg">
          <div className=" p-4">
            <nav className="flex justify-between">              
              <a
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="/Task"
              >
                Tasks Page
              </a>
              <Button
                type="submit"
                className="px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
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
