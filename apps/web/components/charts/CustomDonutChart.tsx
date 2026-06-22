"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
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
  const total = data.reduce(
    (sum, item) => sum + (Number(item[dataKey]) || 0),
    0,
  );

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
    payload,
    fill,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);

    // sx, sy: start of line on the outer edge of pie slice
    const sx = cx + outerRadius * cos;
    const sy = cy + outerRadius * sin;

    // mx, my: knee point
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;

    // ex, ey: end of line pointing horizontally left or right
    const ex = mx + (cos >= 0 ? 1 : -1) * 15;
    const ey = my;

    // tx, ty: text position
    const tx = ex + (cos >= 0 ? 1 : -1) * 6;
    const ty = ey;

    const textAnchor = cos >= 0 ? "start" : "end";
    const labelText = name || payload?.[nameKey] || "";
    const count = payload?.[dataKey] ?? 0;
    const percentStr =
      total > 0 ? `${((count / total) * 100).toFixed(2)}%` : "0.00%";

    if (!labelText) return null;

    return (
      <g>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          strokeWidth={1.5}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} />
        <text
          x={tx}
          y={ty}
          fill="var(--foreground)"
          textAnchor={textAnchor}
          dominantBaseline="central"
          className="text-sm font-light"
        >
          {`${labelText.slice(0, 10)}${labelText.length > 12 ? "..." : ""} - ${percentStr}`}
        </text>
      </g>
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
              innerRadius="60%"
              outerRadius="100%"
              cornerRadius="4%"
              paddingAngle={4}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={100}
              className="cursor-pointer"
              stroke="none"
            >
              <LabelList
                dataKey={dataKey}
                position="inside"
                fill="var(--foreground)"
                className="text-sm font-semibold select-none pointer-events-none"
              />
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
              <Label
                value={total}
                position="center"
                dy={-10}
                fill="var(--foreground)"
                className="text-4xl font-semibold"
              />
              <Label
                value="Total"
                position="center"
                dy={20}
                fill="var(--foreground-alt)"
                className="text-xs text-foreground-alt uppercase tracking-wider"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
