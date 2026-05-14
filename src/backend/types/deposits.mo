import Common "common";
import Investments "investments";

module {
  public type DepositStatus = {
    #PENDING;
    #CONFIRMED;
    #REJECTED;
  };

  public type Deposit = {
    id : Common.DepositId;
    userId : Common.UserId;
    packageTier : Investments.PackageTier;
    amount : Nat;
    walletId : Common.WalletId;
    walletAddress : Text;
    submittedAt : Common.Timestamp;
    var status : DepositStatus;
    var confirmedAt : ?Common.Timestamp;
    var adminNote : ?Text;
  };

  public type DepositPublic = {
    id : Common.DepositId;
    userId : Common.UserId;
    packageTier : Investments.PackageTier;
    amount : Nat;
    walletId : Common.WalletId;
    walletAddress : Text;
    submittedAt : Common.Timestamp;
    status : DepositStatus;
    confirmedAt : ?Common.Timestamp;
    adminNote : ?Text;
  };

  public type SubmitDepositArgs = {
    packageTier : Investments.PackageTier;
    amount : Nat;
    walletId : Common.WalletId;
  };
};
