import { c as createLucideIcon, j as jsxRuntimeExports, T as TrendingUp, L as Link, r as reactExports } from "./index-BC8DNmFm.js";
import { T as Target, E as Eye } from "./target-BWJ9hQiN.js";
import { S as Shield } from "./shield-FqL7zc-q.js";
import { U as Users } from "./users-DomGzG8v.js";
import { Z as Zap } from "./zap-B8-hXQ1J.js";
import { G as Globe } from "./globe-hkFBt1vf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
const Network = createLucideIcon("network", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
];
const Rocket = createLucideIcon("rocket", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2e3
}) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const started = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = end / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    prefix,
    count.toLocaleString(),
    suffix
  ] });
}
const VALUES = [
  {
    icon: Eye,
    title: "Transparency",
    description: "Every trade, every return, every fee — fully visible. We believe investors deserve complete clarity into how their capital grows."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Our AI-driven arbitrage engine continuously scans global markets, executing strategies that were once reserved for hedge funds alone."
  },
  {
    icon: Shield,
    title: "Security",
    description: "Multi-layer encryption, cold-storage custody, and on-chain verifiability ensure your assets are protected at every level."
  },
  {
    icon: Users,
    title: "Community",
    description: "GoNext investors form a global network — sharing knowledge, growing together, and building generational wealth side by side."
  }
];
const TEAM = [
  {
    name: "Alexander Reid",
    title: "Chief Executive Officer",
    bio: "Former institutional portfolio manager with 15+ years at bulge-bracket firms. Pioneered AI-driven arbitrage models that delivered consistent alpha across market cycles.",
    initials: "AR"
  },
  {
    name: "Sophia Chen",
    title: "Chief Technology Officer",
    bio: "Ex-quantitative engineer from Two Sigma. Designed the distributed trading infrastructure powering GoNext's sub-millisecond execution across 40+ exchanges.",
    initials: "SC"
  },
  {
    name: "Marcus Williams",
    title: "Chief Financial Officer",
    bio: "Seasoned CFO with deep roots in digital asset treasury management. Ensures GoNext's financial architecture remains resilient, compliant, and investor-first.",
    initials: "MW"
  }
];
const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: "AI-Powered",
    description: "Proprietary machine-learning models identify and execute arbitrage opportunities in microseconds — 24/7, never sleeping."
  },
  {
    icon: Target,
    title: "Institutional Grade",
    description: "Enterprise risk controls, sophisticated hedging strategies, and institutional liquidity — now accessible to individual investors."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Invest from anywhere. GoNext operates across 40+ crypto exchanges spanning every major jurisdiction and time zone."
  },
  {
    icon: Network,
    title: "Referral Network",
    description: "Grow your returns by growing the community. Our multi-tier referral system rewards network builders with compounding bonuses."
  },
  {
    icon: Rocket,
    title: "Transparent ROI",
    description: "Real-time dashboards show every basis point of your return. No hidden fees, no locked black boxes — just verifiable results."
  }
];
const STATS = [
  { label: "Active Investors", end: 12400, suffix: "+", prefix: "" },
  { label: "Countries Served", end: 78, suffix: "+", prefix: "" },
  { label: "Average Monthly ROI", end: 12, suffix: "%", prefix: "" },
  { label: "Funds Under Management", end: 240, suffix: "M+", prefix: "$" }
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "about.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border",
        "data-ocid": "about.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/about-hero.dim_1200x480.jpg",
              alt: "GoNext global arbitrage network",
              className: "absolute inset-0 w-full h-full object-cover opacity-20"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6 animate-fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              "Institutional-Grade Platform"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up", children: [
              "About",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "GoNext" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-2 left-0 w-full h-0.5 gold-gradient rounded-full" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-up", children: "We democratize institutional-grade arbitrage strategies, making consistent, transparent returns accessible to every investor — regardless of size or geography." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "about.story_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-3", children: "Our Story" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6", children: [
          "Built by experts,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "for every investor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "GoNext was founded by a team of financial experts and technologists who spent decades inside the world's largest trading institutions. We saw firsthand how AI-powered arbitrage generated extraordinary, low-risk returns — yet remained locked behind minimum investments of millions of dollars." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Inspired by the quantarbi model, we set out to rebuild this infrastructure from the ground up — open, transparent, and accessible to individual investors worldwide. GoNext brings institutional discipline, AI-precision, and full on-chain verifiability to a platform anyone can join." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Today we serve investors across 78+ countries, managing hundreds of millions in assets with a consistent track record and an unwavering commitment to putting our investors first." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-6 text-center glow-gold",
          "data-ocid": `about.story_stat.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold gold-text mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedCounter,
              {
                end: s.end,
                suffix: s.suffix,
                prefix: s.prefix
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm", children: s.label })
          ]
        },
        s.label
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-muted/30 border-y border-border",
        "data-ocid": "about.mission_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-3", children: "Purpose" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Mission & Vision" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth",
                "data-ocid": "about.mission_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-background" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary text-xs font-semibold uppercase tracking-widest mb-2", children: "Mission" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Deliver consistent, transparent returns" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We deliver consistent, transparent returns through AI-powered arbitrage — combining institutional trading rigor with the openness and accessibility of modern decentralized finance." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth",
                "data-ocid": "about.vision_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-6 h-6 text-background" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary text-xs font-semibold uppercase tracking-widest mb-2", children: "Vision" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Make institutional wealth strategies accessible globally" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "A world where every investor — regardless of capital size or geographic location — has equal access to the sophisticated wealth-building strategies once exclusive to institutions." })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "about.values_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-3", children: "What We Stand For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Core Values" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-smooth",
          "data-ocid": `about.value.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl gold-gradient flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "w-5 h-5 text-background" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-3", children: v.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.description })
          ]
        },
        v.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-muted/30 border-y border-border",
        "data-ocid": "about.team_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-3", children: "Leadership" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "The Team Behind GoNext" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-xl mx-auto", children: "Decades of combined experience across global trading houses, quantitative research, and digital asset management." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: TEAM.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-smooth",
              "data-ocid": `about.team_member.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 text-background font-display font-bold text-2xl shadow-gold", children: member.initials }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-1", children: member.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary text-sm font-medium mb-4", children: member.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: member.bio })
              ]
            },
            member.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-background",
        "data-ocid": "about.differentiators_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold uppercase tracking-widest mb-3", children: "The GoNext Advantage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Why Choose GoNext" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: DIFFERENTIATORS.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-7 flex gap-5 hover:border-primary/40 hover:-translate-y-0.5 transition-smooth",
              "data-ocid": `about.differentiator.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 shrink-0 rounded-xl gold-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(d.icon, { className: "w-6 h-6 text-background" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: d.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: d.description })
                ] })
              ]
            },
            d.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/30 border-y border-border",
        "data-ocid": "about.stats_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center",
            "data-ocid": `about.stats_counter.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl sm:text-5xl font-bold gold-text mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AnimatedCounter,
                {
                  end: s.end,
                  suffix: s.suffix,
                  prefix: s.prefix
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm font-medium", children: s.label })
            ]
          },
          `stat-${s.label}`
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-card border-b border-border",
        "data-ocid": "about.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            "12,400+ Investors Worldwide"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6", children: [
            "Join the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "GoNext Network" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10 leading-relaxed", children: "Start building wealth with institutional-grade arbitrage strategies. Transparent returns. No lock-ups. Verifiable on-chain." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/packages",
                className: "inline-flex items-center gap-2 gold-gradient text-background px-8 py-3.5 rounded-xl text-base font-semibold shadow-gold hover:opacity-90 transition-smooth",
                "data-ocid": "about.cta_primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-5 h-5" }),
                  "View Investment Packages"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                className: "inline-flex items-center gap-2 border border-border bg-secondary text-foreground px-8 py-3.5 rounded-xl text-base font-semibold hover:border-primary/40 hover:bg-secondary/80 transition-smooth",
                "data-ocid": "about.cta_secondary_button",
                children: "Contact Our Team"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AboutPage as default
};
