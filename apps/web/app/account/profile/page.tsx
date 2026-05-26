"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser } from "@/store/authSlice";
import { Formik } from "formik";
import {
  firstNameValidation,
  lastNameValidation,
  designationValidation,
  emailValidation,
  phoneValidation,
  ageValidation,
  bioValidation,
  urlValidation,
} from "@/components/forms/formValidations";
import * as Yup from "yup";
import { useUsers } from "@/hooks";
import {
  Heading,
  Card,
  Divider,
  Button,
  TextInput,
  TextArea,
} from "@/components";
import Image from "next/image";
import profilePic from "@/public/placeholder_profile_pic.png";
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
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser,
  );
  const loggedInId = loggedInUser?.id ?? "arjun-mehta-1755163800000";

  const { getById } = useUsers();
  const { data, isLoading, isError, error } = getById(loggedInId);

  const { replaceById } = useUsers();
  const { mutate, isPending } = replaceById();

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6">
      <Formik
        enableReinitialize
        initialValues={{
          firstName: data?.firstName ?? "",
          lastName: data?.lastName ?? "",
          age: data?.age ?? "",
          designation: data?.designation ?? "",
          email: data?.email ?? "",
          phone: data?.phone ?? "",
          bio: data?.bio ?? "",
          skills: data?.skills?.join(", ") ?? "",
          socialLinks: {
            linkedIn: data?.socialLinks?.linkedIn ?? "",
            website: data?.socialLinks?.website ?? "",
            github: data?.socialLinks?.github ?? "",
          },
          profilePic: data?.profilePic ?? "",
          bgImage: data?.bgImage ?? "",
        }}
        validationSchema={Yup.object({
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
        })}
        onSubmit={(values, { resetForm }) => {
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
            { replaceId: loggedInId, replaceData: formattedData },
            {
              onSuccess: (updatedUser) => {
                console.log(
                  `Data for ID: ${loggedInId}, ${formattedData.firstName} ${formattedData.lastName} submitted successfully.`,
                );
                dispatch(setUser(updatedUser));
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
                <Heading variant="md">My Profile</Heading>
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
                    <Button disabled={isPending} type="submit">
                      <div className="flex flex-row items-center justify-center gap-2 px-4">
                        <SaveRounded className="icon-md" />
                        <p>{isPending ? `Saving...` : `Save Changes`}</p>
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
            {isLoading && <p className="text-center py-8">Loading Data...</p>}
            {isError && (
              <p className="text-center text-error py-8">
                Error: {error.message}
              </p>
            )}
            {data && (
              <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
                <div className="relative h-84 rounded-lg overflow-hidden">
                  <Image
                    src={bgImage}
                    alt="Background"
                    fill
                    sizes="(max-width: 1024px) 90vw, 80vw"
                    className="bg-primary-alt object-cover"
                    priority
                  />
                  <div className="absolute left-8 bottom-8 h-24 w-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-surface-top border-4 border-surface-top overflow-hidden">
                    <Image
                      src={profilePic}
                      alt={data.firstName.charAt(0)}
                      fill
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className="gap-6 py-10 px-12">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        {isEdit ? (
                          <div className="flex flex-col items-start justify-center gap-2">
                            <Heading variant="sm">Full Name</Heading>
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
                          <Heading variant="lg">
                            {data.firstName} {data.lastName}
                          </Heading>
                        )}
                        <div className="flex flex-col items-start justify-center gap-2">
                          {isEdit ? (
                            <Heading variant="sm">Designation</Heading>
                          ) : (
                            <div className="flex flex-row items-center gap-2">
                              <WorkRounded className={`text-primary`} />
                              <Heading variant="sm" className="text-primary">
                                {data.designation}
                              </Heading>
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
                          {data.socialLinks?.linkedIn && (
                            <a
                              href={data.socialLinks?.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 h-10 w-10 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                            >
                              <LinkedIn />
                            </a>
                          )}
                          {data.socialLinks?.website && (
                            <a
                              href={data.socialLinks?.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                            >
                              <LanguageRounded />
                            </a>
                          )}
                          {data.socialLinks?.github && (
                            <a
                              href={data.socialLinks?.github}
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

                  {(isEdit || data.bio) && (
                    <div className="flex flex-col gap-2">
                      <Heading variant="sm">About Me</Heading>
                      {isEdit ? (
                        <TextArea
                          variant="filled"
                          id="bio"
                          placeholder="Tell us a bit about yourself in 140 characters or less..."
                          error={formik.errors.bio}
                          {...formik.getFieldProps("bio")}
                        />
                      ) : (
                        <p>{data.bio}</p>
                      )}
                    </div>
                  )}

                  {(isEdit ||
                    (data.skills !== undefined && data.skills?.length > 0)) && (
                    <div className="flex flex-col gap-2">
                      <Heading variant="sm">Skills</Heading>
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
                          {data.skills?.map((skill: string, i: number) => (
                            <p
                              key={i}
                              className="bg-surface-top text-primary font-semibold rounded-full py-1 px-3"
                            >
                              {skill}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-row items-center justify-stretch gap-4">
                    <div className="flex flex-col items-stretch justify-center w-full gap-2">
                      <Heading variant="sm">Contact</Heading>
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
                          <p>{data.email}</p>
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
                          <p>{data.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch justify-center w-full gap-2">
                    <Heading variant="sm">Other</Heading>

                    {(isEdit || data.age) && (
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
                          <p>{data.age}</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-row items-center gap-2">
                      <VerifiedRounded className="text-foreground-alt" />
                      <p>{`Member since ${new Date(
                        data.createdOn,
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <HistoryRounded className="text-foreground-alt" />
                      <p>{`Last updated on ${new Date(
                        data.updatedOn,
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <AlternateEmailRounded className="text-foreground-alt" />
                      <p>{`User ID: ${data.id}`}</p>
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
