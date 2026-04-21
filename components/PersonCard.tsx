import React from "react";
import Card from "./Card";
import Header3 from "./Header3";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';

type Props = {
  className?: string;
};

const PersonCard = ({ className = "" }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="bg-primary-light w-full p-12 rounded-tl-lg rounded-tr-lg">
      </div>
      <div className="relative flex flex-col items-start justify-start gap-2 rounded-bl-lg rounded-br-lg pt-10 pb-6 px-4 bg-surface">
        <div className="absolute left-4 -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-surface">
          <AccountCircleRoundedIcon
            sx={{ fontSize: "4rem" }}
            className="text-primary"
          />
        </div>
        <Header3>Firstname Lastname</Header3>
        <div className="flex flex-row gap-2">
          <WorkIcon className="text-surface-top-dark" />
          <p className="text-md">Full Stack Developer</p>
        </div>
        <div className="flex flex-row gap-2">
          <EmailIcon className="text-surface-top-dark" />
          <p>firstname.lastname@example.com</p>
        </div>
        <div className="flex flex-row gap-2">
          <PhoneIcon className="text-surface-top-dark" />
          <p>+91 9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
