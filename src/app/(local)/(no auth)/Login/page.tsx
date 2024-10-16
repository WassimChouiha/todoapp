"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div className="">
      <div className="w-full p-8 flex flex-col items-center">
        <Input placeholder="UserName" className="w-2/12 m-2" />
        <Input type="password" placeholder="Password" className="w-2/12 m-2" />
        <Button
          type="submit"
          onClick={() => {
            console.log("its working!!");
          }}
        >
          Log in
        </Button>
      </div>
      log in and sign up part
    </div>
  );
}
