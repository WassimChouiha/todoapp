"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-between mt-52">
      <div className="text-lime-900 font-bold text-5xl ml-[20%] tracking-wide gap-2 flex flex-col">
        Supercharge Your
        <h1>productivity With</h1>
        <h1 className="text-lime-500">Lists</h1>
        <h5 className="text-xl ">
          Simple task management for your daily activities, never miss a task
          after today. Sign up for free access
        </h5>
        <div className="mt-8 flex gap-8">
          <Link href="/register" className="text-xl p-2 rounded bg-lime-500 hover:bg-lime-600">
            Register
          </Link>
          <Link
            href="/login"
            className="border-[1px] text-xl p-2 rounded border-lime-500 text-lime-500 bg-white hover:bg-lime-50"
          >
            Log in
          </Link>
        </div>
      </div>

      <img src="./Laptop.svg" />
    </div>
  );
}
