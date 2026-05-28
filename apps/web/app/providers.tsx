"use client";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { User } from "@/types";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import { ThemeWrapper } from "@/components";

function UserInitializer({ user }: { user: User | null }) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`UserInitializer user: ${user}`);
    if (user) {
      dispatch(setUser(user));
      console.log(`user ${user} dispatched.`);
    }
  }, [user, dispatch]);
  return null;
}

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
      <ThemeWrapper>
        <QueryClientProvider client={queryClient}>
          <UserInitializer user={user} />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeWrapper>
    </Provider>
  );
}
