import { useUsers } from "@/hooks";
import { CircularProgress } from "@mui/material";
import {
  CustomBarChart,
  CustomDonutChart,
  CustomLineChart,
} from "@/components/charts";

export const DashboardCharts = () => {
  const { getStats } = useUsers();
  const { data, isLoading } = getStats();

  const { skillsFreq, designationsFreq, createdAtFreq, ageFreq } = data ?? {};

  const dummyBarChartData = [
    { skill: "React", count: 24 },
    { skill: "Next.js", count: 36 },
    { skill: "NestJS", count: 15 },
    { skill: "Tanstack Query", count: 9 },
    { skill: "Tailwind CSS", count: 32 },
    { skill: "Postgres", count: 20 },
    { skill: "Docker", count: 10 },
  ];

  const dummyLineChartData = [
    { date: new Date("2026-01-01"), newUsers: 9 },
    { date: new Date("2026-02-01"), newUsers: 22 },
    { date: new Date("2026-03-01"), newUsers: 34 },
    { date: new Date("2026-04-01"), newUsers: 58 },
    { date: new Date("2026-05-01"), newUsers: 109 },
  ];

  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          <CustomBarChart
            data={skillsFreq ?? []}
            xAxisKey="skill"
            yAxisKey="count"
            title="Skills Distribution"
            subtitle="Frequency distribution of most popular skills"
          />
          <CustomDonutChart
            data={designationsFreq ?? []}
            dataKey="count"
            nameKey="designation"
            title="Designations Breakdown"
            subtitle="A detailed view into the different categories of professionals"
          />
          <CustomLineChart
            data={dummyLineChartData}
            xAxisKey="date"
            yAxisKey="newUsers"
            title="New Users"
            subtitle="User registrations trend over time"
          />
        </div>
      )}
    </>
  );
};
