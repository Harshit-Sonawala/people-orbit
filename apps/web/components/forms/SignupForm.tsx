"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks";
import {
  firstNameValidation,
  lastNameValidation,
  designationValidation,
  companyValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "@/components/forms/formValidations";
import { getFormError } from "@/utils/getFormError";
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
  BusinessRounded,
  EmailRounded,
  KeyRounded,
  PhoneRounded,
  WorkRounded,
} from "@mui/icons-material";
import Image from "next/image";
import signupImg from "@/public/signup_img.svg";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";

export const SignupForm = () => {
  const { signup } = useAuth();
  const { mutate, isPending } = signup();
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      designation: "",
      company: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: firstNameValidation,
      lastName: lastNameValidation,
      designation: designationValidation,
      company: companyValidation,
      email: emailValidation,
      phone: phoneValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation,
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.confirmPassword === values.password) {
        mutate(values, {
          onSuccess: (result) => {
            resetForm();
            dispatch(
              showNotification({
                title: "Successfully Signed up",
                message: `Welcome to PeopleOrbit, ${result.user?.firstName || "User"}!`,
                type: "success",
              }),
            );
            // window.location.href = "/"; // push to / with a page refresh
            router.push("/");
            router.refresh();
          },
          onError: (error: unknown) => {
            const err = error as {
              response?: { data?: { message?: string } };
              message?: string;
            };
            dispatch(
              showNotification({
                title: "Signup Error",
                message: `${err.response?.data?.message || err.message || "Failed to sign up"}`,
                type: "error",
              }),
            );
          },
        });
      }
    },
  });

  return (
    <Card className="flex flex-col items-center justify-evenly gap-8 py-10 px-12 w-full self-center">
      <div className="flex items-center justify-center p-8 rounded-lg bg-surface max-w-80">
        <Image
          src={signupImg}
          alt={`Login Image`}
          sizes="(max-width: 1280px) 128px, (max-width: 768px) 112px"
          className="object-cover"
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-stretch gap-6"
      >
        <div className="flex flex-col gap-2">
          <Heading variant="md" className="text-secondary">
            Create an Account
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
              error={getFormError("firstName", formik.errors, formik.touched)}
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
              error={getFormError("lastName", formik.errors, formik.touched)}
              {...formik.getFieldProps("lastName")}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
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
              error={getFormError("designation", formik.errors, formik.touched)}
              {...formik.getFieldProps("designation")}
            />
          </div>
          <div className="flex flex-col items-stretch justify-center gap-4 w-full">
            <div className="flex flex-row items-center flex-1 gap-2">
              <BusinessRounded className="text-primary" />
              <label htmlFor="company">Company:</label>
            </div>
            <TextInput
              id="company"
              type="text"
              placeholder="Example Corp"
              className="w-full"
              error={getFormError("company", formik.errors, formik.touched)}
              {...formik.getFieldProps("company")}
            />
          </div>
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
            error={getFormError("email", formik.errors, formik.touched)}
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
            error={getFormError("phone", formik.errors, formik.touched)}
            {...formik.getFieldProps("phone")}
          />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <KeyRounded className="text-primary" />
            <label htmlFor="password">Password:</label>
          </div>
          <TextInput
            id="password"
            type="password"
            className="w-full"
            error={getFormError("password", formik.errors, formik.touched)}
            {...formik.getFieldProps("password")}
          />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-4 w-full">
          <div className="flex flex-row items-center flex-1 gap-2">
            <KeyRounded className="text-primary" />
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            className="w-full"
            error={getFormError(
              "confirmPassword",
              formik.errors,
              formik.touched,
            )}
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
            By continuing you agree to the following policies:
          </Heading>
          <p>- All information provided by you is correct and verifiable.</p>
          <p>- You are atleast 16 years of age.</p>
          <p>- You agree to all the terms and conditions.</p>
          <p>
            - Your profile will be publicly visible and searchable for all users
            on the platform.
          </p>
          <p>
            - You agree to communicate respectfully with other users, never
            engaging in any forms of hate, harassment or bullying.
          </p>
          <p className="text-warning">
            Violating any of the above policies at any time will result in an
            immediate profile ban.
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
