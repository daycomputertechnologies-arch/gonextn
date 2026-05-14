import Common "common";

module {
  public type CryptoWallet = {
    id : Common.WalletId;
    cryptoName : Text;
    symbol : Text;
    network : Text;
    walletAddress : Text;
    iconUrl : Text;
    var isActive : Bool;
  };

  public type CryptoWalletPublic = {
    id : Common.WalletId;
    cryptoName : Text;
    symbol : Text;
    network : Text;
    walletAddress : Text;
    iconUrl : Text;
    isActive : Bool;
  };

  public type UpsertWalletArgs = {
    cryptoName : Text;
    symbol : Text;
    network : Text;
    walletAddress : Text;
    iconUrl : Text;
    isActive : Bool;
  };
};
