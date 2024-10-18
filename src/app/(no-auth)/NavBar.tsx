"use client";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex px-2">
      <div className="w-[1200px] ml-[20%] border-b-2 border-transparent">
        <div className="bg-gray-50 rounded-lg">
          <div className="p-4">
            <nav className="flex justify-between">
              <Link
                className="px-4 py-2 mt-2 text-3xl flex items-center gap-2 font-semibold rounded-lg text-lime-600 bg-transparent focus:outline-none focus:shadow-outline"
                href="/"
              >
                <img src="./Vector.svg" />
                Lists
              </Link>
              <Link
                className="px-4 py-2 mt-2 text-xl items-center flex text-white bg-lime-500 font-semibold rounded-lg  hover:bg-lime-600 focus:bg-lime-600 focus:outline-none focus:shadow-outline"
                href="/login"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
