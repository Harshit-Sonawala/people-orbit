import { People } from "@/types/People";
import { Header1, Header3, Card, Divider } from "@/components";
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
} from "@mui/icons-material";

export default async function PeopleDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_PEOPLE_URL}/${id}`);

  if (!response.ok) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center py-8">
        <Header3 className="text-error">
          Error: Failed to fetch person details
        </Header3>
      </div>
    );
  }

  const peopleSingle: People = await response.json();

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      {peopleSingle && (
        <div className="flex flex-col items-stretch gap-4 justify-center">
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
                      className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-light hover:text-surface transition-colors"
                    >
                      <LinkedIn />
                    </a>
                  )}
                  {peopleSingle.socialLinks.website && (
                    <a
                      href={peopleSingle.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-light hover:text-surface transition-colors"
                    >
                      <LanguageRounded />
                    </a>
                  )}
                  {peopleSingle.socialLinks.github && (
                    <a
                      href={peopleSingle.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-light hover:text-surface transition-colors"
                    >
                      <GitHub />
                    </a>
                  )}
                </div>
              </div>
              <Divider variant="surface-top" />
            </div>

            {peopleSingle.bio && (
              <div className="flex flex-col gap-2">
                <Header3>About Me</Header3>
                <p>{peopleSingle.bio}</p>
              </div>
            )}

            {peopleSingle.skills !== undefined &&
              peopleSingle.skills?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <Header3>Skills</Header3>
                  <div className="flex flex-row gap-4">
                    {peopleSingle.skills.map((eachSkill, i) => (
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
                <Header3>Contact</Header3>
                <div className="flex flex-row items-center gap-2">
                  <EmailRounded className="text-surface-top-dark" />
                  <p>{`Email: ${peopleSingle.email}`}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PhoneRounded className="text-surface-top-dark" />
                  <p>{`Phone: ${peopleSingle.phone}`}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch justify-center w-full gap-2">
              <Header3>Other</Header3>
              {peopleSingle.age && (
                <div className="flex flex-row items-center gap-2">
                  <CakeRounded className="text-surface-top-dark" />
                  <p>{`Age: ${peopleSingle.age}`}</p>
                </div>
              )}
              <div className="flex flex-row items-center gap-2">
                <VerifiedRounded className="text-surface-top-dark" />
                <p>{`Member since ${new Date(
                  peopleSingle.createdOn,
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`}</p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <AlternateEmailRounded className="text-surface-top-dark" />
                <p>{`User ID: ${peopleSingle.id}`}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
