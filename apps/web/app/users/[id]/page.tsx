import { User } from "@/types/User";
import { Heading, Card, Divider } from "@/components";
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
} from "@mui/icons-material";

export default async function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.INTERNAL_USERS_URL || process.env.NEXT_PUBLIC_USERS_URL}/${id}`,
  );

  if (!response.ok) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center py-8">
        <Heading variant="sm" className="text-error">
          Error: Failed to fetch User details
        </Heading>
      </div>
    );
  }

  const user: User = await response.json();

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
      {user && (
        <div className="flex flex-col items-stretch gap-4 justify-center">
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
              {/* <Image
                src={profilePic}
                alt={user.firstName.charAt(0)}
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                className="object-cover"
              /> */}
              <Heading className="text-6xl font-medium text-primary-alt">{`${user.firstName.charAt(0)}`}</Heading>
            </div>
          </div>
          <Card className="gap-8 p-6 py-10 px-12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <Heading variant="lg">
                    {user.firstName} {user.lastName}
                  </Heading>

                  <div className="flex flex-row items-center gap-2">
                    <WorkRounded className="text-primary" />
                    <Heading variant="sm" className="text-primary">
                      {user.designation}
                    </Heading>
                  </div>

                  <div className="flex flex-row items-center gap-1">
                    <AlternateEmailRounded className="text-foreground-alt icon-sm" />
                    <p className="text-foreground-alt p-1">{user.id}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4">
                  {user.socialLinks?.linkedIn && (
                    <a
                      href={user.socialLinks?.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                    >
                      <LinkedIn />
                    </a>
                  )}
                  {user.socialLinks?.website && (
                    <a
                      href={user.socialLinks?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-surface-top text-primary hover:bg-primary-alt hover:text-surface transition-colors"
                    >
                      <LanguageRounded />
                    </a>
                  )}
                  {user.socialLinks?.github && (
                    <a
                      href={user.socialLinks?.github}
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

            {user.bio && (
              <div className="flex flex-col gap-2">
                <Heading variant="sm">About Me</Heading>
                <p>{user.bio}</p>
              </div>
            )}

            {user.skills !== undefined && user.skills?.length > 0 && (
              <div className="flex flex-col gap-2">
                <Heading variant="sm">Skills</Heading>
                <div className="flex flex-row gap-4">
                  {user.skills.map((eachSkill, i) => (
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
                  <p>{`Email: ${user.email}`}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PhoneRounded className="text-foreground-alt" />
                  <p>{`Phone: ${user.phone}`}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch justify-center w-full gap-2">
              <Heading variant="sm">Other</Heading>
              {user.age && (
                <div className="flex flex-row items-center gap-2">
                  <CakeRounded className="text-foreground-alt" />
                  <p>{`Age: ${user.age}`}</p>
                </div>
              )}

              <div className="flex flex-row items-center gap-2">
                <VerifiedRounded className="text-foreground-alt" />
                <p>{`Member since ${new Date(user.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}`}</p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <HistoryRounded className="text-foreground-alt" />
                <p>{`Last updated on ${new Date(
                  user.updatedAt,
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
  );
}
