"use client";
import useQuerySession from "@/hooks/useSession";
import { redirect } from "next/navigation";
import React from "react";
redirect;
const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useQuerySession();
  if (isAuthenticated) return children;
  redirect("/auth/login");
};
export default Protected;
