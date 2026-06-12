import axios from "axios";
import { User } from "@/types";

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
    return data;
  } catch (e: any) {
    console.error(
      `getMeServer error: ${e?.response?.status} ${JSON.stringify(e?.response?.data)}`,
    );
    return null;
  }
};
