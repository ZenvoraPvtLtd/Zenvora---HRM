import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/button/Button";
import AuthLayout from "./AuthLayout";

function getPasswordStrength(password: string): {
  label: string;
  color: string;
  segments: [string, string, string];
} {
  if (!password)
    return {
      label: "",
      color: "",
      segments: ["bg-white/10", "bg-white/10", "bg-white/10"],
    };
  if (password.length < 6)
    return {
      label: "Weak",
      color: "text-red-400",
      segments: ["bg-red-500", "bg-white/10", "bg-white/10"],
    };
  if (
    password.length < 10 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  )
    return {
      label: "Medium",
      color: "text-yellow-400",
      segments: ["bg-yellow-400", "bg-yellow-400", "bg-white/10"],
    };
  return {
    label: "Strong",
    color: "text-green-400",
    segments: ["bg-green-500", "bg-green-500", "bg-green-500"],
  };
}

const Register = () => {
  const navigate = useNavigate();
  const { theme, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      role: Yup.string().required("Please select a role"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
      agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setApiError(null);
      setApiSuccess(null);
      try {
        const payload = {
          name: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          role: values.role,
          password: values.password,
        };
        await axios.post("/api/auth/register", payload);
        setApiSuccess("Account created successfully! Redirecting to login...");
        resetForm();
        setTimeout(() => navigate("/login"), 1500);
      } catch (error: any) {
        setApiError(error?.response?.data?.message || "Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const strength = getPasswordStrength(formik.values.password);

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold mb-2 ${theme.heading}`}>
          Create Account
        </h2>
        <p className={theme.subtext}>Join Zenvora and start your journey</p>
      </div>


      {/* Social Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`}
          className="bg-white text-black rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-sm cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign up with Google
        </button>

        <button
          type="button"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/microsoft`}
          className="bg-white text-black rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-sm cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
            <path fill="#F25022" d="M1 1h10v10H1z" />
            <path fill="#7FBA00" d="M13 1h10v10H13z" />
            <path fill="#00A4EF" d="M1 13h10v10H1z" />
            <path fill="#FFB900" d="M13 13h10v10H13z" />
          </svg>
          Sign up with Microsoft
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`flex-1 h-px ${theme.dividerLine}`} />
        <span className={`text-sm ${theme.dividerText}`}>OR</span>
        <div className={`flex-1 h-px ${theme.dividerLine}`} />
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Full Name
          </label>
          <div className="relative">
            <User
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.fullName}
            </p>
          )}
        </div>

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

        {/* Phone */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+91 98765 43210"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>Role</label>
          <div className="relative">
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full appearance-none border rounded-xl px-4 py-3 outline-none transition-all cursor-pointer ${theme.select}`}
              style={{ colorScheme: isDark ? "dark" : "light" }}
            >
              <option value="" disabled className={theme.selectOption}>
                Select your role
              </option>
              <option value="hr" className={theme.selectOption}>
                HR
              </option>
              <option value="employee" className={theme.selectOption}>
                Employee
              </option>
              <option value="admin" className={theme.selectOption}>
                Admin
              </option>
              <option value="candidate" className={theme.selectOption}>
                Candidate
              </option>
            </select>
            <ChevronDown
              size={18}
              className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme.inputIcon}`}
            />
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.role}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Password
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
              placeholder="Create a strong password"
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
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}

          {/* Password Strength */}
          {formik.values.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs ${theme.label}`}>
                  Password strength:
                </span>
                <span className={`text-xs font-medium ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {strength.segments.map((seg, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      seg === "bg-white/10" ? theme.strengthBg : seg
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Confirm Password
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
              placeholder="Confirm your password"
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
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formik.values.agreeTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-0.5 w-4 h-4 rounded accent-purple-500 shrink-0"
            />
            <span className={`text-sm ${theme.termsText}`}>
              I agree to the{" "}
              <span className="text-purple-500 hover:text-purple-400 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-purple-500 hover:text-purple-400 cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>
          {formik.touched.agreeTerms && formik.errors.agreeTerms && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.agreeTerms}
            </p>
          )}
        </div>

        {/* API feedback */}
        {apiError && (
          <div className="rounded-xl px-4 py-3 text-sm bg-red-500/10 border border-red-500/30 text-red-400">
            {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="rounded-xl px-4 py-3 text-sm bg-green-500/10 border border-green-500/30 text-green-400">
            {apiSuccess}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          loading={formik.isSubmitting}
          loadingText="Creating Account..."
        >
          Create Account
        </Button>
      </form>

      {/* Footer */}
      <p className={`text-center mt-6 text-sm ${theme.footerText}`}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-purple-500 hover:text-purple-400 font-semibold"
        >
          Sign in here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
