import React from "react";
import { User } from "@/types";
import { Card, Heading3 } from "@/components";
import Link from "next/link";
import profilePic from "@/public/dummy_profilePic.jpg";
import Image from "next/image";

type Props = {
  User: User;
  className?: string;
};

export const SearchResultCard = ({ User, className = "" }: Props) => {
  return (
    <Link
      href={`/users/${User.id}`}
      className={`max-w-140 flex flex-1 flex-row items-stretch group transition-transform duration-200 hover:-translate-y-1 ${className}`}
    >
      <div className="flex flex-1 flex-row items-center justify-stretch rounded-lg">
        <div className="bg-primary-alt rounded-l-lg px-7 py-12"></div>

        <div className="relative flex flex-1 flex-row items-center justify-center gap-1 bg-surface pl-4 pr-6 rounded-r-lg transition-all duration-200 group-hover:bg-surface-top">
          <div className="absolute -left-10 w-20 h-20 rounded-full bg-surface border-4 border-surface-top transition-colors duration-200 overflow-hidden">
            <Image
              src={profilePic}
              alt={User.firstName.charAt(0)}
              sizes="72px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1 pl-10 py-2 pr-2">
            <Heading3>{`${User.firstName} ${User.lastName}`}</Heading3>
            <p className="text-md font-semibold text-secondary">
              {User.designation}
            </p>
            <div className="flex flex-row items-center gap-4">
              <p className="text-sm text-foreground truncate">{User.email}</p>
              <p className="text-sm text-foreground truncate">{User.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
