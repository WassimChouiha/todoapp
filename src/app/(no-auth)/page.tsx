"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-between mt-52">
      <div className="text-lime-900 font-bold text-5xl ml-[20%] sm:ml-8 sm:text-3xl tracking-wide gap-2 flex flex-col">
        Supercharge Your
        <h1>productivity With</h1>
        <h1 className="text-lime-500">Lists</h1>
        <h5 className="text-xl sm:text-lg">
          Simple task management for your daily activities, never miss a task
          after today. Sign up for free access
        </h5>
        <div className="mt-8 flex gap-8 sm:gap-2">
          <Link
            href="/register"
            className="text-xl p-2 w-32 h-12 text-center sm:w-20 sm:h-8 sm:text-sm sm:p-1 sm:text-center ml-4 rounded bg-lime-500 hover:bg-lime-600"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="border-[1px] text-xl p-2 w-32 h-12 sm:w-20 sm:h-8 sm:text-sm sm:p-1 text-center rounded border-lime-500 text-lime-500 bg-white hover:bg-lime-50"
          >
            Log in
          </Link>
        </div>
      </div>

      <Image
        className="sm:hidden"
        width={650}
        height={250}
        src="./Laptop.svg"
        alt="laptop"
      />
    </div>
  );
}
