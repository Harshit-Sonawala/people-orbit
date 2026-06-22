import { useUsers } from "@/hooks";
import { Heading, Card, StatCard } from "@/components";
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
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4">
            <div className="flex flex-col p-4">
              <Heading variant="md">Key Statistics</Heading>
              <p className="text-sm text-foreground-alt">
                View user details at a glance
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {/* Total Users */}
              <StatCard
                icon={<PeopleAltRounded className="icon-lg" />}
                title="Total Users"
                statistic={totalUsers ? totalUsers.toString() : "-"}
                color="primary"
              />
              {/* New Users joined in the past year */}
              <StatCard
                icon={<PersonAddAlt1Rounded className="icon-lg" />}
                title="New Members"
                statistic={newUsersCount ? newUsersCount.toString() : "-"}
                color="warning"
              />
              {/* Unique Designations */}
              <StatCard
                icon={<WorkRounded className="icon-lg" />}
                title="Unique Designations"
                statistic={
                  uniqueDesignations ? uniqueDesignations.toString() : "-"
                }
                color="info"
              />
              {/* Unique Skills */}
              <StatCard
                icon={<PsychologyRounded className="icon-lg" />}
                title="Unique Skills"
                statistic={uniqueSkills ? uniqueSkills.toString() : "-"}
                color="primary-alt"
              />
              {/* Average Age */}
              <StatCard
                icon={<CakeRounded className="icon-lg" />}
                title="Average Age"
                statistic={avgAge ? avgAge.toString() : "-"}
                color="secondary"
              />
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {/* Top 3 Designations */}
              <StatCard
                icon={<TrendingUpRounded className="icon-lg" />}
                title="Top 3 Designations"
                statistic={topDesignations ? topDesignations.join(", ") : "-"}
                color="tertiary"
              />

              {/* Top 3 Skills */}
              <StatCard
                icon={<EmojiEventsRounded className="icon-lg" />}
                title="Top 3 Skills"
                statistic={topSkills ? topSkills.join(", ") : "-"}
                color="accent"
              />

              {/* Newest User Name */}
              <StatCard
                icon={<PersonAddAlt1Rounded className="icon-lg" />}
                title="Newest User"
                statistic={newestUserName ? newestUserName : "-"}
                color="success"
              />
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
