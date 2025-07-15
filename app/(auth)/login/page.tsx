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
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Login form - Full width on mobile, 30% on larger screens */}
      <div className="w-full lg:w-[30%] flex flex-col items-center justify-center min-h-screen p-4 lg:p-8">
        {/* Static Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        <div className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 relative overflow-hidden">
            {/* Static background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50" />

            <CardHeader className="relative z-10">
              {/* Animated header text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert
                      className="flex items-center gap-2 mb-5 border-red-200 bg-red-50"
                      variant="destructive"
                    >
                      <div className="flex items-center gap-3 font-medium">
                        <Icon
                          icon="fluent:warning-12-filled"
                          width="20"
                          height="20"
                        />
                        {mutation.error?.response?.data.message}
                      </div>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Form {...form}>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {/* Animated Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
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
                                className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Animated Password Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
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
                                className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 pr-12 transition-all duration-200"
                                {...field}
                              />
                              <motion.button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors duration-150"
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

                  {/* Animated Sign In Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LoadingButton
                        type="submit"
                        loading={mutation.isPending}
                        className="w-full h-12 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {mutation.isPending ? "Signing in..." : "Sign In"}
                      </LoadingButton>
                    </motion.div>
                  </motion.div>

                  {/* Animated Register Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center text-gray-600"
                  >
                    Don&apos;t have an account?{" "}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      <Link
                        href={"/register"}
                        className="font-semibold text-primary hover:text-primary/80 transition-colors duration-150"
                      >
                        Register here
                      </Link>
                    </motion.span>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Banner - Only show on large screens */}
      <div className="hidden lg:block lg:w-[70%] h-screen relative overflow-hidden">
        {/* Static overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />

        <img
          src="/new-banner.jpg"
          alt="AgriConnect Banner"
          className="w-full h-full object-cover"
        />

        {/* Animated text overlay */}
        <div className="absolute top-1/2 left-16 transform -translate-y-1/2 z-20 text-white max-w-md">
          <motion.h2
            className="text-4xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Connect. Trade. Grow.
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 drop-shadow-md"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            Join Nepal&apos;s largest agricultural marketplace and transform
            your farming business.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
