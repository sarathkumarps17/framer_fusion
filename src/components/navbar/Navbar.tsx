"use client";

import BrandName from "./Brand";
import ThemeSwitch from "./ThemeSwitch";
import { Cart, User } from "../icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import useNextAuthQuerySession from "@/hooks/useNextAuthQuerySession";
import NavLoader from "./NavLoader";

export default function Navbar() {
  const { user, isAuthenticated, query } = useNextAuthQuerySession({
    redirectTo: "/",
  });

  return (
    <div className="h-16 mx-10 mt-5 flex justify-start align-middle">
      <BrandName />
      {query.isLoading ? (
        <NavLoader />
      ) : (
        <div className="flex items-end w-full justify-end">
          <ThemeSwitch />
          {isAuthenticated ? (
            <div className="mx-10" onClick={() => signOut()}>
              Logout
            </div>
          ) : (
            <Link className="mx-10" href={"/auth/signUp"}>
              Sign Up
            </Link>
          )}
          <div className="mx-10">
            <Cart />
          </div>
          <div className="mx-5">
            <User />
          </div>
        </div>
      )}
    </div>
  );
}
