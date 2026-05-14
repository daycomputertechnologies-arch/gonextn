import type {
  DepositStatus,
  InvestmentStatus,
  PackageTier,
  Rank,
  WithdrawalStatus,
} from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";

export type {
  DepositStatus,
  InvestmentStatus,
  PackageTier,
  Rank,
  WithdrawalStatus,
};

export type UserId = Principal;
export type WalletId = bigint;
export type InvestmentId = bigint;
export type DepositId = bigint;
export type WithdrawalId = bigint;
export type ReferralCode = string;
export type Timestamp = bigint;

export interface UserPublic {
  id: UserId;
  referralCode: ReferralCode;
  username: string;
  email: string;
  referredBy?: UserId;
  registeredAt: Timestamp;
}

export interface DashboardData {
  referralCode: ReferralCode;
  totalInvested: bigint;
  rank: Rank;
  referralEarnings: bigint;
  accumulatedBalance: bigint;
  dailyRoiRate: bigint;
}

export interface InvestmentPublic {
  id: InvestmentId;
  status: InvestmentStatus;
  packageTier: PackageTier;
  maturityDate: Timestamp;
  userId: UserId;
  lastRoiAccrual: Timestamp;
  accumulatedBalance: bigint;
  amount: bigint;
  startDate: Timestamp;
}

export interface DepositPublic {
  id: DepositId;
  status: DepositStatus;
  packageTier: PackageTier;
  userId: UserId;
  confirmedAt?: Timestamp;
  submittedAt: Timestamp;
  walletAddress: string;
  adminNote?: string;
  amount: bigint;
  walletId: WalletId;
}

export interface CryptoWallet {
  id: WalletId;
  cryptoName: string;
  network: string;
  walletAddress: string;
  isActive: boolean;
  iconUrl: string;
  symbol: string;
}

export interface WithdrawalPublic {
  id: WithdrawalId;
  status: WithdrawalStatus;
  userId: UserId;
  destinationAddress: string;
  processedAt?: Timestamp;
  adminNote?: string;
  amount: bigint;
  requestedAt: Timestamp;
}

export interface UpsertWalletArgs {
  cryptoName: string;
  network: string;
  walletAddress: string;
  isActive: boolean;
  iconUrl: string;
  symbol: string;
}
