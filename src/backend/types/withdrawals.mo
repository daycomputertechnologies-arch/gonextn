import Common "common";

module {
  public type WithdrawalStatus = {
    #PENDING;
    #APPROVED;
    #REJECTED;
  };

  public type Withdrawal = {
    id : Common.WithdrawalId;
    userId : Common.UserId;
    amount : Nat;
    destinationAddress : Text;
    requestedAt : Common.Timestamp;
    var status : WithdrawalStatus;
    var processedAt : ?Common.Timestamp;
    var adminNote : ?Text;
  };

  public type WithdrawalPublic = {
    id : Common.WithdrawalId;
    userId : Common.UserId;
    amount : Nat;
    destinationAddress : Text;
    requestedAt : Common.Timestamp;
    status : WithdrawalStatus;
    processedAt : ?Common.Timestamp;
    adminNote : ?Text;
  };

  public type RequestWithdrawalArgs = {
    amount : Nat;
    destinationAddress : Text;
  };
};
