"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="">
      <div className="w-full p-8 flex flex-col items-center">
        <Input placeholder="UserName" className="w-2/12 m-2" />
        <Input type="password" placeholder="Password" className="w-2/12 m-2" />
        <div className="">
          <Button
            type="submit"
            onClick={() => {
              console.log("its working!!");
            }}
          >
            Log in
          </Button>
          <Link className="ml-24" href="/">
            click here to sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
