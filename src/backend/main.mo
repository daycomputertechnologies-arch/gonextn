import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Common "types/common";
import UserTypes "types/users";
import InvTypes "types/investments";
import DepTypes "types/deposits";
import WalTypes "types/wallets";
import WdTypes "types/withdrawals";
import UsersApi "mixins/users-api";
import InvestmentsApi "mixins/investments-api";
import DepositsApi "mixins/deposits-api";
import WalletsApi "mixins/wallets-api";
import WithdrawalsApi "mixins/withdrawals-api";



actor {
  // ── Shared mutable counters ──
  let state = {
    var nextInvestmentId : Nat = 0;
    var nextDepositId    : Nat = 0;
    var nextWithdrawalId : Nat = 0;
    var nextWalletId     : Nat = 0;
  };

  // ── Core state ──
  let users               = Map.empty<Common.UserId, UserTypes.User>();
  let referralIndex       = Map.empty<Common.ReferralCode, Common.UserId>();
  let referredBy          = Map.empty<Common.UserId, Common.UserId>();
  let referralCommissions = Map.empty<Common.UserId, Nat>();
  let investments         = List.empty<InvTypes.Investment>();
  let deposits            = List.empty<DepTypes.Deposit>();
  let wallets             = List.empty<WalTypes.CryptoWallet>();
  let withdrawals         = List.empty<WdTypes.Withdrawal>();
  let admins              = Set.empty<Common.UserId>();

  // ── Mixin composition ──
  include UsersApi(users, referralIndex, referredBy, referralCommissions, investments, admins, state);
  include InvestmentsApi(investments, admins, referralCommissions, referredBy, state);
  include DepositsApi(deposits, wallets, users, admins, investments, referredBy, referralCommissions, state);
  include WalletsApi(wallets, admins, state);
  include WithdrawalsApi(withdrawals, users, admins, referralCommissions, investments, state);
};

