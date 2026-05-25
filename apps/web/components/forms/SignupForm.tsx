"use client";
import { useUsers } from "@/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  firstNameValidation,
  lastNameValidation,
  designationValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "@/components/forms/formValidations";
import {
  Card,
  Heading,
  Divider,
  TextInput,
  Button,
  CustomLink,
} from "@/components";
import {
  BadgeRounded,
  EmailRounded,
  PasswordRounded,
  PhoneRounded,
  WorkRounded,
} from "@mui/icons-material";

export const SignupForm = () => {
  const isPending = false; // replace with useUsers result var
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      designation: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: firstNameValidation,
      lastName: lastNameValidation,
      designation: designationValidation,
      email: emailValidation,
      phone: phoneValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation,
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // call mutate with values
    },
  });

  const getError = (
    field: keyof typeof formik.values & string,
    nestedField?: string,
  ): string | undefined => {
    const err = formik.errors[field];

    // Nested case: getError("socialLinks", "linkedIn")
    if (nestedField) {
      if (typeof err === "object" && !Array.isArray(err) && err !== null) {
        const nestedErr = (err as Record<string, unknown>)[nestedField];
        return typeof nestedErr === "string" ? nestedErr : undefined;
      }
      return undefined;
    }

    // Simple error case: getError("firstName")
    return typeof err === "string" ? err : undefined;
  };

  return (
    <Card className="py-10 px-12 w-full self-center max-w-200">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-stretch gap-6"
      >
        <div className="flex flex-col gap-2">
          <Heading variant="md" className="text-secondary">
            Signup
          </Heading>
          <Divider variant="surface-top" />
          <p>
            Create a new PeopleOrbit account to start using all the features.
          </p>
          <p>
            Your provided email and password will be used for future logins.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-stretch justify-center gap-4 w-full">
            <div className="flex flex-row items-center flex-1 gap-2">
              <BadgeRounded className="text-primary" />
              <label htmlFor="firstName">First Name:</label>
            </div>
            <TextInput
              id="firstName"
              type="text"
              placeholder="John"
              className="w-full"
              error={getError("firstName")}
              {...formik.getFieldProps("firstName")}
            />
          </div>
          <div className="flex flex-col items-stretch justify-center gap-4 w-full">
            <div className="flex flex-row items-center flex-1 gap-2">
              <BadgeRounded className="text-primary" />
              <label htmlFor="lastName">Last Name:</label>
            </div>
            <TextInput
              id="lastName"
              type="text"
              placeholder="Doe"
              className="w-full"
              error={getError("lastName")}
              {...formik.getFieldProps("lastName")}
            />
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <WorkRounded className="text-primary" />
            <label htmlFor="designation">Designation:</label>
          </div>
          <TextInput
            id="designation"
            type="text"
            placeholder="Full Stack Developer"
            className="w-full"
            error={getError("designation")}
            {...formik.getFieldProps("designation")}
          />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <EmailRounded className="text-primary" />
            <label htmlFor="email">Email:</label>
          </div>
          <TextInput
            id="email"
            type="text"
            placeholder="johndoe@example.com"
            className="w-full"
            error={getError("email")}
            {...formik.getFieldProps("email")}
          />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <PhoneRounded className="text-primary" />
            <label htmlFor="phone">Phone:</label>
          </div>
          <TextInput
            id="phone"
            type="text"
            placeholder="+91 9876543210"
            className="w-full"
            error={getError("phone")}
            {...formik.getFieldProps("phone")}
          />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <PasswordRounded className="text-primary" />
            <label htmlFor="password">Password:</label>
          </div>
          <TextInput
            id="password"
            type="password"
            className="w-full"
            error={getError("password")}
            {...formik.getFieldProps("password")}
          />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <PasswordRounded className="text-primary" />
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            className="w-full"
            error={getError("confirmPassword")}
            {...formik.getFieldProps("confirmPassword")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Heading variant="sm">Password Rules:</Heading>
          <p>
            - Must be minimum 12 characters in length, and maximum 128
            characters
          </p>
          <p>
            - Must contain atleast one lowercase and one uppercase character
          </p>
          <p>- Must contain atleast one numeric character</p>
          <p>- Must contain atleast one special character</p>
        </div>

        <div className="flex flex-col gap-1">
          <Heading variant="sm">
            By continuing you agree to the following:
          </Heading>
          <p>- All information provided by you is correct</p>
          <p>- You are atleast 16 years of age</p>
          <p>- You agree to all the terms and conditions</p>
          <p>
            - Your profile will be publicly visible to all users on the platform
          </p>
          <p className="text-warning">
            Violating any of the above policies will result in an immediate
            profile ban.
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <Button disabled={isPending} type="submit" className="flex-1 py-2">
            {isPending ? `Saving...` : `Submit`}
          </Button>
          <Button
            variant="outlined"
            onClick={formik.handleReset}
            className="flex-1 py-2"
          >
            Clear
          </Button>
        </div>

        <div className="flex flex-row items-center justify-stretch">
          <p>Already have an account? Login here:</p>
          <CustomLink href="/login">Login</CustomLink>
        </div>
      </form>
    </Card>
  );
};
