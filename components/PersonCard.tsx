import React from "react";
import Card from "./Card";
import Header3 from "./Header3";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

type Props = {
  className?: string;
};

const PersonCard = ({ className = "" }: Props) => {
  return (
    <div className="flex flex-col">

      <div className="bg-primary w-full p-20 rounded-tl-lg rounded-tr-lg" />
      <div className="flex flex-col items-start justify-start gap-2 rounded-bl-lg rounded-br-lg p-4 bg-surface">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-top">
          <AccountCircleRoundedIcon
            sx={{ fontSize: "2.5rem" }}
            className="text-primary"
          />
        </div>
        <Header3>Firstname Lastname</Header3>
        <p>Full Stack Developer</p>
        <p>firstname.lastname@example.com</p>
        <p>+91 9876543210</p>
      </div>
    </div>
  );
};

export default PersonCard;
