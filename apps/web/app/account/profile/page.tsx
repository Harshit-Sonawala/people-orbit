"use client";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePeople } from "@/hooks/usePeople";
import { People } from "@/types/People";
import {
  Heading1,
  Heading2,
  Heading3,
  Card,
  Divider,
  Button,
  TextInput,
  TextArea,
} from "@/components";
import Image from "next/image";
import profilePic from "@/public/dummy_profilePic.jpg";
import bgImage from "@/public/dummy_bgImage.jpg";
import {
  LinkedIn,
  LanguageRounded,
  GitHub,
  CakeRounded,
  WorkRounded,
  EmailRounded,
  PhoneRounded,
  AlternateEmailRounded,
  VerifiedRounded,
  HistoryRounded,
  EditRounded,
  SaveRounded,
} from "@mui/icons-material";

export default function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const loggedInId = "arjun-mehta-1755163800000";
  const nameRegex = /^[A-Za-z\s'-]+$/;
  const phoneRegex =
    /^((\+[1-9]{1,4}[\s\-]*)|([\(][0-9]{2,3}[\)][\s\-]*)|([0-9]{2,4})[\s\-]*)*?[0-9]{3,4}?[\s\-]*[0-9]{3,4}?$/;

  const {
    data: peopleSingle,
    isLoading: peopleSingleIsLoading,
    isError: peopleSingleIsError,
    error: peopleSingleError,
  } = usePeople(loggedInId).getById;

  const { mutate: replacePeople, isPending: replacePeopleIsPending } =
    usePeople().replaceById;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6">
      <Formik
        initialValues={{
          firstName: peopleSingle?.firstName ?? "",
          lastName: peopleSingle?.lastName ?? "",
          age: peopleSingle?.age ?? "",
          designation: peopleSingle?.designation ?? "",
          email: peopleSingle?.email ?? "",
          phone: peopleSingle?.phone ?? "",
          bio: peopleSingle?.bio ?? "",
          skills: peopleSingle?.skills?.join(", ") ?? "",
          socialLinks: peopleSingle?.socialLinks ?? {
            linkedIn: "",
            website: "",
            github: "",
          },
          profilePic: peopleSingle?.profilePic ?? "",
          bgImage: peopleSingle?.bgImage ?? "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .matches(
              nameRegex,
              "First name Can only contain letters, spaces, hyphens, or apostrophes",
            )
            .max(30, "Must be 30 characters or less")
            .required("Required Field"),
          lastName: Yup.string()
            .matches(
              nameRegex,
              "Last name Can only contain letters, spaces, hyphens, or apostrophes",
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
            { replaceId: loggedInId, replaceData: formattedData },
            {
              onSuccess: () => {
                console.log(
                  `Data for ID: ${loggedInId}, ${formattedData.firstName} ${formattedData.lastName} submitted successfully.`,
                );
                resetForm();
                setIsEdit((prev) => !prev);
              },
            },
          );
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-1 items-stretch justify-center gap-4"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between gap-4">
                <Heading2>Your Profile</Heading2>
                {!isEdit ? (
                  <Button
                    onClick={() => setIsEdit((prev) => !prev)}
                    variant="outlined"
                  >
                    <div className="flex flex-row items-center justify-center gap-2 px-4">
                      <EditRounded className="icon-md" />
                      <p>Edit Profile</p>
                    </div>
                  </Button>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Button disabled={replacePeopleIsPending} type="submit">
                      <div className="flex flex-row items-center justify-center gap-2 px-4">
                        <SaveRounded className="icon-md" />
                        <p>
                          {replacePeopleIsPending
                            ? `Saving...`
                            : `Save Changes`}
                        </p>
                      </div>
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        setIsEdit(false);
                        formik.handleReset(e);
                      }}
                    >
                      <div className="flex flex-row items-center justify-center gap-2 px-4">
                        <HistoryRounded className="icon-md" />
                        <p>Revert Changes</p>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
              <Divider variant="surface-top" />
            </div>
            {peopleSingleIsLoading && (
              <p className="text-center py-8">Loading Data...</p>
            )}
            {peopleSingleIsError && (
              <p className="text-center text-error py-8">
                Error: {peopleSingleError.message}
              </p>
            )}
            {peopleSingle && (
              <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
                <div className="relative rounded-lg">
                  <Image
                    src={bgImage}
                    alt="Background"
                    className="bg-primary-alt w-full h-84 rounded-lg object-cover"
                  />
                  <div className="absolute left-8 bottom-8 h-24 w-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-surface-top border-4 border-surface-top">
                    <Image
                      src={profilePic}
                      alt={peopleSingle.firstName.charAt(0)}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <Card className="gap-6 p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        {isEdit ? (
                          <div className="flex flex-col items-start justify-center gap-2">
                            <Heading2>Full Name:</Heading2>
                            <div className="flex flex-row items-center justify-center gap-2">
                              <TextInput
                                id="firstName"
                                type="text"
                                placeholder="Firstname"
                                className={`font-bold w-full`}
                                error={formik.errors.firstName}
                                {...formik.getFieldProps("firstName")}
                              />
                              <TextInput
                                id="lastName"
                                type="text"
                                placeholder="Lastname"
                                className="w-full"
                                error={formik.errors.lastName}
                                {...formik.getFieldProps("lastName")}
                              />
                            </div>
                          </div>
                        ) : (
                          <Heading1>
                            {peopleSingle.firstName} {peopleSingle.lastName}
                          </Heading1>
                        )}
                        <div className="flex flex-col items-start justify-center gap-2">
                          {isEdit ? (
                            <Heading2>Designation:</Heading2>
                          ) : (
                            <div className="flex flex-row items-center gap-2">
                              <WorkRounded className={`text-primary`} />
                              <Heading3 className="text-primary">
                                {peopleSingle.designation}
                              </Heading3>
                            </div>
                          )}
                          {isEdit && (
                            <TextInput
                              variant="filled"
                              id="designation"
                              type="text"
                              placeholder="Full Stack Developer"
                              className="w-full"
                              error={formik.errors.designation}
                              {...formik.getFieldProps("designation")}
                            />
                          )}
                        </div>
                      </div>

                      {isEdit ? (
                        <div className="flex flex-col items-center justify-evenly gap-2">
                          <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <div className="flex flex-row items-center justify-stretch gap-2">
                              <LinkedIn className="text-primary" />
                              <label htmlFor="socialLinkedIn">LinkedIn:</label>
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

                          <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <div className="flex flex-row items-center justify-stretch gap-2">
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

                          <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <div className="flex flex-row items-center justify-stretch gap-2">
                              <GitHub className="text-primary" />
                              <label htmlFor="socialGitHub">GitHub:</label>
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
                      ) : (
                        <div className="flex flex-row items-center justify-between gap-4">
                          {peopleSingle.socialLinks.linkedIn && (
                            <a
                              href={peopleSingle.socialLinks.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 h-10 w-10 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                            >
                              <LinkedIn />
                            </a>
                          )}
                          {peopleSingle.socialLinks.website && (
                            <a
                              href={peopleSingle.socialLinks.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                            >
                              <LanguageRounded />
                            </a>
                          )}
                          {peopleSingle.socialLinks.github && (
                            <a
                              href={peopleSingle.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                            >
                              <GitHub />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <Divider variant="surface-top" />
                  </div>

                  {(isEdit || peopleSingle.bio) && (
                    <div className="flex flex-col gap-2">
                      <Heading3>About Me</Heading3>
                      {isEdit ? (
                        <TextArea
                          variant="filled"
                          id="bio"
                          placeholder="Tell us a bit about yourself in 140 characters or less..."
                          error={formik.errors.bio}
                          {...formik.getFieldProps("bio")}
                        />
                      ) : (
                        <p>{peopleSingle.bio}</p>
                      )}
                    </div>
                  )}

                  {(isEdit ||
                    (peopleSingle.skills !== undefined &&
                      peopleSingle.skills?.length > 0)) && (
                    <div className="flex flex-col gap-2">
                      <Heading3>Skills</Heading3>
                      {isEdit ? (
                        <TextArea
                          variant="filled"
                          id="skills"
                          placeholder="Please enter comma separated skills like: Next.js, Nestjs, Tailwind, TypeScript"
                          error={formik.errors.skills}
                          {...formik.getFieldProps("skills")}
                        />
                      ) : (
                        <div className="flex flex-row gap-4">
                          {peopleSingle.skills?.map((eachSkill, i) => (
                            <p
                              key={i}
                              className="bg-surface-top text-primary font-semibold rounded-full py-1 px-3"
                            >
                              {eachSkill}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-row items-center justify-stretch gap-4">
                    <div className="flex flex-col items-stretch justify-center w-full gap-2">
                      <Heading3>Contact</Heading3>
                      <div className="flex flex-row items-center gap-2">
                        <EmailRounded className={`text-foreground-alt`} />
                        <label htmlFor="email">Email Address:</label>
                        {isEdit ? (
                          <TextInput
                            variant="filled"
                            id="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            className="w-full"
                            error={formik.errors.email}
                            {...formik.getFieldProps("email")}
                          />
                        ) : (
                          <p>{peopleSingle.email}</p>
                        )}
                      </div>

                      <div className="flex flex-row items-center gap-2">
                        <PhoneRounded className={`text-foreground-alt`} />
                        <label htmlFor="phone">Phone Number:</label>
                        {isEdit ? (
                          <TextInput
                            variant="filled"
                            id="phone"
                            type="text"
                            placeholder="+910987654321"
                            className="w-full"
                            error={formik.errors.phone}
                            {...formik.getFieldProps("phone")}
                          />
                        ) : (
                          <p>{peopleSingle.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch justify-center w-full gap-2">
                    <Heading3>Other</Heading3>

                    {(isEdit || peopleSingle.age) && (
                      <div className="flex flex-row items-center gap-2">
                        <CakeRounded className={`text-foreground-alt`} />
                        <label htmlFor="age">Age:</label>
                        {isEdit ? (
                          <TextInput
                            variant="filled"
                            id="age"
                            type="number"
                            placeholder="20"
                            className="w-full"
                            error={formik.errors.age}
                            {...formik.getFieldProps("age")}
                          />
                        ) : (
                          <p>{peopleSingle.age}</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-row items-center gap-2">
                      <VerifiedRounded className="text-foreground-alt" />
                      <p>{`Member since ${new Date(
                        peopleSingle.createdOn,
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <HistoryRounded className="text-foreground-alt" />
                      <p>{`Last updated on ${new Date(
                        peopleSingle.updatedOn,
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <AlternateEmailRounded className="text-foreground-alt" />
                      <p>{`User ID: ${peopleSingle.id}`}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}
