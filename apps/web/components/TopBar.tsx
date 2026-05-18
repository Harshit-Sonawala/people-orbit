"use client";
import { useSelector } from "react-redux";
import { SatelliteAltRounded, AccountCircleRounded } from "@mui/icons-material";
import { Heading3, CustomLink, SearchInput, ThemeToggle } from "@/components";
import { RootState } from "@/store";

export const TopBar = () => {
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser,
  );

  return (
    <div className="flex flex-row items-center justify-between py-1 px-4 w-[90%] mx-auto mb-2">
      <CustomLink href="/">
        <div className="flex flex-row items-center justify-center px-2">
          <SatelliteAltRounded
            fontSize="inherit"
            className="icon-xl text-primary"
          />
          <h1 className="text-3xl font-bold p-2">
            People<span className="text-primary">Orbit</span>
          </h1>
        </div>
      </CustomLink>

      <SearchInput />

      <div className="flex flex-row items-center justify-center gap-4 rounded-md">
        <CustomLink href="/about">About</CustomLink>
        <CustomLink href="/demo">Demo</CustomLink>
        <ThemeToggle />
        <CustomLink href="/account" className="py-1 px-2 text-primary gap-2">
          <AccountCircleRounded className="icon-xl" />
          {loggedInUser && loggedInUser.firstName}
        </CustomLink>
      </div>
    </div>
  );
};
