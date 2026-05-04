import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Heading2 = ({ children, className = "" }: Props) => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};
