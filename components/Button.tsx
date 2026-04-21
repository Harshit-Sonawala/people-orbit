import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "rounded" | "outlined-rounded";
  onPress?: () => void;
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  filled: "rounded-md bg-primary font-semibold text-white",
  outlined: "rounded-md border-2 border-primary font-semibold text-primary",
  rounded: "rounded-full bg-primary font-semibold text-white",
  "outlined-rounded":
    "rounded-full border-2 border-primary font-semibold text-primary",
};

const Button = ({
  children,
  variant = "filled",
  onPress,
  className = "",
}: Props) => {
  return (
    <button
      onClick={onPress}
      className={`py-1 px-2 ${variantClasses[variant]}
      hover:bg-primary-light hover:text-white hover:border-transparent
      active:bg-secondary active:border-transparent active:translate-y-0.5
      ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
