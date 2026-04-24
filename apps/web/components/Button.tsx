import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "rounded" | "outlined-rounded";
  type?: "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

const variantClasses: { [key: string]: string } = {
  filled: "rounded-md bg-primary border-2 border-primary font-semibold text-white",
  outlined: "rounded-md border-2 border-primary font-semibold text-primary",
  rounded: "rounded-full bg-primary border-2 border-primary font-semibold text-white",
  "outlined-rounded":
    "rounded-full border-2 border-primary font-semibold text-primary",
};

const Button = ({
  children,
  variant = "filled",
  type,
  onClick,
  className = "",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex flex-row items-center justify-center py-1 px-2 ${variantClasses[variant]}
      hover:bg-primary-light hover:text-white hover:border-transparent hover:cursor-pointer
      active:bg-secondary active:border-transparent transform active:scale-[0.98] transition-transform
      ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
