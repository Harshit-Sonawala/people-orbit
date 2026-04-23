"use client";

import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import TextInput from "./TextInput";

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

      <TextInput variant="rounded" placeholder="Search..." />

      <div className="flex flex-row items-center justify-center gap-2 rounded-md">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-surface border-2 border-primary">
          <AccountCircleRoundedIcon
            sx={{ fontSize: "3rem" }}
            className="text-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
