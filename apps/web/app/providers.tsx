"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { User } from "@/types";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components";
import AuthProvider from "@/app/AuthProvider";
import AuthExpiredInterceptor from "./AuthExpiredInterceptor";

export default function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider user={user}>
            <AuthExpiredInterceptor>{children}</AuthExpiredInterceptor>
          </AuthProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}
