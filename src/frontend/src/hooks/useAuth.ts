import type { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type React from "react";

interface AuthState {
  isAuthenticated: boolean;
  principal: string | null;
  identity: Identity | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  principal: null,
  identity: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const authed = await client.isAuthenticated();
      if (authed) {
        const id = client.getIdentity();
        setIdentity(id);
        setPrincipal(id.getPrincipal().toText());
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async () => {
    if (!authClient) return;
    setIsLoading(true);
    await authClient.login({
      identityProvider:
        process.env.NODE_ENV === "development"
          ? `http://localhost:4943/?canisterId=${import.meta.env.VITE_INTERNET_IDENTITY_CANISTER_ID}`
          : "https://identity.ic0.app",
      onSuccess: () => {
        const id = authClient.getIdentity();
        setIdentity(id);
        setPrincipal(id.getPrincipal().toText());
        setIsAuthenticated(true);
        setIsLoading(false);
      },
      onError: () => setIsLoading(false),
    });
  }, [authClient]);

  const logout = useCallback(async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
    setIdentity(null);
  }, [authClient]);

  const value: AuthState = {
    isAuthenticated,
    principal,
    identity,
    isLoading,
    login,
    logout,
  };

  return {
    type: AuthContext.Provider,
    props: { value, children },
  } as unknown as ReturnType<typeof AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };
