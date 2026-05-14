import Common "../types/common";
import DepTypes "../types/deposits";
import WalTypes "../types/wallets";
import InvTypes "../types/investments";
import DepLib "../lib/deposits";
import InvLib "../lib/investments";
import AdminLib "../lib/admin";
import ReferralLib "../lib/referrals";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

mixin (
  deposits : List.List<DepTypes.Deposit>,
  wallets : List.List<WalTypes.CryptoWallet>,
  users : Map.Map<Common.UserId, { id : Common.UserId; var username : Text; var email : Text; referralCode : Common.ReferralCode; referredBy : ?Common.UserId; registeredAt : Common.Timestamp }>,
  admins : Set.Set<Common.UserId>,
  investments : List.List<InvTypes.Investment>,
  referredBy : Map.Map<Common.UserId, Common.UserId>,
  referralCommissions : Map.Map<Common.UserId, Nat>,
  state : { var nextDepositId : Nat; var nextInvestmentId : Nat }
) {
  /// Submit a new deposit request.
  public shared ({ caller }) func submitDeposit(args : DepTypes.SubmitDepositArgs) : async DepTypes.DepositPublic {
    if (not users.containsKey(caller)) {
      Runtime.trap("Must be registered to submit a deposit")
    };
    // Look up wallet address
    let wallet = switch (wallets.find(func(w) { w.id == args.walletId and w.isActive })) {
      case (?w) { w };
      case null  { Runtime.trap("Wallet not found or inactive") };
    };
    let id = state.nextDepositId;
    state.nextDepositId += 1;
    let dep = DepLib.new(id, caller, args.packageTier, args.amount, args.walletId, wallet.walletAddress, Time.now());
    deposits.add(dep);
    dep.toPublic()
  };

  /// Get calling user's deposit history.
  public shared query ({ caller }) func getMyDeposits() : async [DepTypes.DepositPublic] {
    let filtered = deposits.filter(func(d) { Principal.equal(d.userId, caller) });
    filtered.toArray().map<DepTypes.Deposit, DepTypes.DepositPublic>(func(d) { d.toPublic() })
  };

  /// Admin: list all deposits.
  public shared query ({ caller }) func adminListDeposits() : async [DepTypes.DepositPublic] {
    AdminLib.requireAdmin(admins, caller);
    deposits.toArray().map<DepTypes.Deposit, DepTypes.DepositPublic>(func(d) { d.toPublic() })
  };

  /// Admin: confirm a deposit — creates investment, credits referrer commission.
  public shared ({ caller }) func adminConfirmDeposit(id : Common.DepositId, note : ?Text) : async () {
    AdminLib.requireAdmin(admins, caller);
    let dep = switch (deposits.find(func(d) { d.id == id })) {
      case (?d) { d };
      case null  { Runtime.trap("Deposit not found") };
    };
    if (dep.status != #PENDING) {
      Runtime.trap("Deposit is not pending")
    };
    let now = Time.now();
    dep.status := #CONFIRMED;
    dep.confirmedAt := ?now;
    dep.adminNote := note;
    // Create investment
    let invId = state.nextInvestmentId;
    state.nextInvestmentId += 1;
    let inv = InvLib.new(invId, dep.userId, dep.packageTier, dep.amount, now);
    investments.add(inv);
    // Credit referrer commission (10%)
    switch (referredBy.get(dep.userId)) {
      case (?referrerId) {
        let commission = ReferralLib.calcCommission(dep.amount);
        let prev = switch (referralCommissions.get(referrerId)) {
          case (?v) { v };
          case null { 0 };
        };
        referralCommissions.add(referrerId, prev + commission);
      };
      case null {};
    };
  };

  /// Admin: reject a deposit.
  public shared ({ caller }) func adminRejectDeposit(id : Common.DepositId, note : ?Text) : async () {
    AdminLib.requireAdmin(admins, caller);
    let dep = switch (deposits.find(func(d) { d.id == id })) {
      case (?d) { d };
      case null  { Runtime.trap("Deposit not found") };
    };
    if (dep.status != #PENDING) {
      Runtime.trap("Deposit is not pending")
    };
    dep.status := #REJECTED;
    dep.adminNote := note;
  };
};
