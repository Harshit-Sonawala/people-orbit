"use client";
import React, { useState, useRef, type ReactNode } from "react";
import { Button } from "@/components";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

type MenuOption = {
  label: string;
  icon?: ReactNode;
};

type Props = {
  label: string;
  icon?: ReactNode;
  options: MenuOption[] | string[];
  onSelectAction: (index: number) => void;
  className?: string;
};

export const DropDown = ({
  label,
  icon,
  options,
  onSelectAction,
  className,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={`px-1 gap-2 ${className}`}
      >
        {icon && icon}
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}

        sx={{
          borderRadius: "4rem",
          paddingX: "1rem",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              backgroundColor: "var(--surface)",
              borderRadius: "0.4rem",
              paddingX: "0.4rem",
              filter: "none", // remove any filter-based shadows
            },
          },
        }}
      >
        {options.map((option, index) => {
          const isString = typeof option === "string";
          const text = isString ? option : option.label;
          const icon = isString ? null : option.icon;

          return (
            <MenuItem
              key={text}
              onClick={() => {
                onSelectAction(index);
                handleClose();
              }}
              sx={{
                borderRadius: "0.4rem",
                paddingX: 1,
                paddingY: "0.4rem",
                fontWeight: 600,
                fontFamily: "Inter",
                "&:hover": {
                  backgroundColor: "var(--surface-top)",
                  color: "var(--primary)",
                  "& .MuiListItemIcon-root": {
                    color: "var(--primary)",
                  },
                },
              }}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText disableTypography>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
