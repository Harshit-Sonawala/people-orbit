"use client";

import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TextInput from "./TextInput";
import Button from "./Button";

const TopBar = () => {
  return (
    <div className="flex flex-row items-center justify-between p-2 w-[90%] mx-auto">
      <div className="flex flex-row items-center justify-center px-2">
        <SatelliteAltRoundedIcon
          sx={{ fontSize: "2rem" }}
          className="text-primary"
        />
        <h1 className="text-3xl font-bold p-2">
          People<span className="text-primary">Orbit</span>
        </h1>
      </div>
      <div className="hidden sm:block">
        <div className="flex flex-row gap-2 relative">
          <TextInput variant="rounded" placeholder="Search..." className="md:w-sm lg:w-md"/>
          <Button variant="rounded" className="absolute right-1 top-1"><SearchRoundedIcon /></Button>
        </div>

      </div>

      <div className="flex flex-row items-center justify-center gap-2 rounded-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border-2 border-primary">
          <AccountCircleRoundedIcon
            sx={{ fontSize: "2.5rem" }}
            className="text-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
