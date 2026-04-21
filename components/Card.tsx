import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "surface" | "surface-top" | "outlined" | "outlined-primary";
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  surface: "bg-surface",
  "surface-top": "bg-surface-top",
  outlined: "border-2 border-surface-top bg-transparent",
  "outlined-primary": "border-2 border-primary bg-transparent",
};

const Card = ({ children, variant = "surface" }: Props) => {
  return (
    <div
      className={`flex flex-col items-start justify-start gap-2 rounded-md p-4 ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
};

export default Card;
