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
import { BarChartData } from "@/types";

type BarChartProps = {
  data: BarChartData[];
  title?: string;
  subtitle?: string;
  className?: string;
};

export const CustomBarChart = ({
  data,
  title,
  subtitle,
  className,
}: BarChartProps) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <Card
        className={`items-stretch justify-center w-full h-100 ${className ?? ""}`}
      >
        <div className="flex flex-col items-stretch rounded-lg p-4">
          {title && <Heading>{title}</Heading>}
          {subtitle && (
            <p className="text-sm text-foreground-alt">{subtitle}</p>
          )}
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
              cursor={false}
            />
            <Bar
              dataKey="frequency"
              radius={[4, 4, 4, 4]}
              fill="var(--primary)"
              activeBar={{ fill: "var(--primary-alt)" }}
              className="cursor-pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
