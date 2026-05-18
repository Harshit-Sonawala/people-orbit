"use client";
import { Heading1, Heading3, Divider, CustomLink } from "@/components";
import { UserCard } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useUsers } from "@/hooks";

export default function Account() {
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser,
  );

  const { getById } = useUsers();
  const { data, isLoading, isError, error } = getById(
    loggedInUser?.id ?? "arjun-mehta-1755163800000",
  );

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Heading1>Account</Heading1>
        <Divider />
      </div>
      {isLoading && <p className="text-center py-8">Loading Data...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {data && (
        <div className="flex flex-row gap-4">
          <UserCard User={data}></UserCard>
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
      )}
    </div>
  );
}
