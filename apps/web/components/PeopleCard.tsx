import React from "react";
import { Heading3 } from "@/components/Heading3";
import { People } from "@/types/People";
import Image from "next/image";
import Link from "next/link";
import profilePic from "@/public/dummy_profilePic.jpg";
import bgImage from "@/public/dummy_bgImage.jpg";
import { WorkRounded, EmailRounded, PhoneRounded } from "@mui/icons-material";

type Props = {
  People: People;
  className?: string;
};

export const PeopleCard = ({ People, className = "" }: Props) => {
  return (
    <Link
      href={`/people/${People.id}`}
      className={`flex flex-col group transition-transform duration-200 hover:-translate-y-1 ${className}`}
    >
      <Image
        src={bgImage}
        alt="Background"
        className="bg-primary-light w-full h-32 rounded-tl-lg rounded-tr-lg object-cover"
      />
      <div className="relative flex flex-col items-start justify-start gap-2 rounded-bl-lg rounded-br-lg pt-10 pb-6 px-4 bg-surface duration-200 group-hover:bg-surface-top">
        <div className="absolute left-8 -top-10 w-18 h-18 rounded-full bg-surface border-4 border-surface-top transition-colors duration-200">
          <Image
            src={profilePic}
            alt={People.firstName.charAt(0)}
            fill
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <Heading3>
          {People.firstName} {People.lastName}
        </Heading3>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <WorkRounded
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">
            {People.designation}
          </p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <EmailRounded
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{People.email}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <PhoneRounded
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{People.phone}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <p className="text-xs text-surface-top-dark truncate">
            Member since{" "}
            {new Date(People.createdOn).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};
