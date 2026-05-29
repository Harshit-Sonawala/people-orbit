import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { User } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMeServer = async (
  accessToken: string,
): Promise<User | null> => {
  try {
    const { data } = await axios.get<User>(
      `${process.env.INTERNAL_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(`getMeServer returned: ${JSON.stringify(data)}`);
    return data;
  } catch (e: any) {
    console.error(
      `getMeServer error: ${e?.response?.status} ${JSON.stringify(e?.response?.data)}`,
    );
    return null;
  }
};

export const getMeClient = async (): Promise<User | null> => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    try {
      const { data } = await axios.get<User>("/api/auth/me");
      return data;
    } catch {
      return null;
    }
  } else {
    console.log(
      `localStorage isLoggedIn: ${localStorage.getItem("isLoggedIn")}.`,
    );
    return null;
  }
};
