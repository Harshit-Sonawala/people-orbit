import Link, { LinkProps } from "next/link";
import React from "react";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CustomLink = ({ children, className = "", ...rest }: CustomLinkProps) => {
  return (
    <Link
      className={`flex flex-row items-center justify-center py-1 px-2 rounded-md text-md font-bold text-foreground hover:text-primary hover:text-medium hover:bg-surface active:text-secondary transform active:scale-[0.98] transition-transform ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
