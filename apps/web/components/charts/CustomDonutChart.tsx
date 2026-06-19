"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Heading, Card } from "@/components";

type DonutChartProps = {
  data: Record<string, any>[];
  dataKey: string;
  nameKey?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  variant?: "surface" | "surface-top" | "outlined" | "outlined-primary";
  className?: string;
};

export const CustomDonutChart = ({
  data,
  dataKey,
  nameKey = "name",
  title,
  subtitle,
  height = 300,
  variant = "surface",
  className,
}: DonutChartProps) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    payload,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 15;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const labelText = name || payload?.[nameKey] || "";

    if (!labelText) return null;

    return (
      <text
        x={x}
        y={y}
        fill="var(--foreground)"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[11px] font-semibold"
      >
        {`${labelText} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

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
          <PieChart margin={{ top: 20, bottom: 20 }}>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--surface-top)",
                color: "var(--foreground)",
                borderRadius: "8px",
              }}
              cursor={false}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              label={renderCustomizedLabel}
              labelLine={false}
              innerRadius="70%"
              outerRadius="100%"
              cornerRadius="4%"
              paddingAngle={4}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={100}
              className="cursor-pointer"
              stroke="none"
            >
              {data.map((entry, index) => {
                const colors = [
                  "var(--primary)",
                  "var(--secondary)",
                  "var(--warning)",
                  "var(--tertiary)",
                  "var(--info)",
                  "var(--success)",
                  "var(--accent)",
                ];
                const color = colors[index % colors.length];
                return (
                  <Cell key={`cell-${index}`} fill={color} stroke="none" />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
