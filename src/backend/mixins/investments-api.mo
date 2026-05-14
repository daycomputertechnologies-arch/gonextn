import Common "../types/common";
import InvTypes "../types/investments";
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
  investments : List.List<InvTypes.Investment>,
  admins : Set.Set<Common.UserId>,
  referralCommissions : Map.Map<Common.UserId, Nat>,
  referredBy : Map.Map<Common.UserId, Common.UserId>,
  state : { var nextInvestmentId : Nat }
) {
  /// Get all investments for the calling user.
  public shared query ({ caller }) func getMyInvestments() : async [InvTypes.InvestmentPublic] {
    let filtered = investments.filter(func(inv) { Principal.equal(inv.userId, caller) });
    filtered.toArray().map<InvTypes.Investment, InvTypes.InvestmentPublic>(func(inv) { inv.toPublic() })
  };

  /// Trigger ROI accrual for all active investments.
  public shared ({ caller }) func accrueAllRoi() : async () {
    InvLib.accrueRoi(investments, Time.now());
  };

  /// Admin: create an investment record on behalf of user.
  public shared ({ caller }) func adminCreateInvestment(
    userId : Common.UserId,
    args : InvTypes.CreateInvestmentArgs
  ) : async InvTypes.InvestmentPublic {
    AdminLib.requireAdmin(admins, caller);
    if (not InvLib.isValidAmount(args.packageTier, args.amount)) {
      Runtime.trap("Invalid investment amount for selected package tier")
    };
    let id = state.nextInvestmentId;
    state.nextInvestmentId += 1;
    let inv = InvLib.new(id, userId, args.packageTier, args.amount, Time.now());
    investments.add(inv);
    inv.toPublic()
  };

  /// Admin: cancel an investment.
  public shared ({ caller }) func adminCancelInvestment(id : Common.InvestmentId) : async () {
    AdminLib.requireAdmin(admins, caller);
    investments.mapInPlace(func(inv) {
      if (inv.id == id and inv.status == #ACTIVE) {
        inv.status := #CANCELLED;
      };
      inv
    });
  };

  /// Admin: list all investments.
  public shared query ({ caller }) func adminListInvestments() : async [InvTypes.InvestmentPublic] {
    AdminLib.requireAdmin(admins, caller);
    investments.toArray().map<InvTypes.Investment, InvTypes.InvestmentPublic>(func(inv) { inv.toPublic() })
  };
};
