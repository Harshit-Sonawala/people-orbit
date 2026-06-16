"use client";
import { User } from "@/types";
import { useUsers } from "@/hooks";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Heading,
  LandingHero,
  StatCard,
  Card,
  Button,
  DropDown,
  UserCard,
  type DropDownOption,
} from "@/components";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  HistoryRounded,
  SortByAlphaRounded,
  PeopleAltRounded,
  WorkRounded,
  PersonAddAlt1Rounded,
  PsychologyRounded,
  CakeRounded,
  LinkRounded,
  TrendingUpRounded,
  EmojiEventsRounded,
} from "@mui/icons-material";

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

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      {/* Hero Landing Section */}
      <LandingHero />

      {/* Dashboard Fact Cards Row */}
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex flex-col">
          <Heading variant="md">Statistics</Heading>
          <p className="text-sm text-foreground-alt">
            Facts and figures at a glance
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {/* Card 1: Total People */}
          <StatCard
            icon={<PeopleAltRounded className="icon-lg" />}
            title="Total People"
            statistic={(data?.meta.total ?? 0).toString()}
            color="primary"
          />

          {/* Card 2: Total Designations */}
          <StatCard
            icon={<WorkRounded className="icon-lg" />}
            color="tertiary"
            title="Designations"
            statistic={(data
              ? new Set(data.data.map((u) => u.designation)).size
              : 0
            ).toString()}
          />

          {/* Card 3: New Members (Past 1 Year) */}
          <StatCard
            icon={<PersonAddAlt1Rounded className="icon-lg" />}
            title="New Members"
            statistic={(data
              ? data.data.filter(
                  (u) =>
                    new Date(u.createdAt) >
                    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                ).length
              : 0
            ).toString()}
            color="warning"
          />

          {/* Card 4: Unique Skills */}
          <StatCard
            icon={<PsychologyRounded className="icon-lg" />}
            title="Unique Skills"
            statistic={(data
              ? new Set(data.data.flatMap((u) => u.skills || [])).size
              : 0
            ).toString()}
            color="primary-alt"
          />

          {/* Card 7: Top Designation */}
          <StatCard
            icon={<TrendingUpRounded className="icon-lg" />}
            color="info"
            title="Top Designation"
            statistic={
              data && data.data.length
                ? (() => {
                    const freq = data.data.reduce<Record<string, number>>(
                      (acc, u) => {
                        acc[u.designation] = (acc[u.designation] ?? 0) + 1;
                        return acc;
                      },
                      {},
                    );
                    return (
                      Object.entries(freq).sort(
                        (a, b) => b[1] - a[1],
                      )[0]?.[0] ?? "—"
                    );
                  })()
                : "—"
            }
          />

          {/* Card 8: Most Popular Skill */}
          <StatCard
            icon={<EmojiEventsRounded className="icon-lg" />}
            title="Most Popular Skill"
            statistic={
              data && data.data.length
                ? (() => {
                    const freq = data.data
                      .flatMap((u) => u.skills || [])
                      .reduce<Record<string, number>>((acc, s) => {
                        acc[s] = (acc[s] ?? 0) + 1;
                        return acc;
                      }, {});
                    return (
                      Object.entries(freq).sort(
                        (a, b) => b[1] - a[1],
                      )[0]?.[0] ?? "—"
                    );
                  })()
                : "—"
            }
            color="accent"
          />
        </div>
      </div>

      {/* UserCards Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Heading variant="md">Find People</Heading>
            <p className="text-sm text-foreground-alt">
              {/* Found {data.meta.total} record
              {data.meta.total !== 1 ? "s" : ""} */}
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
