import Common "common";

module {
  public type User = {
    id : Common.UserId;
    var username : Text;
    var email : Text;
    referralCode : Common.ReferralCode;
    referredBy : ?Common.UserId;
    registeredAt : Common.Timestamp;
  };

  public type UserPublic = {
    id : Common.UserId;
    username : Text;
    email : Text;
    referralCode : Common.ReferralCode;
    referredBy : ?Common.UserId;
    registeredAt : Common.Timestamp;
  };

  public type RegisterArgs = {
    username : Text;
    email : Text;
    referralCode : ?Common.ReferralCode;
  };

  public type Rank = {
    #NEXUS;
    #TRAILBLAZER;
    #ARBITRAGEUR;
    #LUMINARY;
    #PIONEER;
    #APEX;
    #CATALYST;
    #VISIONARY;
    #STRATEGIST;
    #GAME_CHANGER;
    #INFLUENCER;
    #TITAN;
  };
};
