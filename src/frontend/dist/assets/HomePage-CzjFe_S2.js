import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, T as TrendingUp } from "./index-BC8DNmFm.js";
import { B as Badge, a as Button } from "./button-DRTZ0JvA.js";
import { r as resolveElements, m as motion } from "./proxy-DMwnWbnd.js";
import { A as ArrowRight, C as ChartColumn } from "./chart-column-Br4h2hgi.js";
import { C as ChevronRight } from "./chevron-right-DriAKKWc.js";
import { C as CircleCheckBig } from "./circle-check-big-DQ7XPH0L.js";
import { U as Users } from "./users-DomGzG8v.js";
import { S as Star } from "./star-Dp9raL42.js";
import { W as Wallet } from "./wallet-BTzp8u97.js";
import { S as Shield } from "./shield-FqL7zc-q.js";
import { G as Globe } from "./globe-hkFBt1vf.js";
import { Z as Zap } from "./zap-B8-hXQ1J.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode);
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2e3
}) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true });
  reactExports.useEffect(() => {
    if (!inView2) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView2, target, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    prefix,
    count.toLocaleString(),
    suffix
  ] });
}
const STATS = [
  {
    label: "Active Investors",
    value: 1e4,
    suffix: "+",
    prefix: "",
    icon: Users
  },
  {
    label: "Capital Managed",
    value: 50,
    suffix: "M+",
    prefix: "$",
    icon: ChartColumn
  },
  { label: "Uptime", value: 99, suffix: ".8%", prefix: "", icon: Activity },
  {
    label: "Investment Tiers",
    value: 3,
    suffix: "",
    prefix: "",
    icon: TrendingUp
  }
];
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Account",
    desc: "Register your GoNext account securely with Internet Identity. No personal data required.",
    icon: Users
  },
  {
    step: "02",
    title: "Choose Package",
    desc: "Select from Genesis, Momentum, or Velocity tiers based on your investment goals.",
    icon: Star
  },
  {
    step: "03",
    title: "Deposit Crypto",
    desc: "Fund your account using BTC, ETH, or USDT via our secure wallet addresses.",
    icon: Wallet
  },
  {
    step: "04",
    title: "Earn Daily",
    desc: "Watch your portfolio grow with automated arbitrage returns, compounding daily.",
    icon: TrendingUp
  }
];
const PACKAGES = [
  {
    name: "Genesis",
    tagline: "Start your journey",
    roi: "1.5%",
    period: "daily ROI",
    min: "$500",
    max: "$4,999",
    features: [
      "Daily compounding",
      "Basic analytics",
      "Email support",
      "Referral bonuses"
    ],
    highlight: false
  },
  {
    name: "Momentum",
    tagline: "Accelerate your gains",
    roi: "2.2%",
    period: "daily ROI",
    min: "$5,000",
    max: "$24,999",
    features: [
      "Daily compounding",
      "Advanced analytics",
      "Priority support",
      "Binary bonus",
      "Referral bonuses"
    ],
    highlight: true
  },
  {
    name: "Velocity",
    tagline: "Maximum acceleration",
    roi: "3.0%",
    period: "daily ROI",
    min: "$25,000",
    max: "$250,000",
    features: [
      "Daily compounding",
      "Institutional analytics",
      "Dedicated manager",
      "Binary bonus",
      "Referral bonuses",
      "VIP events"
    ],
    highlight: false
  }
];
const FEATURES = [
  {
    icon: Wallet,
    title: "Crypto Wallet Integration",
    desc: "Seamlessly deposit BTC, ETH, USDT and more. Admin-managed wallet addresses with real-time balance tracking."
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "All transactions verified on-chain. Multi-layer encryption with Internet Computer security guarantees."
  },
  {
    icon: Activity,
    title: "Advanced Monitoring",
    desc: "Real-time portfolio dashboards with P&L charts, historical performance, and drawdown analysis."
  },
  {
    icon: Globe,
    title: "Real-time Tracking",
    desc: "Live arbitrage execution across 12+ exchanges. Position-level transparency on every trade made."
  },
  {
    icon: Zap,
    title: "Instant Execution",
    desc: "Sub-millisecond order routing powered by proprietary HFT infrastructure and co-location facilities."
  },
  {
    icon: ChartColumn,
    title: "Performance Analytics",
    desc: "Detailed ROI breakdowns, tax reports, and custom alerts so you always know where you stand."
  }
];
function FadeSection({
  children,
  className = "",
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      className,
      children
    }
  );
}
function HomePage() {
  const scrollToSection = (id) => {
    var _a;
    (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "hero",
        className: "relative min-h-[92vh] flex items-center justify-center overflow-hidden",
        "data-ocid": "home.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
              style: {
                backgroundImage: "url('/assets/generated/hero-arbitrage.dim_1400x700.jpg')"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,oklch(87%_0.19_88/0.06),transparent)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "mb-6 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border-primary/30 text-primary bg-primary/10",
                    variant: "outline",
                    children: "⚡ Next-Gen Arbitrage Platform"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                className: "text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "AI-Powered" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Arbitrage" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "& Wealth Acceleration" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2 },
                className: "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed",
                children: "GoNext enables institutional-grade arbitrage for everyday investors. Harness algorithmic precision across 12+ exchanges to grow your wealth with transparent, compounding daily returns."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.3 },
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packages", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "gold-gradient text-background font-bold px-8 py-6 text-base shadow-gold glow-gold hover:opacity-90 transition-smooth",
                      "data-ocid": "home.hero.start_investing_button",
                      children: [
                        "Start Investing",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base transition-smooth",
                      onClick: () => scrollToSection("how-it-works"),
                      "data-ocid": "home.hero.learn_more_button",
                      children: [
                        "Learn More",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-2 h-5 w-5" })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.8, duration: 1 },
                className: "mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary" }),
                    "No lock-up periods"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary" }),
                    "Withdraw anytime"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary" }),
                    "Daily compounding"
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "stats",
        className: "bg-card border-y border-border py-10",
        "data-ocid": "home.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: STATS.map(({ label, value, suffix, prefix, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gold-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatedCounter,
            {
              target: value,
              suffix,
              prefix
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: label })
        ] }) }, label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "how-it-works",
        className: "py-24 bg-background",
        "data-ocid": "home.how_it_works.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-4 border-primary/30 text-primary bg-primary/10",
                children: "Simple Process"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold mb-4", children: [
              "How ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "GoNext" }),
              " Works"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "From sign-up to earning in four straightforward steps. No experience required." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-8 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
            HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeSection, { delay: i * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-smooth group",
                "data-ocid": `home.how_it_works.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full gold-gradient flex items-center justify-center mb-4 shadow-gold group-hover:glow-gold transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7 text-background" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground mb-2", children: step }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: desc })
                ]
              }
            ) }, step))
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "packages-preview",
        className: "py-24 bg-muted/30",
        "data-ocid": "home.packages.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-4 border-primary/30 text-primary bg-primary/10",
                children: "Investment Tiers"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold mb-4", children: [
              "Choose Your ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Package" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Three tiers designed for every investor profile — from first-time crypto investors to seasoned professionals." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: PACKAGES.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeSection, { delay: i * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `relative flex flex-col rounded-2xl border p-8 transition-smooth hover:-translate-y-1 ${pkg.highlight ? "border-primary bg-card shadow-gold glow-gold" : "border-border bg-card hover:border-primary/40"}`,
              "data-ocid": `home.package.item.${i + 1}`,
              children: [
                pkg.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "gold-gradient text-background font-bold px-3 py-1 text-xs", children: "Most Popular" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-1", children: pkg.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: pkg.tagline })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold gold-text", children: pkg.roi }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm ml-2", children: pkg.period }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
                    "Min: ",
                    pkg.min,
                    " · Max: ",
                    pkg.max
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mb-8 flex-1", children: pkg.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
                ] }, f)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packages", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: `w-full font-semibold ${pkg.highlight ? "gold-gradient text-background hover:opacity-90" : "border border-primary/40 text-primary hover:bg-primary/10 bg-transparent"}`,
                    "data-ocid": `home.package.invest_button.${i + 1}`,
                    children: "Get Started"
                  }
                ) })
              ]
            }
          ) }, pkg.name)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeSection, { className: "text-center mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packages", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "lg",
              className: "border-primary/40 text-primary hover:bg-primary/10",
              "data-ocid": "home.packages.view_all_button",
              children: [
                "View All Packages",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
              ]
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "features",
        className: "py-24 bg-background",
        "data-ocid": "home.features.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-4 border-primary/30 text-primary bg-primary/10",
                children: "Platform Features"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold mb-4", children: [
              "Built for ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Serious Investors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Every tool you need to invest confidently — from automated execution to real-time analytics." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: FEATURES.map(({ icon: Icon, title, desc }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeSection, { delay: i * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-smooth group cursor-default",
              "data-ocid": `home.feature.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base mb-2", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: desc })
              ]
            }
          ) }, title)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "referral",
        className: "py-24 bg-muted/30 border-y border-border",
        "data-ocid": "home.referral.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeSection, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-4 border-primary/30 text-primary bg-primary/10",
                children: "Referral Program"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold mb-4", children: [
              "Earn More by ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Sharing GoNext" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Our industry-leading referral program rewards you for growing the GoNext community. Share your link and earn on every deposit your referrals make." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl border border-border bg-card text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gold-text mb-1", children: "10%" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Direct Referral Commission" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl border border-border bg-card text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gold-text mb-1", children: "10%" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Binary Network Bonus" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packages", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gold-gradient text-background font-bold shadow-gold hover:opacity-90 transition-smooth",
                "data-ocid": "home.referral.sign_up_button",
                children: [
                  "Start Earning Referrals",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeSection, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border border-primary/30 bg-card glow-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl mb-6", children: "How Referrals Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: [
              {
                n: "1",
                title: "Share your unique link",
                desc: "Get your referral link from the dashboard"
              },
              {
                n: "2",
                title: "Friend signs up & invests",
                desc: "Your referral creates an account and deposits"
              },
              {
                n: "3",
                title: "You earn 10% commission",
                desc: "Earn 10% on their every deposit, instantly"
              },
              {
                n: "4",
                title: "Binary bonus activates",
                desc: "Unlock 10% binary bonus as your network grows"
              }
            ].map(({ n, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-background text-sm font-bold flex-shrink-0", children: n }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
              ] })
            ] }, n)) })
          ] }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "about",
        className: "py-24 bg-background",
        "data-ocid": "home.about.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeSection, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "mb-4 border-primary/30 text-primary bg-primary/10",
              children: "Our Story"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold mb-6", children: [
            "Democratizing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Institutional Arbitrage" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-8", children: "GoNext was founded by a team of quantitative analysts, algorithmic traders, and blockchain engineers who spent years deploying capital at hedge funds and proprietary trading desks. We saw firsthand how arbitrage strategies — once reserved for firms with billions in AUM — could generate consistent, low-risk returns. We built GoNext to open that opportunity to everyone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-6 mt-10", children: [
            { label: "Years of Research", value: "7+" },
            { label: "Exchanges Connected", value: "12" },
            { label: "Satisfied Investors", value: "10K+" }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-6 rounded-xl border border-border bg-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gold-text mb-1", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: label })
              ]
            },
            label
          )) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "footer-cta",
        className: "py-24 bg-card border-t border-border",
        "data-ocid": "home.footer_cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeSection, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full gold-gradient mb-6 shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-8 w-8 text-background" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-4", children: [
            "Ready to Start ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Earning?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10 max-w-xl mx-auto", children: "Join 10,000+ investors already building wealth with GoNext's institutional-grade arbitrage platform. Start today — minimum deposit $500." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packages", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gold-gradient text-background font-bold px-10 py-6 text-base shadow-gold glow-gold hover:opacity-90 transition-smooth",
                "data-ocid": "home.footer_cta.sign_up_button",
                children: [
                  "Sign Up Free",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "border-primary/40 text-primary hover:bg-primary/10 px-10 py-6 text-base",
                "data-ocid": "home.footer_cta.learn_more_button",
                children: "Learn More"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-muted-foreground", children: "No credit card required · Withdraw anytime · Secured by Internet Computer" })
        ] }) })
      }
    )
  ] });
}
export {
  HomePage as default
};
