"use client";
import { useUsers } from "@/hooks";
import { useFormik } from "formik";
import {
  idValidation,
  firstNameValidation,
  lastNameValidation,
  designationValidation,
  emailValidation,
  phoneValidation,
  ageValidation,
  bioValidation,
  urlValidation,
} from "./formValidations";
import * as Yup from "yup";
import { getFormError } from "@/lib/utils";

import {
  Heading,
  Divider,
  Card,
  Button,
  TextInput,
  TextArea,
} from "@/components";
import {
  AlternateEmailRounded,
  BadgeRounded,
  CakeRounded,
  WorkRounded,
  EmailRounded,
  PhoneRounded,
  ShortTextRounded,
  ConstructionRounded,
  LinkedIn,
  LanguageRounded,
  GitHub,
} from "@mui/icons-material";

export const ReplaceUserForm = () => {
  const { replaceById } = useUsers();
  const { mutate, isPending } = replaceById();

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      designation: "",
      email: "",
      phone: "",
      bio: "",
      skills: "",
      socialLinks: { linkedIn: "", website: "", github: "" },
      profilePic: "",
      bgImage: "",
    },
    // enableReinitialize: true,
    validationSchema: Yup.object({
      id: idValidation,
      firstName: firstNameValidation,
      lastName: lastNameValidation,
      age: ageValidation,
      designation: designationValidation,
      email: emailValidation,
      phone: phoneValidation,
      bio: bioValidation,
      skills: Yup.string(),
      socialLinks: Yup.object({
        linkedIn: urlValidation,
        website: urlValidation,
        github: urlValidation,
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      const { linkedIn, website, github } = values.socialLinks;
      const hasLinks = linkedIn || website || github;
      const formattedData = {
        ...values,
        age: values.age === "" ? undefined : Number(values.age),
        skills: values.skills
          ? values.skills
              .split(",")
              .map((skill: string) => skill.trim())
              .filter(Boolean)
          : [],
        bio: values.bio || undefined,
        profilePic: values.profilePic || undefined,
        bgImage: values.bgImage || undefined,
        socialLinks: hasLinks
          ? {
              linkedIn: linkedIn || undefined,
              website: website || undefined,
              github: github || undefined,
            }
          : undefined,
      };
      mutate(
        { replaceId: formattedData.id, replaceData: formattedData },
        {
          onSuccess: () => {
            resetForm();
          },
        },
      );
    },
  });

  return (
    <Card className="flex flex-col items-stretch justify-center gap-4  py-10 px-12">
      <form
        className="flex flex-col items-stretch gap-6"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <Heading variant="md" className="text-secondary">
            Replace User Record
          </Heading>
          <Divider variant="surface-top" />
          <p>Keep the existing user id and update the rest of the details.</p>
        </div>
        <div className="flex flex-row items-center flex-1 gap-2">
          <AlternateEmailRounded className="text-primary" />
          <label htmlFor="id">User ID:</label>
          <TextInput
            id="id"
            type="text"
            placeholder="10"
            className="w-full"
            error={getFormError("id", formik.errors, formik.touched)}
            {...formik.getFieldProps("id")}
          />
        </div>
        <div className="flex flex-row items-center justify-stretch gap-4 w-full">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <BadgeRounded className="text-primary" />
              <label htmlFor="firstName">First Name:</label>
            </div>
            <TextInput
              id="firstName"
              type="text"
              placeholder="Johnathan"
              className="w-full"
              error={getFormError("firstName", formik.errors, formik.touched)}
              {...formik.getFieldProps("firstName")}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
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

        <div className="flex flex-row items-center justify-stretch gap-4 w-full">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <CakeRounded className="text-primary" />
              <label htmlFor="age">Age:</label>
            </div>
            <TextInput
              variant="filled"
              id="age"
              type="number"
              placeholder="20"
              className="w-full"
              error={getFormError("age", formik.errors, formik.touched)}
              {...formik.getFieldProps("age")}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <WorkRounded className="text-primary" />
              <label htmlFor="designation">Designation:</label>
            </div>
            <TextInput
              variant="filled"
              id="designation"
              type="text"
              placeholder="Full Stack Developer"
              className="w-full"
              error={getFormError("designation", formik.errors, formik.touched)}
              {...formik.getFieldProps("designation")}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-stretch gap-4 w-full">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <EmailRounded className="text-primary" />
              <label htmlFor="email">Email Address:</label>
            </div>
            <TextInput
              variant="filled"
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              className="w-full"
              error={getFormError("email", formik.errors, formik.touched)}
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <PhoneRounded className="text-primary" />
              <label htmlFor="phone">Phone Number:</label>
            </div>
            <TextInput
              variant="filled"
              id="phone"
              type="text"
              placeholder="+910987654321"
              className="w-full"
              error={getFormError("phone", formik.errors, formik.touched)}
              {...formik.getFieldProps("phone")}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-row items-center flex-1 gap-2">
            <ShortTextRounded className="text-primary" />
            <label htmlFor="bio">Bio / Headline:</label>
          </div>
          <TextArea
            variant="filled"
            id="bio"
            placeholder="Tell us a bit about yourself in 140 characters or less..."
            error={getFormError("bio", formik.errors, formik.touched)}
            {...formik.getFieldProps("bio")}
          />
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-row items-center flex-1 gap-2">
            <ConstructionRounded className="text-primary" />
            <label htmlFor="skills">Skills:</label>
          </div>
          <TextArea
            variant="filled"
            id="skills"
            placeholder="Please enter comma separated skills like: Next.js, Nestjs, Tailwind, TypeScript"
            error={getFormError("skills", formik.errors, formik.touched)}
            {...formik.getFieldProps("skills")}
          />
        </div>

        <div className="flex flex-row items-center justify-stretch gap-4 w-full">
          <div className="flex flex-col flex-1 items-stretch justify-center gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <LinkedIn className="text-primary" />
              <label htmlFor="socialLinkedIn">LinkedIn Profile:</label>
            </div>
            <TextInput
              id="socialLinkedIn"
              type="text"
              placeholder="https://www.linkedin.com/john-doe-09"
              className="w-full"
              error={getFormError(
                "socialLinks.linkedIn",
                formik.errors,
                formik.touched,
              )}
              {...formik.getFieldProps("socialLinks.linkedIn")}
            />
          </div>

          <div className="flex flex-col flex-1 items-stretch justify-center gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <LanguageRounded className="text-primary" />
              <label htmlFor="socialWebsite">Website:</label>
            </div>
            <TextInput
              id="socialWebsite"
              type="text"
              placeholder="https://www.my-website.com"
              className="w-full"
              error={getFormError(
                "socialLinks.website",
                formik.errors,
                formik.touched,
              )}
              {...formik.getFieldProps("socialLinks.website")}
            />
          </div>

          <div className="flex flex-col flex-1 items-stretch justify-center gap-2">
            <div className="flex flex-row items-center flex-1 gap-2">
              <GitHub className="text-primary" />
              <label htmlFor="socialGitHub">GitHub Profile:</label>
            </div>
            <TextInput
              id="socialGitHub"
              type="text"
              placeholder="https://www.github.com/My-Github"
              className="w-full"
              error={getFormError(
                "socialLinks.github",
                formik.errors,
                formik.touched,
              )}
              {...formik.getFieldProps("socialLinks.github")}
            />
          </div>
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
      </form>
    </Card>
  );
};
