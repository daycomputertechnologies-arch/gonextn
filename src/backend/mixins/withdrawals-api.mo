import Common "../types/common";
import WdTypes "../types/withdrawals";
import WdLib "../lib/withdrawals";
import AdminLib "../lib/admin";
import UserTypes "../types/users";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

mixin (
  withdrawals : List.List<WdTypes.Withdrawal>,
  users : Map.Map<Common.UserId, { id : Common.UserId; var username : Text; var email : Text; referralCode : Common.ReferralCode; referredBy : ?Common.UserId; registeredAt : Common.Timestamp }>,
  admins : Set.Set<Common.UserId>,
  referralCommissions : Map.Map<Common.UserId, Nat>,
  investments : List.List<{ id : Common.InvestmentId; userId : Common.UserId; packageTier : { #GENESIS; #MOMENTUM; #VELOCITY }; amount : Nat; startDate : Common.Timestamp; maturityDate : Common.Timestamp; var status : { #ACTIVE; #MATURED; #CANCELLED }; var accumulatedBalance : Nat; var lastRoiAccrual : Common.Timestamp }>,
  state : { var nextWithdrawalId : Nat }
) {
  /// Request a withdrawal. Only allowed Mon–Fri.
  public shared ({ caller }) func requestWithdrawal(args : WdTypes.RequestWithdrawalArgs) : async WdTypes.WithdrawalPublic {
    if (not users.containsKey(caller)) {
      Runtime.trap("Must be registered to request a withdrawal")
    };
    let now = Time.now();
    if (not WdLib.isBusinessDay(now)) {
      Runtime.trap("Withdrawals are only processed Monday through Friday")
    };
    // Verify user has sufficient accumulated balance
    var totalBalance : Nat = 0;
    investments.forEach(func(inv) {
      if (Principal.equal(inv.userId, caller)) {
        totalBalance += inv.accumulatedBalance;
      };
    });
    let referralBonus = switch (referralCommissions.get(caller)) {
      case (?v) { v };
      case null { 0 };
    };
    totalBalance += referralBonus;
    if (args.amount > totalBalance) {
      Runtime.trap("Insufficient balance")
    };
    let id = state.nextWithdrawalId;
    state.nextWithdrawalId += 1;
    let wd = WdLib.new(id, caller, args.amount, args.destinationAddress, now);
    withdrawals.add(wd);
    wd.toPublic()
  };

  /// Get calling user's withdrawal history.
  public shared query ({ caller }) func getMyWithdrawals() : async [WdTypes.WithdrawalPublic] {
    let filtered = withdrawals.filter(func(w) { Principal.equal(w.userId, caller) });
    filtered.toArray().map<WdTypes.Withdrawal, WdTypes.WithdrawalPublic>(func(w) { w.toPublic() })
  };

  /// Admin: list all withdrawals.
  public shared query ({ caller }) func adminListWithdrawals() : async [WdTypes.WithdrawalPublic] {
    AdminLib.requireAdmin(admins, caller);
    withdrawals.toArray().map<WdTypes.Withdrawal, WdTypes.WithdrawalPublic>(func(w) { w.toPublic() })
  };

  /// Admin: approve a withdrawal — debit from accumulated balance.
  public shared ({ caller }) func adminApproveWithdrawal(id : Common.WithdrawalId, note : ?Text) : async () {
    AdminLib.requireAdmin(admins, caller);
    let wd = switch (withdrawals.find(func(w) { w.id == id })) {
      case (?w) { w };
      case null  { Runtime.trap("Withdrawal not found") };
    };
    if (wd.status != #PENDING) {
      Runtime.trap("Withdrawal is not pending")
    };
    // Debit accumulated balance from investments (FIFO)
    var remaining = wd.amount;
    investments.mapInPlace(func(inv) {
      if (Principal.equal(inv.userId, wd.userId) and remaining > 0) {
        if (inv.accumulatedBalance >= remaining) {
          inv.accumulatedBalance -= remaining;
          remaining := 0;
        } else {
          remaining -= inv.accumulatedBalance;
          inv.accumulatedBalance := 0;
        };
      };
      inv
    });
    // Debit referral commissions if still remaining
    if (remaining > 0) {
      let prev = switch (referralCommissions.get(wd.userId)) {
        case (?v) { v };
        case null { 0 };
      };
      if (prev >= remaining) {
        referralCommissions.add(wd.userId, prev - remaining);
        remaining := 0;
      } else {
        referralCommissions.add(wd.userId, 0);
        remaining := 0;
      };
    };
    wd.status := #APPROVED;
    wd.processedAt := ?Time.now();
    wd.adminNote := note;
  };

  /// Admin: reject a withdrawal.
  public shared ({ caller }) func adminRejectWithdrawal(id : Common.WithdrawalId, note : ?Text) : async () {
    AdminLib.requireAdmin(admins, caller);
    let wd = switch (withdrawals.find(func(w) { w.id == id })) {
      case (?w) { w };
      case null  { Runtime.trap("Withdrawal not found") };
    };
    if (wd.status != #PENDING) {
      Runtime.trap("Withdrawal is not pending")
    };
    wd.status := #REJECTED;
    wd.processedAt := ?Time.now();
    wd.adminNote := note;
  };
};
