import React, { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "rounded" | "outlined-rounded";
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  filled:
    "rounded-md bg-primary border-2 border-primary font-semibold text-white",
  outlined: "rounded-md border-2 border-primary font-semibold text-primary",
  rounded:
    "rounded-full bg-primary border-2 border-primary font-semibold text-white",
  "outlined-rounded":
    "rounded-full border-2 border-primary font-semibold text-primary",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = "filled", className = "", ...rest }, ref) => {
    const disabledClasses = rest.disabled
      ? "bg-surface-top text-foreground-alt border-surface-top cursor-default pointer-events-none"
      : "hover:bg-primary-alt hover:text-white hover:border-transparent hover:cursor-pointer active:bg-secondary active:border-transparent transform active:scale-[0.98] transition-all duration-200";

    return (
      <button
        ref={ref}
        className={`flex flex-row items-center justify-center py-1 px-2 ${variantClasses[variant]} ${disabledClasses} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
