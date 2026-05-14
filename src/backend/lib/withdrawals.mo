import Common "../types/common";
import Types "../types/withdrawals";

module {
  public func new(
    id : Common.WithdrawalId,
    userId : Common.UserId,
    amount : Nat,
    destinationAddress : Text,
    now : Common.Timestamp
  ) : Types.Withdrawal {
    {
      id;
      userId;
      amount;
      destinationAddress;
      requestedAt = now;
      var status = #PENDING;
      var processedAt = null;
      var adminNote = null;
    }
  };

  public func toPublic(self : Types.Withdrawal) : Types.WithdrawalPublic {
    {
      id = self.id;
      userId = self.userId;
      amount = self.amount;
      destinationAddress = self.destinationAddress;
      requestedAt = self.requestedAt;
      status = self.status;
      processedAt = self.processedAt;
      adminNote = self.adminNote;
    }
  };

  // Unix epoch was a Thursday. Days since epoch mod 7:
  // 0=Thu,1=Fri,2=Sat,3=Sun,4=Mon,5=Tue,6=Wed
  // Business days: 0,1,4,5,6 (Thu,Fri,Mon,Tue,Wed)
  public func isBusinessDay(now : Common.Timestamp) : Bool {
    let ONE_DAY_NS : Int = 24 * 60 * 60 * 1_000_000_000;
    let daysSinceEpoch = now / ONE_DAY_NS;
    let dayOfWeek = daysSinceEpoch % 7;
    // day 2 = Saturday, day 3 = Sunday
    dayOfWeek != 2 and dayOfWeek != 3
  };
};
