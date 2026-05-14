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
import { useAdminDeposits } from "@/hooks/useBackend";
import type { DepositPublic } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, DollarSign, XCircle } from "lucide-react";
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

type ActionType = "confirm" | "reject";

interface ActionState {
  deposit: DepositPublic;
  type: ActionType;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    CONFIRMED: "bg-green-400/10 text-green-400 border-green-400/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <Badge className={map[status] ?? ""} variant="outline">
      {status}
    </Badge>
  );
}

export default function AdminDepositsTab() {
  const { data: deposits = [], isLoading } = useAdminDeposits();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [action, setAction] = useState<ActionState | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAction() {
    if (!action || !actor) return;
    setLoading(true);
    try {
      if (action.type === "confirm") {
        await actor.adminConfirmDeposit(action.deposit.id, note || null);
        toast.success("Deposit confirmed");
      } else {
        await actor.adminRejectDeposit(action.deposit.id, note || null);
        toast.success("Deposit rejected");
      }
      queryClient.invalidateQueries({ queryKey: ["adminDeposits"] });
    } catch {
      toast.error("Action failed");
    } finally {
      setLoading(false);
      setAction(null);
      setNote("");
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.deposits_section">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Deposit Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review and confirm or reject user deposit submissions
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
      ) : deposits.length === 0 ? (
        <div
          className="bg-card border border-dashed border-border rounded-xl py-16 flex flex-col items-center gap-3"
          data-ocid="admin.deposits.empty_state"
        >
          <DollarSign className="w-10 h-10 text-muted-foreground" />
          <p className="font-medium text-foreground">No deposits yet</p>
          <p className="text-sm text-muted-foreground">
            Deposit requests will appear here
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Package
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Date
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
              {deposits.map((deposit, i) => (
                <tr
                  key={String(deposit.id)}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-smooth"
                  data-ocid={`admin.deposits.item.${i + 1}`}
                >
                  <td className="px-4 py-4">
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-xs font-bold text-blue-400">
                      {deposit.userId.toString().slice(-2).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-foreground">
                      {String(deposit.packageTier)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-semibold text-primary">
                      {formatAmount(deposit.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(deposit.submittedAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={String(deposit.status)} />
                  </td>
                  <td className="px-4 py-4">
                    {String(deposit.status) === "PENDING" && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setAction({ deposit, type: "confirm" })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20 transition-smooth"
                          data-ocid={`admin.deposits.confirm_button.${i + 1}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setAction({ deposit, type: "reject" })}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-smooth"
                          data-ocid={`admin.deposits.reject_button.${i + 1}`}
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
          data-ocid="admin.deposits.dialog"
        >
          <DialogHeader>
            <DialogTitle
              className={
                action?.type === "confirm"
                  ? "text-green-400"
                  : "text-destructive"
              }
            >
              {action?.type === "confirm"
                ? "Confirm Deposit"
                : "Reject Deposit"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              {action?.type === "confirm"
                ? "Confirm this deposit and activate the investment."
                : "Reject this deposit request and notify the user."}
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="action-note">Admin Note (optional)</Label>
              <Textarea
                id="action-note"
                placeholder="Add a note for the user..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-background border-input resize-none"
                rows={3}
                data-ocid="admin.deposits.note_textarea"
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
              data-ocid="admin.deposits.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={handleAction}
              className={
                action?.type === "confirm"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }
              data-ocid="admin.deposits.confirm_button"
            >
              {loading
                ? "Processing..."
                : action?.type === "confirm"
                  ? "Confirm Deposit"
                  : "Reject Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
