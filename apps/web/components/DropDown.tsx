"use client";
import React, { useState, type ReactNode } from "react";
import { Button } from "@/components";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { cn } from "@/lib/twMerge";

export type DropDownOption = {
  label: string;
  icon?: ReactNode;
};

type Props = {
  options: Map<string, DropDownOption>;
  selectedValue: string;
  onSelect: (key: string) => void;
  className?: string;
};

export const DropDown = ({
  options,
  selectedValue,
  onSelect,
  className,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const selectedOption = options.get(selectedValue);
  const displayLabel = selectedOption?.label ?? selectedValue;
  const displayIcon = selectedOption?.icon;

  return (
    <div>
      <Button onClick={handleOpen} className={cn("px-1 gap-2", className)}>
        {displayIcon && displayIcon}
        {displayLabel}
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
        {Array.from(options.entries()).map(([key, option]) => {
          return (
            <MenuItem
              key={key}
              onClick={() => {
                onSelect(key);
                handleClose();
              }}
              sx={{
                color: "var(--foreground)",
                borderRadius: "0.4rem",
                paddingX: 1,
                paddingY: "0.4rem",
                fontWeight: 600,
                fontFamily: "Inter",
                "& .MuiListItemIcon-root": {
                  color: "var(--foreground)",
                },
                "&:hover": {
                  backgroundColor: "var(--surface-top)",
                  color: "var(--primary)",
                  "& .MuiListItemIcon-root": {
                    color: "var(--primary)",
                  },
                },
              }}
            >
              {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
              <ListItemText disableTypography>{option.label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
