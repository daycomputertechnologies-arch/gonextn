import Common "../types/common";
import Types "../types/deposits";
import InvTypes "../types/investments";

module {
  public func new(
    id : Common.DepositId,
    userId : Common.UserId,
    packageTier : InvTypes.PackageTier,
    amount : Nat,
    walletId : Common.WalletId,
    walletAddress : Text,
    now : Common.Timestamp
  ) : Types.Deposit {
    {
      id;
      userId;
      packageTier;
      amount;
      walletId;
      walletAddress;
      submittedAt = now;
      var status = #PENDING;
      var confirmedAt = null;
      var adminNote = null;
    }
  };

  public func toPublic(self : Types.Deposit) : Types.DepositPublic {
    {
      id = self.id;
      userId = self.userId;
      packageTier = self.packageTier;
      amount = self.amount;
      walletId = self.walletId;
      walletAddress = self.walletAddress;
      submittedAt = self.submittedAt;
      status = self.status;
      confirmedAt = self.confirmedAt;
      adminNote = self.adminNote;
    }
  };
};
