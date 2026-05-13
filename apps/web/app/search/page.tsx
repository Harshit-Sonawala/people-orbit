"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import {
  Heading1,
  Heading2,
  Button,
  Divider,
  SearchResultCard,
} from "@/components";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [page, setPage] = useState(1);
  const limit = 30;

  const {
    data: results,
    isLoading: resultsIsLoading,
    isError: resultsIsError,
    error: resultsError,
  } = useUsers(undefined, page, limit, undefined, undefined, query).search;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading2>
            {query ? `Search Results for "${query}"` : "Search Results"}
          </Heading2>
        </div>
        <Divider />
      </div>

      {resultsIsLoading && (
        <p className="text-center py-8 text-secondary">Finding people...</p>
      )}

      {resultsIsError && (
        <p className="text-center text-error py-8">
          Error: {resultsError.message}
        </p>
      )}

      {results && results.data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Layout and spacing synced with Home.tsx */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary">
              Found {results.meta.total} result
              {results.meta.total !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {results.data.map((eachUser, i) => (
                <SearchResultCard User={eachUser} key={eachUser.id ?? i} />
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
                    setPage((oldPage) => Math.max(oldPage - 1, 1));
                  }
                }}
              >
                <ArrowBackRounded />
                PREV
              </Button>
              <div className="flex flex-row gap-4">
                {Array.from(
                  { length: results.meta.totalPages },
                  (_, i) => i + 1,
                ).map((eachPage) =>
                  results.meta.currentPage === eachPage ? (
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
                disabled={page === results.meta.totalPages}
                variant="rounded"
                onClick={() => {
                  if (page < results.meta.totalPages) {
                    setPage((oldPage) =>
                      Math.min(results.meta.totalPages, oldPage + 1),
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
      ) : (
        !resultsIsLoading &&
        query && (
          <div className="flex flex-col items-stretch justify-center py-10 gap-2">
            <Heading1>No Results Found</Heading1>
            <p className="text-secondary">
              We couldn't find anyone matching "{query}".
            </p>
            <p className="text-sm text-foreground-alt">
              Try checking your spelling or searching by different keywords.
            </p>
          </div>
        )
      )}
    </div>
  );
}
