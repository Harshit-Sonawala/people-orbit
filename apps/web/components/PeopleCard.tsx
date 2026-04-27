import React from "react";
import Header3 from "./Header3";
import WorkRounded from "@mui/icons-material/WorkRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import { People } from "../types/People";
import Image from "next/image";
import profilePic from "../public/dummy_profilePic.jpg";
import bgImage from "../public/dummy_bgImage.jpg";

type Props = {
  People: People;
  className?: string;
};

const PeopleCard = ({ People, className = "" }: Props) => {
  return (
    <div className="flex flex-col">
      <Image
        src={bgImage}
        alt="Background"
        className="bg-primary-light w-full h-32 rounded-tl-lg rounded-tr-lg object-cover"
      />
      <div className="relative flex flex-col items-start justify-start gap-2 rounded-bl-lg rounded-br-lg pt-10 pb-6 px-4 bg-surface">
        <div className="absolute left-4 -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-surface border-2 border-primary">
          <Image
            src={profilePic}
            alt={People.firstName.charAt(0)}
            fill
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <Header3>
          {People.firstName} {People.lastName}
        </Header3>

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
    </div>
  );
};

export default PeopleCard;
