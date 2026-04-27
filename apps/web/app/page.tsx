"use client";
import { useState } from "react";
import { Formik } from "formik"; // Formik forms
import * as Yup from "yup"; // Yup Schema Validation
import { useFetchPeople } from "../hooks/useFetchPeople"; // Tanstack Query fetch hook
import { useCreatePeople } from "../hooks/useCreatePeople"; // Tanstack Query POST people hook

import Card from "../components/Card";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";
import Button from "../components/Button";
import Divider from "../components/Divider";
import TextInput from "../components/TextInput";
import PeopleCard from "../components/PeopleCard";

import {
  BadgeRounded,
  WorkRounded,
  EmailRounded,
  PhoneRounded,
  AnnouncementRounded,
  LinkedIn,
  LanguageRounded,
  GitHub,
  ArrowBackRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const {
    data: people,
    isLoading,
    isError,
    error,
  } = useFetchPeople(page, limit);
  const { mutate: createPeople, isPending: createPeopleIsPending } = useCreatePeople();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[90%] mx-auto">
      {isLoading && <p className="text-center py-8">Loading People Data...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {people && (
        <div className="flex flex-col gap-6">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {people.data.map((eachPeople, i) => (
              <PeopleCard People={eachPeople} key={eachPeople.id ?? i} />
            ))}
          </div>

          <div className="flex flex-row items-center justify-center mx-auto">
            <Card className="flex flex-row items-center justify-start gap-4 w-full">
              <div className="flex flex-row items-center justify-center gap-4 w-full">
                <Button
                  variant="rounded"
                  onClick={() => {
                    if (page > 1) {
                      setPage((oldPage) => Math.max(oldPage - 1, 1));
                    }
                  }}
                >
                  <ArrowBackRounded />
                  PREV
                </Button>
                <div className="flex flex-row gap-4">
                  {Array.from(
                    { length: people.meta.totalPages },
                    (_, i) => i + 1,
                  ).map((eachPage) =>
                    people.meta.currentPage === eachPage ? (
                      <Button
                        key={eachPage}
                        variant="rounded"
                        className="w-9 h-9"
                      >
                        {eachPage}
                      </Button>
                    ) : (
                      <Button
                        key={eachPage}
                        variant="outlined-rounded"
                        className="w-9 h-9"
                        onClick={() => {
                          if (eachPage !== page) {
                            // prevent unnecessary fetch
                            setPage(eachPage);
                          }
                        }}
                      >
                        {eachPage}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  variant="rounded"
                  onClick={() => {
                    if (page < people.meta.totalPages) {
                      setPage((oldPage) =>
                        Math.min(people.meta.totalPages, oldPage + 1),
                      );
                    }
                  }}
                >
                  NEXT
                  <ArrowForwardRounded />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <Card className="flex flex-col items-stretch justify-center gap-2 md:w-[80%] lg:w-[60%] mx-auto">
        <Header3>Post People information</Header3>
        <Divider variant="primary" />
        <Formik
          initialValues={{
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
            firstName: Yup.string()
              .max(40, "First name must be 40 characters or less")
              .required("Required Field"),
            lastName: Yup.string()
              .max(40, "Last name must be 40 characters or less")
              .required("Required Field"),
            age: Yup.number()
              .integer("Age must be a positive number")
              .min(0, "Age must be a valid number")
              .max(120, "Age must be a valid number"),
            designation: Yup.string()
              .max(40, "Designation must be 40 characters or less")
              .required("Required Field"),
            email: Yup.string()
              .email("Please enter a valid email address")
              .required("Required Field"),
            phone: Yup.string()
              .matches(phoneRegExp, "Please enter a valid phone number")
              .required("Required Field"),
            bio: Yup.string().max(140, "Bio must be 140 characters or less"),
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
            createPeople(formattedData, {
              onSuccess: () => {
                console.log("Form submitted successfully");
                resetForm();
              },
              onError: () => console.error(`Form submit error: ${error}`),
            });
          }}
        >
          {(formik) => (
            <form
              className="flex flex-col items-stretch align-center gap-6"
              onSubmit={formik.handleSubmit}
            >
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
                    <BadgeRounded className="text-primary" />
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
                  <AnnouncementRounded className="text-primary" />
                  <label htmlFor="bio">Bio / Headline:</label>
                </div>
                <TextInput
                  variant="filled"
                  id="bio"
                  type="text"
                  placeholder="Tell us a bit about yourself in 140 characters or less..."
                  error={formik.errors.bio}
                  {...formik.getFieldProps("bio")}
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
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={formik.handleReset}
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>

      <div className="m-2 flex flex-col gap-2">
        <p>Components Demo:</p>
        <p>Header 1</p>
        <Header1>This is an example of Header 1.</Header1>
        <p>Header 2</p>
        <Header2>This is an example of Header 2.</Header2>
        <p>Header 3</p>
        <Header3>This is an example of Header 3.</Header3>

        <p>Card Component</p>
        <Card variant="surface">
          <p>Card surface variant</p>
        </Card>
        <Card>
          <p className="py-4">Parent Card</p>
          <Card variant="surface-top">
            <p>Child Card surface-top variant</p>
          </Card>
        </Card>
        <Card variant="outlined">
          <p>Card outlined variant</p>
        </Card>
        <Card variant="outlined-primary">
          <p>Card outlined-primary variant</p>
        </Card>

        <p>Button Component</p>
        <Card>
          <Button onClick={() => console.log("Filled button pressed.")}>
            Filled Button
          </Button>
          <Button
            variant="outlined"
            onClick={() => console.log("Outlined button pressed.")}
          >
            Outlined Button
          </Button>
          <Button
            variant="rounded"
            onClick={() => console.log("Rounded button pressed.")}
          >
            Rounded Button
          </Button>
          <Button
            variant="outlined-rounded"
            onClick={() => console.log("Outlined Rounded button pressed.")}
          >
            Outlined Rounded Button
          </Button>
        </Card>

        <p>Divider Component</p>
        <Divider />

        <p>Custom Single Line TextInput Component</p>
        <TextInput placeholder="Please Enter Text..." />
        <TextInput disabled={true} placeholder="Disabled Text Input" />
        <TextInput
          placeholder="TextInput with error"
          error="Please enter a valid email id."
        />
      </div>
    </div>
  );
}
