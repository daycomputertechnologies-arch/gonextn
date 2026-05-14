import { Link } from "@tanstack/react-router";
import {
  Eye,
  Globe,
  Lock,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Animated counter ────────────────────────────────────────────
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Data ────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Every trade, every return, every fee — fully visible. We believe investors deserve complete clarity into how their capital grows.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "Our AI-driven arbitrage engine continuously scans global markets, executing strategies that were once reserved for hedge funds alone.",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Multi-layer encryption, cold-storage custody, and on-chain verifiability ensure your assets are protected at every level.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "GoNext investors form a global network — sharing knowledge, growing together, and building generational wealth side by side.",
  },
];

const TEAM = [
  {
    name: "Alexander Reid",
    title: "Chief Executive Officer",
    bio: "Former institutional portfolio manager with 15+ years at bulge-bracket firms. Pioneered AI-driven arbitrage models that delivered consistent alpha across market cycles.",
    initials: "AR",
  },
  {
    name: "Sophia Chen",
    title: "Chief Technology Officer",
    bio: "Ex-quantitative engineer from Two Sigma. Designed the distributed trading infrastructure powering GoNext's sub-millisecond execution across 40+ exchanges.",
    initials: "SC",
  },
  {
    name: "Marcus Williams",
    title: "Chief Financial Officer",
    bio: "Seasoned CFO with deep roots in digital asset treasury management. Ensures GoNext's financial architecture remains resilient, compliant, and investor-first.",
    initials: "MW",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: "AI-Powered",
    description:
      "Proprietary machine-learning models identify and execute arbitrage opportunities in microseconds — 24/7, never sleeping.",
  },
  {
    icon: Target,
    title: "Institutional Grade",
    description:
      "Enterprise risk controls, sophisticated hedging strategies, and institutional liquidity — now accessible to individual investors.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Invest from anywhere. GoNext operates across 40+ crypto exchanges spanning every major jurisdiction and time zone.",
  },
  {
    icon: Network,
    title: "Referral Network",
    description:
      "Grow your returns by growing the community. Our multi-tier referral system rewards network builders with compounding bonuses.",
  },
  {
    icon: Rocket,
    title: "Transparent ROI",
    description:
      "Real-time dashboards show every basis point of your return. No hidden fees, no locked black boxes — just verifiable results.",
  },
];

const STATS = [
  { label: "Active Investors", end: 12400, suffix: "+", prefix: "" },
  { label: "Countries Served", end: 78, suffix: "+", prefix: "" },
  { label: "Average Monthly ROI", end: 12, suffix: "%", prefix: "" },
  { label: "Funds Under Management", end: 240, suffix: "M+", prefix: "$" },
];

// ── Component ────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" data-ocid="about.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        data-ocid="about.hero_section"
      >
        <img
          src="/assets/generated/about-hero.dim_1200x480.jpg"
          alt="GoNext global arbitrage network"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6 animate-fade-in">
            <TrendingUp className="w-4 h-4" />
            Institutional-Grade Platform
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
            About{" "}
            <span className="relative inline-block">
              <span className="gold-text">GoNext</span>
              <span className="absolute -bottom-2 left-0 w-full h-0.5 gold-gradient rounded-full" />
            </span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-up">
            We democratize institutional-grade arbitrage strategies, making
            consistent, transparent returns accessible to every investor —
            regardless of size or geography.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background" data-ocid="about.story_section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
                Built by experts,
                <br />
                <span className="gold-text">for every investor</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  GoNext was founded by a team of financial experts and
                  technologists who spent decades inside the world's largest
                  trading institutions. We saw firsthand how AI-powered
                  arbitrage generated extraordinary, low-risk returns — yet
                  remained locked behind minimum investments of millions of
                  dollars.
                </p>
                <p>
                  Inspired by the quantarbi model, we set out to rebuild this
                  infrastructure from the ground up — open, transparent, and
                  accessible to individual investors worldwide. GoNext brings
                  institutional discipline, AI-precision, and full on-chain
                  verifiability to a platform anyone can join.
                </p>
                <p>
                  Today we serve investors across 78+ countries, managing
                  hundreds of millions in assets with a consistent track record
                  and an unwavering commitment to putting our investors first.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-xl p-6 text-center glow-gold"
                  data-ocid={`about.story_stat.${i + 1}`}
                >
                  <div className="font-display text-3xl font-bold gold-text mb-1">
                    <AnimatedCounter
                      end={s.end}
                      suffix={s.suffix}
                      prefix={s.prefix}
                    />
                  </div>
                  <div className="text-muted-foreground text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-20 bg-muted/30 border-y border-border"
        data-ocid="about.mission_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Purpose
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Mission &amp; Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth"
              data-ocid="about.mission_card"
            >
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-background" />
              </div>
              <div className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
                Mission
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Deliver consistent, transparent returns
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We deliver consistent, transparent returns through AI-powered
                arbitrage — combining institutional trading rigor with the
                openness and accessibility of modern decentralized finance.
              </p>
            </div>
            <div
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth"
              data-ocid="about.vision_card"
            >
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-background" />
              </div>
              <div className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
                Vision
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Make institutional wealth strategies accessible globally
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every investor — regardless of capital size or
                geographic location — has equal access to the sophisticated
                wealth-building strategies once exclusive to institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background" data-ocid="about.values_section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-smooth"
                data-ocid={`about.value.${i + 1}`}
              >
                <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-background" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {v.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        className="py-20 bg-muted/30 border-y border-border"
        data-ocid="about.team_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Leadership
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              The Team Behind GoNext
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Decades of combined experience across global trading houses,
              quantitative research, and digital asset management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-smooth"
                data-ocid={`about.team_member.${i + 1}`}
              >
                <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 text-background font-display font-bold text-2xl shadow-gold">
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-1">
                  {member.name}
                </h3>
                <div className="text-primary text-sm font-medium mb-4">
                  {member.title}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GoNext */}
      <section
        className="py-20 bg-background"
        data-ocid="about.differentiators_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              The GoNext Advantage
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Why Choose GoNext
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((d, i) => (
              <div
                key={d.title}
                className="bg-card border border-border rounded-2xl p-7 flex gap-5 hover:border-primary/40 hover:-translate-y-0.5 transition-smooth"
                data-ocid={`about.differentiator.${i + 1}`}
              >
                <div className="w-12 h-12 shrink-0 rounded-xl gold-gradient flex items-center justify-center">
                  <d.icon className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {d.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section
        className="py-16 bg-muted/30 border-y border-border"
        data-ocid="about.stats_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div
                key={`stat-${s.label}`}
                className="text-center"
                data-ocid={`about.stats_counter.${i + 1}`}
              >
                <div className="font-display text-4xl sm:text-5xl font-bold gold-text mb-2">
                  <AnimatedCounter
                    end={s.end}
                    suffix={s.suffix}
                    prefix={s.prefix}
                  />
                </div>
                <div className="text-muted-foreground text-sm font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 bg-card border-b border-border"
        data-ocid="about.cta_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            12,400+ Investors Worldwide
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Join the <span className="gold-text">GoNext Network</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Start building wealth with institutional-grade arbitrage strategies.
            Transparent returns. No lock-ups. Verifiable on-chain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 gold-gradient text-background px-8 py-3.5 rounded-xl text-base font-semibold shadow-gold hover:opacity-90 transition-smooth"
              data-ocid="about.cta_primary_button"
            >
              <Rocket className="w-5 h-5" />
              View Investment Packages
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border bg-secondary text-foreground px-8 py-3.5 rounded-xl text-base font-semibold hover:border-primary/40 hover:bg-secondary/80 transition-smooth"
              data-ocid="about.cta_secondary_button"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
