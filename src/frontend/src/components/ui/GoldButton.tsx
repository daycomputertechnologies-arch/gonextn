import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function GoldButton({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: GoldButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
        variant === "solid" &&
          "gold-gradient text-background hover:opacity-90 shadow-gold active:scale-[0.98]",
        variant === "outline" &&
          "border border-primary text-primary hover:bg-primary/10 bg-transparent",
        variant === "ghost" &&
          "text-primary hover:bg-primary/10 bg-transparent",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-2.5 text-sm",
        size === "lg" && "px-8 py-3.5 text-base",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
