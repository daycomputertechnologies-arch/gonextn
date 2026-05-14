import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RequestWithdrawalArgs {
    destinationAddress: string;
    amount: bigint;
}
export type Timestamp = bigint;
export type InvestmentId = bigint;
export interface UserPublic {
    id: UserId;
    referralCode: ReferralCode;
    username: string;
    email: string;
    referredBy?: UserId;
    registeredAt: Timestamp;
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
export interface RegisterArgs {
    referralCode?: ReferralCode;
    username: string;
    email: string;
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
export type WithdrawalId = bigint;
export interface CreateInvestmentArgs {
    packageTier: PackageTier;
    amount: bigint;
}
export type UserId = Principal;
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
export interface SubmitDepositArgs {
    packageTier: PackageTier;
    amount: bigint;
    walletId: WalletId;
}
export interface CryptoWalletPublic {
    id: WalletId;
    cryptoName: string;
    network: string;
    walletAddress: string;
    isActive: boolean;
    iconUrl: string;
    symbol: string;
}
export type WalletId = bigint;
export type ReferralCode = string;
export type DepositId = bigint;
export enum DepositStatus {
    REJECTED = "REJECTED",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED"
}
export enum InvestmentStatus {
    MATURED = "MATURED",
    CANCELLED = "CANCELLED",
    ACTIVE = "ACTIVE"
}
export enum PackageTier {
    GENESIS = "GENESIS",
    VELOCITY = "VELOCITY",
    MOMENTUM = "MOMENTUM"
}
export enum Rank {
    INFLUENCER = "INFLUENCER",
    ARBITRAGEUR = "ARBITRAGEUR",
    NEXUS = "NEXUS",
    APEX = "APEX",
    GAME_CHANGER = "GAME_CHANGER",
    TRAILBLAZER = "TRAILBLAZER",
    VISIONARY = "VISIONARY",
    TITAN = "TITAN",
    CATALYST = "CATALYST",
    LUMINARY = "LUMINARY",
    PIONEER = "PIONEER",
    STRATEGIST = "STRATEGIST"
}
export enum WithdrawalStatus {
    REJECTED = "REJECTED",
    PENDING = "PENDING",
    APPROVED = "APPROVED"
}
export interface backendInterface {
    accrueAllRoi(): Promise<void>;
    adminAddAdmin(newAdmin: UserId): Promise<void>;
    adminAddWallet(args: UpsertWalletArgs): Promise<CryptoWalletPublic>;
    adminApproveWithdrawal(id: WithdrawalId, note: string | null): Promise<void>;
    adminCancelInvestment(id: InvestmentId): Promise<void>;
    adminConfirmDeposit(id: DepositId, note: string | null): Promise<void>;
    adminCreateInvestment(userId: UserId, args: CreateInvestmentArgs): Promise<InvestmentPublic>;
    adminDeleteWallet(id: WalletId): Promise<void>;
    adminListAdmins(): Promise<Array<UserId>>;
    adminListAllWallets(): Promise<Array<CryptoWalletPublic>>;
    adminListDeposits(): Promise<Array<DepositPublic>>;
    adminListInvestments(): Promise<Array<InvestmentPublic>>;
    adminListUsers(): Promise<Array<UserPublic>>;
    adminListWithdrawals(): Promise<Array<WithdrawalPublic>>;
    adminRejectDeposit(id: DepositId, note: string | null): Promise<void>;
    adminRejectWithdrawal(id: WithdrawalId, note: string | null): Promise<void>;
    adminRemoveAdmin(target: UserId): Promise<void>;
    adminUpdateWallet(id: WalletId, args: UpsertWalletArgs): Promise<void>;
    getDashboard(): Promise<{
        referralCode: ReferralCode;
        totalInvested: bigint;
        rank: Rank;
        referralEarnings: bigint;
        accumulatedBalance: bigint;
        dailyRoiRate: bigint;
    }>;
    getMyDeposits(): Promise<Array<DepositPublic>>;
    getMyInvestments(): Promise<Array<InvestmentPublic>>;
    getMyProfile(): Promise<UserPublic | null>;
    getMyWithdrawals(): Promise<Array<WithdrawalPublic>>;
    isAdmin(): Promise<boolean>;
    listActiveWallets(): Promise<Array<CryptoWalletPublic>>;
    register(args: RegisterArgs): Promise<boolean>;
    requestWithdrawal(args: RequestWithdrawalArgs): Promise<WithdrawalPublic>;
    submitDeposit(args: SubmitDepositArgs): Promise<DepositPublic>;
}
