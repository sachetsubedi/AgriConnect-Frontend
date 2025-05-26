"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 8 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  country: z.string().min(1, "Country is required"),
  userType: z.string().min(1, "User type is required"),
});

const Register = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      country: "",
      userType: "",
    },
    resolver: zodResolver(registerFormSchema),
  });
  return (
    <div className="flex  items-center flex-col h-screen px-52">
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
            <Link href={"/auth/login"} className="underline text-primary">
              Login{" "}
            </Link>
          </div>
          <div>
            <Form {...form}>
              <form className="mt-10 flex flex-col gap-5">
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
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
