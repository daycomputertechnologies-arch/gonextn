import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { AuthContext } from "@/hooks/useAuth";
import type { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy, useCallback } from "react";
import { useEffect, useState } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PackagesPage = lazy(() => import("@/pages/PackagesPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const InvestPage = lazy(() => import("@/pages/InvestPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

function RootLayout() {
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, principal, identity, isLoading, login, logout }}
    >
      <Layout
        isAuthenticated={isAuthenticated}
        onLogin={login}
        onLogout={logout}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </Layout>
    </AuthContext.Provider>
  );
}

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setIsAuthenticated(await client.isAuthenticated());
      setIsLoading(false);
    });
  }, []);

  const login = async () => {
    const client = await AuthClient.create();
    await client.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => setIsAuthenticated(true),
    });
  };

  return (
    <ProtectedRoute
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      onLogin={login}
    >
      {children}
    </ProtectedRoute>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <AboutPage />,
});

const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages",
  component: () => <PackagesPage />,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: () => <FaqPage />,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => <ContactPage />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedLayout>
      <DashboardPage />
    </ProtectedLayout>
  ),
});

const investRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invest",
  component: () => (
    <ProtectedLayout>
      <InvestPage />
    </ProtectedLayout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedLayout>
      <AdminPage />
    </ProtectedLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  packagesRoute,
  faqRoute,
  contactRoute,
  dashboardRoute,
  investRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
