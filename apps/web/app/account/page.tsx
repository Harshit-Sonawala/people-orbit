"use client";
import { Heading, Divider, CustomLink, Button } from "@/components";
import { Card, UserCard } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";

export default function Account() {
  const { logout } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await logout();
    dispatch(
      showNotification({
        title: "Logged Out",
        message: "You have successfully logged out.",
        type: "success",
      }),
    );
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
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
          <Button variant="outlined" onClick={handleLogout} className="py-4">
            Log Out
          </Button>
        </Card>
      </div>
    </div>
  );
}
