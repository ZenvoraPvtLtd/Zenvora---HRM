import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import AuthLayout from "./AuthLayout";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Check if we have tokens in URL params (for direct redirect)
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (accessToken && refreshToken) {
          // Store tokens and redirect
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/dashboard");
          return;
        }

        // If no tokens in URL, check if user is authenticated via API
        const response = await axios.get("/api/auth/me");
        if (response.data.success) {
          navigate("/dashboard");
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error: any) {
        console.error("OAuth callback error:", error);
        setError(error?.response?.data?.message || "Authentication failed. Please try again.");
        setLoading(false);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 size={32} className="text-purple-500 animate-spin" />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme.heading}`}>
              Completing Sign In...
            </h2>
            <p className={theme.subtext}>
              Please wait while we finish setting up your account
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} className="text-red-500" />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme.heading}`}>
              Authentication Failed
            </h2>
            <p className={theme.subtext}>
              {error}
            </p>
            <p className={`text-sm mt-4 ${theme.subtext}`}>
              Redirecting to login page...
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return null;
};

export default OAuthCallback;