import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  CheckCircle,
  Crown,
  Eye,
  Flame,
  Globe,
  Lightbulb,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { FaNetworkWired, FaUsers } from "react-icons/fa";

// ─── Package data ───────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    icon: TrendingUp,
    range: "$50 – $499",
    minUsd: 50,
    maxUsd: 499,
    dailyRoi: 1.0,
    weeklyRoi: 7.0,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "Daily ROI credited to wallet",
      "Referral bonus eligible",
      "24/7 dashboard access",
      "Binary network participation",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    icon: TrendingUp,
    range: "$500 – $999",
    minUsd: 500,
    maxUsd: 999,
    dailyRoi: 1.05,
    weeklyRoi: 7.35,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "Daily ROI credited to wallet",
      "Referral bonus eligible",
      "24/7 dashboard access",
      "Binary network participation",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    icon: Zap,
    range: "$1,000 – $2,499",
    minUsd: 1000,
    maxUsd: 2499,
    dailyRoi: 1.1,
    weeklyRoi: 7.7,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "Daily ROI credited to wallet",
      "Advanced analytics",
      "Priority support",
      "Referral bonus eligible",
      "Binary network participation",
    ],
  },
  {
    id: "select",
    name: "Select",
    icon: Zap,
    range: "$2,500 – $4,999",
    minUsd: 2500,
    maxUsd: 4999,
    dailyRoi: 1.12,
    weeklyRoi: 7.84,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "Daily ROI credited to wallet",
      "Advanced analytics",
      "Priority support",
      "Binary bonus",
      "Referral bonus eligible",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    icon: Star,
    range: "$5,000 – $9,999",
    minUsd: 5000,
    maxUsd: 9999,
    dailyRoi: 1.15,
    weeklyRoi: 8.05,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "Daily ROI credited to wallet",
      "Advanced analytics",
      "Priority support",
      "Binary bonus",
      "Referral bonus eligible",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    icon: Star,
    range: "$10,000 – $24,999",
    minUsd: 10000,
    maxUsd: 24999,
    dailyRoi: 1.18,
    weeklyRoi: 8.26,
    term: "365 Days",
    popular: true,
    premium: false,
    badge: "Most Popular" as string | null,
    features: [
      "Daily ROI credited to wallet",
      "Institutional analytics",
      "Priority support",
      "Binary bonus",
      "Referral bonus eligible",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    icon: Trophy,
    range: "$25,000 – $49,999",
    minUsd: 25000,
    maxUsd: 49999,
    dailyRoi: 1.2,
    weeklyRoi: 8.4,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "All Plus features",
      "Dedicated support",
      "Binary bonus",
      "Rank fast-track",
      "Enhanced daily returns",
    ],
  },
  {
    id: "preferred",
    name: "Preferred",
    icon: Trophy,
    range: "$50,000 – $99,999",
    minUsd: 50000,
    maxUsd: 99999,
    dailyRoi: 1.22,
    weeklyRoi: 8.54,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "All Premium features",
      "Dedicated account manager",
      "Binary bonus",
      "Rank fast-track",
      "VIP-tier analytics",
    ],
  },
  {
    id: "executive",
    name: "Executive",
    icon: Crown,
    range: "$100,000 – $149,999",
    minUsd: 100000,
    maxUsd: 149999,
    dailyRoi: 1.25,
    weeklyRoi: 8.75,
    term: "365 Days",
    popular: false,
    premium: false,
    badge: null as string | null,
    features: [
      "All Preferred features",
      "Dedicated account manager",
      "Binary bonus",
      "Monthly briefings",
      "Institutional-grade returns",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    icon: Crown,
    range: "$150,000 – $199,999",
    minUsd: 150000,
    maxUsd: 199999,
    dailyRoi: 1.27,
    weeklyRoi: 8.89,
    term: "365 Days",
    popular: false,
    premium: true,
    badge: "VIP" as string | null,
    features: [
      "All Executive features",
      "VIP account manager",
      "Binary bonus",
      "VIP events access",
      "Exclusive market insights",
    ],
  },
  {
    id: "ambassador",
    name: "Ambassador",
    icon: Crown,
    range: "$200,000 – $249,999",
    minUsd: 200000,
    maxUsd: 249999,
    dailyRoi: 1.28,
    weeklyRoi: 8.96,
    term: "365 Days",
    popular: false,
    premium: true,
    badge: "Ambassador" as string | null,
    features: [
      "All Signature features",
      "VIP account manager",
      "Binary bonus",
      "Exclusive trading insights",
      "Premier global network access",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    icon: Crown,
    range: "$250,000+",
    minUsd: 250000,
    maxUsd: null as number | null,
    dailyRoi: 1.3,
    weeklyRoi: 9.1,
    term: "365 Days",
    popular: false,
    premium: true,
    badge: "Elite" as string | null,
    features: [
      "All Ambassador features",
      "Maximum 1.3% daily ROI",
      "Dedicated VIP manager",
      "Binary bonus",
      "VIP events & exclusive insights",
    ],
  },
];

// ─── Rank System ─────────────────────────────────────────────────────────────
const RANKS = [
  { rank: "NEXUS", icon: Star, minInvestment: "$50" },
  { rank: "TRAILBLAZER", icon: TrendingUp, minInvestment: "$500" },
  { rank: "ARBITRAGEUR", icon: BarChart2, minInvestment: "$2,000" },
  { rank: "LUMINARY", icon: Lightbulb, minInvestment: "$5,000" },
  { rank: "PIONEER", icon: Zap, minInvestment: "$10,000" },
  { rank: "APEX", icon: Target, minInvestment: "$25,000" },
  { rank: "CATALYST", icon: Flame, minInvestment: "$50,000" },
  { rank: "VISIONARY", icon: Eye, minInvestment: "$100,000" },
  { rank: "STRATEGIST", icon: Globe, minInvestment: "$250,000" },
  { rank: "GAME CHANGER", icon: Trophy, minInvestment: "$500,000" },
  { rank: "INFLUENCER", icon: Users, minInvestment: "$1,000,000" },
  { rank: "TITAN", icon: Crown, minInvestment: "$5,000,000" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type PackageId =
  | "starter"
  | "basic"
  | "standard"
  | "select"
  | "advanced"
  | "plus"
  | "premium"
  | "preferred"
  | "executive"
  | "signature"
  | "ambassador"
  | "elite";

type Package = (typeof PACKAGES)[number];

function useROICalc() {
  const [amount, setAmount] = useState("5000");
  const [packageId, setPackageId] = useState<PackageId>("plus");

  const pkg = PACKAGES.find((p) => p.id === packageId) ?? PACKAGES[1];
  const principal = Number(amount) || 0;

  const result = useMemo(() => {
    const daily = (principal * pkg.dailyRoi) / 100;
    const weekly = daily * 7;
    const monthly = daily * 30;
    const annual = daily * 365;
    const total = principal + annual;
    return { daily, weekly, monthly, annual, total };
  }, [principal, pkg]);

  return { amount, setAmount, packageId, setPackageId, pkg, result };
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── PackageCard ────────────────────────────────────────────────────────────
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const Icon = pkg.icon;
  const isPopular = pkg.popular;
  const isPremium = pkg.premium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="flex"
      data-ocid={`packages.package_card.${index + 1}`}
    >
      <div
        className={[
          "relative flex flex-col w-full rounded-2xl border p-6 transition-smooth hover:shadow-gold",
          isPopular
            ? "bg-card border-primary shadow-gold ring-1 ring-primary/40"
            : isPremium
              ? "bg-card border-border/60"
              : "bg-card border-border/40",
        ].join(" ")}
      >
        {pkg.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span
              className={[
                "px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
                isPopular
                  ? "gold-gradient text-background"
                  : "bg-secondary text-foreground border border-border",
              ].join(" ")}
            >
              {pkg.badge}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-5">
          <div
            className={[
              "p-2.5 rounded-xl",
              isPopular ? "gold-gradient" : "bg-secondary",
            ].join(" ")}
          >
            <Icon
              className={`w-5 h-5 ${
                isPopular ? "text-background" : "text-primary"
              }`}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
            <p className="text-sm text-muted-foreground">{pkg.range}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-secondary rounded-xl p-3 text-center">
            <p className="text-2xl font-bold gold-text">{pkg.dailyRoi}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Daily ROI</p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <p className="text-2xl font-bold gold-text">{pkg.weeklyRoi}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Weekly ROI</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="bg-muted/40 rounded-lg px-2 py-2 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Min</p>
            <p className="text-sm font-bold text-foreground">
              ${pkg.minUsd.toLocaleString()}
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg px-2 py-2 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Max</p>
            <p className="text-sm font-bold text-foreground">
              {pkg.maxUsd ? `${pkg.maxUsd.toLocaleString()}` : "Unlimited"}
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg px-2 py-2 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Term</p>
            <p className="text-sm font-bold text-foreground">365d</p>
          </div>
        </div>

        <ul className="space-y-2.5 flex-1">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>

        <Link to="/invest">
          <Button
            className={[
              "w-full mt-6 font-bold text-sm",
              isPopular ? "gold-gradient text-background hover:opacity-90" : "",
            ].join(" ")}
            variant={isPopular ? "default" : "outline"}
            data-ocid={`packages.invest_button.${index + 1}`}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── ROI Row ───────────────────────────────────────────────────────────────────
function ROIRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function PackagesPage() {
  const { amount, setAmount, packageId, setPackageId, pkg, result } =
    useROICalc();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background" data-ocid="packages.page">
      {/* Page Header */}
      <section className="relative bg-card border-b border-border/40 py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 40%, oklch(87% 0.19 88), transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 gold-gradient text-background font-semibold px-4 py-1.5 text-xs tracking-widest uppercase">
              Investment Tiers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Investment <span className="gold-text">Packages</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the tier that matches your goals. Every package delivers
              real daily ROI through our proven arbitrage strategy — start small
              or go large.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Cards */}
      <section
        className="py-16 bg-background"
        data-ocid="packages.tiers_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PACKAGES.map((p, i) => (
              <PackageCard key={p.id} pkg={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tier Comparison Chart */}
      <section
        className="py-16 bg-card border-y border-border/40"
        data-ocid="packages.comparison_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Tier <span className="gold-text">Comparison</span>
              </h2>
              <p className="text-muted-foreground">
                Compare all 12 investment tiers side-by-side to find the perfect
                match for your goals.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border/40">
              <table className="w-full min-w-[900px]">
                <thead className="sticky top-0 z-20">
                  <tr className="bg-secondary/80 border-b border-border/40 backdrop-blur-sm">
                    <th className="sticky left-0 z-30 bg-secondary/80 text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      Feature
                    </th>
                    {PACKAGES.map((p) => (
                      <th
                        key={p.id}
                        className={[
                          "text-center px-3 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap",
                          p.popular
                            ? "gold-text"
                            : p.premium
                              ? "text-primary"
                              : "text-foreground",
                        ].join(" ")}
                      >
                        {p.name}
                        {p.popular && (
                          <span className="block text-[10px] normal-case tracking-normal font-normal text-muted-foreground mt-0.5">
                            Most Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Min Deposit */}
                  <tr className="border-b border-border/20 hover:bg-secondary/20 transition-smooth">
                    <td className="sticky left-0 z-10 bg-background px-5 py-3.5 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Min Deposit
                    </td>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.id}
                        className={[
                          "text-center px-3 py-3.5 text-sm font-bold whitespace-nowrap",
                          p.popular ? "gold-text" : "text-foreground",
                        ].join(" ")}
                      >
                        ${p.minUsd.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  {/* Max Deposit */}
                  <tr className="border-b border-border/20 bg-secondary/10 hover:bg-secondary/20 transition-smooth">
                    <td className="sticky left-0 z-10 bg-secondary/10 px-5 py-3.5 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Max Deposit
                    </td>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.id}
                        className={[
                          "text-center px-3 py-3.5 text-sm font-bold whitespace-nowrap",
                          p.popular ? "gold-text" : "text-foreground",
                        ].join(" ")}
                      >
                        {p.maxUsd
                          ? `${p.maxUsd.toLocaleString()}`
                          : "∞ Unlimited"}
                      </td>
                    ))}
                  </tr>
                  {/* Daily ROI */}
                  <tr className="border-b border-border/20 hover:bg-secondary/20 transition-smooth">
                    <td className="sticky left-0 z-10 bg-background px-5 py-3.5 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Daily ROI %
                    </td>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.id}
                        className="text-center px-3 py-3.5 whitespace-nowrap"
                      >
                        <span
                          className={[
                            "text-sm font-bold",
                            p.popular ? "gold-text" : "text-primary",
                          ].join(" ")}
                        >
                          {p.dailyRoi}%
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Weekly ROI */}
                  <tr className="border-b border-border/20 bg-secondary/10 hover:bg-secondary/20 transition-smooth">
                    <td className="sticky left-0 z-10 bg-secondary/10 px-5 py-3.5 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Weekly ROI %
                    </td>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.id}
                        className="text-center px-3 py-3.5 whitespace-nowrap"
                      >
                        <span
                          className={[
                            "text-sm font-bold",
                            p.popular ? "gold-text" : "text-primary",
                          ].join(" ")}
                        >
                          {p.weeklyRoi}%
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Duration */}
                  <tr className="border-b border-border/20 hover:bg-secondary/20 transition-smooth">
                    <td className="sticky left-0 z-10 bg-background px-5 py-3.5 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Duration
                    </td>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.id}
                        className="text-center px-3 py-3.5 text-sm text-foreground whitespace-nowrap"
                      >
                        {p.term}
                      </td>
                    ))}
                  </tr>
                  {/* Key Features */}
                  <tr className="border-b border-border/20 bg-secondary/10 hover:bg-secondary/20 transition-smooth">
                    <td className="sticky left-0 z-10 bg-secondary/10 px-5 py-3.5 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Key Benefits
                    </td>
                    {PACKAGES.map((p) => (
                      <td
                        key={p.id}
                        className="text-center px-3 py-3.5 align-top"
                      >
                        <ul className="space-y-1 text-left">
                          {p.features.slice(0, 2).map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-1.5 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              <span className="min-w-0 break-words">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  {/* CTA Row */}
                  <tr>
                    <td className="sticky left-0 z-10 bg-background px-5 py-4 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      &nbsp;
                    </td>
                    {PACKAGES.map((p, idx) => (
                      <td key={p.id} className="text-center px-3 py-4">
                        <Button
                          size="sm"
                          variant={p.popular ? "default" : "outline"}
                          className={[
                            "text-xs font-bold w-full whitespace-nowrap",
                            p.popular
                              ? "gold-gradient text-background hover:opacity-90"
                              : "border-primary/50 text-primary hover:bg-primary/10",
                          ].join(" ")}
                          data-ocid={`packages.comparison_invest_button.${idx + 1}`}
                          onClick={() =>
                            navigate({
                              to: "/invest",
                              search: { package: p.name },
                            })
                          }
                        >
                          Start Investing
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section
        className="py-16 bg-muted/20 border-y border-border/40"
        data-ocid="packages.calculator_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                ROI <span className="gold-text">Calculator</span>
              </h2>
              <p className="text-muted-foreground">
                Estimate your projected earnings in real-time. Formula:{" "}
                <code className="bg-secondary px-2 py-0.5 rounded text-xs text-primary">
                  Daily Earnings = Principal × Daily ROI %
                </code>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Inputs */}
              <Card className="bg-card border-border/40">
                <CardHeader className="pb-4">
                  <h3 className="font-semibold text-foreground">
                    Configure Your Investment
                  </h3>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="calc-amount"
                      className="text-sm text-muted-foreground"
                    >
                      Investment Amount (USD)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                        $
                      </span>
                      <Input
                        id="calc-amount"
                        type="number"
                        min={50}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-7 bg-secondary border-border focus:border-primary"
                        placeholder="5000"
                        data-ocid="packages.calc_amount_input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Select Package
                    </Label>
                    <Select
                      value={packageId}
                      onValueChange={(v) => setPackageId(v as PackageId)}
                    >
                      <SelectTrigger
                        className="bg-secondary border-border"
                        data-ocid="packages.calc_package_select"
                      >
                        <SelectValue placeholder="Choose a package" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {PACKAGES.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} — {p.dailyRoi}% daily
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-secondary rounded-xl p-4 space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">
                      Selected Package
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {pkg.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{pkg.range}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm">
                        <span className="gold-text font-bold">
                          {pkg.dailyRoi}%
                        </span>{" "}
                        <span className="text-muted-foreground">daily</span>
                      </span>
                      <span className="text-sm">
                        <span className="gold-text font-bold">
                          {pkg.weeklyRoi}%
                        </span>{" "}
                        <span className="text-muted-foreground">weekly</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-card border-border/40">
                <CardHeader className="pb-4">
                  <h3 className="font-semibold text-foreground">
                    Projected Earnings
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Based on {fmt(Number(amount) || 0)} at {pkg.dailyRoi}% daily
                  </p>
                </CardHeader>
                <CardContent>
                  <ROIRow label="Daily Earnings" value={fmt(result.daily)} />
                  <ROIRow label="Weekly Earnings" value={fmt(result.weekly)} />
                  <ROIRow
                    label="Monthly Earnings"
                    value={fmt(result.monthly)}
                  />
                  <ROIRow label="Annual Earnings" value={fmt(result.annual)} />
                  <div className="mt-4 p-4 bg-secondary rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        Total Return
                      </span>
                      <span className="text-xl font-bold gold-text">
                        {fmt(result.total)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Principal + Annual Earnings after 1 year
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section
        className="py-16 bg-background"
        data-ocid="packages.bonuses_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Bonus <span className="gold-text">Structures</span>
              </h2>
              <p className="text-muted-foreground">
                Earn more by growing your network and building your binary team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                data-ocid="packages.referral_bonus_card"
              >
                <Card className="bg-card border-border/40 h-full hover:border-primary/40 transition-smooth hover:shadow-gold">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl gold-gradient flex-shrink-0">
                        <FaUsers className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-foreground">
                            Referral Bonus
                          </h3>
                          <Badge className="gold-gradient text-background text-xs font-bold">
                            10%
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Earn{" "}
                          <span className="text-primary font-semibold">
                            10% commission
                          </span>{" "}
                          on every investment made by members you directly refer
                          to GoNext. Credited instantly when your referral
                          activates their package.
                        </p>
                        <ul className="mt-4 space-y-1.5">
                          {[
                            "Instant commission on referral investment",
                            "No cap on number of referrals",
                            "Paid directly to your wallet",
                          ].map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                data-ocid="packages.binary_bonus_card"
              >
                <Card className="bg-card border-border/40 h-full hover:border-primary/40 transition-smooth hover:shadow-gold">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-secondary border border-border flex-shrink-0">
                        <FaNetworkWired className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-foreground">
                            Binary Bonus
                          </h3>
                          <Badge
                            variant="outline"
                            className="border-primary/40 text-primary text-xs font-bold"
                          >
                            10%
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Build your binary network with a left and right leg.
                          Earn{" "}
                          <span className="text-primary font-semibold">
                            10% on the weaker leg&apos;s volume
                          </span>
                          , paid every week to your GoNext wallet.
                        </p>
                        <ul className="mt-4 space-y-1.5">
                          {[
                            "Calculated on weaker leg volume",
                            "Weekly payout every Monday",
                            "Scales as your network grows",
                          ].map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rank System */}
      <section
        className="py-16 bg-muted/20 border-y border-border/40"
        data-ocid="packages.ranks_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Rank <span className="gold-text">System</span>
              </h2>
              <p className="text-muted-foreground">
                Advance through 12 ranks as your investment portfolio grows.
                Higher ranks unlock exclusive benefits and recognition.
              </p>
            </div>

            <Card className="bg-card border-border/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/40">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Min. Investment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {RANKS.map((r, i) => {
                      const Icon = r.icon;
                      const isElite = i >= 8;
                      const isLegend = i >= 10;
                      return (
                        <tr
                          key={r.rank}
                          className={[
                            "border-b border-border/20 last:border-0 transition-smooth hover:bg-secondary/30",
                            isLegend
                              ? "bg-primary/5"
                              : isElite
                                ? "bg-muted/10"
                                : "",
                          ].join(" ")}
                          data-ocid={`packages.rank_row.${i + 1}`}
                        >
                          <td className="px-5 py-3.5">
                            <span className="text-sm font-bold text-muted-foreground">
                              {i + 1}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div
                                className={[
                                  "p-1.5 rounded-lg",
                                  isLegend
                                    ? "gold-gradient"
                                    : isElite
                                      ? "bg-secondary border border-primary/30"
                                      : "bg-secondary",
                                ].join(" ")}
                              >
                                <Icon
                                  className={`w-3.5 h-3.5 ${
                                    isLegend
                                      ? "text-background"
                                      : "text-primary"
                                  }`}
                                />
                              </div>
                              <span
                                className={`font-bold text-sm tracking-wider ${
                                  isLegend
                                    ? "gold-text"
                                    : isElite
                                      ? "text-primary"
                                      : "text-foreground"
                                }`}
                              >
                                {r.rank}
                              </span>
                              {isLegend && (
                                <Badge className="gold-gradient text-background text-xs py-0 px-2">
                                  Elite
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span
                              className={`font-bold text-sm ${
                                isLegend
                                  ? "gold-text"
                                  : isElite
                                    ? "text-primary"
                                    : "text-foreground"
                              }`}
                            >
                              {r.minInvestment}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 bg-card border-b border-border/40 relative overflow-hidden"
        data-ocid="packages.cta_section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, oklch(87% 0.19 88), transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start <span className="gold-text">Earning?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of GoNext investors generating daily returns.
              Select your package and begin your journey today.
            </p>
            <Link to="/invest">
              <Button
                size="lg"
                className="gold-gradient text-background font-bold text-base px-10 py-6 rounded-xl shadow-gold hover:opacity-90 transition-smooth"
                data-ocid="packages.start_investing_button"
              >
                Start Investing Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
