"use client";
import { useSelector } from "react-redux";
import { SatelliteAltRounded, AccountCircleRounded } from "@mui/icons-material";
import {
  Heading,
  CustomLink,
  SearchInput,
  ThemeToggleButton,
} from "@/components";
import { RootState } from "@/store";

export const TopBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-row items-center justify-between py-1 px-4 w-[90%] mx-auto mb-2">
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
        {user === null ? (
          <CustomLink
            href="/login"
            className="py-1 px-4 bg-surface hover:bg-surface-top text-lg text-secondary rounded-lg gap-2"
          >
            <AccountCircleRounded className="icon-xl" />
            {`Login`}
          </CustomLink>
        ) : (
          <CustomLink
            href="/account"
            className="py-1 px-4 bg-surface hover:bg-surface-top text-lg text-secondary rounded-lg gap-2"
          >
            {/* <AccountCircleRounded className="icon-xl" /> */}
            <div className="flex flex-col items-center justify-center p-5 w-5 h-5 rounded-full bg-surface-top transition-colors duration-200 overflow-hidden">
              {/* <Image
                        src={profilePic}
                        alt={User.firstName.charAt(0)}
                        fill
                        sizes="72px"
                        className="object-cover"
                      /> */}
              {/* <PersonRounded className="icon-xl" /> */}
              <Heading className="text-xl font-medium text-secondary">{`${user.firstName.charAt(0)}`}</Heading>
            </div>
            {`${user.firstName}`}
          </CustomLink>
        )}
      </div>
    </div>
  );
};
