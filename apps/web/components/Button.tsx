import React, { forwardRef } from "react";
import { cn } from "@/utils/twMerge";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?:
    | "filled"
    | "rounded"
    | "outlined"
    | "outlined-rounded"
    | "surface"
    | "surface-rounded";
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  filled:
    "rounded-lg bg-primary border border-primary font-semibold text-white",
  rounded:
    "rounded-full bg-primary border border-primary font-semibold text-white",
  outlined: "rounded-lg border border-primary font-semibold text-primary",
  "outlined-rounded":
    "rounded-full border-2 border-primary font-semibold text-primary",
  surface:
    "rounded-lg bg-surface border border-surface font-semibold text-foreground",
  "surface-rounded":
    "rounded-full bg-surface border border-surface font-semibold text-foreground",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = "filled", className, ...rest }, ref) => {
    const disabledClasses = rest.disabled
      ? "bg-surface-top text-foreground-alt border-surface-top cursor-default pointer-events-none"
      : "hover:bg-primary-alt hover:text-white hover:border-transparent hover:cursor-pointer active:bg-secondary active:border-transparent transform active:scale-[0.98] transition-all duration-200";

    return (
      <button
        ref={ref}
        className={cn(
          "flex flex-row items-center justify-center py-1 px-2",
          variantClasses[variant],
          disabledClasses,
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
