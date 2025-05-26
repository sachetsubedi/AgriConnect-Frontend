"use client";
import Logo from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
});

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  //
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex justify-between">
      {/* Login form */}
      <div className="w-[30%] flex flex-col items-center  h-screen">
        <Logo />
        <Card className="w-[90%] mt-10 bg-blend-multiply bg-muted ">
          <CardHeader>
            <CardTitle className="text-2xl">User Login</CardTitle>
          </CardHeader>
          <CardContent className=" w-full">
            <Form {...form}>
              <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit((data) => {})}
              >
                {/* ================================================================================================ */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* ================================================================================================ */}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Password"
                              type={isPasswordVisible ? "text" : "password"}
                              {...field}
                            />
                            <Icon
                              icon={
                                !isPasswordVisible
                                  ? "solar:eye-closed-bold"
                                  : "solar:eye-bold"
                              }
                              role="button"
                              onClick={() => {
                                setIsPasswordVisible(!isPasswordVisible);
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 z-20"
                              width="24"
                              height="24"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div>
                  Don&apos;t have an account?{" "}
                  <Link
                    href={"/auth/register"}
                    className="underline font-semibold text-primary"
                  >
                    {" "}
                    Register here{" "}
                  </Link>{" "}
                </div>

                {/* ================================================================================================ */}
                <LoadingButton type="submit">Login</LoadingButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* banner */}
      <div className="w-[70%] h-screen">
        <img src={"/banner-2.png"} alt="banner" className="w-full h-screen" />
      </div>
    </div>
  );
};

export default LoginPage;
