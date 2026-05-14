import Common "../types/common";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

module {
  // 10% commission
  public func calcCommission(investmentAmount : Nat) : Nat {
    investmentAmount / 10
  };

  // Returns all referred user IDs for a given referrer
  public func getReferrals(
    referredBy : Map.Map<Common.UserId, Common.UserId>,
    referrerId : Common.UserId
  ) : [Common.UserId] {
    // referredBy maps: refereeId -> referrerId
    // We want all keys where value == referrerId
    let iter = referredBy.entries().filter(
      func((_, refId)) { Principal.equal(refId, referrerId) }
    ).map(
      func((userId, _)) { userId }
    );
    iter.toArray()
  };

  // Total commission earned by a referrer
  public func totalCommission(
    commissions : Map.Map<Common.UserId, Nat>,
    referrerId : Common.UserId
  ) : Nat {
    switch (commissions.get(referrerId)) {
      case (?amount) { amount };
      case null { 0 };
    }
  };
};
