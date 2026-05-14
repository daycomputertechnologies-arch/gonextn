import { InvestmentStatus, Rank, WithdrawalStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDashboard,
  useMyInvestments,
  useMyWithdrawals,
  useRequestWithdrawal,
  useUserProfile,
} from "@/hooks/useBackend";
import type { InvestmentPublic, WithdrawalPublic } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── helpers ──────────────────────────────────────────────────────────────────
const PACKAGE_DAILY_RATE: Record<string, number> = {
  GENESIS: 1.0,
  MOMENTUM: 1.14,
  VELOCITY: 1.28,
};

function formatUSD(cents: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Number(cents) / 100);
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const RANK_ORDER: Rank[] = [
  Rank.PIONEER,
  Rank.INFLUENCER,
  Rank.STRATEGIST,
  Rank.CATALYST,
  Rank.ARBITRAGEUR,
  Rank.TRAILBLAZER,
  Rank.NEXUS,

  Rank.VISIONARY,
  Rank.APEX,
  Rank.GAME_CHANGER,
  Rank.LUMINARY,
  Rank.TITAN,
] as unknown as Rank[];

function nextRank(current: Rank): string {
  const idx = RANK_ORDER.indexOf(current);
  if (idx === -1 || idx >= RANK_ORDER.length - 1) return "Max Rank";
  return RANK_ORDER[idx + 1] as unknown as string;
}

function rankLabel(rank: Rank): string {
  return rank.replace(/_/g, " ");
}

// ── sub-components ───────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  delay = 0,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}) {
  return (
    <Card
      className="border-border bg-card animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground text-sm font-medium">
            {label}
          </span>
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>
        <p className="text-2xl font-bold font-display gold-text">{value}</p>
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            {trend === "up" && (
              <span className="text-emerald-400 text-xs flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Growing
              </span>
            )}
            {trend === "neutral" && (
              <span className="text-muted-foreground text-xs">Stable</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InvestmentStatusBadge({ status }: { status: InvestmentStatus }) {
  if (status === InvestmentStatus.ACTIVE)
    return (
      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border">
        Active
      </Badge>
    );
  if (status === InvestmentStatus.MATURED)
    return (
      <Badge className="bg-primary/15 text-primary border-primary/30 border">
        Matured
      </Badge>
    );
  return (
    <Badge className="bg-muted text-muted-foreground border-border border">
      Cancelled
    </Badge>
  );
}

function WithdrawalStatusBadge({ status }: { status: WithdrawalStatus }) {
  if (status === WithdrawalStatus.PENDING)
    return (
      <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/30 border flex items-center gap-1">
        <Clock className="w-3 h-3" /> Pending
      </Badge>
    );
  if (status === WithdrawalStatus.APPROVED)
    return (
      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Approved
      </Badge>
    );
  return (
    <Badge className="bg-destructive/15 text-destructive border-destructive/30 border flex items-center gap-1">
      <XCircle className="w-3 h-3" /> Rejected
    </Badge>
  );
}

function InvestmentsTable({
  investments,
}: { investments: InvestmentPublic[] }) {
  if (investments.length === 0) {
    return (
      <div
        data-ocid="investments.empty_state"
        className="text-center py-12 text-muted-foreground"
      >
        <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-medium">No active investments yet</p>
        <p className="text-sm mt-1">
          Start your first investment to grow your wealth
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Package</TableHead>
            <TableHead className="text-muted-foreground text-right">
              Amount
            </TableHead>
            <TableHead className="text-muted-foreground text-right">
              Daily Rate
            </TableHead>
            <TableHead className="text-muted-foreground">Start Date</TableHead>
            <TableHead className="text-muted-foreground">Maturity</TableHead>
            <TableHead className="text-muted-foreground text-right">
              Earnings
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((inv, i) => (
            <TableRow
              key={String(inv.id)}
              data-ocid={`investments.item.${i + 1}`}
              className="border-border hover:bg-secondary/30"
            >
              <TableCell className="font-medium text-foreground">
                {inv.packageTier}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatUSD(inv.amount)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-primary">
                ~
                {(
                  ((Number(inv.amount) / 100) *
                    (PACKAGE_DAILY_RATE[
                      inv.packageTier as keyof typeof PACKAGE_DAILY_RATE
                    ] ?? 1.0)) /
                  100
                ).toFixed(2)}
                /day
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(inv.startDate)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(inv.maturityDate)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-emerald-400">
                +{formatUSD(inv.accumulatedBalance)}
              </TableCell>
              <TableCell>
                <InvestmentStatusBadge status={inv.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function WithdrawalsTable({
  withdrawals,
}: { withdrawals: WithdrawalPublic[] }) {
  if (withdrawals.length === 0) {
    return (
      <div
        data-ocid="withdrawals.empty_state"
        className="text-center py-12 text-muted-foreground"
      >
        <DollarSign className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-medium">No withdrawal history</p>
        <p className="text-sm mt-1">Your withdrawals will appear here</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Date</TableHead>
            <TableHead className="text-muted-foreground text-right">
              Amount
            </TableHead>
            <TableHead className="text-muted-foreground">Destination</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((w, i) => (
            <TableRow
              key={String(w.id)}
              data-ocid={`withdrawals.item.${i + 1}`}
              className="border-border hover:bg-secondary/30"
            >
              <TableCell className="text-muted-foreground">
                {formatDate(w.requestedAt)}
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                {formatUSD(w.amount)}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {w.destinationAddress.slice(0, 20)}…
              </TableCell>
              <TableCell>
                <WithdrawalStatusBadge status={w.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function WithdrawalDialog({ maxAmount }: { maxAmount: bigint }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const { mutate, isPending } = useRequestWithdrawal();

  const isWeekend = (() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  })();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cents = BigInt(Math.round(Number.parseFloat(amount) * 100));
    mutate(
      { destinationAddress: destination, amount: cents },
      {
        onSuccess: () => {
          toast.success("Withdrawal request submitted successfully");
          setOpen(false);
          setAmount("");
          setDestination("");
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : "Withdrawal failed");
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary/40 text-primary hover:bg-primary/10 transition-smooth"
          data-ocid="withdrawal.open_modal_button"
        >
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Request Withdrawal
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-card border-border sm:max-w-md"
        data-ocid="withdrawal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground font-display">
            Request Withdrawal
          </DialogTitle>
        </DialogHeader>

        {isWeekend && (
          <div className="flex gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 text-sm font-medium">
                Weekend Processing Notice
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                Withdrawals submitted on weekends are queued and processed on
                the next business day.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground" htmlFor="w-amount">
              Amount (USD)
            </Label>
            <Input
              id="w-amount"
              type="number"
              min="1"
              step="0.01"
              max={Number(maxAmount) / 100}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary border-border text-foreground"
              required
              data-ocid="withdrawal.input"
            />
            <p className="text-xs text-muted-foreground">
              Available balance: {formatUSD(maxAmount)}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground" htmlFor="w-dest">
              Destination Address
            </Label>
            <Input
              id="w-dest"
              type="text"
              placeholder="Crypto wallet address"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-secondary border-border text-foreground font-mono text-sm"
              required
              data-ocid="withdrawal.destination_input"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-border"
              data-ocid="withdrawal.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || isWeekend || !amount || !destination}
              className="flex-1 gold-gradient text-card font-semibold"
              data-ocid="withdrawal.submit_button"
            >
              {isPending ? "Submitting…" : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: user, isLoading: profileLoading } = useUserProfile();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard();
  const { data: investments = [], isLoading: invLoading } = useMyInvestments();
  const { data: withdrawals = [], isLoading: wdLoading } = useMyWithdrawals();

  const isLoading = profileLoading || dashboardLoading;

  const referralLink = user
    ? `${window.location.origin}?ref=${user.referralCode}`
    : "";

  function copyReferral() {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  }

  const rankProgressPercent = dashboard
    ? Math.min(100, Number(dashboard.totalInvested) / 100)
    : 0;

  return (
    <div className="min-h-screen bg-background" data-ocid="dashboard.page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Welcome Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
          <div>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-64 mb-2 bg-secondary" />
                <Skeleton className="h-4 w-40 bg-secondary" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold font-display text-foreground">
                  Welcome back,{" "}
                  <span className="gold-text">
                    {user?.username ?? "Investor"}
                  </span>
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Here's your portfolio overview
                </p>
              </>
            )}
          </div>
          {dashboard && (
            <Badge
              className="self-start sm:self-auto px-4 py-2 text-sm font-semibold gold-gradient text-card border-0"
              data-ocid="dashboard.rank_badge"
            >
              {rankLabel(dashboard.rank)}
            </Badge>
          )}
        </div>

        {/* ── Stat Cards ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="dashboard.stats.section"
        >
          {isLoading ? (
            ["stat-1", "stat-2", "stat-3", "stat-4"].map((id) => (
              <Card key={id} className="border-border bg-card">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-28 mb-4 bg-secondary" />
                  <Skeleton className="h-8 w-36 bg-secondary" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard
                label="Account Balance"
                value={formatUSD(dashboard?.accumulatedBalance ?? 0n)}
                icon={DollarSign}
                trend="up"
                delay={0}
              />
              <StatCard
                label="Daily Earnings"
                value={formatUSD(dashboard?.dailyRoiRate ?? 0n)}
                icon={TrendingUp}
                trend="up"
                delay={100}
              />
              <StatCard
                label="Total Invested"
                value={formatUSD(dashboard?.totalInvested ?? 0n)}
                icon={ArrowUpRight}
                trend="neutral"
                delay={200}
              />
              <StatCard
                label="Referral Earnings"
                value={formatUSD(dashboard?.referralEarnings ?? 0n)}
                icon={Users}
                trend="neutral"
                delay={300}
              />
            </>
          )}
        </div>

        {/* ── Rank Progress + Referral ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Rank Progress */}
          <Card
            className="border-border bg-card animate-fade-up"
            style={{ animationDelay: "400ms", animationFillMode: "both" }}
            data-ocid="dashboard.rank.section"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display text-foreground">
                Rank Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-5 w-32 bg-secondary" />
                  <Skeleton className="h-3 w-full bg-secondary rounded-full" />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-semibold">
                      {rankLabel(dashboard?.rank ?? Rank.PIONEER)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Next: {nextRank(dashboard?.rank ?? Rank.PIONEER)}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                    <div
                      className="gold-gradient h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${rankProgressPercent}%` }}
                      role="progressbar"
                      aria-valuenow={rankProgressPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      tabIndex={0}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rankProgressPercent.toFixed(0)}% toward next rank threshold
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Referral Card */}
          <Card
            className="border-border bg-card animate-fade-up"
            style={{ animationDelay: "500ms", animationFillMode: "both" }}
            data-ocid="dashboard.referral.section"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display text-foreground">
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <Skeleton className="h-10 w-full bg-secondary" />
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">
                    Share your link to earn referral bonuses on every investment
                    made by your referrals.
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-secondary rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground truncate min-w-0">
                      {referralLink}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={copyReferral}
                      className="gold-gradient text-card font-semibold shrink-0"
                      data-ocid="dashboard.referral.copy_button"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Code:{" "}
                    <span className="text-primary font-mono font-semibold">
                      {user?.referralCode}
                    </span>
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Quick Actions ── */}
        <Card
          className="border-border bg-card animate-fade-up"
          style={{ animationDelay: "600ms", animationFillMode: "both" }}
          data-ocid="dashboard.actions.section"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display text-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate({ to: "/invest" })}
              className="gold-gradient text-card font-semibold glow-gold transition-smooth"
              data-ocid="dashboard.new_investment.button"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              New Investment
            </Button>
            <WithdrawalDialog maxAmount={dashboard?.accumulatedBalance ?? 0n} />
          </CardContent>
        </Card>

        {/* ── Active Investments Table ── */}
        <Card
          className="border-border bg-card animate-fade-up"
          style={{ animationDelay: "700ms", animationFillMode: "both" }}
          data-ocid="dashboard.investments.section"
        >
          <CardHeader>
            <CardTitle className="text-base font-display text-foreground">
              Active Investments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {invLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="investments.loading_state"
              >
                {["inv-1", "inv-2", "inv-3"].map((id) => (
                  <Skeleton key={id} className="h-10 w-full bg-secondary" />
                ))}
              </div>
            ) : (
              <InvestmentsTable investments={investments} />
            )}
          </CardContent>
        </Card>

        {/* ── Withdrawal History Table ── */}
        <Card
          className="border-border bg-card animate-fade-up"
          style={{ animationDelay: "800ms", animationFillMode: "both" }}
          data-ocid="dashboard.withdrawals.section"
        >
          <CardHeader>
            <CardTitle className="text-base font-display text-foreground">
              Withdrawal History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {wdLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="withdrawals.loading_state"
              >
                {["wd-1", "wd-2", "wd-3"].map((id) => (
                  <Skeleton key={id} className="h-10 w-full bg-secondary" />
                ))}
              </div>
            ) : (
              <WithdrawalsTable withdrawals={withdrawals} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
