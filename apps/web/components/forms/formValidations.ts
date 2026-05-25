import * as Yup from "yup";

const idRegex = /^[a-z0-9-]+$/;
const nameRegex = /^[A-Za-z\s'-]+$/;
const designationRegex = /^[A-Za-z0-9\s'-\.&/]+$/;
const phoneRegex =
  /^((\+[1-9]{1,4}[\s\-]*)|([\(][0-9]{2,3}[\)][\s\-]*)|([0-9]{2,4})[\s\-]*)*?[0-9]{3,4}?[\s\-]*[0-9]{3,4}?$/;

export const idValidation = Yup.string()
  .matches(idRegex, "ID can only contain lowercase letters, numbers, and hyphens")
  .max(100, "Must be within 100 characters")
  .required("Required Field");

export const firstNameValidation = Yup.string()
  .matches(
    nameRegex,
    "First name Can only contain letters, spaces, hyphens, or apostrophes",
  )
  .max(30, "Must be within 30 characters")
  .required("Required Field");

export const lastNameValidation = Yup.string()
  .matches(
    nameRegex,
    "Last name Can only contain letters, spaces, hyphens, or apostrophes",
  )
  .max(30, "Must be within 30 characters")
  .required("Required Field");

export const designationValidation = Yup.string()
  .matches(
    designationRegex,
    "Designation can only contain letters, numbers, spaces, and standard symbols (&, /, ., -, ')",
  )
  .max(40, "Must be within 40 characters")
  .required("Required Field");

export const emailValidation = Yup.string()
  .email("Please enter a valid email address")
  .max(100, "Must be within 100 characters")
  .required("Required Field");

export const phoneValidation = Yup.string()
  .matches(phoneRegex, "Please enter a valid phone number")
  .max(20, "Must be within 20 characters")
  .required("Required Field");

export const passwordValidation = Yup.string()
  .min(12, "Password must be at least 12 characters")
  .max(128, "Password must not exceed 128 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/,
    "Password must contain at least one special character",
  )
  .test(
    "no-consecutive-chars",
    "Password cannot contain more than 2 consecutive identical characters",
    (value) => {
      if (!value) return true;
      return !/(.)\1{2,}/.test(value);
    },
  )
  .required("Password is required");

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required("Please re-type your password");

export const ageValidation = Yup.number()
  .integer("Must be a positive number")
  .min(16, "Must be atleast 16 years of age")
  .max(120, "Must be within 120 years of age");

export const bioValidation = Yup.string().max(
  140,
  "Must be within 140 characters",
);

export const urlValidation = Yup.string().url("Please enter a valid url");
