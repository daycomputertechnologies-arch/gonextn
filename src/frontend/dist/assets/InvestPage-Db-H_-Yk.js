import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, T as TrendingUp } from "./index-BC8DNmFm.js";
import { e as useActiveWallets, f as useSubmitDeposit, P as PackageTier, C as Copy } from "./useBackend-VnV9Phzw.js";
import { a as Button, B as Badge } from "./button-DRTZ0JvA.js";
import { u as ue } from "./index-XZE9eRwQ.js";
import { W as Wallet } from "./wallet-BTzp8u97.js";
import { C as ChevronRight } from "./chevron-right-DriAKKWc.js";
import { C as CircleCheckBig } from "./circle-check-big-DQ7XPH0L.js";
import { Z as Zap } from "./zap-B8-hXQ1J.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const STEPS = ["Choose Package", "Enter Amount", "Payment Method", "Confirm"];
const PACKAGES = [
  {
    tier: PackageTier.GENESIS,
    name: "Genesis",
    min: 50,
    max: 4999,
    daily: 1,
    weekly: 7,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6" }),
    tagline: "Start your journey",
    color: "border-border hover:border-primary/60"
  },
  {
    tier: PackageTier.MOMENTUM,
    name: "Momentum",
    min: 5e3,
    max: 24999,
    daily: 1.14,
    weekly: 8,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }),
    tagline: "Accelerate your growth",
    color: "border-border hover:border-primary/60"
  },
  {
    tier: PackageTier.VELOCITY,
    name: "Velocity",
    min: 25e3,
    max: null,
    daily: 1.28,
    weekly: 9,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-6 h-6" }),
    tagline: "Maximum performance",
    color: "border-border hover:border-primary/60"
  }
];
function formatUSD(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });
}
function StepBar({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "invest.step_bar",
      className: "flex items-center justify-center gap-0 mb-10",
      children: STEPS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${i < current ? "bg-primary text-primary-foreground" : i === current ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`,
              children: i < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : i + 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `mt-1.5 text-xs font-medium hidden sm:block ${i <= current ? "text-foreground" : "text-muted-foreground"}`,
              children: label
            }
          )
        ] }),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-12 sm:w-20 h-0.5 mx-1 mb-4 transition-smooth ${i < current ? "bg-primary" : "bg-border"}`
          }
        )
      ] }, label))
    }
  );
}
function PackageCard({
  pkg,
  selected,
  onSelect,
  index
}) {
  const monthly = (pkg.daily * 30).toFixed(2);
  const annual = (pkg.daily * 365).toFixed(2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `invest.package_card.${index + 1}`,
      onClick: onSelect,
      className: `w-full text-left rounded-xl border-2 p-6 transition-smooth cursor-pointer bg-card ${selected ? "border-primary shadow-gold glow-gold" : pkg.color}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `p-2 rounded-lg ${selected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
              children: pkg.icon
            }
          ),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs", children: "Selected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: `text-xl font-bold mb-1 ${selected ? "gold-text" : "text-foreground"}`,
            children: pkg.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: pkg.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Investment Range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              formatUSD(pkg.min),
              " ",
              pkg.max ? `– ${formatUSD(pkg.max)}` : "+"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Daily ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
              pkg.daily,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Weekly ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
              pkg.weekly,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Monthly ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              monthly,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Annual ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              annual,
              "%"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function RoiProjection({
  amount,
  pkg
}) {
  if (!amount || amount <= 0) return null;
  const daily = amount * pkg.daily / 100;
  const weekly = amount * pkg.weekly / 100;
  const monthly = amount * pkg.daily * 30 / 100;
  const annual = amount * pkg.daily * 365 / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "invest.roi_projection",
      className: "mt-4 rounded-xl bg-secondary border border-border p-4 animate-fade-in",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3", children: [
          "Projected Returns on ",
          formatUSD(amount)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
          { label: "Daily", value: daily },
          { label: "Weekly", value: weekly },
          { label: "Monthly", value: monthly },
          { label: "Annual", value: annual }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-sm", children: formatUSD(value) })
        ] }, label)) })
      ]
    }
  );
}
function WalletRow({
  wallet,
  selected,
  onSelect,
  index
}) {
  const addr = wallet.walletAddress;
  const truncated = addr.length > 16 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `invest.wallet_row.${index + 1}`,
      onClick: onSelect,
      className: `w-full flex items-center gap-4 rounded-xl border-2 p-4 transition-smooth bg-card text-left ${selected ? "border-primary shadow-gold" : "border-border hover:border-primary/40"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary shrink-0", children: wallet.symbol.slice(0, 3) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: wallet.cryptoName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: wallet.symbol })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: wallet.network })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: truncated }) }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-primary shrink-0" })
      ]
    }
  );
}
function ConfirmStep({
  wallet,
  amount,
  pkg,
  onSubmit,
  isSubmitting
}) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(wallet.walletAddress);
    ue.success("Address copied to clipboard");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "invest.confirm_step", className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-secondary border border-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold", children: "Send To Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 font-mono text-sm text-foreground break-all", children: wallet.walletAddress }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "invest.copy_address_button",
            onClick: handleCopy,
            className: "shrink-0 p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-smooth",
            "aria-label": "Copy wallet address",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "invest.qr_placeholder",
        className: "flex items-center justify-center rounded-xl bg-card border border-border h-48",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "QR Code" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            wallet.symbol,
            " · ",
            wallet.network
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-secondary border border-border p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Package" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: pkg.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Crypto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold", children: [
          wallet.cryptoName,
          " (",
          wallet.symbol,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Amount to Send" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-lg", children: formatUSD(amount) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Instructions: " }),
      "Send exactly ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formatUSD(amount) }),
      " ",
      "worth of ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: wallet.symbol }),
      " to the address above. Once your transaction is confirmed on the blockchain, click the button below. Your deposit will be reviewed and activated within ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "1–24 hours" }),
      "."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        "data-ocid": "invest.submit_button",
        onClick: onSubmit,
        disabled: isSubmitting,
        className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-base",
        children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
          " Submitting..."
        ] }) : "I Have Sent the Payment"
      }
    )
  ] });
}
function SuccessScreen({
  deposit,
  onDashboard
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "invest.success_screen",
      className: "text-center py-8 space-y-6 animate-fade-up",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-primary" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Deposit Submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your deposit is pending review by our team." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-5 text-left space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Reference ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: deposit.id.toString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: formatUSD(Number(deposit.amount) / 100) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", children: deposit.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Est. Activation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-sm", children: "1–24 hours" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "invest.go_dashboard_button",
            onClick: onDashboard,
            className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-4",
            children: "Go to Dashboard"
          }
        )
      ]
    }
  );
}
function InvestPage() {
  const [step, setStep] = reactExports.useState(0);
  const [selectedPkg, setSelectedPkg] = reactExports.useState(null);
  const [amount, setAmount] = reactExports.useState("");
  const [amountError, setAmountError] = reactExports.useState("");
  const [selectedWallet, setSelectedWallet] = reactExports.useState(
    null
  );
  const [successDeposit, setSuccessDeposit] = reactExports.useState(
    null
  );
  const { data: wallets = [], isLoading: walletsLoading } = useActiveWallets();
  const submitDeposit = useSubmitDeposit();
  const amountNum = Number.parseFloat(amount);
  const validateAmount = (val, pkg) => {
    const n = Number.parseFloat(val);
    if (!val || Number.isNaN(n)) return "Please enter a valid amount.";
    if (!pkg) return "";
    if (n < pkg.min) return `Minimum for ${pkg.name} is ${formatUSD(pkg.min)}.`;
    if (pkg.max !== null && n > pkg.max)
      return `Maximum for ${pkg.name} is ${formatUSD(pkg.max)}.`;
    return "";
  };
  const handleAmountChange = (val) => {
    setAmount(val);
    setAmountError(validateAmount(val, selectedPkg));
  };
  const handleNext = () => {
    if (step === 0 && !selectedPkg) {
      ue.error("Please select a package to continue.");
      return;
    }
    if (step === 1) {
      const err = validateAmount(amount, selectedPkg);
      if (err) {
        setAmountError(err);
        return;
      }
    }
    if (step === 2 && !selectedWallet) {
      ue.error("Please select a payment wallet.");
      return;
    }
    setStep((s) => s + 1);
  };
  const handleSubmit = async () => {
    if (!selectedPkg || !selectedWallet) return;
    try {
      const result = await submitDeposit.mutateAsync({
        packageTier: selectedPkg.tier,
        amount: BigInt(Math.round(amountNum * 100)),
        walletId: selectedWallet.id
      });
      setSuccessDeposit(result);
    } catch {
      ue.error("Failed to submit deposit. Please try again.");
    }
  };
  if (successDeposit) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SuccessScreen,
      {
        deposit: successDeposit,
        onDashboard: () => {
          window.location.href = "/dashboard";
        }
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "invest.page", className: "max-w-2xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Invest" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Complete the steps below to submit your investment deposit." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepBar, { current: step }),
    step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "invest.step1_section",
        className: "space-y-4 animate-fade-up",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Choose Your Package" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: PACKAGES.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PackageCard,
            {
              pkg,
              selected: (selectedPkg == null ? void 0 : selectedPkg.tier) === pkg.tier,
              onSelect: () => setSelectedPkg(pkg),
              index: i
            },
            pkg.tier
          )) })
        ]
      }
    ),
    step === 1 && selectedPkg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "invest.step2_section",
        className: "space-y-4 animate-fade-up",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Enter Investment Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "invest-amount",
                  className: "text-sm text-muted-foreground font-medium",
                  children: "Amount (USD)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                formatUSD(selectedPkg.min),
                selectedPkg.max ? ` – ${formatUSD(selectedPkg.max)}` : "+"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium", children: "$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "invest-amount",
                  "data-ocid": "invest.amount_input",
                  type: "number",
                  min: selectedPkg.min,
                  max: selectedPkg.max ?? void 0,
                  value: amount,
                  onChange: (e) => handleAmountChange(e.target.value),
                  onBlur: () => setAmountError(validateAmount(amount, selectedPkg)),
                  placeholder: selectedPkg.min.toString(),
                  className: "w-full bg-background border border-input rounded-lg pl-8 pr-4 py-3 text-foreground text-lg font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                }
              )
            ] }),
            amountError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "invest.amount_field_error",
                className: "text-destructive text-xs mt-2",
                children: amountError
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoiProjection, { amount: amountNum, pkg: selectedPkg })
        ]
      }
    ),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "invest.step3_section",
        className: "space-y-4 animate-fade-up",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Select Payment Wallet" }),
          walletsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "invest.wallets_loading_state",
              className: "text-center py-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-primary mx-auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Loading wallets..." })
              ]
            }
          ) : wallets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "invest.wallets_empty_state",
              className: "text-center py-10 text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No payment wallets available at the moment. Please try again later." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: wallets.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            WalletRow,
            {
              wallet: w,
              selected: (selectedWallet == null ? void 0 : selectedWallet.id) === w.id,
              onSelect: () => setSelectedWallet(w),
              index: i
            },
            w.id.toString()
          )) })
        ]
      }
    ),
    step === 3 && selectedPkg && selectedWallet && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "invest.step4_section", className: "animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4", children: "Confirm & Send Payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfirmStep,
        {
          wallet: selectedWallet,
          amount: amountNum,
          pkg: selectedPkg,
          onSubmit: handleSubmit,
          isSubmitting: submitDeposit.isPending
        }
      )
    ] }),
    step < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "invest.back_button",
          variant: "outline",
          onClick: () => setStep((s) => Math.max(0, s - 1)),
          disabled: step === 0,
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            " Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "invest.next_button",
          onClick: handleNext,
          className: "bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 font-semibold",
          children: [
            step === 2 ? "Review Payment" : "Continue",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] })
  ] });
}
export {
  InvestPage as default
};
