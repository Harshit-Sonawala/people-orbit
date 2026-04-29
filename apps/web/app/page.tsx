"use client";
import { useState } from "react";

import { useFetchPeople } from "@/hooks/useFetchPeople"; // Tanstack Query fetch hook

import {
  Card,
  Header2,
  Button,
  Divider,
  PeopleCard,
} from "@/components";

import {
  ArrowBackRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const {
    data: people,
    isLoading,
    isError,
    error,
  } = useFetchPeople(page, limit);

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 my-2">
      <div className="flex flex-col gap-2">
        <Header2>Browse all records</Header2>
        <Divider variant="secondary" />
      </div>
      {isLoading && <p className="text-center py-8">Loading People Data...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
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
