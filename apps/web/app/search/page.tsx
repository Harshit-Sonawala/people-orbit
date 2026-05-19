"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUsers } from "@/hooks";
import {
  Heading,
  Button,
  Divider,
  SearchResultCard,
} from "@/components";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  // const [page, setPage] = useState(1);
  const limit = 30;

  const updateQuery = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const { search } = useUsers();
  const { data: data, isLoading, isError, error } = search(query, page, limit);

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading variant="md">
            {query ? `Search Results for "${query}"` : "Search Results"}
          </Heading>
        </div>
        <Divider />
      </div>

      {isLoading && (
        <p className="text-center py-8 text-secondary">Finding people...</p>
      )}

      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}

      {data && data.data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Layout and spacing synced with Home.tsx */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-foreground-alt">
              Found {data.meta.total} result
              {data.meta.total !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-4">
              {data.data.map((eachUser, i) => (
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
                      variant="outlined-rounded"
                      className="w-9 h-9"
                      onClick={() => {
                        if (eachPage !== page) {
                          updateQuery({ page: eachPage });
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
                    updateQuery({ page: page + 1 });
                    // setPage((oldPage) =>
                    //   Math.min(data.meta.totalPages, oldPage + 1),
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
        query && (
          <div className="flex flex-col items-stretch justify-center py-20 gap-2">
            <Heading variant="lg">No Results Found</Heading>
            <p className="text-secondary font-semibold">
              We couldn't find any results matching "{query}".
            </p>
            <p className="text-sm text-foreground-alt">
              Try checking your spelling or searching with different keywords.
            </p>
          </div>
        )
      )}
    </div>
  );
}
