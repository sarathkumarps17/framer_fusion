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
import { UserSession } from "@/types/user";

interface PropType {
  isAuthenticated: boolean;
  user: UserSession | null;
  status: "error" | "success" | "loading";
}
export default function User({ isAuthenticated, user, status }: PropType) {
  return (
    <DropdownMenu>
      {status === "loading" ? (
        <Skeleton className="h-4 w-4 rounded-full" />
      ) : (
        <DropdownMenuTrigger asChild>
          <Avatar className="h-6 w-6 border-2 border-foreground">
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
