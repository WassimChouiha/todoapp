"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Register() {
  return (
    <div className="">
      <div className="w-full p-8 flex flex-col items-center">
        <Input placeholder="UserName" className="w-2/12 mt-8 mb-2" />
        <Input placeholder="Confirm UserName" className="w-2/12 m-2" />
        <Input type="password" placeholder="Password" className="w-2/12 m-2" />
        <Input type="password" placeholder="Confirm Password" className="w-2/12 m-2" />
        <div className="flex items-center">
          <Button
          className="bg-lime-500 hover:bg-lime-600"
            type="submit"
            onClick={() => {
              console.log("its working!!");
            }}
          >
            Register
          </Button>
          <Link className="ml-24 text-lime-500 hover:text-lime-600" href="/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
