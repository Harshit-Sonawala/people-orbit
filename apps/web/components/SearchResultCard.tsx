import React from "react";
import { User } from "@/types";
import { Heading } from "@/components";
import Link from "next/link";
import { cn } from "@/utils/twMerge";

type Props = {
  User: User;
  className?: string;
};

export const SearchResultCard = ({ User, className }: Props) => {
  return (
    <Link
      href={`/users/${User.id}`}
      className={cn(
        "max-w-lg flex flex-1 flex-row items-stretch group transition-transform duration-200 hover:-translate-y-1 border border-surface-top rounded-lg",
        className,
      )}
    >
      <div className="flex flex-1 flex-row items-center justify-stretch rounded-lg min-w-0">
        <div className="bg-primary rounded-l-lg px-7 py-12 shrink-0"></div>

        <div className="relative flex flex-1 flex-row items-center justify-center bg-surface pl-4 rounded-r-lg transition-all duration-200 group-hover:bg-surface-top min-w-0">
          <div className="absolute -left-8 w-18 h-18 flex flex-col items-center justify-center rounded-full bg-surface border-2 border-surface-top transition-colors duration-200 overflow-hidden">
            <Heading className="text-4xl font-medium text-primary-alt">{User.firstName.charAt(0)}</Heading>
          </div>
          <div className="flex flex-1 flex-col gap-1 pl-10 py-2 pr-2 min-w-0">
            <Heading variant="sm" className="truncate">{User.firstName} {User.lastName}</Heading>
            <p className="text-md font-semibold text-secondary truncate">
              {User.designation}
            </p>
            <div className="flex flex-row items-center gap-4 min-w-0">
              <p className="text-sm text-foreground truncate min-w-0">{User.email}</p>
              <p className="text-sm text-foreground truncate min-w-0">{User.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
