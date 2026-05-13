"use client";
// import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Heading2, DropDown, Button, Divider, UserCard } from "@/components";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  SortRounded,
  HistoryRounded,
  SortByAlphaRounded,
} from "@mui/icons-material";

export default function Home() {
  const sortOptions = [
    { label: "Date Created", value: "createdOn" },
    { label: "Date Updated", value: "updatedOn" },
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "createdOn";
  const currentSortByOption =
    sortOptions.find((option) => option.value === sortBy) || sortOptions[0];
  const order = searchParams.get("order") || "desc";
  // const [page, setPage] = useState(1);
  // const [sortBy, setSortBy] = useState(0);
  // const [order, setOrder] = useState("desc");
  const limit = 30;

  const updateQuery = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
  } = useUsers(undefined, page, limit, currentSortByOption.value, order).getAll;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading2>Browse All Records</Heading2>
          <div className="flex flex-row items-center justify-between gap-2">
            <DropDown
              onSelectAction={(index) => {
                updateQuery({
                  sortBy: sortOptions[index].value,
                  page: 1, // reset to page 1 on new sort
                });
                // setSortBy(index);
                // setPage(1);
              }}
              label={currentSortByOption.label}
              icon={<SortRounded />}
              options={[
                { label: "Date Created", icon: <HistoryRounded /> },
                { label: "Date Updated", icon: <HistoryRounded /> },
                { label: "First Name", icon: <SortByAlphaRounded /> },
                { label: "Last Name", icon: <SortByAlphaRounded /> },
              ]}
            />
            <Button
              onClick={() => {
                updateQuery({
                  order: order === "asc" ? "desc" : "asc",
                  page: 1,
                });
                // setOrder(order === "asc" ? "desc" : "asc");
                // setPage(1);
              }}
            >
              {order === "asc" ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <ArrowUpwardRounded />
                  <p>Ascending</p>
                </div>
              ) : (
                <div className="flex flex-row justify-center gap-2">
                  <ArrowDownwardRounded />
                  <p>Descending</p>
                </div>
              )}
            </Button>
          </div>
        </div>
        <Divider />
      </div>
      {usersIsLoading && (
        <p className="text-center py-8">Loading User Data...</p>
      )}
      {usersIsError && (
        <p className="text-center text-error py-8">
          Error: {usersError.message}
        </p>
      )}
      {users && users.data.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-foreground-alt">
              Found {users.meta.total} record
              {users.meta.total !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.data.map((eachUser, i) => (
                <UserCard User={eachUser} key={eachUser.id ?? i} />
              ))}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center mx-auto">
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <Button
                disabled={page === 1}
                variant="rounded"
                onClick={() => {
                  if (page > 1) {
                    updateQuery({ page: page - 1 });
                    // setPage((oldPage) => Math.max(oldPage - 1, 1));
                  }
                }}
              >
                <ArrowBackRounded />
                PREV
              </Button>
              <div className="flex flex-row gap-4">
                {Array.from(
                  { length: users.meta.totalPages },
                  (_, i) => i + 1,
                ).map((eachPage) =>
                  users.meta.currentPage === eachPage ? (
                    <Button
                      key={eachPage}
                      variant="rounded"
                      className="w-9 h-9"
                    >
                      {eachPage}
                    </Button>
                  ) : (
                    <Button
                      key={eachPage}
                      variant="outlined-rounded"
                      className="w-9 h-9"
                      onClick={() => {
                        if (eachPage !== page) {
                          updateQuery({ page: eachPage });
                          // prevent unnecessary fetch
                          // setPage(eachPage);
                        }
                      }}
                    >
                      {eachPage}
                    </Button>
                  ),
                )}
              </div>
              <Button
                disabled={page === users.meta.totalPages}
                variant="rounded"
                onClick={() => {
                  if (page < users.meta.totalPages) {
                    updateQuery({ page: page + 1 });
                    // setPage((oldPage) =>
                    //   Math.min(users.meta.totalPages, oldPage + 1),
                    // );
                  }
                }}
              >
                NEXT
                <ArrowForwardRounded />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        !usersIsLoading &&
        users && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-xl font-bold">No Records Found</p>
            <p className="text-secondary text-center">
              There seems to be an issue from our side.
            </p>
            <p className="text-sm text-secondary-alt mt-4">
              Please wait for an administrator to load more records to the
              database.
            </p>
          </div>
        )
      )}
    </div>
  );
}
