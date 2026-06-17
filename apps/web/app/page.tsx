"use client";
import { User, BarChartData } from "@/types";
import { useUsers } from "@/hooks";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Heading,
  LandingHero,
  Button,
  DropDown,
  UserCard,
  type DropDownOption,
  DashboardCardsRows,
} from "@/components";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  HistoryRounded,
  SortByAlphaRounded,
} from "@mui/icons-material";
import { CustomBarChart } from "@/components/charts";

const sortMap = new Map<string, DropDownOption>([
  ["createdAt", { label: "Date Created", icon: <HistoryRounded /> }],
  ["updatedAt", { label: "Date Updated", icon: <HistoryRounded /> }],
  ["firstName", { label: "First Name", icon: <SortByAlphaRounded /> }],
  ["lastName", { label: "Last Name", icon: <SortByAlphaRounded /> }],
]);

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 28;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";

  const { getAll } = useUsers();
  const { data, isLoading, isError, error } = getAll(
    page,
    limit,
    sortBy,
    order,
  );

  // Updates current page query params based on Tanstack results
  const updateURLSearchParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const dummyBarChartData: BarChartData[] = [
    { name: "React", frequency: 24 },
    { name: "Next.js", frequency: 36 },
    { name: "NestJS", frequency: 15 },
    { name: "Tanstack Query", frequency: 9 },
    { name: "Tailwind CSS", frequency: 32 },
    { name: "Postgres", frequency: 20 },
    { name: "Docker", frequency: 10 },
  ];

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      {/* Hero Landing Section */}
      <LandingHero />

      {/* Dashboard Fact Cards Row */}
      <DashboardCardsRows />

      {/* Visualtizations */}
      <div className="flex flex-row items-center justify-center gap-4">
        <CustomBarChart
          data={dummyBarChartData}
          title="Skills Distribution"
          subtitle="This is the subtitle"
        />
        <CustomBarChart
          data={dummyBarChartData}
          title="Title"
          subtitle="This is the subtitle"
        />
      </div>

      {/* UserCards Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Heading variant="md">Find People</Heading>
            <p className="text-sm text-foreground-alt">
              Browse through all user profiles
            </p>
          </div>
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
      </div>
      {isLoading && <p className="text-center py-8">Loading User Data...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {data && data.data.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
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
                className="gap-2"
              >
                <ArrowBackRounded className="icon-md" />
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
                  }
                }}
                className="gap-2"
              >
                NEXT
                <ArrowForwardRounded className="icon-md" />
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
