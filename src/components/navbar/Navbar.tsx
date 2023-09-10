"use client";
import { CartIcon } from "../icons";
import BrandName from "./Brand";
import ThemeSwitch from "./ThemeSwitch";
import User from "./User";
import useNextAuthQuerySession from "@/hooks/useNextAuthQuerySession";

export default function Navbar() {
  const sessionData = useNextAuthQuerySession({});
  return (
    <div className="h-16 mx-10 mt-5 flex justify-start align-middle">
      <BrandName />
      <div className="flex items-end w-full justify-end">
        <ThemeSwitch />
        <div className="mx-10">
          <span className="relative left-3 top-3 flex z-10 h-4 w-4 justify-center bg-primary rounded-full text-xs">
            {2}
          </span>
          <CartIcon />
        </div>
        <div className="mx-5 cursor-pointer">
          <User {...sessionData} />
        </div>
      </div>
    </div>
  );
}
