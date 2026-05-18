"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTheme } from "@/store/themeSlice";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  // on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  // on theme mode change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
};
