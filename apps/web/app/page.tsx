"use client";
import { LandingHero, DashboardCardsRows } from "@/components";
import { CustomBarChart, CustomLineChart } from "@/components/charts";

export default function Home() {
  const dummyBarChartData = [
    { name: "React", frequency: 24 },
    { name: "Next.js", frequency: 36 },
    { name: "NestJS", frequency: 15 },
    { name: "Tanstack Query", frequency: 9 },
    { name: "Tailwind CSS", frequency: 32 },
    { name: "Postgres", frequency: 20 },
    { name: "Docker", frequency: 10 },
  ];

  const dummyLineChartData = [
    { date: new Date("2026-01-01"), newUsers: 9 },
    { date: new Date("2026-02-01"), newUsers: 22 },
    { date: new Date("2026-03-01"), newUsers: 34 },
    { date: new Date("2026-04-01"), newUsers: 58 },
    { date: new Date("2026-05-01"), newUsers: 109 },
  ];

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      {/* Hero Landing Section */}
      <LandingHero />

      {/* Dashboard Fact Cards Row */}
      <DashboardCardsRows />

      {/* Visualizations */}
      <div className="flex flex-row items-center justify-center gap-4">
        <CustomBarChart
          data={dummyBarChartData}
          xAxisKey="name"
          yAxisKey="frequency"
          title="Skills Distribution"
          subtitle="Frequency distribution of most popular skills"
        />
        <CustomLineChart
          data={dummyLineChartData}
          xAxisKey="date"
          yAxisKey="newUsers"
          title="New Users"
          subtitle="User registrations trend over time"
        />
      </div>
    </div>
  );
}
