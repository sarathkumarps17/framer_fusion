import Login from "@/components/auth/LoginForm";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="text-2xl font-forum font-bold text-center">Sign In</div>
      <div className="mt-10">
        <Login />
      </div>
      <div className="text-center mt-5">
        If you do not have an account please
        <Link className="pl-1" href="/auth/signUp">
          Sign Up
        </Link>
      </div>
    </>
  );
}
