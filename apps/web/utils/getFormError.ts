"use client";
import { FormikErrors, FormikTouched, getIn } from "formik";

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
