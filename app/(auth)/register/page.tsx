"use client";

import CustomRadioButton from "@/components/CustomRadioButtons";
import Logo from "@/components/Logo";
import { PhoneInput } from "@/components/phone-input";
import Required from "@/components/required";
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
import { API_RegisterUser } from "@/lib/Api/api";
import { mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 8 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    address: z.string().min(1, "Address is required"),
    userType: z.string().min(1, "Please select a user type"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type T_UserRegister = z.infer<typeof registerFormSchema>;

const Register = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      userType: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: API_RegisterUser,
    onSuccess: (data) => {
      form.reset();
      toast.success(data.message);
      return router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      mapFieldsOnError(error, form.setError);
      return toast.error(
        error.response?.data?.message || "Registration failed"
      );
    },
  });

  const onSubmit = (data: T_UserRegister) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex  items-center flex-col h-screen px-10 md:px-40 xl:px-96 ">
      <div className="flex justify-start w-full mb-10">
        <Logo />
      </div>
      <Card className=" flex flex-col h-fit w-full   bg-blend-multiply bg-muted">
        <CardHeader>
          <CardTitle className="text-2xl text-left text-primary">
            User Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div>
            Already have an account?{" "}
            <Link href={"/login"} className="underline text-primary">
              Login{" "}
            </Link>
          </div>
          <div>
            <Form {...form}>
              <form
                className="mt-10 flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex justify-between gap-5">
                  {/* ================================================================================================ */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>
                            Name <Required />{" "}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* ================================================================================================ */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>
                            Email <Required />{" "}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* ================================================================================================ */}
                </div>

                <div className="flex justify-between gap-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Confirm Password"
                                type={
                                  isConfirmPasswordVisible ? "text" : "password"
                                }
                                {...field}
                              />
                              <Icon
                                icon={
                                  !isConfirmPasswordVisible
                                    ? "solar:eye-closed-bold"
                                    : "solar:eye-bold"
                                }
                                role="button"
                                onClick={() => {
                                  setIsConfirmPasswordVisible(
                                    !isConfirmPasswordVisible
                                  );
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
                </div>

                <div className="flex justify-between gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>
                            Phone <Required />{" "}
                          </FormLabel>
                          <FormControl>
                            <PhoneInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>
                            Address <Required />{" "}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Kathmandu, Nepal" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div>
                  <CustomRadioButton
                    buttons={[
                      {
                        label: "Buyer",
                        icon: "mynaui:cart-solid",
                        value: "buyer",
                      },
                      {
                        label: "Seller",
                        icon: "material-symbols:sell",
                        value: "seller",
                      },
                    ]}
                    onChange={(value) => {
                      form.clearErrors("userType");
                      form.setValue("userType", value);
                    }}
                  ></CustomRadioButton>
                  <FormLabel className="text-red-500">
                    {form.formState.errors.userType?.message}
                  </FormLabel>
                </div>

                <LoadingButton loading={mutation.isPending}>
                  Register
                </LoadingButton>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
