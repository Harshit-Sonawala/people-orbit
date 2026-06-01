"use client";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, AuthResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

const AUTH_URL = "/api/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const signup = () => {
    return useMutation({
      mutationFn: async (
        signupData: Omit<
          User,
          | "id"
          | "age"
          | "role"
          | "bio"
          | "skills"
          | "socialLinks"
          | "profilePic"
          | "bgImage"
          | "createdOn"
          | "updatedOn"
          | "isBanned"
        >,
      ): Promise<AuthResponse> => {
        const { data } = await axios.post(`${AUTH_URL}/signup`, signupData);
        return data;
      },
      onSuccess: async (result) => {
        // console.log(
        //   `Signup successful. Logged in userId: ${JSON.stringify(result.userId)}, object: ${JSON.stringify(result.user)}`,
        // );
        if (result.user) dispatch(setUser(result.user));
        router.push("/");
      },
      onError: (error: any) => {
        console.error(
          "useAuth signup error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const login = () => {
    return useMutation({
      mutationFn: async (credentials: {
        email: string;
        password: string;
      }): Promise<AuthResponse> => {
        const { data } = await axios.post(`${AUTH_URL}/login`, credentials);
        return data;
      },
      onSuccess: async (result) => {
        // console.log(
        //   `Logged in userId: ${JSON.stringify(result.userId)}, object: ${JSON.stringify(result.user)}`,
        // );
        if (result.user) dispatch(setUser(result.user));
        router.push("/");
      },
      onError: (error: any) => {
        console.error(
          "useAuth login error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const logout = async () => {
    try {
      await axios.post(`${AUTH_URL}/logout`);
    } catch (error: any) {
      console.error(
        "useAuth logout error: ",
        error.response?.data?.message || error.message,
      );
    } finally {
      queryClient.clear();
      dispatch(setUser(null));
      router.push("/");
    }
  };

  return {
    signup,
    login,
    logout,
  };
};
