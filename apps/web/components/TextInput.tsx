import React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "filled" | "outlined" | "rounded" | "outlined-primary";
  error?: string;
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  filled: "rounded-lg bg-surface-top font-medium text-foreground",
  outlined:
    "rounded-lg bg-transparent border-2 border-foreground font-medium text-foreground",
  rounded: "rounded-full bg-surface-top font-medium text-foreground",
  "outlined-primary":
    "rounded-lg bg-transparent border-2 border-primary font-medium text-primary",
};

export const TextInput = ({
  variant = "filled",
  error = "",
  className,
  ...rest // rest parameters like formik.getFieldProps
}: Props) => {
  let placeholderClasses: string = "text-foreground";
  let textClasses: string = "font-medium text-foreground";
  let borderClasses: string = "border-2 border-surface-top";

  if (rest.disabled) {
    placeholderClasses = "text-foreground-alt";
    textClasses = "text-foreground";
  }

  if (error) {
    placeholderClasses = "text-error";
    textClasses = "font-regular text-error";
    borderClasses = "border-2 border-error";
  }

  // ${!error ? `mb-5` : ``} // prevent misalignment on !error
  return (
    <div className="flex flex-col">
      <input
        className={cn(
          "py-1.5 px-2.5 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          variantClasses[variant],
          placeholderClasses,
          textClasses,
          borderClasses,
          className,
        )}
        {...rest} // spread out rest parameters
      />
      {error && <p className="ml-2 text-sm text-error">{error}</p>}
    </div>
  );
};
