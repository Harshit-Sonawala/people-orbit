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
    <Link href={`/users/${User.id}`} className={`flex flex-row`}>
      <Card className="flex flex-row items-center gap-4">
        <div className="bg-primary p-1 rounded-lg">
          <div className="w-22 h-22 rounded-full bg-surface border-4 border-surface-top transition-colors duration-200 overflow-hidden">
            <Image
              src={profilePic}
              alt={User.firstName.charAt(0)}
              sizes="72px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Heading3>{`${User.firstName} ${User.lastName}`}</Heading3>
          <p>{User.designation}</p>
          <p>{User.email}</p>
          <p>{User.id}</p>
        </div>
      </Card>
    </Link>
  );
};
