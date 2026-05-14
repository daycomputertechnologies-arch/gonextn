import { GoldButton } from "@/components/ui/GoldButton";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { NavyCard } from "@/components/ui/NavyCard";
import { Navigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  onLogin: () => void;
  children: React.ReactNode;
}

export function ProtectedRoute({
  isAuthenticated,
  isLoading,
  onLogin,
  children,
}: ProtectedRouteProps) {
  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <NavyCard
          className="max-w-sm w-full text-center py-12"
          data-ocid="protected.login_prompt"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            Authentication Required
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in with Internet Identity to access this section.
          </p>
          <GoldButton
            onClick={onLogin}
            size="lg"
            className="w-full"
            data-ocid="protected.login_button"
          >
            Sign In with Internet Identity
          </GoldButton>
        </NavyCard>
      </div>
    );
  }

  return <>{children}</>;
}
