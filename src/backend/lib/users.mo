import Common "../types/common";
import Types "../types/users";
import Text "mo:core/Text";

module {
  public func new(
    id : Common.UserId,
    username : Text,
    email : Text,
    referralCode : Common.ReferralCode,
    referredBy : ?Common.UserId,
    now : Common.Timestamp
  ) : Types.User {
    {
      id;
      var username;
      var email;
      referralCode;
      referredBy;
      registeredAt = now;
    }
  };

  public func toPublic(self : Types.User) : Types.UserPublic {
    {
      id = self.id;
      username = self.username;
      email = self.email;
      referralCode = self.referralCode;
      referredBy = self.referredBy;
      registeredAt = self.registeredAt;
    }
  };

  // Derive a short alphanumeric referral code from the principal text
  public func generateReferralCode(id : Common.UserId) : Common.ReferralCode {
    let raw = id.toText();
    // Take last 8 chars of the principal text, strip hyphens
    let stripped = raw.replace(#text "-", "");
    let len = stripped.size();
    if (len <= 8) { stripped } else {
      let start : Int = len - 8;
      let chars = stripped.toArray();
      var code = "";
      var i = start;
      while (i < len) {
        code := code # Text.fromChar(chars[i.toNat()]);
        i += 1;
      };
      code
    }
  };

  // Rank thresholds in cents (USD * 100)
  public func getRankThreshold(rank : Types.Rank) : Nat {
    switch (rank) {
      case (#NEXUS)       { 0 };
      case (#TRAILBLAZER) { 100_000 };       // $1,000
      case (#ARBITRAGEUR) { 500_000 };       // $5,000
      case (#LUMINARY)    { 1_000_000 };     // $10,000
      case (#PIONEER)     { 2_500_000 };     // $25,000
      case (#APEX)        { 5_000_000 };     // $50,000
      case (#CATALYST)    { 10_000_000 };    // $100,000
      case (#VISIONARY)   { 25_000_000 };    // $250,000
      case (#STRATEGIST)  { 50_000_000 };    // $500,000
      case (#GAME_CHANGER){ 100_000_000 };   // $1,000,000
      case (#INFLUENCER)  { 250_000_000 };   // $2,500,000
      case (#TITAN)       { 500_000_000 };   // $5,000,000
    }
  };

  public func getRank(totalInvested : Nat) : Types.Rank {
    if      (totalInvested >= 500_000_000) { #TITAN }
    else if (totalInvested >= 250_000_000) { #INFLUENCER }
    else if (totalInvested >= 100_000_000) { #GAME_CHANGER }
    else if (totalInvested >=  50_000_000) { #STRATEGIST }
    else if (totalInvested >=  25_000_000) { #VISIONARY }
    else if (totalInvested >=  10_000_000) { #CATALYST }
    else if (totalInvested >=   5_000_000) { #APEX }
    else if (totalInvested >=   2_500_000) { #PIONEER }
    else if (totalInvested >=   1_000_000) { #LUMINARY }
    else if (totalInvested >=     500_000) { #ARBITRAGEUR }
    else if (totalInvested >=     100_000) { #TRAILBLAZER }
    else                                   { #NEXUS }
  };
};
