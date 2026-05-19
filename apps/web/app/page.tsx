"use client";
import { useUsers } from "@/hooks/useUsers";
import {
  Heading,
  DropDown,
  Button,
  Divider,
  UserCard,
  type DropDownOption,
} from "@/components";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  HistoryRounded,
  SortByAlphaRounded,
} from "@mui/icons-material";
import { User } from "@/types";

const sortMap = new Map<string, DropDownOption>([
  ["createdOn", { label: "Date Created", icon: <HistoryRounded /> }],
  ["updatedOn", { label: "Date Updated", icon: <HistoryRounded /> }],
  ["firstName", { label: "First Name", icon: <SortByAlphaRounded /> }],
  ["lastName", { label: "Last Name", icon: <SortByAlphaRounded /> }],
]);

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 28;
  const sortBy = searchParams.get("sortBy") || "createdOn";
  const order = searchParams.get("order") || "desc";

  // Updates current page query params based on Tanstack results
  const updateURLSearchParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const { getAll } = useUsers();
  const { data, isLoading, isError, error } = getAll(
    page,
    limit,
    sortBy,
    order,
  );

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading variant="md">Browse All Records</Heading>
          <div className="flex flex-row items-center justify-between gap-2">
            <DropDown
              options={sortMap}
              selectedValue={sortBy}
              onSelect={(key) => {
                updateURLSearchParams({
                  sortBy: key,
                  page: 1, // reset to page 1 on new sort
                });
              }}
            />
            <Button
              onClick={() => {
                updateURLSearchParams({
                  order: order === "asc" ? "desc" : "asc",
                  page: 1,
                });
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
      {isLoading && <p className="text-center py-8">Loading User Data...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {data && data.data.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-foreground-alt">
              Found {data.meta.total} record
              {data.meta.total !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.data.map((eachUser: User, i: number) => (
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
                    updateURLSearchParams({ page: page - 1 });
                  }
                }}
              >
                <ArrowBackRounded />
                PREV
              </Button>
              <div className="flex flex-row gap-4">
                {Array.from(
                  { length: data.meta.totalPages },
                  (_, i) => i + 1,
                ).map((eachPage) =>
                  data.meta.currentPage === eachPage ? (
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
                      variant="surface-rounded"
                      className="w-9 h-9"
                      onClick={() => {
                        if (eachPage !== page) {
                          updateURLSearchParams({ page: eachPage });
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
                disabled={page === data.meta.totalPages}
                variant="rounded"
                onClick={() => {
                  if (page < data.meta.totalPages) {
                    updateURLSearchParams({ page: page + 1 });
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
        !isLoading &&
        data && (
          <div className="flex flex-col items-stretch justify-center py-20 gap-2">
            <Heading variant="lg">No Records Found</Heading>
            <p className="text-secondary font-semibold">
              There seems to be an issue from our side.
            </p>
            <p className="text-sm text-foreground-alt">
              Please wait for an admin to load more user records to the
              database.
            </p>
          </div>
        )
      )}
    </div>
  );
}
