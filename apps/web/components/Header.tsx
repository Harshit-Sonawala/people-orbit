import { User } from "@/types";
import {
  CustomLink,
  SearchInput,
  ThemeToggleButton,
  HeaderLoginButton,
  Logo,
} from "@/components";

export const Header = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-row items-center justify-between py-1 px-4 w-full md:w-[90%] mx-auto mb-8">
      <div className="flex flex-row items-center justify-between gap-4">
        <CustomLink href="/" className="py-2 px-4">
          <Logo />
        </CustomLink>

        <SearchInput />
      </div>

      <div className="flex flex-row items-center justify-center gap-4 rounded-lg">
        <CustomLink href="/about">About</CustomLink>
        <CustomLink href="/demo">Demo</CustomLink>
        <ThemeToggleButton />
        <HeaderLoginButton user={user} />
      </div>
    </div>
  );
};
