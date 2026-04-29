import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import { CustomLink, SearchInput } from "@/components";

const TopBar = () => {
  return (
    <div className="flex flex-row items-center justify-evenly py-1 px-2 w-[90%] mx-auto mb-2">
      <CustomLink href="/">
        <div className="flex flex-row items-center justify-center px-2">
          <SatelliteAltRoundedIcon
            fontSize="inherit"
            className="icon-xl text-primary"
          />
          <h1 className="text-3xl font-bold p-2">
            People<span className="text-primary">Orbit</span>
          </h1>
        </div>
      </CustomLink>
      <div className="hidden sm:block">
        <SearchInput />
      </div>

      <div className="flex flex-row items-center justify-center gap-4 rounded-md">
        <CustomLink href="/about">About</CustomLink>
        <CustomLink href="/demo">Demo</CustomLink>
        <CustomLink href="/account" className="border-2 border-primary">
          Signup
        </CustomLink>
        {/* <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border-2 border-primary">
          <AccountCircleRoundedIcon
            fontSize="inherit"
            className="icon-xl text-primary"
          />
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
