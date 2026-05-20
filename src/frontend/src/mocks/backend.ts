import type { backendInterface } from "../backend";
import {
  DepositStatus,
  InvestmentStatus,
  PackageTier,
  Rank,
  WithdrawalStatus,
} from "../backend";

const mockUserId = { toText: () => "sample-principal-id" } as any;

const mockUser = {
  id: mockUserId,
  referralCode: "GONEXT2024",
  username: "john_trader",
  email: "john@example.com",
  registeredAt: BigInt(Date.now()),
};

const mockWallet = {
  id: BigInt(1),
  cryptoName: "Bitcoin",
  network: "Bitcoin Mainnet",
  walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  isActive: true,
  iconUrl: "",
  symbol: "BTC",
};

const mockWallet2 = {
  id: BigInt(2),
  cryptoName: "Ethereum",
  network: "Ethereum Mainnet",
  walletAddress: "0x742d35Cc6634C0532925a3b8D4C9B7E69C3f1234",
  isActive: true,
  iconUrl: "",
  symbol: "ETH",
};

const mockInvestment = {
  id: BigInt(1),
  status: InvestmentStatus.ACTIVE,
  packageTier: PackageTier.ADVANCED,
  maturityDate: BigInt(Date.now() + 90 * 24 * 60 * 60 * 1000),
  userId: mockUserId,
  lastRoiAccrual: BigInt(Date.now()),
  accumulatedBalance: BigInt(5250),
  amount: BigInt(5000),
  startDate: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000),
};

const mockDeposit = {
  id: BigInt(1),
  status: DepositStatus.CONFIRMED,
  packageTier: PackageTier.ADVANCED,
  userId: mockUserId,
  confirmedAt: BigInt(Date.now() - 25 * 24 * 60 * 60 * 1000),
  submittedAt: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000),
  walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  amount: BigInt(5000),
  walletId: BigInt(1),
};

const mockWithdrawal = {
  id: BigInt(1),
  status: WithdrawalStatus.PENDING,
  userId: mockUserId,
  destinationAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  requestedAt: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000),
  amount: BigInt(500),
};

export const mockBackend: backendInterface = {
  accrueAllRoi: async () => undefined,
  adminAddAdmin: async () => undefined,
  adminAddWallet: async () => mockWallet,
  adminApproveWithdrawal: async () => undefined,
  adminCancelInvestment: async () => undefined,
  adminConfirmDeposit: async () => undefined,
  adminCreateInvestment: async () => mockInvestment,
  adminDeleteWallet: async () => undefined,
  adminListAdmins: async () => [mockUserId],
  adminListAllWallets: async () => [mockWallet, mockWallet2],
  adminListDeposits: async () => [mockDeposit],
  adminListInvestments: async () => [mockInvestment],
  adminListUsers: async () => [mockUser],
  adminListWithdrawals: async () => [mockWithdrawal],
  adminRejectDeposit: async () => undefined,
  adminRejectWithdrawal: async () => undefined,
  adminRemoveAdmin: async () => undefined,
  adminUpdateWallet: async () => undefined,
  getDashboard: async () => ({
    referralCode: "GONEXT2024",
    totalInvested: BigInt(5000),
    rank: Rank.STRATEGIST,
    referralEarnings: BigInt(250),
    accumulatedBalance: BigInt(5250),
    dailyRoiRate: BigInt(150),
  }),
  getMyDeposits: async () => [mockDeposit],
  getMyInvestments: async () => [mockInvestment],
  getMyProfile: async () => mockUser,
  getMyWithdrawals: async () => [mockWithdrawal],
  isAdmin: async () => true,
  listActiveWallets: async () => [mockWallet, mockWallet2],
  register: async () => true,
  requestWithdrawal: async () => mockWithdrawal,
  submitDeposit: async () => mockDeposit,
  getMyPrincipal: async () => "aaaaa-aa",
};
