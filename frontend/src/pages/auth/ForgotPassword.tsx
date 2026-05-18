import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/button/Button";
import AuthLayout from "./AuthLayout";
import API_BASE_URL from "../../config/apiConfig";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      setApiSuccess(null);
      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
          email: values.email,
        });
        setApiSuccess(response.data.message || "Password reset email sent successfully!");
      } catch (error: any) {
        setApiError(error?.response?.data?.message || "Failed to send reset email. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout>
      {/* Back to Login */}
      <div className="mb-6">
        <Link
          to="/login"
          className={`inline-flex items-center gap-2 text-sm font-medium ${theme.link} hover:underline`}
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold mb-2 ${theme.heading}`}>
          Forgot Password? 🔒
        </h2>
        <p className={theme.subtext}>
          No worries! Enter your email and we'll send you a reset link.
        </p>
      </div>

      {/* Success Message */}
      {apiSuccess && (
        <div className="mb-6 rounded-xl px-4 py-3 text-sm bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-2">
          <CheckCircle size={16} />
          {apiSuccess}
        </div>
      )}

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* API error */}
        {apiError && (
          <div className="rounded-xl px-4 py-3 text-sm bg-red-500/10 border border-red-500/30 text-red-400">
            {apiError}
          </div>
        )}

        {/* Submit */}
        <Button type="submit" loading={formik.isSubmitting} loadingText="Sending...">
          Send Reset Link
        </Button>
      </form>

      {/* Footer */}
      <p className={`text-center mt-6 text-sm ${theme.footerText}`}>
        Remember your password?{" "}
        <Link to="/login" className={`font-semibold ${theme.signupLink}`}>
          Sign in here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;