import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "filled" | "outlined" | "rounded" | "outlined-primary";
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  filled: "rounded-md bg-surface-top font-medium text-foreground",
  outlined:
    "rounded-md bg-transparent border-2 border-foreground font-medium text-foreground",
  rounded: "rounded-full bg-surface-top font-medium text-foreground",
  "outlined-primary":
    "rounded-md bg-transparent border-2 border-primary font-medium text-primary",
};

const TextInput = ({
  variant = "filled",
  placeholder = "",
  error = "",
  disabled = false,
  className = "",
  ...rest // rest parameters like formik.getFieldProps
}: Props) => {
  let placeholderClasses: string = "text-foreground";
  let textClasses: string = "font-medium text-foreground";
  let borderClasses: string = "border-2 border-surface-top";

  if (disabled) {
    placeholderClasses = "text-surface-top-dark";
    textClasses = "text-foreground";
  }

  if (error) {
    placeholderClasses = "text-error";
    textClasses = "font-regular text-error";
    borderClasses = "border-2 border-error";
  }

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className={`py-1.5 px-2.5 ${variantClasses[variant]}
          focus:outline-none focus:ring-0
          ${placeholderClasses}
          ${textClasses}
          ${borderClasses}
          ${className}`}
        {...rest} // spread out rest parameters
      />
      {error && <p className="ml-2 text-sm text-error">{error}</p>}
    </div>
  );
};

export default TextInput;
