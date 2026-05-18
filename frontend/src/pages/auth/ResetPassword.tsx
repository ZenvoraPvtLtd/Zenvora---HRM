import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "./components/Button";
import AuthLayout from "./AuthLayout";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    // Validate token on component mount
    if (!token) {
      setIsValidToken(false);
      setApiError("Invalid reset token");
    } else {
      setIsValidToken(true);
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      setApiSuccess(null);
      try {
        const response = await axios.put(`/api/auth/reset-password/${token}`, {
          password: values.password,
        });
        setApiSuccess(response.data.message || "Password reset successfully!");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error: any) {
        setApiError(error?.response?.data?.message || "Failed to reset password. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isValidToken === false) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mb-6">
            <h2 className={`text-4xl font-bold mb-2 ${theme.heading}`}>
              Invalid Reset Link
            </h2>
            <p className={theme.subtext}>
              This password reset link is invalid or has expired.
            </p>
          </div>
          <Button onClick={() => navigate("/forgot-password")}>
            Request New Reset Link
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {/* Back to Login */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/login")}
          className={`inline-flex items-center gap-2 text-sm font-medium ${theme.link} hover:underline`}
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold mb-2 ${theme.heading}`}>
          Reset Your Password 🔑
        </h2>
        <p className={theme.subtext}>
          Enter your new password below.
        </p>
      </div>

      {/* Success Message */}
      {apiSuccess && (
        <div className="mb-6 rounded-xl px-4 py-3 text-sm bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-2">
          <CheckCircle size={16} />
          {apiSuccess}
          <span className="ml-auto text-xs">Redirecting to login...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Password */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            New Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${theme.eyeBtn}`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Confirm New Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${theme.eyeBtn}`}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* API error */}
        {apiError && (
          <div className="rounded-xl px-4 py-3 text-sm bg-red-500/10 border border-red-500/30 text-red-400">
            {apiError}
          </div>
        )}

        {/* Submit */}
        <Button type="submit" loading={formik.isSubmitting} loadingText="Resetting...">
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;