import Common "../types/common";
import Types "../types/investments";
import List "mo:core/List";

module {
  // 1 year in nanoseconds (365 * 24 * 60 * 60 * 1_000_000_000)
  let ONE_YEAR_NS : Int = 31_536_000_000_000_000;
  // 1 day in nanoseconds (24 * 60 * 60 * 1_000_000_000)
  let ONE_DAY_NS : Int = 86_400_000_000_000;

  public func getPackageConfig(tier : Types.PackageTier) : Types.PackageConfig {
    switch (tier) {
      case (#GENESIS) {
        {
          tier = #GENESIS;
          minAmount = 5_000;      // $50 in cents
          maxAmount = ?499_900;   // $4,999 in cents
          dailyRatePerMille = 10; // 1.0%
          weeklyRatePerMille = 70;
          durationDays = 365;
        }
      };
      case (#MOMENTUM) {
        {
          tier = #MOMENTUM;
          minAmount = 500_000;    // $5,000 in cents
          maxAmount = ?2_499_900; // $24,999 in cents
          dailyRatePerMille = 11; // 1.1% (approx 1.14%)
          weeklyRatePerMille = 77;
          durationDays = 365;
        }
      };
      case (#VELOCITY) {
        {
          tier = #VELOCITY;
          minAmount = 2_500_000;  // $25,000 in cents
          maxAmount = null;
          dailyRatePerMille = 13; // 1.3% (approx 1.28%)
          weeklyRatePerMille = 91;
          durationDays = 365;
        }
      };
    }
  };

  public func isValidAmount(tier : Types.PackageTier, amount : Nat) : Bool {
    let cfg = getPackageConfig(tier);
    let meetsMin = amount >= cfg.minAmount;
    let meetsMax = switch (cfg.maxAmount) {
      case (?max) { amount <= max };
      case null   { true };
    };
    meetsMin and meetsMax
  };

  public func new(
    id : Common.InvestmentId,
    userId : Common.UserId,
    tier : Types.PackageTier,
    amount : Nat,
    now : Common.Timestamp
  ) : Types.Investment {
    {
      id;
      userId;
      packageTier = tier;
      amount;
      startDate = now;
      maturityDate = now + ONE_YEAR_NS;
      var status = #ACTIVE;
      var accumulatedBalance = 0;
      var lastRoiAccrual = now;
    }
  };

  public func toPublic(self : Types.Investment) : Types.InvestmentPublic {
    {
      id = self.id;
      userId = self.userId;
      packageTier = self.packageTier;
      amount = self.amount;
      startDate = self.startDate;
      maturityDate = self.maturityDate;
      status = self.status;
      accumulatedBalance = self.accumulatedBalance;
      lastRoiAccrual = self.lastRoiAccrual;
    }
  };

  // Returns earned ROI amount (in cents) since lastAccrual
  // Uses per-mille rate: roi = amount * rate / 1000 per day
  public func calcPendingRoi(self : Types.Investment, now : Common.Timestamp) : Nat {
    if (self.status != #ACTIVE) { return 0 };
    let elapsedNs = now - self.lastRoiAccrual;
    if (elapsedNs <= 0) { return 0 };
    let cfg = getPackageConfig(self.packageTier);
    // Number of complete days elapsed
    let days = elapsedNs / ONE_DAY_NS;
    if (days <= 0) { return 0 };
    // roi = amount * dailyRatePerMille / 1000 * days
    (self.amount * cfg.dailyRatePerMille * days.toNat()) / 1000
  };

  public func accrueRoi(
    investments : List.List<Types.Investment>,
    now : Common.Timestamp
  ) {
    investments.mapInPlace(
      func(inv) {
        if (inv.status == #ACTIVE) {
          let roi = calcPendingRoi(inv, now);
          if (roi > 0) {
            let elapsedNs = now - inv.lastRoiAccrual;
            let days = elapsedNs / ONE_DAY_NS;
            inv.accumulatedBalance += roi;
            inv.lastRoiAccrual := inv.lastRoiAccrual + days * ONE_DAY_NS;
            // Auto-mature if past maturity date
            if (now >= inv.maturityDate) {
              inv.status := #MATURED;
            };
          };
        };
        inv
      }
    )
  };
};
