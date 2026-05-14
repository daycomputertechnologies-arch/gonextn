import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminWithdrawals } from "@/hooks/useBackend";
import type { WithdrawalPublic } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { BarChart3, CheckCircle2, Copy, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatAmount(n: bigint): string {
  return `$${(Number(n) / 1e8).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(ts: bigint): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(Number(ts) / 1_000_000));
}

function truncateAddress(addr: string): string {
  if (addr.length <= 16) return addr;
  return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
}

type ActionType = "approve" | "reject";

interface ActionState {
  withdrawal: WithdrawalPublic;
  type: ActionType;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    APPROVED: "bg-green-400/10 text-green-400 border-green-400/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <Badge className={map[status] ?? ""} variant="outline">
      {status}
    </Badge>
  );
}

export default function AdminWithdrawalsTab() {
  const { data: withdrawals = [], isLoading } = useAdminWithdrawals();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [action, setAction] = useState<ActionState | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCopyAddress(addr: string) {
    navigator.clipboard.writeText(addr);
    toast.success("Address copied");
  }

  async function handleAction() {
    if (!action || !actor) return;
    setLoading(true);
    try {
      if (action.type === "approve") {
        await actor.adminApproveWithdrawal(action.withdrawal.id, note || null);
        toast.success("Withdrawal approved");
      } else {
        await actor.adminRejectWithdrawal(action.withdrawal.id, note || null);
        toast.success("Withdrawal rejected");
      }
      queryClient.invalidateQueries({ queryKey: ["adminWithdrawals"] });
    } catch {
      toast.error("Action failed");
    } finally {
      setLoading(false);
      setAction(null);
      setNote("");
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.withdrawals_section">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Withdrawal Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review and approve or reject user withdrawal requests
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-card rounded-xl animate-pulse border border-border"
            />
          ))}
        </div>
      ) : withdrawals.length === 0 ? (
        <div
          className="bg-card border border-dashed border-border rounded-xl py-16 flex flex-col items-center gap-3"
          data-ocid="admin.withdrawals.empty_state"
        >
          <BarChart3 className="w-10 h-10 text-muted-foreground" />
          <p className="font-medium text-foreground">No withdrawal requests</p>
          <p className="text-sm text-muted-foreground">
            Withdrawal requests will appear here
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  User
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Destination
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Requested
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w, i) => (
                <tr
                  key={String(w.id)}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-smooth"
                  data-ocid={`admin.withdrawals.item.${i + 1}`}
                >
                  <td className="px-4 py-4">
                    <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-xs font-bold text-purple-400">
                      {w.userId.toString().slice(-2).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-semibold text-primary">
                      {formatAmount(w.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-foreground bg-background px-2 py-1 rounded border border-border">
                        {truncateAddress(w.destinationAddress)}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyAddress(w.destinationAddress)}
                        className="p-1 rounded text-muted-foreground hover:text-primary transition-smooth"
                        aria-label="Copy destination address"
                        data-ocid={`admin.withdrawals.copy_button.${i + 1}`}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(w.requestedAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={String(w.status)} />
                  </td>
                  <td className="px-4 py-4">
                    {String(w.status) === "PENDING" && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setAction({ withdrawal: w, type: "approve" })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20 transition-smooth"
                          data-ocid={`admin.withdrawals.approve_button.${i + 1}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setAction({ withdrawal: w, type: "reject" })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-smooth"
                          data-ocid={`admin.withdrawals.reject_button.${i + 1}`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action dialog */}
      <Dialog
        open={!!action}
        onOpenChange={(o) => {
          if (!o) {
            setAction(null);
            setNote("");
          }
        }}
      >
        <DialogContent
          className="bg-card border-border max-w-md"
          data-ocid="admin.withdrawals.dialog"
        >
          <DialogHeader>
            <DialogTitle
              className={
                action?.type === "approve"
                  ? "text-green-400"
                  : "text-destructive"
              }
            >
              {action?.type === "approve"
                ? "Approve Withdrawal"
                : "Reject Withdrawal"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {action && (
              <div className="bg-secondary/50 rounded-lg px-4 py-3">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-lg font-bold text-foreground">
                  {formatAmount(action.withdrawal.amount)}
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {truncateAddress(action.withdrawal.destinationAddress)}
                </p>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="withdrawal-note">Admin Note (optional)</Label>
              <Textarea
                id="withdrawal-note"
                placeholder="Add a note for the user..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-background border-input resize-none"
                rows={3}
                data-ocid="admin.withdrawals.note_textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAction(null);
                setNote("");
              }}
              data-ocid="admin.withdrawals.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={handleAction}
              className={
                action?.type === "approve"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }
              data-ocid="admin.withdrawals.action_confirm_button"
            >
              {loading
                ? "Processing..."
                : action?.type === "approve"
                  ? "Approve"
                  : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
