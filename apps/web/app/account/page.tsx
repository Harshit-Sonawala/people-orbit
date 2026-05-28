"use client";
import { Heading, Divider, CustomLink, Button } from "@/components";
import { Card, UserCard } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/hooks";

export default function Account() {
  const { logout } = useAuth();

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Heading variant="lg">Account</Heading>
        <Divider />
      </div>

      <div className="flex flex-row items-center justify-stretch gap-4">
        {user && <UserCard User={user} className="flex-1" />}
        <Card variant="outlined" className="flex flex-1 flex-col gap-2">
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
          <Button
            variant="outlined"
            onClick={() => {
              logout();
            }}
            className="py-4"
          >
            Log Out
          </Button>
        </Card>
      </div>
    </div>
  );
}
