import { Input } from "@/components/ui/input";
import { useAdminUsers } from "@/hooks/useBackend";
import { Search, Users } from "lucide-react";
import { useState } from "react";

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(ms));
}

export default function AdminUsersTab() {
  const { data: users = [], isLoading } = useAdminUsers();
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.referralCode.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6" data-ocid="admin.users_section">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Registered Users
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {users.length} total users
          </p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, referral..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-input"
            data-ocid="admin.users.search_input"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 bg-card rounded-xl animate-pulse border border-border"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="bg-card border border-dashed border-border rounded-xl py-16 flex flex-col items-center gap-3"
          data-ocid="admin.users.empty_state"
        >
          <Users className="w-10 h-10 text-muted-foreground" />
          <p className="font-medium text-foreground">
            {search ? "No users match your search" : "No users registered"}
          </p>
          <p className="text-sm text-muted-foreground">
            {search
              ? "Try different search terms"
              : "Users will appear here after registration"}
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Username
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Referral Code
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr
                  key={user.id.toString()}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-smooth"
                  data-ocid={`admin.users.item.${i + 1}`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm text-foreground">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <code className="text-xs font-mono bg-secondary/50 border border-border px-2 py-1 rounded text-primary">
                      {user.referralCode}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(user.registeredAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
