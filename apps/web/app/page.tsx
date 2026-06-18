"use client";
import { LandingHero, DashboardCardsRows, DashboardCharts } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      {/* Hero Landing Section */}
      <LandingHero />

      {/* Dashboard Fact Cards Row */}
      <DashboardCardsRows />

      {/* Visualizations */}
      <DashboardCharts />
    </div>
  );
}
