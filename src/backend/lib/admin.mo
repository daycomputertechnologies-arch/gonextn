import Common "../types/common";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";

module {
  public func isAdmin(admins : Set.Set<Common.UserId>, caller : Common.UserId) : Bool {
    admins.contains(caller)
  };

  public func requireAdmin(admins : Set.Set<Common.UserId>, caller : Common.UserId) {
    if (not admins.contains(caller)) {
      Runtime.trap("Unauthorized: caller is not an admin")
    };
  };
};
