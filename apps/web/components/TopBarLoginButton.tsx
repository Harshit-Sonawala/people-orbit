import { AccountCircleRounded } from "@mui/icons-material";
import { Heading, CustomLink } from "@/components";
import { User } from "@/types";

export const TopBarLoginButton = ({ user }: { user: User | null }) => {
  return !user ? (
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
  );
};
