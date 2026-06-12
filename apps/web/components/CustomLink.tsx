import Link, { LinkProps } from "next/link";
import React from "react";
import { cn } from "@/utils/twMerge";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const CustomLink = ({
  children,
  className = "",
  ...rest
}: CustomLinkProps) => {
  return (
    <Link
      className={cn(
        "flex flex-row items-center justify-center py-2 px-4 rounded-lg text-md font-semibold text-foreground hover:text-primary hover:bg-surface active:text-secondary transform active:scale-[0.98] transition-all duration-200",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
