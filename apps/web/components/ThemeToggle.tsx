"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/store/themeSlice";
import { LightModeRounded, DarkModeRounded } from "@mui/icons-material";
import { Button } from "./Button";

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <Button
      variant="rounded"
      onClick={() => dispatch(toggleTheme())}
      className="w-18 h-10"
    >
      {mode === "light" ? (
        <DarkModeRounded className="icon-md" />
      ) : (
        <LightModeRounded className="icon-md" />
      )}
    </Button>
  );
};
