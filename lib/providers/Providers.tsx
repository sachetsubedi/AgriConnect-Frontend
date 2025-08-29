"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { toast, Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, error) {
          if (error instanceof AxiosError) {
            if (error.status == 401) {
              toast.error("Session expired, please log in");
              router.push("/login");
            }
          }
          return false;
        },
      },
      mutations: {
        onSettled(failureCount, error) {
          if (error instanceof AxiosError) {
            if (error.status == 401) {
              router.push("/login");
            }
          }
          return false;
        },
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <Toaster richColors position="top-right" closeButton />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
