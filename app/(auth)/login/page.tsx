"use client";
import Logo from "@/components/Logo";
import { Alert } from "@/components/ui/alert";
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
import { API_LoginUser } from "@/lib/Api/api";
import { mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
});

export type T_UserLogin = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  //
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: API_LoginUser,
    onSuccess: (data) => {
      toast.success("Login successful!");
      localStorage.setItem("user", data.data.id);
      return router.push(`/p/${data.data.id}/dashboard`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      mapFieldsOnError(error, form.setError);
      return toast.error(
        error.response?.data.message || "Login failed. Please try again."
      );
    },
  });

  const onSubmit = (data: T_UserLogin) => {
    return mutation.mutate(data);
  };

  return (
    <div className="flex justify-between">
      {/* Login form */}
      <div className="w-[30%] flex flex-col items-center  h-screen">
        <Logo />
        <Card className="w-[90%] mt-10 bg-blend-multiply bg-muted ">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">User Login</CardTitle>
          </CardHeader>
          <CardContent className=" w-full">
            {mutation.isError && (
              <Alert
                className="flex  items-center gap-2 mb-5 border-2"
                variant="destructive"
              >
                <div className="flex items-center gap-5 font-bold">
                  <Icon
                    icon="fluent:warning-12-filled"
                    width="24"
                    height="24"
                  />
                  {mutation.error.response?.data.message}
                </div>
              </Alert>
            )}
            <Form {...form}>
              <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
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
                    href={"/register"}
                    className="underline font-semibold text-primary"
                  >
                    {" "}
                    Register here{" "}
                  </Link>{" "}
                </div>

                {/* ================================================================================================ */}
                <LoadingButton type="submit" loading={mutation.isPending}>
                  Login
                </LoadingButton>
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
