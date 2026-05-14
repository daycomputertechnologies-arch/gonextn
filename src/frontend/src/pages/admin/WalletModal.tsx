import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUpsertWallet } from "@/hooks/useBackend";
import type { CryptoWallet } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  cryptoName: string;
  symbol: string;
  network: string;
  walletAddress: string;
  iconUrl: string;
  isActive: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  wallet: CryptoWallet | null;
}

export default function WalletModal({ open, onClose, wallet }: Props) {
  const upsert = useUpsertWallet();
  const isEdit = !!wallet;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      cryptoName: "",
      symbol: "",
      network: "",
      walletAddress: "",
      iconUrl: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (wallet) {
      reset({
        cryptoName: wallet.cryptoName,
        symbol: wallet.symbol,
        network: wallet.network,
        walletAddress: wallet.walletAddress,
        iconUrl: wallet.iconUrl,
        isActive: wallet.isActive,
      });
    } else {
      reset({
        cryptoName: "",
        symbol: "",
        network: "",
        walletAddress: "",
        iconUrl: "",
        isActive: true,
      });
    }
  }, [wallet, reset]);

  async function onSubmit(data: FormData) {
    try {
      await upsert.mutateAsync({
        id: wallet?.id,
        args: {
          cryptoName: data.cryptoName,
          symbol: data.symbol.toUpperCase(),
          network: data.network,
          walletAddress: data.walletAddress,
          iconUrl: data.iconUrl,
          isActive: data.isActive,
        },
      });
      toast.success(
        isEdit ? "Wallet updated successfully" : "Wallet added successfully",
      );
      onClose();
    } catch {
      toast.error(isEdit ? "Failed to update wallet" : "Failed to add wallet");
    }
  }

  const isActiveValue = watch("isActive");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="bg-card border-border max-w-md"
        data-ocid="admin.wallets.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEdit ? "Edit Wallet" : "Add Crypto Wallet"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cryptoName">Crypto Name</Label>
              <Input
                id="cryptoName"
                placeholder="Bitcoin"
                className="bg-background border-input"
                data-ocid="admin.wallets.cryptoname_input"
                {...register("cryptoName", { required: "Required" })}
              />
              {errors.cryptoName && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.wallets.cryptoname_field_error"
                >
                  {errors.cryptoName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="BTC"
                className="bg-background border-input uppercase"
                data-ocid="admin.wallets.symbol_input"
                {...register("symbol", { required: "Required" })}
              />
              {errors.symbol && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.wallets.symbol_field_error"
                >
                  {errors.symbol.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="network">Network</Label>
            <Input
              id="network"
              placeholder="e.g. Bitcoin, Ethereum, BNB Smart Chain"
              className="bg-background border-input"
              data-ocid="admin.wallets.network_input"
              {...register("network", { required: "Required" })}
            />
            {errors.network && (
              <p
                className="text-xs text-destructive"
                data-ocid="admin.wallets.network_field_error"
              >
                {errors.network.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              placeholder="0x..."
              className="bg-background border-input font-mono text-sm"
              data-ocid="admin.wallets.address_input"
              {...register("walletAddress", {
                required: "Required",
                minLength: { value: 10, message: "Address too short" },
              })}
            />
            {errors.walletAddress && (
              <p
                className="text-xs text-destructive"
                data-ocid="admin.wallets.address_field_error"
              >
                {errors.walletAddress.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="iconUrl">Icon URL</Label>
            <Input
              id="iconUrl"
              placeholder="https://..."
              className="bg-background border-input"
              data-ocid="admin.wallets.iconurl_input"
              {...register("iconUrl")}
            />
          </div>

          <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Active</p>
              <p className="text-xs text-muted-foreground">
                Visible for user deposits
              </p>
            </div>
            <Switch
              checked={isActiveValue}
              onCheckedChange={(v) => setValue("isActive", v)}
              data-ocid="admin.wallets.active_switch"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-ocid="admin.wallets.modal_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={upsert.isPending}
              className="flex-1 gold-gradient text-background font-semibold shadow-gold hover:opacity-90"
              data-ocid="admin.wallets.modal_submit_button"
            >
              {upsert.isPending
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Wallet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
