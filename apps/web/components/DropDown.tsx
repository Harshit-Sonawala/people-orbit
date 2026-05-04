"use client";
import React, { useState, useRef, type ReactNode } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type MenuOption = {
  label: string;
  icon?: ReactNode;
};

type Props = {
  label: string;
  icon?: ReactNode;
  options: MenuOption[] | string[];
  onSelect: (index: number) => void;
  className?: string;
};

export const DropDown = ({
  label,
  icon,
  options,
  onSelect,
  className,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => setMenuOpen(false);

  return (
    <div>
      <Button
        ref={anchorRef}
        variant="contained"
        onClick={() => setMenuOpen(true)}
        startIcon={icon}
        className={className}
        disableElevation
        sx={{
          paddingx: 1,
          margin: 0,
          borderRadius: "9999px",
          backgroundColor: "var(--primary)",
          fontWeight: 500,
          fontFamily: "Inter",
          fontSize: 18,
          color: "white",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "var(--primary)",
            opacity: 0.9,
            borderColor: "var(--primary)",
          },
        }}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorRef.current} open={menuOpen} onClose={handleClose}>
        {options.map((option, index) => {
          const isString = typeof option === "string";
          const text = isString ? option : option.label;
          const icon = isString ? null : option.icon;

          return (
            <MenuItem
              key={text}
              onClick={() => {
                onSelect(index);
                handleClose();
              }}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
