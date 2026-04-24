import React from "react";

type Props = {
  key?: number;
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

const Card = ({ key, children, variant = "surface", className }: Props) => {
  return (
    <div key={key}
      className={`flex flex-col gap-2 rounded-lg p-4 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
