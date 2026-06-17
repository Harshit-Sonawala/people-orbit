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

  const formatStat = (val: number | string, fallback = "-") => {
    if (isLoading) return "...";
    return val?.toString() || fallback;
  };

  const formatListStat = (list: string[], fallback = "-") => {
    if (isLoading) return "...";
    return list.length > 0 ? list.join(", ") : fallback;
  };

  return (
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
            statistic={formatStat(totalUsers)}
            color="primary"
          />
          {/* New Users joined in the past year */}
          <StatCard
            icon={<PersonAddAlt1Rounded className="icon-lg" />}
            title="New Members"
            statistic={formatStat(newUsersCount)}
            color="warning"
          />
          {/* Unique Designations */}
          <StatCard
            icon={<WorkRounded className="icon-lg" />}
            title="Unique Designations"
            statistic={formatStat(uniqueDesignations)}
            color="info"
          />
          {/* Unique Skills */}
          <StatCard
            icon={<PsychologyRounded className="icon-lg" />}
            title="Unique Skills"
            statistic={formatStat(uniqueSkills)}
            color="primary-alt"
          />
          {/* Average Age */}
          <StatCard
            icon={<CakeRounded className="icon-lg" />}
            title="Average Age"
            statistic={formatStat(avgAge)}
            color="secondary"
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        {/* Top 3 Designations */}
        <StatCard
          icon={<TrendingUpRounded className="icon-lg" />}
          title="Top 3 Designations"
          statistic={formatListStat(topDesignations)}
          color="tertiary"
        />

        {/* Top 3 Skills */}
        <StatCard
          icon={<EmojiEventsRounded className="icon-lg" />}
          title="Top 3 Skills"
          statistic={formatListStat(topSkills)}
          color="accent"
        />

        {/* Newest User Name */}
        <StatCard
          icon={<PersonAddAlt1Rounded className="icon-lg" />}
          title="Newest User"
          statistic={formatStat(newestUserName)}
          color="success"
        />
      </div>
    </div>
  );
};
