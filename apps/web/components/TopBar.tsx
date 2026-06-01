import { SatelliteAltRounded } from "@mui/icons-material";
import {
  CustomLink,
  SearchInput,
  ThemeToggleButton,
  TopBarLoginButton,
} from "@/components";
import { User } from "@/types";

export const TopBar = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-row items-center justify-between py-1 px-4 w-full md:w-[90%] mx-auto mb-2">
      <CustomLink href="/" className="py-2 px-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <SatelliteAltRounded
            fontSize="inherit"
            className="icon-xl text-primary"
          />
          <h1 className="text-3xl font-bold">
            People<span className="text-primary">Orbit</span>
          </h1>
        </div>
      </CustomLink>

      <SearchInput />

      <div className="flex flex-row items-center justify-center gap-4 rounded-lg">
        <CustomLink href="/about">About</CustomLink>
        <CustomLink href="/demo">Demo</CustomLink>
        <ThemeToggleButton />
        <TopBarLoginButton user={user} />
      </div>
    </div>
  );
};
