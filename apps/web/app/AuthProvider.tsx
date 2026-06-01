"use client";
import React, { useEffect } from "react";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

type AuthProviderProps = {
  user: User | null;
  children?: React.ReactNode;
};

export default function AuthProvider({ user, children }: AuthProviderProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`AuthProvider dispatched user: ${JSON.stringify(user)}`);
    dispatch(setUser(user));
  }, [user, dispatch]);
  return <>{children}</>;
}
