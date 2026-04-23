import React from "react";
import Card from "./Card";
import Header3 from "./Header3";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import { Person } from "../types/Person";
import Image from "next/image";
import profilePic from "../public/dummy_profilePic.jpg";
import bgImage from "../public/dummy_bgImage.jpg";

type Props = {
  person: Person;
  className?: string;
};

const PersonCard = ({ person, className = "" }: Props) => {
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
            alt={person.firstName.charAt(0)}
            fill
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <Header3>
          {person.firstName} {person.lastName}
        </Header3>
        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <WorkIcon
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{person.designation}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <EmailIcon
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{person.email}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <PhoneIcon
            fontSize="inherit"
            className="icon-md text-primary shrink-0"
          />
          <p className="text-sm text-foreground truncate">{person.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
