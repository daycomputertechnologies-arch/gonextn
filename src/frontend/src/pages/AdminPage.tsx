import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  DollarSign,
  LayoutDashboard,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import AdminDepositsTab from "./admin/AdminDepositsTab";
import AdminOverviewTab from "./admin/AdminOverviewTab";
import AdminUsersTab from "./admin/AdminUsersTab";
import AdminWalletsTab from "./admin/AdminWalletsTab";
import AdminWithdrawalsTab from "./admin/AdminWithdrawalsTab";

type Tab = "overview" | "wallets" | "users" | "deposits" | "withdrawals";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "wallets", label: "Crypto Wallets", icon: Wallet },
  { id: "users", label: "Users", icon: Users },
  { id: "deposits", label: "Deposits", icon: DollarSign },
  { id: "withdrawals", label: "Withdrawals", icon: BarChart3 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { actor, isFetching } = useActor(createActor);

  const { data: isAdmin, isLoading } = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading || isFetching) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full gold-gradient mx-auto flex items-center justify-center animate-pulse">
            <Shield className="w-6 h-6 text-background" />
          </div>
          <p className="text-muted-foreground text-sm">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.error_state"
      >
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 mx-auto flex items-center justify-center">
            <Shield className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground text-sm">
            You do not have administrator privileges to access this panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex" data-ocid="admin.page">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-card border-r border-border flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
              <Shield className="w-4 h-4 text-background" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground">
                Admin Panel
              </p>
              <p className="text-xs text-muted-foreground">GoNext Platform</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth text-left ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                data-ocid={`admin.${tab.id}_tab`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : ""}`}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Administrator Access
          </p>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <header className="bg-card border-b border-border px-8 py-4 shrink-0">
          <h1 className="text-xl font-display font-bold text-foreground">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            GoNext platform management
          </p>
        </header>

        <main className="flex-1 p-8">
          {activeTab === "overview" && (
            <AdminOverviewTab onNavigate={setActiveTab} />
          )}
          {activeTab === "wallets" && <AdminWalletsTab />}
          {activeTab === "users" && <AdminUsersTab />}
          {activeTab === "deposits" && <AdminDepositsTab />}
          {activeTab === "withdrawals" && <AdminWithdrawalsTab />}
        </main>
      </div>
    </div>
  );
}
