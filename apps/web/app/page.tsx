"use client";
import { Formik } from "formik"; // Formik forms
import * as Yup from "yup"; // Yup Schema Validation
import { useFetchPeople } from "../hooks/useFetchPeople"; // Tanstack Query

import Card from "../components/Card";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";
import Button from "../components/Button";
import Divider from "../components/Divider";
import TextInput from "../components/TextInput";
import PeopleCard from "../components/PeopleCard";

import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  const { data: people, isLoading, isError, error } = useFetchPeople();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center w-[90%] mx-auto">

      <div className="m-4" />

      {isLoading && <p className="text-center py-8">Loading...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {people && (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {people.data.map((People, i) => (
            <PeopleCard People={People} key={People.id ?? i} />
          ))}
        </div>
      )}

      {/* <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyPeopleData.map((_, i) => (<PeopleCard People={dummyPeopleData[i]} key={i} />))}
      </div> */}

      <div className="m-4" />

      <Card className="flex flex-col items-stretch justify-center gap-2 md:w-[80%] mx-auto">
        <Header3>Post People information</Header3>
        <Divider variant="primary" />
        <Formik
          initialValues={{ 
            firstName: "",
            lastName: "",
            age: 0,
            designation: "",
            email: "",
            phone: "",
            bio: "",
            skills: "",
            socialLinkedIn: "",
            socialWebsite: "",
            socialGitHub: "",
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
            designation: Yup.string()
              .max(40, "Designation must be 40 characters or less")
              .required("Required Field"),
            email: Yup.string()
              .email("Please enter a valid email address")
              .required("Required Field"),
            phone: Yup.string()
              .matches(phoneRegExp, "Please enter a valid phone number")
              .required("Required Field"),
            bio: Yup.string()
              .max(140, "Bio must be 140 characters or less"),
            skills: Yup.string(),
            socialLinkedIn: Yup.string()
              .url("Please enter a valid url"),
            socialWebsite: Yup.string()
              .url("Please enter a valid url"),
            socialGitHub: Yup.string()
              .url("Please enter a valid url"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
                    <BadgeRoundedIcon className="text-primary" />
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
                    <BadgeRoundedIcon className="text-primary" />
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
                    <BadgeRoundedIcon className="text-primary" />
                    <label htmlFor="age">Age:</label>
                  </div>
                  <TextInput
                    variant="filled"
                    id="designation"
                    type="number"
                    placeholder="20"
                    className="w-full"
                    error={formik.errors.age}
                    {...formik.getFieldProps("age")}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex flex-row items-center flex-1 gap-2">
                    <WorkRoundedIcon className="text-primary" />
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
                    <EmailRoundedIcon className="text-primary" />
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
                    <PhoneRoundedIcon className="text-primary" />
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
                  <AnnouncementRoundedIcon className="text-primary" />
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
                    <LinkedInIcon className="text-primary" />
                    <label htmlFor="socialLinkedIn">LinkedIn Profile:</label>
                  </div>
                  <TextInput
                    id="socialLinkedIn"
                    type="text"
                    placeholder="www.linkedin.com/john-doe-09"
                    className="w-full"
                    error={formik.errors.socialLinkedIn}
                    {...formik.getFieldProps("socialLinkedIn")}
                  />
                </div>

                <div className="flex flex-col flex-1 items-stretch justify-center gap-2">
                  <div className="flex flex-row items-center flex-1 gap-2">
                    <LanguageRoundedIcon className="text-primary" />
                    <label htmlFor="socialWebsite">Website:</label>
                  </div>
                  <TextInput
                    id="socialWebsite"
                    type="text"
                    placeholder="www.my-website.com"
                    className="w-full"
                    error={formik.errors.socialWebsite}
                    {...formik.getFieldProps("socialWebsite")}
                  />
                </div>

                <div className="flex flex-col flex-1 items-stretch justify-center gap-2">
                  <div className="flex flex-row items-center flex-1 gap-2">
                    <GitHubIcon className="text-primary"/>
                    <label htmlFor="socialGitHub">GitHub Profile:</label>
                  </div>
                  <TextInput
                    id="socialGitHub"
                    type="text"
                    placeholder="www.github.com/My-Github"
                    className="w-full"
                    error={formik.errors.socialGitHub}
                    {...formik.getFieldProps("socialGitHub")}
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

      <div className="m-4" />

      <div className="m-2 flex flex-col gap-2">
        <p>Components Demo:</p>
        <p>Header 1</p>
        <Header1>This is an example of Header 1.</Header1>
        <p>Header 2</p>
        <Header2>This is an example of Header 2.</Header2>
        <p>Header 3</p>
        <Header3>This is an example of Header 3.</Header3>

        <div className="m-4" />

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

        <div className="m-4" />

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

        <div className="m-4" />

        <p>Divider Component</p>
        <Divider />

        <div className="m-4" />

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
