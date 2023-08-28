"use client";

import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export function SuccessToast({ message }: { message: string }) {
  const { toast } = useToast();
  useEffect(() => {
    const successToast = toast({
      variant: "success",
      description: message,
    });
    return () => {
      successToast.dismiss();
    };
  }, [message, toast]);

  return null;
}
