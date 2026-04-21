import React from "react";

type Props = {
  className?: string;
};

const Divider = ({ className = "" }: Props) => {
  return (
    <div
      className={`w-full my-4 px-8 border-b border-surface-top ${className}`}
    />
  );
};

export default Divider;
