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
import { AnimatePresence, motion, Variants } from "framer-motion";
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

  // Animation variants - consistent with login page
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-full"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-green-500/5 rounded-full"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 md:w-10 md:h-10 bg-primary/5 rounded-full"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
      />

      {/* Main container */}
      <motion.div className="w-full max-w-4xl mx-auto" variants={cardVariants}>
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Logo />
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Join AgriConnect
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Create your account to start trading
            </p>
          </motion.div>
        </motion.div>

        {/* Registration Card */}
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0 relative overflow-hidden">
            {/* Card background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50" />

            <CardHeader className="relative z-10 pb-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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
              {/* Login link */}
              <motion.div
                className="text-center mb-6 text-sm md:text-base"
                variants={itemVariants}
              >
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Login here
                </Link>
              </motion.div>

              <AnimatePresence>
                {mutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Alert
                      className="flex items-center gap-2 mb-5 border-red-200 bg-red-50"
                      variant="destructive"
                    >
                      <div className="flex items-center gap-3 font-medium text-sm">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon
                            icon="fluent:warning-12-filled"
                            width="20"
                            height="20"
                          />
                        </motion.div>
                        {mutation.error?.response?.data?.message}
                      </div>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Form {...form}>
                <motion.form
                  className="flex flex-col gap-4 md:gap-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Name and Email Row */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-4 md:gap-5"
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
                                className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-300 text-sm md:text-base"
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
                                className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-300 text-sm md:text-base"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage className="text-xs md:text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Password Row */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-4 md:gap-5"
                  >
                    {/* Password field - remove focus animation to fix hover issue */}
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
                                className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 pr-10 md:pr-12 transition-all duration-300 text-sm md:text-base"
                                {...field}
                              />
                              <motion.button
                                type="button"
                                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors z-10"
                                onClick={() =>
                                  setIsPasswordVisible(!isPasswordVisible)
                                }
                                // whileHover={{ scale: 1.1 }}
                                // whileTap={{ scale: 0.9 }}
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

                    {/* Confirm Password field - remove focus animation to fix hover issue */}
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
                                className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 pr-10 md:pr-12 transition-all duration-300 text-sm md:text-base"
                                {...field}
                              />
                              <motion.button
                                type="button"
                                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors z-10"
                                onClick={() =>
                                  setIsConfirmPasswordVisible(
                                    !isConfirmPasswordVisible
                                  )
                                }
                                // whileHover={{ scale: 1.1 }}
                                // whileTap={{ scale: 0.9 }}
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

                  {/* Phone and Address Row */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-4 md:gap-5"
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
                                className="h-10 md:h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-300 text-sm md:text-base"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage className="text-xs md:text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* User Type Selection */}
                  <motion.div variants={itemVariants}>
                    <FormLabel className="text-gray-700 font-medium text-sm md:text-base mb-3 block">
                      I want to <Required />
                    </FormLabel>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
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
                    </motion.div>
                    <FormMessage className="text-xs md:text-sm text-red-500 mt-2">
                      {form.formState.errors.userType?.message}
                    </FormMessage>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LoadingButton
                        loading={mutation.isPending}
                        className="w-full h-10 md:h-12 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                      >
                        {mutation.isPending
                          ? "Creating Account..."
                          : "Create Account"}
                      </LoadingButton>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </Form>

              {/* Footer text */}
              <motion.div
                className="text-center mt-6 text-xs md:text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
