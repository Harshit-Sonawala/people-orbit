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
  data: Record<string, any>[];
  xAxisKey: string;
  yAxisKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  variant?: "surface" | "surface-top" | "outlined" | "outlined-primary";
  className?: string;
};

export const formatDateValue = (value: unknown): string => {
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (typeof value === "string") {
    const timestamp = Date.parse(value);
    if (!isNaN(timestamp)) {
      const hasSeparators = /[-/:]/.test(value);
      const isNotPureNumber = isNaN(Number(value));
      if (hasSeparators || isNotPureNumber) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    }
  }

  return String(value ?? "");
};

export const CustomLineChart = ({
  data,
  xAxisKey,
  yAxisKey,
  title,
  subtitle,
  height = 300,
  variant = "surface",
  className,
}: LineChartProps) => {
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
          <LineChart data={data} margin={{ left: -20, right: 20 }}>
            <CartesianGrid
              stroke="var(--foreground-alt)"
              strokeDasharray="5 5"
            />
            <XAxis
              dataKey={xAxisKey}
              stroke="var(--foreground-alt)"
              fontSize={12}
              tickFormatter={formatDateValue}
            />
            <YAxis
              dataKey={yAxisKey}
              stroke="var(--foreground-alt)"
              fontSize={12}
            />
            <Tooltip
              labelFormatter={formatDateValue}
              contentStyle={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--surface-top)",
                color: "var(--foreground)",
                borderRadius: "8px",
              }}
              cursor={false}
            />
            <Line
              dataKey={yAxisKey}
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
