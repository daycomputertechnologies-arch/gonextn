import Common "../types/common";
import WalTypes "../types/wallets";
import WalLib "../lib/wallets";
import AdminLib "../lib/admin";
import List "mo:core/List";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

mixin (
  wallets : List.List<WalTypes.CryptoWallet>,
  admins : Set.Set<Common.UserId>,
  state : { var nextWalletId : Nat }
) {
  /// List all active crypto wallets (public).
  public query func listActiveWallets() : async [WalTypes.CryptoWalletPublic] {
    let active = wallets.filter(func(w) { w.isActive });
    active.toArray().map<WalTypes.CryptoWallet, WalTypes.CryptoWalletPublic>(func(w) { w.toPublic() })
  };

  /// Admin: list all wallets including inactive.
  public shared query ({ caller }) func adminListAllWallets() : async [WalTypes.CryptoWalletPublic] {
    AdminLib.requireAdmin(admins, caller);
    wallets.toArray().map<WalTypes.CryptoWallet, WalTypes.CryptoWalletPublic>(func(w) { w.toPublic() })
  };

  /// Admin: add a new crypto wallet.
  public shared ({ caller }) func adminAddWallet(args : WalTypes.UpsertWalletArgs) : async WalTypes.CryptoWalletPublic {
    AdminLib.requireAdmin(admins, caller);
    let id = state.nextWalletId;
    state.nextWalletId += 1;
    let wallet = WalLib.new(id, args);
    wallets.add(wallet);
    wallet.toPublic()
  };

  /// Admin: update an existing wallet.
  public shared ({ caller }) func adminUpdateWallet(id : Common.WalletId, args : WalTypes.UpsertWalletArgs) : async () {
    AdminLib.requireAdmin(admins, caller);
    switch (wallets.find(func(w) { w.id == id })) {
      case (?wallet) {
        wallet.isActive := args.isActive;
        // Rebuild full wallet fields in place via mapInPlace
        wallets.mapInPlace(func(w) {
          if (w.id == id) {
            {
              id = w.id;
              cryptoName = args.cryptoName;
              symbol = args.symbol;
              network = args.network;
              walletAddress = args.walletAddress;
              iconUrl = args.iconUrl;
              var isActive = args.isActive;
            }
          } else { w }
        });
      };
      case null { Runtime.trap("Wallet not found") };
    };
  };

  /// Admin: soft-delete (deactivate) a wallet.
  public shared ({ caller }) func adminDeleteWallet(id : Common.WalletId) : async () {
    AdminLib.requireAdmin(admins, caller);
    let found = wallets.find(func(w) { w.id == id });
    switch (found) {
      case (?w) { w.isActive := false };
      case null { Runtime.trap("Wallet not found") };
    };
  };
};
