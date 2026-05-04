"use client";
import { Formik } from "formik"; // Formik forms
import * as Yup from "yup"; // Yup Schema Validation
import { usePeople } from "@/hooks/usePeople";

import {
  Card,
  Heading2,
  Button,
  Divider,
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

type Props = {};

export const ReplacePeopleForm = (props: Props) => {
  const nameRegex = /^[A-Za-z\s'-]+$/;
  const phoneRegex =
    /^((\+[1-9]{1,4}[\s\-]*)|([\(][0-9]{2,3}[\)][\s\-]*)|([0-9]{2,4})[\s\-]*)*?[0-9]{3,4}?[\s\-]*[0-9]{3,4}?$/;
  const idRegex = /^[a-z0-9]+$/;

  const { mutate: replacePeople, isPending: replacePeopleIsPending } =
    usePeople().replaceById;

  return (
    <Card className="flex flex-col items-stretch justify-center gap-4">
      <Formik
        initialValues={{
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
        }}
        validationSchema={Yup.object({
          id: Yup.string()
            .matches(
              idRegex,
              "ID can only contain lowercase letters and numbers",
            )
            .max(16, "Must be within 16 characters")
            .required("Required Field"),
          firstName: Yup.string()
            .matches(
              nameRegex,
              "First name can only contain letters, spaces, hyphens, or apostrophes",
            )
            .max(30, "Must be 30 characters or less")
            .required("Required Field"),
          lastName: Yup.string()
            .matches(
              nameRegex,
              "Last name can only contain letters, spaces, hyphens, or apostrophes",
            )
            .max(30, "Must be 30 characters or less")
            .required("Required Field"),
          age: Yup.number()
            .integer("Must be a positive number")
            .min(0, "Please enter a valid number")
            .max(120, "Please enter a valid number"),
          designation: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Required Field"),
          email: Yup.string()
            .email("Please enter a valid email address")
            .required("Required Field"),
          phone: Yup.string()
            .matches(phoneRegex, "Please enter a valid phone number")
            .required("Required Field"),
          bio: Yup.string().max(140, "Must be 140 characters or less"),
          skills: Yup.string(),
          socialLinks: Yup.object({
            linkedIn: Yup.string().url("Please enter a valid url"),
            website: Yup.string().url("Please enter a valid url"),
            github: Yup.string().url("Please enter a valid url"),
          }),
        })}
        onSubmit={(values, { resetForm }) => {
          const formattedData = {
            ...values,
            age: values.age === "" ? undefined : Number(values.age),
            skills: values.skills
              ? values.skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [],
            bio: values.bio || undefined,
            profilePic: values.profilePic || undefined,
            bgImage: values.bgImage || undefined,
            socialLinks: {
              linkedIn: values.socialLinks.linkedIn || undefined,
              website: values.socialLinks.website || undefined,
              github: values.socialLinks.github || undefined,
            },
          };
          replacePeople(
            { replaceId: formattedData.id, replaceData: formattedData },
            {
              onSuccess: () => {
                console.log(
                  `Data for ID: ${formattedData.id}, ${formattedData.firstName} ${formattedData.lastName} submitted successfully.`,
                );
                resetForm();
              },
            },
          );
        }}
      >
        {(formik) => (
          <form
            className="flex flex-col items-stretch align-center gap-6"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-row items-center flex-1 gap-2">
              <AlternateEmailRounded className="text-primary" />
              <label htmlFor="id">User ID:</label>
              <TextInput
                id="id"
                type="text"
                placeholder="10"
                className="w-full"
                error={formik.errors.id}
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
                  error={formik.errors.firstName}
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
                  error={formik.errors.lastName}
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
                  error={formik.errors.age}
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
                  error={formik.errors.designation}
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
                  error={formik.errors.email}
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
                  error={formik.errors.phone}
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
                error={formik.errors.bio}
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
                error={formik.errors.skills}
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
                  error={formik.errors.socialLinks?.linkedIn}
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
                  error={formik.errors.socialLinks?.website}
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
                  error={formik.errors.socialLinks?.github}
                  {...formik.getFieldProps("socialLinks.github")}
                />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <Button
                disabled={replacePeopleIsPending}
                type="submit"
                className="flex-1 py-2"
              >
                {replacePeopleIsPending ? `Saving...` : `Submit`}
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
        )}
      </Formik>
    </Card>
  );
};
