import { useUsers } from "@/hooks";
import { Heading, StatCard } from "@/components";
import {
  PeopleAltRounded,
  WorkRounded,
  PersonAddAlt1Rounded,
  PsychologyRounded,
  CakeRounded,
  TrendingUpRounded,
  EmojiEventsRounded,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export const DashboardCardsRows = () => {
  const { getStats } = useUsers();
  const { data, isLoading } = getStats();

  const {
    totalUsers = 0,
    newUsersCount = 0,
    uniqueDesignations = 0,
    uniqueSkills = 0,
    avgAge = 0,
    topDesignations = [],
    topSkills = [],
    newestUserName = "-",
  } = data ?? {};

  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Heading variant="md">At a Glance</Heading>
              <p className="text-sm text-foreground-alt">
                View key user statistics
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {/* Total Users */}
              <StatCard
                icon={<PeopleAltRounded className="icon-lg" />}
                title="Total Users"
                statistic={totalUsers.toString()}
                color="primary"
              />
              {/* New Users joined in the past year */}
              <StatCard
                icon={<PersonAddAlt1Rounded className="icon-lg" />}
                title="New Members"
                statistic={newUsersCount.toString()}
                color="warning"
              />
              {/* Unique Designations */}
              <StatCard
                icon={<WorkRounded className="icon-lg" />}
                title="Unique Designations"
                statistic={uniqueDesignations.toString()}
                color="info"
              />
              {/* Unique Skills */}
              <StatCard
                icon={<PsychologyRounded className="icon-lg" />}
                title="Unique Skills"
                statistic={uniqueSkills.toString()}
                color="primary-alt"
              />
              {/* Average Age */}
              <StatCard
                icon={<CakeRounded className="icon-lg" />}
                title="Average Age"
                statistic={avgAge.toString()}
                color="secondary"
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-4">
            {/* Top 3 Designations */}
            <StatCard
              icon={<TrendingUpRounded className="icon-lg" />}
              title="Top 3 Designations"
              statistic={topDesignations.join(", ")}
              color="tertiary"
            />

            {/* Top 3 Skills */}
            <StatCard
              icon={<EmojiEventsRounded className="icon-lg" />}
              title="Top 3 Skills"
              statistic={topSkills.join(", ")}
              color="accent"
            />

            {/* Newest User Name */}
            <StatCard
              icon={<PersonAddAlt1Rounded className="icon-lg" />}
              title="Newest User"
              statistic={newestUserName}
              color="success"
            />
          </div>
        </div>
      )}
    </>
  );
};
