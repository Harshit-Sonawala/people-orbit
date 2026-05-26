import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "sm" | "md" | "lg";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const variantClasses = {
  sm: "text-xl font-semibold",
  md: "text-2xl font-semibold",
  lg: "text-4xl font-bold",
};

const defaultTag = {
  sm: "h3",
  md: "h2",
  lg: "h1",
} as const;

export const Heading = ({ children, variant = "md", className, as }: Props) => {
  const Tag = as || defaultTag[variant];

  return (
    <Tag className={cn(variantClasses[variant], className)}>{children}</Tag>
  );
};
