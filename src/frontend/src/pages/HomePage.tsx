import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Globe,
  Shield,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Stats Bar Data ──────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Active Investors",
    value: 10000,
    suffix: "+",
    prefix: "",
    icon: Users,
  },
  {
    label: "Capital Managed",
    value: 50,
    suffix: "M+",
    prefix: "$",
    icon: BarChart3,
  },
  { label: "Uptime", value: 99, suffix: ".8%", prefix: "", icon: Activity },
  {
    label: "Investment Tiers",
    value: 3,
    suffix: "",
    prefix: "",
    icon: TrendingUp,
  },
];

// ─── How It Works Steps ────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Account",
    desc: "Register your GoNext account securely with Internet Identity. No personal data required.",
    icon: Users,
  },
  {
    step: "02",
    title: "Choose Package",
    desc: "Select from Genesis, Momentum, or Velocity tiers based on your investment goals.",
    icon: Star,
  },
  {
    step: "03",
    title: "Deposit Crypto",
    desc: "Fund your account using BTC, ETH, or USDT via our secure wallet addresses.",
    icon: Wallet,
  },
  {
    step: "04",
    title: "Earn Daily",
    desc: "Watch your portfolio grow with automated arbitrage returns, compounding daily.",
    icon: TrendingUp,
  },
];

// ─── Investment Packages ───────────────────────────────────────────────────────
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
      "Referral bonuses",
    ],
    highlight: false,
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
      "Referral bonuses",
    ],
    highlight: true,
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
      "VIP events",
    ],
    highlight: false,
  },
];

// ─── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Wallet,
    title: "Crypto Wallet Integration",
    desc: "Seamlessly deposit BTC, ETH, USDT and more. Admin-managed wallet addresses with real-time balance tracking.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "All transactions verified on-chain. Multi-layer encryption with Internet Computer security guarantees.",
  },
  {
    icon: Activity,
    title: "Advanced Monitoring",
    desc: "Real-time portfolio dashboards with P&L charts, historical performance, and drawdown analysis.",
  },
  {
    icon: Globe,
    title: "Real-time Tracking",
    desc: "Live arbitrage execution across 12+ exchanges. Position-level transparency on every trade made.",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    desc: "Sub-millisecond order routing powered by proprietary HFT infrastructure and co-location facilities.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Detailed ROI breakdowns, tax reports, and custom alerts so you always know where you stand.",
  },
];

// ─── Section fade wrapper ──────────────────────────────────────────────────────
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── HomePage ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" data-ocid="home.page">
      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        data-ocid="home.hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-arbitrage.dim_1400x700.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,oklch(87%_0.19_88/0.06),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border-primary/30 text-primary bg-primary/10"
              variant="outline"
            >
              &#9889; Next-Gen Arbitrage Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            <span className="text-foreground">AI-Powered</span>{" "}
            <span className="gold-text">Arbitrage</span>
            <br />
            <span className="text-foreground">&amp; Wealth Acceleration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            GoNext enables institutional-grade arbitrage for everyday investors.
            Harness algorithmic precision across 12+ exchanges to grow your
            wealth with transparent, compounding daily returns.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/packages">
              <Button
                size="lg"
                className="gold-gradient text-background font-bold px-8 py-6 text-base shadow-gold glow-gold hover:opacity-90 transition-smooth"
                data-ocid="home.hero.start_investing_button"
              >
                Start Investing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base transition-smooth"
              onClick={() => scrollToSection("how-it-works")}
              data-ocid="home.hero.learn_more_button"
            >
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              No lock-up periods
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Withdraw anytime
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Daily compounding
            </span>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        id="stats"
        className="bg-card border-y border-border py-10"
        data-ocid="home.stats.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ label, value, suffix, prefix, icon: Icon }, i) => (
              <FadeSection key={label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold gold-text">
                    <AnimatedCounter
                      target={value}
                      suffix={suffix}
                      prefix={prefix}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {label}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 bg-background"
        data-ocid="home.how_it_works.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/10"
            >
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              How <span className="gold-text">GoNext</span> Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From sign-up to earning in four straightforward steps. No
              experience required.
            </p>
          </FadeSection>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }, i) => (
              <FadeSection key={step} delay={i * 0.12}>
                <div
                  className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-smooth group"
                  data-ocid={`home.how_it_works.item.${i + 1}`}
                >
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mb-4 shadow-gold group-hover:glow-gold transition-smooth">
                    <Icon className="h-7 w-7 text-background" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2">
                    {step}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Packages Preview */}
      <section
        id="packages-preview"
        className="py-24 bg-muted/30"
        data-ocid="home.packages.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/10"
            >
              Investment Tiers
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Choose Your <span className="gold-text">Package</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three tiers designed for every investor profile — from first-time
              crypto investors to seasoned professionals.
            </p>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, i) => (
              <FadeSection key={pkg.name} delay={i * 0.12}>
                <div
                  className={`relative flex flex-col rounded-2xl border p-8 transition-smooth hover:-translate-y-1 ${
                    pkg.highlight
                      ? "border-primary bg-card shadow-gold glow-gold"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                  data-ocid={`home.package.item.${i + 1}`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gold-gradient text-background font-bold px-3 py-1 text-xs">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-5xl font-bold gold-text">
                      {pkg.roi}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {pkg.period}
                    </span>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Min: {pkg.min} &middot; Max: {pkg.max}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/packages">
                    <Button
                      className={`w-full font-semibold ${
                        pkg.highlight
                          ? "gold-gradient text-background hover:opacity-90"
                          : "border border-primary/40 text-primary hover:bg-primary/10 bg-transparent"
                      }`}
                      data-ocid={`home.package.invest_button.${i + 1}`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-12">
            <Link to="/packages">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/40 text-primary hover:bg-primary/10"
                data-ocid="home.packages.view_all_button"
              >
                View All Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </FadeSection>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-24 bg-background"
        data-ocid="home.features.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/10"
            >
              Platform Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Built for <span className="gold-text">Serious Investors</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every tool you need to invest confidently — from automated
              execution to real-time analytics.
            </p>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <FadeSection key={title} delay={i * 0.08}>
                <div
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-smooth group cursor-default"
                  data-ocid={`home.feature.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section
        id="referral"
        className="py-24 bg-muted/30 border-y border-border"
        data-ocid="home.referral.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary bg-primary/10"
              >
                Referral Program
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Earn More by <span className="gold-text">Sharing GoNext</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our industry-leading referral program rewards you for growing
                the GoNext community. Share your link and earn on every deposit
                your referrals make.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-xl border border-border bg-card text-center">
                  <div className="text-3xl font-bold gold-text mb-1">10%</div>
                  <div className="text-xs text-muted-foreground">
                    Direct Referral Commission
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-border bg-card text-center">
                  <div className="text-3xl font-bold gold-text mb-1">10%</div>
                  <div className="text-xs text-muted-foreground">
                    Binary Network Bonus
                  </div>
                </div>
              </div>

              <Link to="/packages">
                <Button
                  size="lg"
                  className="gold-gradient text-background font-bold shadow-gold hover:opacity-90 transition-smooth"
                  data-ocid="home.referral.sign_up_button"
                >
                  Start Earning Referrals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </FadeSection>

            <FadeSection delay={0.2}>
              <div className="p-8 rounded-2xl border border-primary/30 bg-card glow-gold">
                <h3 className="font-bold text-xl mb-6">How Referrals Work</h3>
                <div className="space-y-5">
                  {[
                    {
                      n: "1",
                      title: "Share your unique link",
                      desc: "Get your referral link from the dashboard",
                    },
                    {
                      n: "2",
                      title: "Friend signs up & invests",
                      desc: "Your referral creates an account and deposits",
                    },
                    {
                      n: "3",
                      title: "You earn 10% commission",
                      desc: "Earn 10% on their every deposit, instantly",
                    },
                    {
                      n: "4",
                      title: "Binary bonus activates",
                      desc: "Unlock 10% binary bonus as your network grows",
                    },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-background text-sm font-bold flex-shrink-0">
                        {n}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* About / Origin Teaser */}
      <section
        id="about"
        className="py-24 bg-background"
        data-ocid="home.about.section"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeSection>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/10"
            >
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Democratizing{" "}
              <span className="gold-text">Institutional Arbitrage</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              GoNext was founded by a team of quantitative analysts, algorithmic
              traders, and blockchain engineers who spent years deploying
              capital at hedge funds and proprietary trading desks. We saw
              firsthand how arbitrage strategies — once reserved for firms with
              billions in AUM — could generate consistent, low-risk returns. We
              built GoNext to open that opportunity to everyone.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {[
                { label: "Years of Research", value: "7+" },
                { label: "Exchanges Connected", value: "12" },
                { label: "Satisfied Investors", value: "10K+" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <div className="text-3xl font-bold gold-text mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        id="footer-cta"
        className="py-24 bg-card border-t border-border"
        data-ocid="home.footer_cta.section"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeSection>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gold-gradient mb-6 shadow-gold">
              <TrendingUp className="h-8 w-8 text-background" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to Start <span className="gold-text">Earning?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join 10,000+ investors already building wealth with GoNext's
              institutional-grade arbitrage platform. Start today — minimum
              deposit $500.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages">
                <Button
                  size="lg"
                  className="gold-gradient text-background font-bold px-10 py-6 text-base shadow-gold glow-gold hover:opacity-90 transition-smooth"
                  data-ocid="home.footer_cta.sign_up_button"
                >
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary/10 px-10 py-6 text-base"
                  data-ocid="home.footer_cta.learn_more_button"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              No credit card required &middot; Withdraw anytime &middot; Secured
              by Internet Computer
            </p>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
