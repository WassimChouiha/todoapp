"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [error, setError] = useState(false);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = ({ username, password }) => {
    setError(false);
    const success = login(username, password);
    if (!success) setError(true);
  };

  return (
    <div className="flex h-screen items-center sm:w-[420px]">
      <form
        className="w-full flex flex-col items-center sm:w-[85%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[33%] flex flex-col items-center bg-gray-100 rounded-lg py-4 sm:w-[50%] lg:w-[50%]">
        <h1 className="text-lime-500 font-bold text-4xl mt-2">Login</h1>
        {error && <p>username or password incorrect</p>}
        <Input
          {...register("username", { required: "username is required" })}
          placeholder="UserName"
          className="w-8/12 mt-8 mb-2"
        />
        {errors.username && <p>{errors.username.message}</p>}
        <Input
          {...register("password", { required: "password is required" })}
          type="password"
          placeholder="Password"
          className="w-8/12 m-2"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <div className="w-full flex justify-around items-center p-2 sm:flex-col sm:gap-2">
          <Button className="bg-lime-500 hover:bg-lime-600" type="submit">
            Log in
          </Button>
          <Link
            className=" text-lime-500 hover:text-lime-600"
            href="/register"
          >
            Register
          </Link>
        </div>
        </div>
      </form>

      <Image className="sm:hidden md:hidden" width={650} height={250} src="./Laptop.svg" alt="laptop" />
    </div>
  );
}
