"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export function ErrorToast({ message }: { message: string }) {
  const { toast } = useToast();
  useEffect(() => {
    const errorToast = toast({
      variant: "destructive",
      title: "Auth Error",
      description: message,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
    return () => {
      errorToast.dismiss();
    };
  }, [message, toast]);

  return null;
}
