import { PackageTier } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActiveWallets, useSubmitDeposit } from "@/hooks/useBackend";
import type { CryptoWallet, DepositPublic } from "@/types";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader2,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STEPS = ["Choose Package", "Enter Amount", "Payment Method", "Confirm"];

interface PackageConfig {
  tier: PackageTier;
  name: string;
  min: number;
  max: number | null;
  daily: number;
  weekly: number;
  icon: React.ReactNode;
  tagline: string;
  color: string;
}

const PACKAGES: PackageConfig[] = [
  {
    tier: PackageTier.GENESIS,
    name: "Genesis",
    min: 50,
    max: 4999,
    daily: 1.0,
    weekly: 7.0,
    icon: <TrendingUp className="w-6 h-6" />,
    tagline: "Start your journey",
    color: "border-border hover:border-primary/60",
  },
  {
    tier: PackageTier.MOMENTUM,
    name: "Momentum",
    min: 5000,
    max: 24999,
    daily: 1.14,
    weekly: 8.0,
    icon: <Zap className="w-6 h-6" />,
    tagline: "Accelerate your growth",
    color: "border-border hover:border-primary/60",
  },
  {
    tier: PackageTier.VELOCITY,
    name: "Velocity",
    min: 25000,
    max: null,
    daily: 1.28,
    weekly: 9.0,
    icon: <Wallet className="w-6 h-6" />,
    tagline: "Maximum performance",
    color: "border-border hover:border-primary/60",
  },
];

function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function StepBar({ current }: { current: number }) {
  return (
    <div
      data-ocid="invest.step_bar"
      className="flex items-center justify-center gap-0 mb-10"
    >
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${
                i < current
                  ? "bg-primary text-primary-foreground"
                  : i === current
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`mt-1.5 text-xs font-medium hidden sm:block ${
                i <= current ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 transition-smooth ${
                i < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function PackageCard({
  pkg,
  selected,
  onSelect,
  index,
}: {
  pkg: PackageConfig;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const monthly = (pkg.daily * 30).toFixed(2);
  const annual = (pkg.daily * 365).toFixed(2);
  return (
    <button
      type="button"
      data-ocid={`invest.package_card.${index + 1}`}
      onClick={onSelect}
      className={`w-full text-left rounded-xl border-2 p-6 transition-smooth cursor-pointer bg-card ${
        selected ? "border-primary shadow-gold glow-gold" : pkg.color
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2 rounded-lg ${
            selected
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {pkg.icon}
        </div>
        {selected && (
          <Badge className="bg-primary text-primary-foreground text-xs">
            Selected
          </Badge>
        )}
      </div>
      <h3
        className={`text-xl font-bold mb-1 ${selected ? "gold-text" : "text-foreground"}`}
      >
        {pkg.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">{pkg.tagline}</p>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Investment Range</span>
          <span className="text-foreground font-medium">
            {formatUSD(pkg.min)} {pkg.max ? `– ${formatUSD(pkg.max)}` : "+"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Daily ROI</span>
          <span className="text-primary font-bold">{pkg.daily}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Weekly ROI</span>
          <span className="text-primary font-bold">{pkg.weekly}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Monthly ROI</span>
          <span className="text-foreground font-medium">{monthly}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Annual ROI</span>
          <span className="text-foreground font-medium">{annual}%</span>
        </div>
      </div>
    </button>
  );
}

function RoiProjection({
  amount,
  pkg,
}: { amount: number; pkg: PackageConfig }) {
  if (!amount || amount <= 0) return null;
  const daily = (amount * pkg.daily) / 100;
  const weekly = (amount * pkg.weekly) / 100;
  const monthly = (amount * pkg.daily * 30) / 100;
  const annual = (amount * pkg.daily * 365) / 100;
  return (
    <div
      data-ocid="invest.roi_projection"
      className="mt-4 rounded-xl bg-secondary border border-border p-4 animate-fade-in"
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
        Projected Returns on {formatUSD(amount)}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Daily", value: daily },
          { label: "Weekly", value: weekly },
          { label: "Monthly", value: monthly },
          { label: "Annual", value: annual },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-primary font-bold text-sm">{formatUSD(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletRow({
  wallet,
  selected,
  onSelect,
  index,
}: {
  wallet: CryptoWallet;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const addr = wallet.walletAddress;
  const truncated =
    addr.length > 16 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr;
  return (
    <button
      type="button"
      data-ocid={`invest.wallet_row.${index + 1}`}
      onClick={onSelect}
      className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 transition-smooth bg-card text-left ${
        selected
          ? "border-primary shadow-gold"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {wallet.symbol.slice(0, 3)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {wallet.cryptoName}
          </span>
          <Badge variant="outline" className="text-xs">
            {wallet.symbol}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{wallet.network}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-muted-foreground font-mono">{truncated}</p>
      </div>
      {selected && <CheckCircle className="w-5 h-5 text-primary shrink-0" />}
    </button>
  );
}

function ConfirmStep({
  wallet,
  amount,
  pkg,
  onSubmit,
  isSubmitting,
}: {
  wallet: CryptoWallet;
  amount: number;
  pkg: PackageConfig;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(wallet.walletAddress);
    toast.success("Address copied to clipboard");
  };
  return (
    <div data-ocid="invest.confirm_step" className="space-y-6 animate-fade-in">
      <div className="rounded-xl bg-secondary border border-border p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
          Send To Address
        </p>
        <div className="flex items-start gap-3">
          <p className="flex-1 font-mono text-sm text-foreground break-all">
            {wallet.walletAddress}
          </p>
          <button
            type="button"
            data-ocid="invest.copy_address_button"
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-smooth"
            aria-label="Copy wallet address"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        data-ocid="invest.qr_placeholder"
        className="flex items-center justify-center rounded-xl bg-card border border-border h-48"
      >
        <div className="text-center">
          <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
            <p className="text-xs text-muted-foreground">QR Code</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {wallet.symbol} · {wallet.network}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-secondary border border-border p-5 space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Package</span>
          <span className="text-foreground font-semibold">{pkg.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Crypto</span>
          <span className="text-foreground font-semibold">
            {wallet.cryptoName} ({wallet.symbol})
          </span>
        </div>
        <div className="flex justify-between border-t border-border pt-3">
          <span className="text-muted-foreground text-sm">Amount to Send</span>
          <span className="text-primary font-bold text-lg">
            {formatUSD(amount)}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-primary">Instructions: </span>
          Send exactly <span className="font-bold">{formatUSD(amount)}</span>{" "}
          worth of <span className="font-bold">{wallet.symbol}</span> to the
          address above. Once your transaction is confirmed on the blockchain,
          click the button below. Your deposit will be reviewed and activated
          within <span className="font-bold">1–24 hours</span>.
        </p>
      </div>

      <Button
        type="button"
        data-ocid="invest.submit_button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
          </>
        ) : (
          "I Have Sent the Payment"
        )}
      </Button>
    </div>
  );
}

function SuccessScreen({
  deposit,
  onDashboard,
}: {
  deposit: DepositPublic;
  onDashboard: () => void;
}) {
  return (
    <div
      data-ocid="invest.success_screen"
      className="text-center py-8 space-y-6 animate-fade-up"
    >
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Deposit Submitted!
        </h2>
        <p className="text-muted-foreground text-sm">
          Your deposit is pending review by our team.
        </p>
      </div>
      <div className="rounded-xl bg-card border border-border p-5 text-left space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Reference ID</span>
          <span className="font-mono text-xs text-foreground">
            {deposit.id.toString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Amount</span>
          <span className="text-primary font-bold">
            {formatUSD(Number(deposit.amount) / 100)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Status</span>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            {deposit.status}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Est. Activation</span>
          <span className="text-foreground text-sm">1–24 hours</span>
        </div>
      </div>
      <Button
        type="button"
        data-ocid="invest.go_dashboard_button"
        onClick={onDashboard}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-4"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}

export default function InvestPage() {
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState<PackageConfig | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<CryptoWallet | null>(
    null,
  );
  const [successDeposit, setSuccessDeposit] = useState<DepositPublic | null>(
    null,
  );

  const { data: wallets = [], isLoading: walletsLoading } = useActiveWallets();
  const submitDeposit = useSubmitDeposit();

  const amountNum = Number.parseFloat(amount);

  const validateAmount = (val: string, pkg: PackageConfig | null): string => {
    const n = Number.parseFloat(val);
    if (!val || Number.isNaN(n)) return "Please enter a valid amount.";
    if (!pkg) return "";
    if (n < pkg.min) return `Minimum for ${pkg.name} is ${formatUSD(pkg.min)}.`;
    if (pkg.max !== null && n > pkg.max)
      return `Maximum for ${pkg.name} is ${formatUSD(pkg.max)}.`;
    return "";
  };

  const handleAmountChange = (val: string) => {
    setAmount(val);
    setAmountError(validateAmount(val, selectedPkg));
  };

  const handleNext = () => {
    if (step === 0 && !selectedPkg) {
      toast.error("Please select a package to continue.");
      return;
    }
    if (step === 1) {
      const err = validateAmount(amount, selectedPkg);
      if (err) {
        setAmountError(err);
        return;
      }
    }
    if (step === 2 && !selectedWallet) {
      toast.error("Please select a payment wallet.");
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!selectedPkg || !selectedWallet) return;
    try {
      const result = await submitDeposit.mutateAsync({
        packageTier: selectedPkg.tier,
        amount: BigInt(Math.round(amountNum * 100)),
        walletId: selectedWallet.id,
      });
      setSuccessDeposit(result as DepositPublic);
    } catch {
      toast.error("Failed to submit deposit. Please try again.");
    }
  };

  if (successDeposit) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10">
        <SuccessScreen
          deposit={successDeposit}
          onDashboard={() => {
            window.location.href = "/dashboard";
          }}
        />
      </div>
    );
  }

  return (
    <div data-ocid="invest.page" className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          <span className="gold-text">Invest</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Complete the steps below to submit your investment deposit.
        </p>
      </div>

      <StepBar current={step} />

      {/* Step 0 — Choose Package */}
      {step === 0 && (
        <div
          data-ocid="invest.step1_section"
          className="space-y-4 animate-fade-up"
        >
          <h2 className="text-lg font-semibold text-foreground">
            Choose Your Package
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PACKAGES.map((pkg, i) => (
              <PackageCard
                key={pkg.tier}
                pkg={pkg}
                selected={selectedPkg?.tier === pkg.tier}
                onSelect={() => setSelectedPkg(pkg)}
                index={i}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Enter Amount */}
      {step === 1 && selectedPkg && (
        <div
          data-ocid="invest.step2_section"
          className="space-y-4 animate-fade-up"
        >
          <h2 className="text-lg font-semibold text-foreground">
            Enter Investment Amount
          </h2>
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="invest-amount"
                className="text-sm text-muted-foreground font-medium"
              >
                Amount (USD)
              </label>
              <span className="text-xs text-muted-foreground">
                {formatUSD(selectedPkg.min)}
                {selectedPkg.max ? ` – ${formatUSD(selectedPkg.max)}` : "+"}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                $
              </span>
              <input
                id="invest-amount"
                data-ocid="invest.amount_input"
                type="number"
                min={selectedPkg.min}
                max={selectedPkg.max ?? undefined}
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                onBlur={() =>
                  setAmountError(validateAmount(amount, selectedPkg))
                }
                placeholder={selectedPkg.min.toString()}
                className="w-full bg-background border border-input rounded-lg pl-8 pr-4 py-3 text-foreground text-lg font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {amountError && (
              <p
                data-ocid="invest.amount_field_error"
                className="text-destructive text-xs mt-2"
              >
                {amountError}
              </p>
            )}
          </div>
          <RoiProjection amount={amountNum} pkg={selectedPkg} />
        </div>
      )}

      {/* Step 2 — Payment Method */}
      {step === 2 && (
        <div
          data-ocid="invest.step3_section"
          className="space-y-4 animate-fade-up"
        >
          <h2 className="text-lg font-semibold text-foreground">
            Select Payment Wallet
          </h2>
          {walletsLoading ? (
            <div
              data-ocid="invest.wallets_loading_state"
              className="text-center py-10"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground text-sm mt-2">
                Loading wallets...
              </p>
            </div>
          ) : wallets.length === 0 ? (
            <div
              data-ocid="invest.wallets_empty_state"
              className="text-center py-10 text-muted-foreground"
            >
              <Wallet className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>
                No payment wallets available at the moment. Please try again
                later.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wallets.map((w, i) => (
                <WalletRow
                  key={w.id.toString()}
                  wallet={w as CryptoWallet}
                  selected={selectedWallet?.id === w.id}
                  onSelect={() => setSelectedWallet(w as CryptoWallet)}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3 — Confirm & Pay */}
      {step === 3 && selectedPkg && selectedWallet && (
        <div data-ocid="invest.step4_section" className="animate-fade-up">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Confirm & Send Payment
          </h2>
          <ConfirmStep
            wallet={selectedWallet}
            amount={amountNum}
            pkg={selectedPkg}
            onSubmit={handleSubmit}
            isSubmitting={submitDeposit.isPending}
          />
        </div>
      )}

      {/* Navigation */}
      {step < 3 && (
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            data-ocid="invest.back_button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <Button
            type="button"
            data-ocid="invest.next_button"
            onClick={handleNext}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 font-semibold"
          >
            {step === 2 ? "Review Payment" : "Continue"}{" "}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
