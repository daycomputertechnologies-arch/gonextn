import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, u as useNavigate, d as useAuth, T as TrendingUp, r as reactExports } from "./index-yHXBoh2M.js";
import { u as useUserProfile, a as useDashboard, b as useMyInvestments, c as useMyWithdrawals, C as Copy, R as Rank, d as useRequestWithdrawal, I as InvestmentStatus, W as WithdrawalStatus } from "./useBackend-Cclt7pt4.js";
import { B as Badge, a as Button } from "./button-CQccDo7r.js";
import { C as Card, b as CardContent, a as CardHeader, c as CardTitle } from "./card-uFQUMNBf.js";
import { D as DollarSign, a as Dialog, b as DialogTrigger, c as DialogContent, d as DialogHeader, e as DialogTitle, C as CircleX } from "./dialog-Dvu6V8ye.js";
import { I as Input } from "./input-vNc25_85.js";
import { L as Label } from "./label-DQHZ_mSW.js";
import { u as ue } from "./index-CBbNEILV.js";
import { U as Users } from "./users-DJKlo4PO.js";
import { C as Clock } from "./clock-bSgkYBH-.js";
import { C as CircleCheck } from "./circle-check-BDQKSLDB.js";
import "./Combination-CMyXfHUG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const PACKAGE_DAILY_RATE = {
  STARTER: 1,
  BASIC: 1.02,
  STANDARD: 1.04,
  SELECT: 1.06,
  ADVANCED: 1.08,
  PLUS: 1.1,
  PREMIUM: 1.12,
  PREFERRED: 1.14,
  EXECUTIVE: 1.16,
  SIGNATURE: 1.18,
  AMBASSADOR: 1.22,
  ELITE: 1.28
};
function formatUSD(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(Number(cents) / 100);
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const RANK_ORDER = [
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
  Rank.TITAN
];
function nextRank(current) {
  const idx = RANK_ORDER.indexOf(current);
  if (idx === -1 || idx >= RANK_ORDER.length - 1) return "Max Rank";
  return RANK_ORDER[idx + 1];
}
function rankLabel(rank) {
  return rank.replace(/_/g, " ");
}
function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border bg-card animate-fade-up",
      style: { animationDelay: `${delay}ms`, animationFillMode: "both" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display gold-text", children: value }),
        trend && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1", children: [
          trend === "up" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 text-xs flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
            " Growing"
          ] }),
          trend === "neutral" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Stable" })
        ] })
      ] })
    }
  );
}
function InvestmentStatusBadge({ status }) {
  if (status === InvestmentStatus.ACTIVE)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border", children: "Active" });
  if (status === InvestmentStatus.MATURED)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border-primary/30 border", children: "Matured" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted text-muted-foreground border-border border", children: "Cancelled" });
}
function WithdrawalStatusBadge({ status }) {
  if (status === WithdrawalStatus.PENDING)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 border flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      " Pending"
    ] });
  if (status === WithdrawalStatus.APPROVED)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      " Approved"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/15 text-destructive border-destructive/30 border flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
    " Rejected"
  ] });
}
function InvestmentsTable({
  investments
}) {
  if (investments.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "investments.empty_state",
        className: "text-center py-12 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No active investments yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Start your first investment to grow your wealth" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Package" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-right", children: "Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-right", children: "Daily Rate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Start Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Maturity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-right", children: "Earnings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Status" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: investments.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TableRow,
      {
        "data-ocid": `investments.item.${i + 1}`,
        className: "border-border hover:bg-secondary/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-foreground", children: inv.packageTier }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: formatUSD(inv.amount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right tabular-nums text-primary", children: [
            "~",
            (Number(inv.amount) / 100 * (PACKAGE_DAILY_RATE[inv.packageTier] ?? 1) / 100).toFixed(2),
            "/day"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDate(inv.startDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDate(inv.maturityDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right tabular-nums text-emerald-400", children: [
            "+",
            formatUSD(inv.accumulatedBalance)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvestmentStatusBadge, { status: inv.status }) })
        ]
      },
      String(inv.id)
    )) })
  ] }) });
}
function WithdrawalsTable({
  withdrawals
}) {
  if (withdrawals.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "withdrawals.empty_state",
        className: "text-center py-12 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No withdrawal history" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Your withdrawals will appear here" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-right", children: "Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Destination" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground", children: "Status" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: withdrawals.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TableRow,
      {
        "data-ocid": `withdrawals.item.${i + 1}`,
        className: "border-border hover:bg-secondary/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDate(w.requestedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums font-medium", children: formatUSD(w.amount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs text-muted-foreground", children: [
            w.destinationAddress.slice(0, 20),
            "…"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalStatusBadge, { status: w.status }) })
        ]
      },
      String(w.id)
    )) })
  ] }) });
}
function WithdrawalDialog({ maxAmount }) {
  const [open, setOpen] = reactExports.useState(false);
  const [amount, setAmount] = reactExports.useState("");
  const [destination, setDestination] = reactExports.useState("");
  const { mutate, isPending } = useRequestWithdrawal();
  const isWeekend = (() => {
    const day = (/* @__PURE__ */ new Date()).getDay();
    return day === 0 || day === 6;
  })();
  function handleSubmit(e) {
    e.preventDefault();
    const cents = BigInt(Math.round(Number.parseFloat(amount) * 100));
    mutate(
      { destinationAddress: destination, amount: cents },
      {
        onSuccess: () => {
          ue.success("Withdrawal request submitted successfully");
          setOpen(false);
          setAmount("");
          setDestination("");
        },
        onError: (err) => {
          ue.error(err instanceof Error ? err.message : "Withdrawal failed");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "border-primary/40 text-primary hover:bg-primary/10 transition-smooth",
        "data-ocid": "withdrawal.open_modal_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 mr-2" }),
          "Request Withdrawal"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border sm:max-w-md",
        "data-ocid": "withdrawal.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground font-display", children: "Request Withdrawal" }) }),
          isWeekend && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-yellow-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-400 text-sm font-medium", children: "Weekend Processing Notice" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Withdrawals submitted on weekends are queued and processed on the next business day." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", htmlFor: "w-amount", children: "Amount (USD)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "w-amount",
                  type: "number",
                  min: "1",
                  step: "0.01",
                  max: Number(maxAmount) / 100,
                  placeholder: "0.00",
                  value: amount,
                  onChange: (e) => setAmount(e.target.value),
                  className: "bg-secondary border-border text-foreground",
                  required: true,
                  "data-ocid": "withdrawal.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Available balance: ",
                formatUSD(maxAmount)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", htmlFor: "w-dest", children: "Destination Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "w-dest",
                  type: "text",
                  placeholder: "Crypto wallet address",
                  value: destination,
                  onChange: (e) => setDestination(e.target.value),
                  className: "bg-secondary border-border text-foreground font-mono text-sm",
                  required: true,
                  "data-ocid": "withdrawal.destination_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setOpen(false),
                  className: "flex-1 border-border",
                  "data-ocid": "withdrawal.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isPending || isWeekend || !amount || !destination,
                  className: "flex-1 gold-gradient text-card font-semibold",
                  "data-ocid": "withdrawal.submit_button",
                  children: isPending ? "Submitting…" : "Submit Request"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
function DashboardPage() {
  const navigate = useNavigate();
  const { principal } = useAuth();
  const { data: user, isLoading: profileLoading } = useUserProfile();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard();
  const { data: investments = [], isLoading: invLoading } = useMyInvestments();
  const { data: withdrawals = [], isLoading: wdLoading } = useMyWithdrawals();
  const isLoading = profileLoading || dashboardLoading;
  const referralLink = user ? `${window.location.origin}?ref=${user.referralCode}` : "";
  function copyReferral() {
    navigator.clipboard.writeText(referralLink);
    ue.success("Referral link copied!");
  }
  function copyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal);
      ue.success("User ID copied to clipboard!");
    }
  }
  const rankProgressPercent = dashboard ? Math.min(100, Number(dashboard.totalInvested) / 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "dashboard.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64 mb-2 bg-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40 bg-secondary" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold font-display text-foreground", children: [
          "Welcome back,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: (user == null ? void 0 : user.username) ?? "Investor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Here's your portfolio overview" })
      ] }) }),
      dashboard && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: "self-start sm:self-auto px-4 py-2 text-sm font-semibold gold-gradient text-card border-0",
          "data-ocid": "dashboard.rank_badge",
          children: rankLabel(dashboard.rank)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard.stats.section",
        children: isLoading ? ["stat-1", "stat-2", "stat-3", "stat-4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 mb-4 bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-36 bg-secondary" })
        ] }) }, id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Account Balance",
              value: formatUSD((dashboard == null ? void 0 : dashboard.accumulatedBalance) ?? 0n),
              icon: DollarSign,
              trend: "up",
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Daily Earnings",
              value: formatUSD((dashboard == null ? void 0 : dashboard.dailyRoiRate) ?? 0n),
              icon: TrendingUp,
              trend: "up",
              delay: 100
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Invested",
              value: formatUSD((dashboard == null ? void 0 : dashboard.totalInvested) ?? 0n),
              icon: ArrowUpRight,
              trend: "neutral",
              delay: 200
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Referral Earnings",
              value: formatUSD((dashboard == null ? void 0 : dashboard.referralEarnings) ?? 0n),
              icon: Users,
              trend: "neutral",
              delay: 300
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border bg-card animate-fade-up",
        style: { animationDelay: "350ms", animationFillMode: "both" },
        "data-ocid": "dashboard.identity.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-4 h-4 text-primary" }),
            "Your User ID"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading || !principal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full bg-secondary" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Your unique Internet Identity principal. Share this with the site owner to grant admin access." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 bg-secondary rounded-lg px-3 py-2.5 font-mono text-xs text-foreground truncate min-w-0 border border-border",
                  "data-ocid": "dashboard.identity.principal_display",
                  children: principal
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: copyPrincipal,
                  className: "gold-gradient text-card font-semibold shrink-0",
                  "aria-label": "Copy User ID",
                  "data-ocid": "dashboard.identity.copy_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-border bg-card animate-fade-up",
          style: { animationDelay: "400ms", animationFillMode: "both" },
          "data-ocid": "dashboard.rank.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display text-foreground", children: "Rank Progress" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 bg-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full bg-secondary rounded-full" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: rankLabel((dashboard == null ? void 0 : dashboard.rank) ?? Rank.PIONEER) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm", children: [
                  "Next: ",
                  nextRank((dashboard == null ? void 0 : dashboard.rank) ?? Rank.PIONEER)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-secondary rounded-full h-2.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "gold-gradient h-full rounded-full transition-all duration-1000 ease-out",
                  style: { width: `${rankProgressPercent}%` },
                  role: "progressbar",
                  "aria-valuenow": rankProgressPercent,
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  tabIndex: 0
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                rankProgressPercent.toFixed(0),
                "% toward next rank threshold"
              ] })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-border bg-card animate-fade-up",
          style: { animationDelay: "500ms", animationFillMode: "both" },
          "data-ocid": "dashboard.referral.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display text-foreground", children: "Your Referral Link" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full bg-secondary" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share your link to earn referral bonuses on every investment made by your referrals." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground truncate min-w-0", children: referralLink }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: copyReferral,
                    className: "gold-gradient text-card font-semibold shrink-0",
                    "data-ocid": "dashboard.referral.copy_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Code:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono font-semibold", children: user == null ? void 0 : user.referralCode })
              ] })
            ] }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border bg-card animate-fade-up",
        style: { animationDelay: "600ms", animationFillMode: "both" },
        "data-ocid": "dashboard.actions.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display text-foreground", children: "Quick Actions" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => navigate({ to: "/invest" }),
                className: "gold-gradient text-card font-semibold glow-gold transition-smooth",
                "data-ocid": "dashboard.new_investment.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 mr-2" }),
                  "New Investment"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalDialog, { maxAmount: (dashboard == null ? void 0 : dashboard.accumulatedBalance) ?? 0n })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border bg-card animate-fade-up",
        style: { animationDelay: "700ms", animationFillMode: "both" },
        "data-ocid": "dashboard.investments.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display text-foreground", children: "Active Investments" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: invLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-6 space-y-3",
              "data-ocid": "investments.loading_state",
              children: ["inv-1", "inv-2", "inv-3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full bg-secondary" }, id))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(InvestmentsTable, { investments }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border bg-card animate-fade-up",
        style: { animationDelay: "800ms", animationFillMode: "both" },
        "data-ocid": "dashboard.withdrawals.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display text-foreground", children: "Withdrawal History" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: wdLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-6 space-y-3",
              "data-ocid": "withdrawals.loading_state",
              children: ["wd-1", "wd-2", "wd-3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full bg-secondary" }, id))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalsTable, { withdrawals }) })
        ]
      }
    )
  ] }) });
}
export {
  DashboardPage as default
};
