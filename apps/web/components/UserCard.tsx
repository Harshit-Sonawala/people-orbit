import React from "react";
import { Heading } from "@/components";
import { User } from "@/types/User";
import Image from "next/image";
import Link from "next/link";
import profilePic from "@/public/placeholder_profile_pic.png";
import bgImage from "@/public/dummy_bgImage.jpg";
import {
  PersonRounded,
  WorkRounded,
  EmailRounded,
  PhoneRounded,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";

type Props = {
  User: User;
  className?: string;
};

export const UserCard = ({ User, className }: Props) => {
  return (
    <Link
      href={`/users/${User.id}`}
      className={cn(
        "max-w-110 flex flex-col group transition-transform duration-200 hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative w-full h-32 rounded-tl-lg rounded-tr-lg overflow-hidden">
        <Image
          src={bgImage}
          alt="Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="bg-primary-alt object-cover"
          priority
        />
      </div>
      <div className="relative flex flex-col items-start justify-start gap-2 rounded-bl-lg rounded-br-lg pt-12 pb-4 px-6 bg-surface transition-all duration-200 group-hover:bg-surface-top">
        <div className="flex flex-col items-center justify-center absolute left-8 -top-10 w-20 h-20 rounded-full bg-surface border-4 border-surface-top transition-colors duration-200 overflow-hidden">
          {/* <Image
            src={profilePic}
            alt={User.firstName.charAt(0)}
            fill
            sizes="72px"
            className="object-cover"
          /> */}
          {/* <PersonRounded className="icon-xl" /> */}
          <Heading className="text-4xl font-medium text-primary-alt">{`${User.firstName.charAt(0)}`}</Heading>
        </div>
        <Heading variant="sm">
          {User.firstName} {User.lastName}
        </Heading>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          {/* <WorkRounded
            fontSize="inherit"
            className="icon-md text-secondary shrink-0"
          /> */}
          <p className="text-md font-semibold text-secondary truncate">
            {User.designation}
          </p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <EmailRounded
            fontSize="inherit"
            className="icon-md text-primary-alt shrink-0"
          />
          <p className="text-sm text-foreground truncate">{User.email}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <PhoneRounded
            fontSize="inherit"
            className="icon-md text-primary-alt shrink-0"
          />
          <p className="text-sm text-foreground truncate">{User.phone}</p>
        </div>

        <div className="flex flex-row gap-2 items-center justify-start min-w-0 w-full">
          <p className="text-xs text-foreground-alt truncate">
            Member since{" "}
            {new Date(User.createdOn).toLocaleDateString("en-US", {
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
