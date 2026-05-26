import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthResponse } from "@/types";

const AUTH_URL = "/api/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const signup = () => {};

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
        // TODO: Update Redux?
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
};
