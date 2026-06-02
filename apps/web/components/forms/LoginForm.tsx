"use client";
import { useAuth } from "@/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  emailValidation,
  passwordValidation,
} from "@/components/forms/formValidations";
import { getFormError } from "./getFormError";
import {
  Card,
  Heading,
  Divider,
  TextInput,
  Button,
  CustomLink,
} from "@/components";
import { EmailRounded, KeyRounded } from "@mui/icons-material";
import Image from "next/image";
import loginImg from "@/public/login_img.svg";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const { login } = useAuth();
  const { mutate, isPending } = login();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: emailValidation,
      password: passwordValidation,
    }),
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          window.location.href = "/"; // push to / with a page refresh
          // router.push("/");
          // router.refresh();
        },
      });
    },
  });

  return (
    <Card className="flex flex-col items-center justify-center gap-8 py-10 px-12 w-full self-center">
      <div className="flex items-center justify-center p-8 rounded-lg bg-surface max-w-100">
        <Image
          src={loginImg}
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
            Login
          </Heading>
          <Divider variant="surface-top" />
          <p>Log back into your PeopleOrbit user account.</p>
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
          <p>Don't have an account? Create one here:</p>
          <CustomLink href="/signup">Create Account</CustomLink>
        </div>
      </form>
    </Card>
  );
};
