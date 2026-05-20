import { createActor } from "@/backend";
import type {
  RequestWithdrawalArgs,
  UpsertWalletArgs,
  WalletId,
} from "@/backend";
import type {
  CryptoWallet,
  DashboardData,
  DepositPublic,
  InvestmentPublic,
  UserPublic,
  WithdrawalPublic,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBackend() {
  return useActor(createActor);
}

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserPublic | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile() as Promise<UserPublic | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDashboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardData | null>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboard() as Promise<DashboardData>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyInvestments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<InvestmentPublic[]>({
    queryKey: ["myInvestments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInvestments() as Promise<InvestmentPublic[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyDeposits() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DepositPublic[]>({
    queryKey: ["myDeposits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyDeposits() as Promise<DepositPublic[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyWithdrawals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WithdrawalPublic[]>({
    queryKey: ["myWithdrawals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWithdrawals() as Promise<WithdrawalPublic[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useActiveWallets() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CryptoWallet[]>({
    queryKey: ["activeWallets"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listActiveWallets() as Promise<CryptoWallet[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminWallets() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CryptoWallet[]>({
    queryKey: ["adminWallets"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListAllWallets() as Promise<CryptoWallet[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserPublic[]>({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListUsers() as Promise<UserPublic[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminDeposits() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DepositPublic[]>({
    queryKey: ["adminDeposits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListDeposits() as Promise<DepositPublic[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminWithdrawals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WithdrawalPublic[]>({
    queryKey: ["adminWithdrawals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListWithdrawals() as Promise<WithdrawalPublic[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRequestWithdrawal() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: RequestWithdrawalArgs) => {
      if (!actor) throw new Error("Not connected");
      return actor.requestWithdrawal(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myWithdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useClaimAdmin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (principalText: string) => {
      if (!actor) throw new Error("Not connected");
      // Convert text principal to Principal type
      const principal = Principal.fromText(principalText);
      return actor.adminAddAdmin(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}

export function useUpsertWallet() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      args,
    }: { id?: WalletId; args: UpsertWalletArgs }) => {
      if (!actor) throw new Error("Not connected");
      if (id !== undefined) {
        return actor.adminUpdateWallet(id, args);
      }
      return actor.adminAddWallet(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWallets"] });
      queryClient.invalidateQueries({ queryKey: ["activeWallets"] });
    },
  });
}

export function useDeleteWallet() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: WalletId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteWallet(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWallets"] });
      queryClient.invalidateQueries({ queryKey: ["activeWallets"] });
    },
  });
}

export function useSubmitDeposit() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      packageTier: string;
      amount: bigint;
      walletId: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitDeposit(
        args as Parameters<typeof actor.submitDeposit>[0],
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDeposits"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
