"use client";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heading, Card } from "@/components";

type BarChartProps = {
  data: Record<string, any>[];
  xAxisKey: string;
  yAxisKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  barSpacingPerc?: string;
  barRadiiArray?: number | [number, number, number, number];
  variant?: "surface" | "surface-top" | "outlined" | "outlined-primary";
  className?: string;
};

export const CustomBarChart = ({
  data,
  xAxisKey,
  yAxisKey,
  title,
  subtitle,
  height = 300,
  barSpacingPerc = "10%",
  barRadiiArray = [4, 4, 4, 4],
  variant = "surface",
  className,
}: BarChartProps) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <Card
        variant={variant}
        className={`items-stretch justify-center w-full gap-4 ${className ?? ""}`}
      >
        <div className="flex flex-col items-stretch rounded-lg p-4">
          {title && <Heading>{title}</Heading>}
          {subtitle && (
            <p className="text-sm text-foreground-alt">{subtitle}</p>
          )}
        </div>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            barCategoryGap={barSpacingPerc}
            margin={{ left: -20, right: 20, bottom: 25 }}
          >
            <CartesianGrid
              syncWithTicks={true}
              stroke="var(--foreground-alt)"
              strokeDasharray="5 5"
            />
            <XAxis
              dataKey={xAxisKey}
              stroke="var(--foreground-alt)"
              fontSize={12}
              textAnchor="end"
              angle={-45}
              interval="equidistantPreserveEnd"
            />
            <YAxis
              dataKey={yAxisKey}
              stroke="var(--foreground-alt)"
              fontSize={12}
            />
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
              dataKey={yAxisKey}
              radius={barRadiiArray}
              fill="var(--primary)"
              activeBar={{ fill: "var(--secondary)" }}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={100}
              className="cursor-pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
