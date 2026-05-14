import Common "../types/common";
import UserTypes "../types/users";
import InvTypes "../types/investments";
import UserLib "../lib/users";
import AdminLib "../lib/admin";
import ReferralLib "../lib/referrals";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import InvLib "../lib/investments";
import Principal "mo:core/Principal";

mixin (
  users : Map.Map<Common.UserId, UserTypes.User>,
  referralIndex : Map.Map<Common.ReferralCode, Common.UserId>,
  referredBy : Map.Map<Common.UserId, Common.UserId>,
  referralCommissions : Map.Map<Common.UserId, Nat>,
  investments : List.List<InvTypes.Investment>,
  admins : Set.Set<Common.UserId>,
  state : { var nextInvestmentId : Nat; var nextDepositId : Nat; var nextWithdrawalId : Nat; var nextWalletId : Nat }
) {
  /// Register a new user. Returns false if already registered.
  public shared ({ caller }) func register(args : UserTypes.RegisterArgs) : async Bool {
    if (users.containsKey(caller)) { return false };
    // Resolve referrer from optional referral code
    let refBy : ?Common.UserId = switch (args.referralCode) {
      case (?code) { referralIndex.get(code) };
      case null    { null };
    };
    let code = UserLib.generateReferralCode(caller);
    let user = UserLib.new(caller, args.username, args.email, code, refBy, Time.now());
    users.add(caller, user);
    referralIndex.add(code, caller);
    switch (refBy) {
      case (?referrerId) { referredBy.add(caller, referrerId) };
      case null {};
    };
    true
  };

  /// Get the calling user's own profile.
  public shared query ({ caller }) func getMyProfile() : async ?UserTypes.UserPublic {
    switch (users.get(caller)) {
      case (?u) { ?u.toPublic() };
      case null  { null };
    }
  };

  /// Dashboard summary.
  public shared query ({ caller }) func getDashboard() : async {
    totalInvested : Nat;
    accumulatedBalance : Nat;
    dailyRoiRate : Nat;
    referralEarnings : Nat;
    rank : UserTypes.Rank;
    referralCode : Common.ReferralCode;
  } {
    let user = switch (users.get(caller)) {
      case (?u) { u };
      case null  { Runtime.trap("Not registered") };
    };
    // Sum active investments for this user
    var totalInvested : Nat = 0;
    var accumulatedBalance : Nat = 0;
    var dailyRoiRate : Nat = 0;
    investments.forEach(func(inv) {
      if (Principal.equal(inv.userId, caller) and inv.status == #ACTIVE) {
        totalInvested += inv.amount;
        accumulatedBalance += inv.accumulatedBalance;
        // Use highest tier rate as representative
        let cfg = InvLib.getPackageConfig(inv.packageTier);
        if (cfg.dailyRatePerMille > dailyRoiRate) {
          dailyRoiRate := cfg.dailyRatePerMille;
        };
      };
    });
    let referralEarnings = ReferralLib.totalCommission(referralCommissions, caller);
    let rank = UserLib.getRank(totalInvested);
    {
      totalInvested;
      accumulatedBalance;
      dailyRoiRate;
      referralEarnings;
      rank;
      referralCode = user.referralCode;
    }
  };

  /// Admin: list all users.
  public shared query ({ caller }) func adminListUsers() : async [UserTypes.UserPublic] {
    AdminLib.requireAdmin(admins, caller);
    users.values().map<UserTypes.User, UserTypes.UserPublic>(func(u) { u.toPublic() }).toArray()
  };

  /// Admin: add an admin principal. First caller becomes admin if none exist.
  public shared ({ caller }) func adminAddAdmin(newAdmin : Common.UserId) : async () {
    if (admins.isEmpty()) {
      // Bootstrap: first caller becomes admin and can add others
      admins.add(caller);
    };
    AdminLib.requireAdmin(admins, caller);
    admins.add(newAdmin);
  };

  /// Admin: remove an admin principal.
  public shared ({ caller }) func adminRemoveAdmin(target : Common.UserId) : async () {
    AdminLib.requireAdmin(admins, caller);
    admins.remove(target);
  };

  /// Query whether a principal is an admin.
  public shared query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(admins, caller)
  };

  /// Admin: list current admins.
  public shared query ({ caller }) func adminListAdmins() : async [Common.UserId] {
    AdminLib.requireAdmin(admins, caller);
    admins.toArray()
  };
};
