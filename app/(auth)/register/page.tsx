"use client";

import CustomRadioButton from "@/components/CustomRadioButtons";
import Logo from "@/components/Logo";
import { PhoneInput } from "@/components/phone-input";
import Required from "@/components/required";
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
import { API_RegisterUser } from "@/lib/Api/api";
import { mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
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
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Main container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Static Logo Section */}
        <div className="text-center mb-8">
          <Logo />
          <div className="mt-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Join AgriConnect
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Create your account to start trading
            </p>
          </div>
        </div>

        {/* Registration Card */}
        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0 relative overflow-hidden">
          {/* Static background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50" />

          <CardHeader className="relative z-10 pb-4">
            {/* Animated header text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent text-center">
                Create Your Account
              </CardTitle>
              <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
                Fill in your details to get started
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className="relative z-10 p-4 md:p-6">
            {/* Animated login link */}
            <motion.div
              className="text-center mb-6 text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-gray-600">Already have an account? </span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Login here
                </Link>
              </motion.span>
            </motion.div>

            <AnimatePresence>
              {mutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    className="flex items-center gap-2 mb-5 border-red-200 bg-red-50"
                    variant="destructive"
                  >
                    <div className="flex items-center gap-3 font-medium text-sm">
                      <Icon
                        icon="fluent:warning-12-filled"
                        width="20"
                        height="20"
                      />
                      {mutation.error?.response?.data?.message}
                    </div>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Form {...form}>
              <form
                className="flex flex-col gap-4 md:gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Animated Name and Email Row */}
                <motion.div
                  className="flex flex-col md:flex-row gap-4 md:gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-gray-700 font-medium text-sm md:text-base">
                          Name <Required />
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              placeholder="John Doe"
                              className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 text-sm md:text-base"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-gray-700 font-medium text-sm md:text-base">
                          Email <Required />
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              placeholder="example@gmail.com"
                              className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 text-sm md:text-base"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Animated Password Row */}
                <motion.div
                  className="flex flex-col md:flex-row gap-4 md:gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-gray-700 font-medium text-sm md:text-base">
                          Password <Required />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Password"
                              type={isPasswordVisible ? "text" : "password"}
                              className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 pr-10 md:pr-12 transition-all duration-200 text-sm md:text-base"
                              {...field}
                            />
                            <motion.button
                              type="button"
                              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors duration-150"
                              onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                              }
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Icon
                                icon={
                                  !isPasswordVisible
                                    ? "solar:eye-closed-bold"
                                    : "solar:eye-bold"
                                }
                                className="text-gray-500"
                                width="18"
                                height="18"
                              />
                            </motion.button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-gray-700 font-medium text-sm md:text-base">
                          Confirm Password <Required />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Confirm Password"
                              type={
                                isConfirmPasswordVisible ? "text" : "password"
                              }
                              className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 pr-10 md:pr-12 transition-all duration-200 text-sm md:text-base"
                              {...field}
                            />
                            <motion.button
                              type="button"
                              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors duration-150"
                              onClick={() =>
                                setIsConfirmPasswordVisible(
                                  !isConfirmPasswordVisible
                                )
                              }
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Icon
                                icon={
                                  !isConfirmPasswordVisible
                                    ? "solar:eye-closed-bold"
                                    : "solar:eye-bold"
                                }
                                className="text-gray-500"
                                width="18"
                                height="18"
                              />
                            </motion.button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Animated Phone and Address Row */}
                <motion.div
                  className="flex flex-col md:flex-row gap-4 md:gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-gray-700 font-medium text-sm md:text-base">
                          Phone <Required />
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <PhoneInput {...field} />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-gray-700 font-medium text-sm md:text-base">
                          Address <Required />
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              placeholder="Kathmandu, Nepal"
                              className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 text-sm md:text-base"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Animated User Type Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <FormLabel className="text-gray-700 font-medium text-sm md:text-base mb-3 block">
                    I want to <Required />
                  </FormLabel>
                  <CustomRadioButton
                    buttons={[
                      {
                        label: "Buy Products",
                        icon: "mynaui:cart-solid",
                        value: "buyer",
                      },
                      {
                        label: "Sell Products",
                        icon: "material-symbols:sell",
                        value: "seller",
                      },
                    ]}
                    onChange={(value) => {
                      form.clearErrors("userType");
                      form.setValue("userType", value);
                    }}
                  />
                  <FormMessage className="text-xs md:text-sm text-red-500 mt-2">
                    {form.formState.errors.userType?.message}
                  </FormMessage>
                </motion.div>

                {/* Animated Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LoadingButton
                      loading={mutation.isPending}
                      className="w-full h-10 md:h-12 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
                    >
                      {mutation.isPending
                        ? "Creating Account..."
                        : "Create Account"}
                    </LoadingButton>
                  </motion.div>
                </motion.div>
              </form>
            </Form>

            {/* Static footer text */}
            <div className="text-center mt-6 text-xs md:text-sm text-gray-500">
              <p>
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
