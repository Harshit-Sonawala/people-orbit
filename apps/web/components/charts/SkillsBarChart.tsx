"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heading, Card } from "@/components";

type SkillChartData = {
  name: string;
  frequency: number;
};

type BarChartProps = {
  data?: SkillChartData[];
  className?: string;
};

const dummyBarChartData: SkillChartData[] = [
  { name: "React", frequency: 24 },
  { name: "Next.js", frequency: 36 },
  { name: "NestJS", frequency: 15 },
  { name: "Tanstack Query", frequency: 9 },
  { name: "Tailwind CSS", frequency: 32 },
  { name: "Postgres", frequency: 20 },
  { name: "Docker", frequency: 10 },
];

export const SkillsBarChart = ({
  data = dummyBarChartData,
  className,
}: BarChartProps) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <Card
        className={`items-stretch justify-center w-full h-100 ${className ?? ""}`}
      >
        <div className="flex flex-col items-stretch rounded-lg p-4">
          <Heading>Skills Distribution</Heading>
          <p className="text-sm text-foreground-alt">
            View a distribution of all skills
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -20, right: 20 }}>
            <XAxis
              dataKey="name"
              stroke="var(--foreground-alt)"
              fontSize={12}
            />
            <YAxis stroke="var(--foreground-alt)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--surface-top)",
                color: "var(--foreground)",
                borderRadius: "8px",
              }}
              cursor={{ fill: "var(--surface-top)", opacity: 0.4 }}
            />
            <Bar
              dataKey="frequency"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
