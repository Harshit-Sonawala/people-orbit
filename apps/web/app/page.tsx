"use client";
import { User } from "@/types";
import { useUsers } from "@/hooks";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  LandingHero,
  Heading,
  DropDown,
  Button,
  UserCard,
  Card,
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
  ContactPhoneRounded,
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
      <div className="flex flex-col gap-2 mb-12">
        <Heading variant="md">At a Glance</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1: Total People */}
          <Card className="flex-row items-center gap-4 hover:bg-surface-top transition-colors duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
              <PeopleAltRounded className="icon-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-semibold text-foreground-alt uppercase tracking-wider">
                Total People
              </p>
              <p className="text-2xl font-bold text-foreground truncate">
                {data?.meta.total ?? 0}
              </p>
            </div>
          </Card>

          {/* Card 2: Total Designations */}
          <Card className="flex-row items-center gap-4 hover:bg-surface-top transition-colors duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary shrink-0">
              <WorkRounded className="icon-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-semibold text-foreground-alt uppercase tracking-wider">
                Designations
              </p>
              <p className="text-2xl font-bold text-foreground truncate">
                {data ? new Set(data.data.map((u) => u.designation)).size : 0}
              </p>
            </div>
          </Card>

          {/* Card 3: New Members (Past 1 Year) */}
          <Card className="flex-row items-center gap-4 hover:bg-surface-top transition-colors duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning/10 text-warning shrink-0">
              <PersonAddAlt1Rounded className="icon-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-semibold text-foreground-alt uppercase tracking-wider">
                New Members
              </p>
              <p className="text-2xl font-bold text-foreground truncate">
                {data
                  ? data.data.filter(
                      (u) =>
                        new Date(u.createdAt) >
                        new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                    ).length
                  : 0}
              </p>
            </div>
          </Card>

          {/* Card 4: Verified Contacts */}
          <Card className="flex-row items-center gap-4 hover:bg-surface-top transition-colors duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-alt/10 text-primary-alt shrink-0">
              <ContactPhoneRounded className="icon-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-semibold text-foreground-alt uppercase tracking-wider">
                Verified Members
              </p>
              <p className="text-2xl font-bold text-foreground truncate">
                {data ? data.data.filter((u) => u.email && u.phone).length : 0}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* UserCards Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Heading variant="md">Find People</Heading>
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
