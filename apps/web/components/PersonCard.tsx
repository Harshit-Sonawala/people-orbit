import React from "react";
import Card from "./Card";
import Header3 from "./Header3";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import { Person } from "../../../shared-types/Person";

type Props = {
  person: Person;
  className?: string;
};

const PersonCard = ({ person, className = "" }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="bg-primary-light w-full p-10 rounded-tl-lg rounded-tr-lg">
      </div>
      <div className="relative flex flex-col items-start justify-start gap-2 rounded-bl-lg rounded-br-lg pt-10 pb-6 px-4 bg-surface">
        <div className="absolute left-4 -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-surface border-2 border-surface-top">
          <AccountCircleRoundedIcon
            sx={{ fontSize: "4rem" }}
            className="text-primary"
          />
        </div>
        <Header3>{person.firstName} {person.lastName}</Header3>
        <div className="flex flex-row gap-2 items-center justify-start">
          <WorkIcon className="text-surface-top-dark" sx={{fontSize: "1.2rem"}} />
          <p className="text-sm text-foreground">{person.designation}</p>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start">
          <EmailIcon className="text-surface-top-dark" sx={{fontSize: "1.2rem"}} />
          <p className="text-sm text-foreground">{person.email}</p>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start">
          <PhoneIcon className="text-surface-top-dark" sx={{fontSize: "1.2rem"}} />
          <p className="text-sm text-foreground">{person.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
