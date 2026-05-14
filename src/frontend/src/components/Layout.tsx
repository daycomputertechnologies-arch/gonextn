import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, LogIn, LogOut, Menu, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Packages", to: "/packages" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export function Layout({
  children,
  isAuthenticated,
  onLogin,
  onLogout,
}: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouterState();
  const path = router.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav.logo"
            >
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-background" />
              </div>
              <span className="font-display font-bold text-xl">
                Go<span className="gold-text">Next</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-smooth",
                    path === link.to
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth + Dashboard */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                    data-ocid="nav.dashboard_link"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                    data-ocid="nav.logout_button"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onLogin}
                  className="flex items-center gap-2 gold-gradient text-background px-5 py-2 rounded-lg text-sm font-semibold shadow-gold hover:opacity-90 transition-smooth"
                  data-ocid="nav.login_button"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth my-0.5",
                  path === link.to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
                data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                  data-ocid="nav.mobile_logout_button"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full flex items-center justify-center gap-2 gold-gradient text-background px-5 py-2.5 rounded-lg text-sm font-semibold shadow-gold"
                  data-ocid="nav.mobile_login_button"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-background" />
                </div>
                <span className="font-display font-bold text-lg">
                  Go<span className="gold-text">Next</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Professional cryptocurrency investment platform. Grow your
                wealth with transparent ROI and institutional-grade security.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">
                Platform
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">
                Account
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invest"
                    className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                  >
                    Invest
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GoNext. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
