"use client";
import { Heading1, Divider, CustomLink } from "@/components";
import { UserCard } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Account() {
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser,
  );

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Heading1>Account</Heading1>
        <Divider />
      </div>

      <div className="flex flex-row items-center justify-stretch gap-4">
        {loggedInUser && <UserCard User={loggedInUser}></UserCard>}
        <div className="flex flex-1 flex-col gap-2">
          <CustomLink href={`/account/profile`} className="py-4">
            Manage your profile
          </CustomLink>
          <CustomLink href="/account/manage-users" className="py-4">
            Manage users
          </CustomLink>
          <CustomLink href="/account" className="py-4">
            Edit Preferences
          </CustomLink>
          <CustomLink href="/account" className="py-4">
            View Privacy Policy
          </CustomLink>
          <CustomLink href="/account" className="py-4">
            Log Out
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
