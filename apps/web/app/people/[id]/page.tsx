"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetchPeopleSingle } from "@/hooks/useFetchPeopleSingle";
import { Header1, Header2, Header3, Card, Divider, Button } from "@/components";
import {
  PersonRounded,
  BadgeRounded,
  CakeRounded,
  WorkRounded,
  EmailRounded,
  PhoneRounded,
  LinkedIn,
  LanguageRounded,
  GitHub,
  ArrowBackRounded,
} from "@mui/icons-material";
import Image from "next/image";
import profilePic from "@/public/dummy_profilePic.jpg";
import bgImage from "@/public/dummy_bgImage.jpg";

function PeopleDetails() {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: peopleSingle,
    isLoading,
    isError,
    error,
  } = useFetchPeopleSingle(id as string);

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      {isLoading && (
        <p className="text-center py-8">Loading Person Details...</p>
      )}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {peopleSingle && (
        <div className="flex flex-col items-stretch gap-4 justify-center">
          <div className="flex flex-row items-center gap-4">
            <Button onClick={() => { router.back(); }}>
              <ArrowBackRounded />
            </Button>
            <Header2>{`All People / ${peopleSingle.firstName}'s Profile`}</Header2>
          </div>
          <div className="relative rounded-lg">
            <Image
              src={bgImage}
              alt="Background"
              className="bg-primary-light w-full h-72 rounded-lg object-cover"
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
          <Card className="gap-8 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <Header1>
                    {peopleSingle.firstName} {peopleSingle.lastName}
                  </Header1>
                  <div className="flex flex-row items-center gap-2">
                    <WorkRounded className="text-primary" />
                    <Header3 className="text-primary">
                      {peopleSingle.designation}
                    </Header3>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4">
                  {peopleSingle.socialLinks.linkedIn && (
                    <a
                      href={peopleSingle.socialLinks.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top hover:bg-primary-light transition-colors"
                    >
                      <LinkedIn className="text-primary" />
                    </a>
                  )}
                  {peopleSingle.socialLinks.website && (
                    <a
                      href={peopleSingle.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top hover:bg-primary-light transition-colors"
                    >
                      <LanguageRounded className="text-primary" />
                    </a>
                  )}
                  {peopleSingle.socialLinks.github && (
                    <a
                      href={peopleSingle.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top hover:bg-primary-light transition-colors"
                    >
                      <GitHub className="text-primary" />
                    </a>
                  )}
                </div>
              </div>
              <Divider variant="surface-top" />
            </div>

            <div className="flex flex-col gap-2">
              <Header3>About Me</Header3>
              <p>{peopleSingle.bio}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Header3>Skills</Header3>
              <div className="flex flex-row gap-4">
                {peopleSingle.skills &&
                  peopleSingle.skills.map((eachSkill, i) => (
                    <p key={i} className="bg-surface-top text-primary font-semibold rounded-full py-1 px-2">
                      {eachSkill}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex flex-row items-center justify-stretch gap-4">
              <div
                className="flex flex-col items-stretch justify-center w-full gap-2"
              >
                <Header3>Contact</Header3>
                <div className="flex flex-row items-center gap-2">
                  <EmailRounded />
                  <p>{`Email: ${peopleSingle.email}`}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PhoneRounded />
                  <p>{`Phone: ${peopleSingle.phone}`}</p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-stretch justify-center w-full gap-2"
            >
              <Header3>Other</Header3>
              {peopleSingle.age && (
                <div className="flex flex-row items-center gap-2">
                  <CakeRounded />
                  <p>{`Age: ${peopleSingle.age}`}</p>
                </div>
              )}
              <div className="flex flex-row items-center gap-2">
                <PersonRounded />
                <p>{`Member since ${new Date(
                  peopleSingle.createdOn,
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`}</p>
              </ div>

              <div className="flex flex-row items-center gap-2">
                <BadgeRounded />
                <p>{`User ID: ${peopleSingle.id}`}</p>
              </ div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PeopleDetails;