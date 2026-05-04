import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Heading1 = ({ children, className = "" }: Props) => {
  return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
};
