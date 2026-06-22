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

  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            data={createdAtFreq ?? []}
            xAxisKey="createdAt"
            yAxisKey="count"
            title="Monthly Growth"
            subtitle="New user registrations trend over the past few months"
          />
        </div>
      )}
    </>
  );
};
