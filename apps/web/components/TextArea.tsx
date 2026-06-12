import React from "react";
import { cn } from "@/utils/twMerge";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: "filled" | "outlined" | "rounded" | "outlined-primary";
  error?: string;
};

const variantClasses: { [key: string]: string } = {
  filled: "rounded-lg bg-surface-top font-medium text-foreground",
  outlined:
    "rounded-lg bg-transparent border border-foreground font-medium text-foreground",
  rounded: "rounded-2xl bg-surface-top font-medium text-foreground",
  "outlined-primary":
    "rounded-lg bg-transparent border border-primary font-medium text-primary",
};

export const TextArea = ({
  variant = "filled",
  error = "",
  className,
  ...rest // rest parameters like formik.getFieldProps
}: Props) => {
  let placeholderClasses: string = "text-foreground";
  let textClasses: string = "font-medium text-foreground";
  let borderClasses: string = "border border-surface-top";

  if (rest.disabled) {
    placeholderClasses = "text-foreground-alt";
    textClasses = "text-foreground";
  }

  if (error) {
    placeholderClasses = "text-error";
    textClasses = "font-regular text-error";
    borderClasses = "border border-error";
  }

  return (
    <div className="flex flex-col">
      <textarea
        className={cn(
          "py-1.5 px-2.5 resize-none focus:outline-none focus:ring-0",
          variantClasses[variant],
          placeholderClasses,
          textClasses,
          borderClasses,
          className,
        )}
        {...rest} // get rest parameters
      />
      {error && <p className="ml-2 text-sm text-error">{error}</p>}
    </div>
  );
};
