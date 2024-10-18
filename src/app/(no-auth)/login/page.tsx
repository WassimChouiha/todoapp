"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full p-8 flex flex-col items-center">
        <h1 className="text-lime-500 font-bold text-4xl">Login</h1>
      {error && <p>username or password incorrect</p>}
        <Input
          {...register("username", { required: "username is required" })}
          placeholder="UserName"
          className="w-2/12 mt-8 mb-2"
        />

        {errors.username && <p>{errors.username.message}</p>}
        <Input
          {...register("password", { required: "password is required" })}
          type="password"
          placeholder="Password"
          className="w-2/12 m-2"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <div>
          <Button className="bg-lime-500 hover:bg-lime-600" type="submit">
            Log in
          </Button>
          <Link
            className="ml-24 text-lime-500 hover:text-lime-600"
            href="/register"
          >
          dont have an account yet?
          </Link>
        </div>
      </div>
    </form>
  );
}
