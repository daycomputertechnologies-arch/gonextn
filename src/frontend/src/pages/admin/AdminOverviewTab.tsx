import {
  useAdminDeposits,
  useAdminUsers,
  useAdminWallets,
  useAdminWithdrawals,
} from "@/hooks/useBackend";
import type { DepositStatus, WithdrawalStatus } from "@/types";
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

interface Props {
  onNavigate: (
    tab: "overview" | "wallets" | "users" | "deposits" | "withdrawals",
  ) => void;
}

function formatAmount(n: bigint): string {
  const num = Number(n) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(num);
}

export default function AdminOverviewTab({ onNavigate }: Props) {
  const { data: users = [] } = useAdminUsers();
  const { data: deposits = [] } = useAdminDeposits();
  const { data: withdrawals = [] } = useAdminWithdrawals();
  const { data: wallets = [] } = useAdminWallets();

  const pendingDeposits = deposits.filter(
    (d) => (d.status as unknown as DepositStatus) === "PENDING",
  );
  const pendingWithdrawals = withdrawals.filter(
    (w) => (w.status as unknown as WithdrawalStatus) === "PENDING",
  );
  const totalCapital = deposits
    .filter((d) => (d.status as unknown as DepositStatus) === "CONFIRMED")
    .reduce((acc, d) => acc + d.amount, BigInt(0));

  const stats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      tab: "users" as const,
    },
    {
      label: "Total Capital",
      value: formatAmount(totalCapital),
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      tab: "deposits" as const,
    },
    {
      label: "Pending Deposits",
      value: pendingDeposits.length.toString(),
      icon: DollarSign,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      tab: "deposits" as const,
    },
    {
      label: "Pending Withdrawals",
      value: pendingWithdrawals.length.toString(),
      icon: BarChart3,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      tab: "withdrawals" as const,
    },
  ];

  const quickLinks = [
    {
      label: "Manage Crypto Wallets",
      tab: "wallets" as const,
      icon: Wallet,
      desc: `${wallets.length} wallets configured`,
    },
    {
      label: "Review Users",
      tab: "users" as const,
      icon: Users,
      desc: `${users.length} registered users`,
    },
    {
      label: "Confirm Deposits",
      tab: "deposits" as const,
      icon: DollarSign,
      desc: `${pendingDeposits.length} awaiting confirmation`,
    },
    {
      label: "Process Withdrawals",
      tab: "withdrawals" as const,
      icon: BarChart3,
      desc: `${pendingWithdrawals.length} awaiting approval`,
    },
  ];

  return (
    <div className="space-y-8" data-ocid="admin.overview_section">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => onNavigate(stat.tab)}
              className="bg-card border border-border rounded-xl p-5 text-left hover:border-primary/30 transition-smooth group"
              data-ocid={`admin.stat.item.${i + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </button>
          );
        })}
      </div>

      {/* Quick Navigation */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.tab}
                type="button"
                onClick={() => onNavigate(link.tab)}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/40 hover:bg-secondary transition-smooth group text-left"
                data-ocid={`admin.quicknav.${link.tab}_button`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {link.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-smooth" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
