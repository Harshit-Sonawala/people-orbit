"use client";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Heading2, DropDown, Button, Divider, UserCard } from "@/components";
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
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(0);
  const [order, setOrder] = useState("desc");
  const limit = 12;

  const sortOptions = [
    { label: "Date Created", value: "dateCreated" },
    { label: "Date Updated", value: "dateUpdated" },
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
  ];

  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
  } = useUsers(undefined, page, limit, sortOptions[sortBy].value, order).getAll;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading2>Browse All Records</Heading2>
          <div className="flex flex-row items-center justify-between gap-2">
            <DropDown
              onSelectAction={(index) => {
                setSortBy(index);
                setPage(1);
              }}
              label={sortOptions[sortBy].label}
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
                setOrder(order === "asc" ? "desc" : "asc");
                setPage(1);
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
      {users && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.data.map((eachUser, i) => (
              <UserCard User={eachUser} key={eachUser.id ?? i} />
            ))}
          </div>

          <div className="flex flex-row items-center justify-center mx-auto">
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <Button
                disabled={page === 1}
                variant="rounded"
                onClick={() => {
                  if (page > 1) {
                    setPage((oldPage) => Math.max(oldPage - 1, 1));
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
                          // prevent unnecessary fetch
                          setPage(eachPage);
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
                    setPage((oldPage) =>
                      Math.min(users.meta.totalPages, oldPage + 1),
                    );
                  }
                }}
              >
                NEXT
                <ArrowForwardRounded />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
