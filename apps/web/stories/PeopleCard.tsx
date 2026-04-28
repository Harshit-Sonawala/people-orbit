import React from "react";
import Header3 from "./Header3";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import { People } from "@/types/People";
import Image from "next/image";
import profilePic from "@/public/dummy_profilePic.jpg";
import bgImage from "@/public/dummy_bgImage.jpg";

type Props = {
  People: People;
  className?: string;
};

const PeopleCard = ({ People, className = "" }: Props) => {
  return (
    <div className="flex flex-col min-w-20">
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
          <WorkIcon
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{People.designation}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <EmailIcon
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{People.email}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <PhoneIcon
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{People.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
