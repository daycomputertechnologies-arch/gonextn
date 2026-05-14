import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface NavyCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
}

export function NavyCard({
  glow,
  hover,
  className,
  children,
  ...props
}: NavyCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-6",
        glow && "glow-gold",
        hover && "hover:border-primary/40 transition-smooth cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
