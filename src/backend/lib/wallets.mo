import Common "../types/common";
import Types "../types/wallets";

module {
  public func new(
    id : Common.WalletId,
    args : Types.UpsertWalletArgs
  ) : Types.CryptoWallet {
    {
      id;
      cryptoName = args.cryptoName;
      symbol = args.symbol;
      network = args.network;
      walletAddress = args.walletAddress;
      iconUrl = args.iconUrl;
      var isActive = args.isActive;
    }
  };

  public func toPublic(self : Types.CryptoWallet) : Types.CryptoWalletPublic {
    {
      id = self.id;
      cryptoName = self.cryptoName;
      symbol = self.symbol;
      network = self.network;
      walletAddress = self.walletAddress;
      iconUrl = self.iconUrl;
      isActive = self.isActive;
    }
  };

  public func update(self : Types.CryptoWallet, args : Types.UpsertWalletArgs) {
    self.isActive := args.isActive;
  };
};
