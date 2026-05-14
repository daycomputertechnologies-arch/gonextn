import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { NavyCard } from "./NavyCard";

interface StatCardProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}

export function StatCard({
  label,
  value,
  trend,
  trendValue,
  icon,
  className,
  ...rest
}: StatCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-red-400"
        : "text-muted-foreground";

  return (
    <NavyCard className={cn("flex flex-col gap-3", className)} {...rest}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          {label}
        </span>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      <div className="text-2xl font-bold font-display text-foreground">
        {value}
      </div>
      {trend && trendValue && (
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trendColor,
          )}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          <span>{trendValue}</span>
        </div>
      )}
    </NavyCard>
  );
}
