"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Credentials from "./Credentials";
import Spinner from "../icons/Spinner";
import useNextSingIn from "@/hooks/useNextSignIn";
import { ErrorToast } from "./ErrorToast";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import ThirdPartyLogin from "./ThirdPartyLogin";
import { signIn } from "next-auth/react";
import useQuerySession from "@/hooks/useSession";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Empty password" }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutation, error } = useNextSingIn({ redirectTo: "/" });
  const { status } = mutation;
  const router = useRouter();
  const { isAuthenticated } = useQuerySession();

  if (isAuthenticated) router.push("/");
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <ThirdPartyLogin
        onGitHubSignIn={() => {}}
        onGoogleSignIn={() => signIn("google", { callbackUrl: "/" })}
      />
      <div className="flex h-8">
        <Separator className="w-40 my-auto" /> <span className="px-5">or</span>
        <Separator className="w-40 my-auto" />
      </div>
      <div className="pt-10">
        <Form {...form}>
          {error ? <ErrorToast message={error} /> : null}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Credentials control={form.control} />
            <div className="w-auto text-center">
              <Button
                className="w-32"
                disabled={status === "loading"}
                type="submit"
              >
                {status === "loading" ? (
                  <Spinner className=" w-3.5 h-3.5 text-gray-200 dark:text-white fill-black" />
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
