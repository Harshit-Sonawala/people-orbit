"use client";
import { useState } from "react";
import { usePeople } from "@/hooks/usePeople";
import { Heading2, DropDown, Button, Divider, PeopleCard } from "@/components";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  SortRounded,
} from "@mui/icons-material";

export default function Home() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(0);
  const [order, setOrder] = useState("asc");
  const limit = 12;

  const sortOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Date Created", value: "dateCreated" },
    { label: "Date Updated", value: "dateUpdated" },
  ];

  const {
    data: people,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
    error: peopleError,
  } = usePeople(undefined, page, limit).getAll;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading2>Browse All People Records</Heading2>
          <div className="flex flex-row items-center justify-between gap-4">
            <p className="font-medium">Sort:</p>
            <DropDown
              onSelect={(index) => setSortBy(index)}
              label={sortOptions[sortBy].label}
              icon={<SortRounded />}
              options={sortOptions.map((opt) => ({
                label: opt.label,
                icon: <SortRounded />,
              }))}
            />
            <p className="font-medium">Order:</p>
            <Button
              variant="rounded"
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            >
              {order === "asc" ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <ArrowUpwardRounded />
                  <p>ASC</p>
                </div>
              ) : (
                <div className="flex flex-row justify-center gap-2">
                  <ArrowDownwardRounded />
                  <p>DESC</p>
                </div>
              )}
            </Button>
          </div>
        </div>
        <Divider />
      </div>
      {peopleIsLoading && (
        <p className="text-center py-8">Loading People Data...</p>
      )}
      {peopleIsError && (
        <p className="text-center text-error py-8">
          Error: {peopleError.message}
        </p>
      )}
      {people && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {people.data.map((eachPeople, i) => (
              <PeopleCard People={eachPeople} key={eachPeople.id ?? i} />
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
                  { length: people.meta.totalPages },
                  (_, i) => i + 1,
                ).map((eachPage) =>
                  people.meta.currentPage === eachPage ? (
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
                disabled={page === people.meta.totalPages}
                variant="rounded"
                onClick={() => {
                  if (page < people.meta.totalPages) {
                    setPage((oldPage) =>
                      Math.min(people.meta.totalPages, oldPage + 1),
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
