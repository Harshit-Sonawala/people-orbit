import React from "react";
import { cn } from "@/lib/twMerge";

type Props = {
  key?: number;
  children: React.ReactNode;
  variant?: "surface" | "surface-top" | "outlined" | "outlined-primary";
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  surface: "bg-surface border border-surface-top",
  "surface-top": "bg-surface-top",
  outlined: "border border-surface-top bg-transparent",
  "outlined-primary": "border border-primary bg-transparent",
};

export const Card = ({
  key,
  children,
  variant = "surface",
  className,
}: Props) => {
  return (
    <div
      key={key}
      className={cn(
        "flex flex-col gap-2 rounded-lg p-4",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};
