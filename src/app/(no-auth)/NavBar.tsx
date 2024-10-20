"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div className="w-4/6 mx-auto border-b-2 border-transparent bg-gray-100 rounded-lg px-4 py-2">
      <nav className="flex justify-between">
        <Link
          className="px-4 py-2 mt-2 text-3xl flex items-center gap-2 font-semibold rounded-lg text-lime-600 bg-transparent focus:outline-none focus:shadow-outline"
          href="/"
        >
          <Image width={50} height={50} alt="logo" src="./Vector.svg" />
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
  );
};

export default Navbar;
