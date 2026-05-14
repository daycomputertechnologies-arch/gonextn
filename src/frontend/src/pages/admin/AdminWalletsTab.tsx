import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminWallets, useDeleteWallet } from "@/hooks/useBackend";
import type { CryptoWallet } from "@/types";
import { Check, Copy, Pencil, Plus, Trash2, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import WalletModal from "./WalletModal";

function truncateAddress(addr: string): string {
  if (addr.length <= 16) return addr;
  return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
}

export default function AdminWalletsTab() {
  const { data: wallets = [], isLoading } = useAdminWallets();
  const deleteWallet = useDeleteWallet();

  const [modalOpen, setModalOpen] = useState(false);
  const [editWallet, setEditWallet] = useState<CryptoWallet | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CryptoWallet | null>(null);
  const [copiedId, setCopiedId] = useState<bigint | null>(null);

  function handleCopy(wallet: CryptoWallet) {
    navigator.clipboard.writeText(wallet.walletAddress);
    setCopiedId(wallet.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Address copied to clipboard");
  }

  function handleEdit(wallet: CryptoWallet) {
    setEditWallet(wallet);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditWallet(null);
    setModalOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteWallet.mutateAsync(deleteTarget.id);
      toast.success(`${deleteTarget.cryptoName} wallet deleted`);
    } catch {
      toast.error("Failed to delete wallet");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.wallets_section">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Crypto Wallets
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage payment wallet addresses for deposits
          </p>
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          className="gold-gradient text-background font-semibold shadow-gold hover:opacity-90 gap-2"
          data-ocid="admin.wallets.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Wallet
        </Button>
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
      ) : wallets.length === 0 ? (
        <div
          className="bg-card border border-dashed border-border rounded-xl py-16 flex flex-col items-center gap-4"
          data-ocid="admin.wallets.empty_state"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Wallet className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">No wallets configured</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first crypto wallet to start accepting deposits
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAdd}
            className="gold-gradient text-background font-semibold shadow-gold hover:opacity-90 gap-2"
            data-ocid="admin.wallets.empty_add_button"
          >
            <Plus className="w-4 h-4" />
            Add First Wallet
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Symbol
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Network
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Address
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
              {wallets.map((wallet, i) => (
                <tr
                  key={String(wallet.id)}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-smooth"
                  data-ocid={`admin.wallets.item.${i + 1}`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      {wallet.iconUrl ? (
                        <img
                          src={wallet.iconUrl}
                          alt={wallet.symbol}
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {wallet.symbol.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {wallet.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {wallet.cryptoName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">
                      {wallet.network}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-foreground bg-background px-2 py-1 rounded border border-border">
                        {truncateAddress(wallet.walletAddress)}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(wallet)}
                        className="p-1 rounded text-muted-foreground hover:text-primary transition-smooth"
                        aria-label="Copy address"
                        data-ocid={`admin.wallets.copy_button.${i + 1}`}
                      >
                        {copiedId === wallet.id ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={wallet.isActive ? "default" : "secondary"}
                      className={
                        wallet.isActive
                          ? "bg-green-400/10 text-green-400 border-green-400/20"
                          : ""
                      }
                    >
                      {wallet.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(wallet)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                        aria-label="Edit wallet"
                        data-ocid={`admin.wallets.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(wallet)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                        aria-label="Delete wallet"
                        data-ocid={`admin.wallets.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <WalletModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        wallet={editWallet}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent
          className="bg-card border-border"
          data-ocid="admin.wallets.delete_dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Wallet</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the{" "}
              <strong className="text-foreground">
                {deleteTarget?.cryptoName}
              </strong>{" "}
              ({deleteTarget?.symbol}) wallet? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.wallets.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.wallets.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
