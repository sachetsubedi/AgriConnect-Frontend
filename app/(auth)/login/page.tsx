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
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type T_UserLogin = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

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

  // Animation variants
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
      x: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const bannerVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
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
      className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Login form - Full width on mobile, 30% on larger screens */}
      <motion.div
        className="w-full lg:w-[30%] flex flex-col items-center justify-center min-h-screen p-4 lg:p-8 relative"
        variants={cardVariants}
      >
        {/* Background decorative elements - only show on mobile when banner is hidden */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full lg:hidden"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/10 rounded-full lg:hidden"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />

        <motion.div variants={itemVariants} className="mb-8">
          <Logo />
        </motion.div>

        <motion.div variants={itemVariants} className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 relative overflow-hidden">
            {/* Card background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50" />

            <CardHeader className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent text-center">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600 text-center mt-2">
                  Sign in to your AgriConnect account
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="relative z-10 p-6">
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
                      <div className="flex items-center gap-3 font-medium">
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
                        {mutation.error?.response?.data.message}
                      </div>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Form {...form}>
                <motion.form
                  className="flex flex-col gap-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                placeholder="Enter your email"
                                className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Password
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              className="relative"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                placeholder="Enter your password"
                                type={isPasswordVisible ? "text" : "password"}
                                className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 pr-12 transition-all duration-300"
                                {...field}
                              />
                              <motion.button
                                type="button"
                                className="absolute  right-3 top-3 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors"
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
                                  width="20"
                                  height="20"
                                />
                              </motion.button>
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LoadingButton
                        type="submit"
                        loading={mutation.isPending}
                        className="w-full h-12 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {mutation.isPending ? "Signing in..." : "Sign In"}
                      </LoadingButton>
                    </motion.div>
                  </motion.div>

                  {/* Register Link */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center text-gray-600"
                  >
                    Don&apos;t have an account?{" "}
                    <Link
                      href={"/register"}
                      className="font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Register here
                    </Link>
                  </motion.div>
                </motion.form>
              </Form>

              {/* Additional login options */}
              {/* <motion.div
                className="mt-6 pt-6 border-t border-gray-100"
                variants={itemVariants}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">Or continue with</p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      className="flex items-center justify-center w-12 h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon icon="logos:google-icon" width="20" height="20" />
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center w-12 h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon icon="logos:facebook" width="20" height="20" />
                    </motion.button>
                  </div>
                </div>
              </motion.div> */}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Banner - Only show on large screens */}
      <motion.div
        className="hidden lg:block lg:w-[70%] h-screen relative overflow-hidden"
        variants={bannerVariants}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.img
          src="/new-banner.jpg"
          alt="AgriConnect Banner"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Floating text overlay */}
        <motion.div
          className="absolute top-1/2 left-16 transform -translate-y-1/2 z-20 text-white max-w-md"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 drop-shadow-lg"
            variants={floatingVariants}
            animate="animate"
          >
            Connect. Trade. Grow.
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Join Nepal's largest agricultural marketplace and transform your
            farming business.
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full backdrop-blur-sm"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
