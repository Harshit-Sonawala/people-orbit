"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heading, Card } from "@/components";

type LineChartProps = {
  data: Record<string, unknown>[];
  xAxisKey: string;
  yAxisKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
};

export const CustomLineChart = ({
  data,
  xAxisKey,
  yAxisKey,
  title,
  subtitle,
  height = 300,
  className,
}: LineChartProps) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <Card
        className={`items-stretch justify-center w-full ${className ?? ""}`}
      >
        <div className="flex flex-col items-stretch rounded-lg p-4">
          {title && <Heading>{title}</Heading>}
          {subtitle && (
            <p className="text-sm text-foreground-alt">{subtitle}</p>
          )}
        </div>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ left: -20, right: 20 }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey={xAxisKey as string}
              stroke="var(--foreground-alt)"
              fontSize={12}
            />
            <YAxis
              dataKey={yAxisKey as string}
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
            <Line
              dataKey="frequency"
              fill="var(--primary)"
              className="cursor-pointer"
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={100}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
