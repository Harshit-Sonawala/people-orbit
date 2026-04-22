import React from "react";

type Props = {
  variant?: "surface" | "surfaceTop" | "primary";
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  surface: "border-surface",
  "surface-top": "border-surface-top",
  primary: "border-primary",
};

const Divider = ({ variant = "surface", className = "" }: Props) => {
  return (
    <div
      className={`w-full px-8 border-b-2 ${variantClasses[variant]} ${className}`}
    />
  );
};

export default Divider;
