"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";
const client = new QueryClient();
const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <Toaster richColors position="top-right" />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
