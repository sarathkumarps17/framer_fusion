"use client";
import { CartIcon } from "../icons";
import BrandName from "./Brand";
import NavLinks from "./NavLinks";
import ThemeSwitch from "./ThemeSwitch";
import User from "./User";
import useNextAuthQuerySession from "@/hooks/useNextAuthQuerySession";

export default function Navbar() {
  const sessionData = useNextAuthQuerySession({});
  return (
    <div className="h-16 mx-10 mt-5 flex justify-between align-middle">
      <BrandName />
      <NavLinks />
      <div className="flex w-56 items-end justify-between">
        <ThemeSwitch />
        <div>
          <span className="relative font-bold text-black left-2 top-2 flex z-10 h-4 w-4 justify-center bg-primary rounded-full text-xs align-middle">
            {2}
          </span>
          <CartIcon />
        </div>
        <div className="cursor-pointer mr-10">
          <User {...sessionData} />
        </div>
      </div>
    </div>
  );
}
