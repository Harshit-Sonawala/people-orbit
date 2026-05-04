import React from "react";

type Props = {
  variant?: "surface" | "surface-top" | "primary" | "secondary";
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  surface: "border-surface",
  "surface-top": "border-surface-top",
  primary: "border-primary",
  secondary: "border-secondary",
};

export const Divider = ({ variant = "surface", className = "" }: Props) => {
  return (
    <div
      className={`w-full px-8 border-b-2 ${variantClasses[variant]} ${className}`}
    />
  );
};
