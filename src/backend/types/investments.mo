import Common "common";

module {
  public type PackageTier = {
    #STARTER;
    #BASIC;
    #STANDARD;
    #SELECT;
    #ADVANCED;
    #PLUS;
    #PREMIUM;
    #PREFERRED;
    #EXECUTIVE;
    #SIGNATURE;
    #AMBASSADOR;
    #ELITE;
  };

  public type InvestmentStatus = {
    #ACTIVE;
    #MATURED;
    #CANCELLED;
  };

  public type Investment = {
    id : Common.InvestmentId;
    userId : Common.UserId;
    packageTier : PackageTier;
    amount : Nat;
    startDate : Common.Timestamp;
    maturityDate : Common.Timestamp;
    var status : InvestmentStatus;
    var accumulatedBalance : Nat;
    var lastRoiAccrual : Common.Timestamp;
  };

  public type InvestmentPublic = {
    id : Common.InvestmentId;
    userId : Common.UserId;
    packageTier : PackageTier;
    amount : Nat;
    startDate : Common.Timestamp;
    maturityDate : Common.Timestamp;
    status : InvestmentStatus;
    accumulatedBalance : Nat;
    lastRoiAccrual : Common.Timestamp;
  };

  public type CreateInvestmentArgs = {
    packageTier : PackageTier;
    amount : Nat;
  };

  public type PackageConfig = {
    tier : PackageTier;
    minAmount : Nat;
    maxAmount : ?Nat;
    dailyRatePerMille : Nat;
    weeklyRatePerMille : Nat;
    durationDays : Nat;
  };
};
