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
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const password = watch("password");
  const [error, setError] = useState(false);
  const { signup } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = ({ username, password }) => {
    setError(false);
    const success = signup(username, password);
    if (!success) setError(true);
  };
  return (
    <div className="flex h-screen items-center">
    <form
      className="w-full p-8 flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[33%] flex flex-col items-center bg-gray-100 rounded-lg py-4">
        <h1 className="text-lime-500 font-bold text-4xl">Register</h1>
        <Input
          {...register("username", { required: true })}
          placeholder="UserName"
          className="w-8/12 mt-8 mb-2"
        />
        {error && <p>user already exist please choose another one</p>}
        <Input
          type="password"
          placeholder="Password"
          className="w-8/12 m-2"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Input
          type="password"
          placeholder="Confirm Password"
          className="w-8/12 m-2"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <div className="flex items-center">
          <Button className="bg-lime-500 hover:bg-lime-600" type="submit">
            Register
          </Button>
          <Link
            className="ml-24 text-lime-500 hover:text-lime-600"
            href="/login"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </form>
    <Image width={650} height={250} src="./Laptop.svg" alt="laptop" />
    </div>
  );
}
