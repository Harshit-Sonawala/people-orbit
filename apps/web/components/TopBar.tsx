import { SatelliteAltRounded, AccountCircleRounded } from "@mui/icons-material";
import { CustomLink, SearchInput } from "@/components";

export const TopBar = () => {
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
        <a
          href="/account"
          rel="noopener noreferrer"
          className="p-1 rounded-full bg-surface-top text-primary hover:bg-primary-light hover:text-surface transition-colors"
        >
          <AccountCircleRounded className="icon-xl" />
        </a>
        {/* <CustomLink href="/account" className="p-2 rounded-full">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface">
            <AccountCircleRounded
              fontSize="inherit"
              className="icon-xl text-primary"
            />
          </div>
        </CustomLink> */}
      </div>
    </div>
  );
};
