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
      case (#STARTER) {{
        tier = #STARTER;
        minAmount = 5_000;        // $50 in cents
        maxAmount = ?99_900;      // $999 in cents
        dailyRatePerMille = 10;   // 1.0%
        weeklyRatePerMille = 70;
        durationDays = 365;
      }};
      case (#BASIC) {{
        tier = #BASIC;
        minAmount = 100_000;      // $1,000 in cents
        maxAmount = ?249_900;     // $2,499 in cents
        dailyRatePerMille = 10;   // 1.0%
        weeklyRatePerMille = 70;
        durationDays = 365;
      }};
      case (#STANDARD) {{
        tier = #STANDARD;
        minAmount = 250_000;      // $2,500 in cents
        maxAmount = ?499_900;     // $4,999 in cents
        dailyRatePerMille = 11;   // 1.1%
        weeklyRatePerMille = 77;
        durationDays = 365;
      }};
      case (#SELECT) {{
        tier = #SELECT;
        minAmount = 500_000;      // $5,000 in cents
        maxAmount = ?999_900;     // $9,999 in cents
        dailyRatePerMille = 11;   // 1.1%
        weeklyRatePerMille = 77;
        durationDays = 365;
      }};
      case (#ADVANCED) {{
        tier = #ADVANCED;
        minAmount = 1_000_000;    // $10,000 in cents
        maxAmount = ?1_999_900;   // $19,999 in cents
        dailyRatePerMille = 11;   // 1.1%
        weeklyRatePerMille = 77;
        durationDays = 365;
      }};
      case (#PLUS) {{
        tier = #PLUS;
        minAmount = 2_000_000;    // $20,000 in cents
        maxAmount = ?2_999_900;   // $29,999 in cents
        dailyRatePerMille = 12;   // 1.2%
        weeklyRatePerMille = 84;
        durationDays = 365;
      }};
      case (#PREMIUM) {{
        tier = #PREMIUM;
        minAmount = 3_000_000;    // $30,000 in cents
        maxAmount = ?4_999_900;   // $49,999 in cents
        dailyRatePerMille = 12;   // 1.2%
        weeklyRatePerMille = 84;
        durationDays = 365;
      }};
      case (#PREFERRED) {{
        tier = #PREFERRED;
        minAmount = 5_000_000;    // $50,000 in cents
        maxAmount = ?7_499_900;   // $74,999 in cents
        dailyRatePerMille = 12;   // 1.2%
        weeklyRatePerMille = 84;
        durationDays = 365;
      }};
      case (#EXECUTIVE) {{
        tier = #EXECUTIVE;
        minAmount = 7_500_000;    // $75,000 in cents
        maxAmount = ?9_999_900;   // $99,999 in cents
        dailyRatePerMille = 13;   // 1.3%
        weeklyRatePerMille = 91;
        durationDays = 365;
      }};
      case (#SIGNATURE) {{
        tier = #SIGNATURE;
        minAmount = 10_000_000;   // $100,000 in cents
        maxAmount = ?14_999_900;  // $149,999 in cents
        dailyRatePerMille = 13;   // 1.3%
        weeklyRatePerMille = 91;
        durationDays = 365;
      }};
      case (#AMBASSADOR) {{
        tier = #AMBASSADOR;
        minAmount = 15_000_000;   // $150,000 in cents
        maxAmount = ?24_999_900;  // $249,999 in cents
        dailyRatePerMille = 13;   // 1.3%
        weeklyRatePerMille = 91;
        durationDays = 365;
      }};
      case (#ELITE) {{
        tier = #ELITE;
        minAmount = 25_000_000;   // $250,000 in cents
        maxAmount = null;
        dailyRatePerMille = 13;   // 1.3%
        weeklyRatePerMille = 91;
        durationDays = 365;
      }};
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
