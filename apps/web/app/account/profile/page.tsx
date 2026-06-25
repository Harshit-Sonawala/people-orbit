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
  companyValidation,
  locationValidation,
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
  LocationOnRounded,
  LinkedIn,
  LanguageRounded,
  GitHub,
  CakeRounded,
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
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "";

  const { getById } = useUsers();
  const { data, isLoading, isError, error } = getById(userId);

  const { replaceById } = useUsers();
  const { mutate, isPending } = replaceById();

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
      {isLoading ? (
        <></>
      ) : isError ? (
        <></>
      ) : isEdit ? (
        <Formik
          enableReinitialize
          initialValues={{
            firstName: data?.firstName ?? "",
            lastName: data?.lastName ?? "",
            age: data?.age ?? "",
            designation: data?.designation ?? "",
            company: data?.company ?? "",
            location: data?.location ?? "",
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
            company: companyValidation,
            location: locationValidation,
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
              { replaceId: userId, replaceData: formattedData },
              {
                onSuccess: (updatedUser) => {
                  console.log(
                    `Data for ID: ${userId}, ${formattedData.firstName} ${formattedData.lastName} submitted successfully.`,
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
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between gap-4">
                  <Heading variant="md">My Profile</Heading>
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
                </div>
              </div>

              {data && (
                <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
                  <div className="relative h-84 rounded-lg overflow-hidden border border-surface-top">
                    <Image
                      src={bgImage}
                      alt="Background"
                      fill
                      sizes="(max-width: 1024px) 90vw, 80vw"
                      className="bg-primary-alt object-cover"
                      priority
                    />
                    <div className="absolute left-8 bottom-8 h-24 w-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-surface border border-surface-top overflow-hidden">
                      {/* <Image
                      src={profilePic}
                      alt={data.firstName.charAt(0)}
                      fill
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                      className="object-cover"
                    /> */}
                      <Heading className="text-6xl font-medium text-primary-alt">{`${data.firstName.charAt(0)}`}</Heading>
                    </div>
                  </div>
                  <Card className="gap-8 p-6 py-10 px-12">
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-row items-center justify-between gap-4">
                        <div className="flex flex-col gap-4">
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

                          <div className="flex flex-row items-center justify-center gap-2">
                            <div className="flex flex-col items-start justify-center gap-2">
                              <Heading variant="sm">Designation</Heading>
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
                            <div className="flex flex-col items-start justify-center gap-2">
                              <Heading variant="sm">Company</Heading>
                              <TextInput
                                variant="filled"
                                id="company"
                                type="text"
                                placeholder="Example Corp"
                                className="w-full"
                                error={formik.errors.company}
                                {...formik.getFieldProps("company")}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col items-start justify-center gap-2">
                            <Heading variant="sm">Location</Heading>
                            <TextInput
                              variant="filled"
                              id="location"
                              type="text"
                              placeholder="City, State"
                              className="w-full"
                              error={formik.errors.location}
                              {...formik.getFieldProps("location")}
                            />
                          </div>
                        </div>

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
                      </div>
                      <Divider variant="surface-top" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Heading variant="sm">About Me</Heading>
                      <TextArea
                        variant="filled"
                        id="bio"
                        placeholder="Tell us a bit about yourself..."
                        error={formik.errors.bio}
                        {...formik.getFieldProps("bio")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Heading variant="sm">Skills</Heading>
                      <TextArea
                        variant="filled"
                        id="skills"
                        placeholder="Please enter comma separated skills like: Next.js, Nestjs, Tailwind, TypeScript"
                        error={formik.errors.skills}
                        {...formik.getFieldProps("skills")}
                      />
                    </div>

                    <div className="flex flex-row items-center justify-stretch gap-4">
                      <div className="flex flex-col items-stretch justify-center w-full gap-2">
                        <Heading variant="sm">Contact</Heading>
                        <div className="flex flex-row items-center gap-2">
                          <EmailRounded className={`text-foreground-alt`} />
                          <label htmlFor="email">Email Address:</label>
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

                        <div className="flex flex-row items-center gap-2">
                          <PhoneRounded className={`text-foreground-alt`} />
                          <label htmlFor="phone">Phone Number:</label>
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
                    </div>
                    <div className="flex flex-col items-stretch justify-center w-full gap-2">
                      <Heading variant="sm">Other</Heading>

                      <div className="flex flex-row items-center gap-2">
                        <CakeRounded className={`text-foreground-alt`} />
                        <label htmlFor="age">Age:</label>
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
                    </div>
                  </Card>
                </div>
              )}
            </form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <Heading variant="md">My Profile</Heading>
            <Button
              onClick={() => setIsEdit((prev) => !prev)}
              variant="outlined"
            >
              <div className="flex flex-row items-center justify-center gap-2 px-4">
                <EditRounded className="icon-md" />
                <p>Edit Profile</p>
              </div>
            </Button>
          </div>
          {data && (
            <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
              <div className="relative h-84 rounded-lg overflow-hidden border border-surface-top">
                <Image
                  src={bgImage}
                  alt="Background"
                  fill
                  sizes="(max-width: 1024px) 90vw, 80vw"
                  className="bg-primary-alt object-cover"
                  priority
                />
                <div className="absolute left-8 bottom-8 h-24 w-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-surface border border-surface-top overflow-hidden">
                  {/* <Image
            src={profilePic}
            alt={user.firstName.charAt(0)}
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
            className="object-cover"
          /> */}
                  <Heading className="text-6xl font-medium text-primary-alt">{`${data.firstName.charAt(0)}`}</Heading>
                </div>
              </div>
              <Card className="gap-8 p-6 py-10 px-12">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col gap-4">
                      <Heading variant="lg">
                        {data.firstName} {data.lastName}
                      </Heading>

                      <div className="flex flex-row items-center gap-2">
                        {/* <WorkRounded className="text-primary" /> */}
                        <Heading variant="sm" className="text-secondary">
                          {data.designation}
                        </Heading>
                        {`•`}
                        <Heading variant="sm" className="text-tertiary">
                          {data.company}
                        </Heading>
                      </div>
                      <div className="flex flex-col">
                        {data.location && (
                          <div className="flex flex-row items-center">
                            <LocationOnRounded className="text-foreground-alt icon-md" />
                            <p className="text-foreground-alt p-1">
                              {data.location}
                            </p>
                          </div>
                        )}
                        <div className="flex flex-row items-center">
                          <AlternateEmailRounded className="text-foreground-alt icon-md" />
                          <p className="text-foreground-alt p-1">{data.id}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between gap-4">
                      {data.socialLinks?.linkedIn && (
                        <a
                          href={data.socialLinks?.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
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
                  </div>
                  <Divider variant="surface-top" />
                </div>

                {data.bio && (
                  <div className="flex flex-col gap-2">
                    <Heading variant="sm">About Me</Heading>
                    <p>{data.bio}</p>
                  </div>
                )}

                {data.skills !== undefined && data.skills?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Heading variant="sm">Skills</Heading>
                    <div className="flex flex-row gap-4">
                      {data.skills.map((eachSkill, i) => (
                        <p
                          key={i}
                          className="bg-surface-top text-primary font-semibold rounded-full py-1 px-3"
                        >
                          {eachSkill}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-row items-center justify-stretch gap-4">
                  <div className="flex flex-col items-stretch justify-center w-full gap-2">
                    <Heading variant="sm">Contact</Heading>
                    <div className="flex flex-row items-center gap-2">
                      <EmailRounded className="text-foreground-alt" />
                      <p>{`Email: ${data.email}`}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <PhoneRounded className="text-foreground-alt" />
                      <p>{`Phone: ${data.phone}`}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch justify-center w-full gap-2">
                  <Heading variant="sm">Other</Heading>
                  {data.age && (
                    <div className="flex flex-row items-center gap-2">
                      <CakeRounded className="text-foreground-alt" />
                      <p>{`Age: ${data.age}`}</p>
                    </div>
                  )}

                  <div className="flex flex-row items-center gap-2">
                    <VerifiedRounded className="text-foreground-alt" />
                    <p>{`Member since ${new Date(
                      data.createdAt,
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`}</p>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <HistoryRounded className="text-foreground-alt" />
                    <p>{`Last updated on ${new Date(
                      data.updatedAt,
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
