import React from 'react'

type Props = {
    children: React.ReactNode
    variant?: "filled" | "outlined" | "icon"
    onPress?: () => void
}

const variantClasses: { [key: string]: string } = {
    "filled": "bg-primary font-semibold text-white",
    "outlined": "border-2 border-primary font-semibold text-primary",
    "icon": "text-primary",
}

const Button = ({children, variant = "filled", onPress}: Props) => {
  return (
    <button onClick={onPress} className={`rounded-md ${variantClasses[variant]}`}>{children}</button>
  );
}

export default Button