import { Card } from "@/components/Card";

export type StatCardColor =
  | "primary"
  | "primary-alt"
  | "secondary"
  | "tertiary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

const colorMap: Record<StatCardColor, string> = {
  primary: "bg-primary/10 text-primary",
  "primary-alt": "bg-primary-alt/10 text-primary-alt",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
  accent: "bg-accent/10 text-accent",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
};

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  statistic: string;
  color?: StatCardColor;
};

export const StatCard = ({
  icon,
  title,
  statistic,
  color = "primary",
}: StatCardProps) => {
  const colorClasses = colorMap[color] || colorMap.primary;
  const isLong = statistic.length > 5 || !/^\d+$/.test(statistic.trim());
  const statTextClass = isLong ? "text-lg" : "text-3xl";

  return (
    <Card className="flex-row items-center gap-4 py-5 hover:bg-surface-top transition-colors duration-200">
      <div className={`flex items-center justify-center w-13 h-13 rounded-full shrink-0 ${colorClasses}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-xs font-semibold text-foreground-alt uppercase tracking-wider whitespace-nowrap">
          {title}
        </p>
        <p className={`font-bold text-foreground truncate ${statTextClass}`}>
          {statistic}
        </p>
      </div>
    </Card>
  );
};
