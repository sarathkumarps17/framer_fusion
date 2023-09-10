"use client";

import { UserIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { logOut } from "@/lib/auth";
import useNextAuthQuerySession from "@/hooks/useNextAuthQuerySession";

export default function User() {
  const { isAuthenticated, user, status } = useNextAuthQuerySession({});
  return (
    <DropdownMenu>
      {status === "loading" ? (
        <Skeleton className="h-12 w-12 rounded-full" />
      ) : (
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent>
        {isAuthenticated && (
          <DropdownMenuItem>
            <Link className="mx-2" href={"/profile"}>
              Profile
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          {" "}
          {isAuthenticated ? (
            <div className="mx-2" onClick={() => logOut()}>
              Logout
            </div>
          ) : (
            <Link className="mx-2" href={"/auth/signUp"}>
              Sign Up
            </Link>
          )}{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
