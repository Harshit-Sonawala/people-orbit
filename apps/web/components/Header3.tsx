import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Header3 = ({ children, className = "" }: Props) => {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
};

export default Header3;
