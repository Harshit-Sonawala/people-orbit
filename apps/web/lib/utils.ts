import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { User } from "@/types";
import { FormikErrors, FormikTouched, getIn } from "formik";

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
    return data;
  } catch (e: any) {
    console.error(
      `getMeServer error: ${e?.response?.status} ${JSON.stringify(e?.response?.data)}`,
    );
    return null;
  }
};

export const getFormError = <T>(
  field: string,
  errors: FormikErrors<T>,
  touched: FormikTouched<T>,
): string | undefined => {
  const isTouched = getIn(touched, field);
  if (!isTouched) return undefined;

  const error = getIn(errors, field);
  return typeof error === "string" ? error : undefined;
};
