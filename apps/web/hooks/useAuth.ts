import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, AuthResponse } from "@/types";

const AUTH_URL = "/api/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();

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
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        console.log(
          `Signup successful. Logged in User: ${JSON.stringify(result)}`,
        );
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
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        console.log(`Logged in User: ${JSON.stringify(result)}`);
      },
      onError: (error: any) => {
        console.error(
          "useAuth login error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const logout = () => {};

  return {
    signup,
    login,
    logout,
  };
};
