"use client";
import { Header1, Header3, Divider, CustomLink } from "@/components";

type Props = {};

export default function Account({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Header1>Account</Header1>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <CustomLink
          href={`/account/profile`}
          className="text-md font-semibold py-3"
        >
          View your profile
        </CustomLink>
        <CustomLink
          href="/account/manage-users"
          className="text-md font-semibold py-3"
        >
          Manage users
        </CustomLink>
      </div>
    </div>
  );
}
