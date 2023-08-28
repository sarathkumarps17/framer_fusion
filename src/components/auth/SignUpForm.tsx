"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Credentials from "./Credentials";
import { SignUpData, SignUpSchema } from "@/types/user";
import useSignUpQuery from "@/hooks/useSignupQuery";

export default function SignUpFrom() {
  const { isSuccess, mutation } = useSignUpQuery({ redirectTo: "/" });
  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignUpData) => {
    if (data.password !== data.passwordVerify)
      return form.setError("passwordVerify", {
        type: "custom",
        message: "Passwords does not match",
      });
    mutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Credentials control={form.control} isRegister />
        <FormField
          control={form.control}
          name="passwordVerify"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conform Password</FormLabel>
              <FormControl>
                <Input
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  type="password"
                  placeholder="Re enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-auto text-center">
          <Button disabled={mutation.isLoading} type="submit">
            <span className="mr-2">Sign Up</span>
            {mutation.isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
