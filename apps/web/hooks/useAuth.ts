import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, AuthResponse } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUserId } from "@/store/authSlice";

const AUTH_URL = "/api/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUserId,
  );

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
        dispatch(setUserId(result.userId));
        console.log(
          `Signup successful. Logged in User: ${JSON.stringify(result.userId)}`,
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
        dispatch(setUserId(result.userId));
        console.log(`Logged in User: ${JSON.stringify(result.userId)}`);
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
      dispatch(setUserId(null));
    }
  };

  const getMe = () => {
    return useQuery({
      queryKey: ["auth", "me"],
      queryFn: async (): Promise<User> => {
        const { data } = await axios.get<User>(`${AUTH_URL}/me`);
        return data;
      },
      retry: false, // do not retry if no token/expired token
    });
  };

  return {
    signup,
    login,
    logout,
    getMe,
  };
};
