import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  Cloud,
  Headphones,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface RegisterFormInputs {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

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
  const { theme, isDark, toggle } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: { role: "" },
  });

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setLoading(true);
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
        password: data.password,
      };
      const response = await axios.post("/api/auth/register", payload);
      console.log(response.data);
      alert("Registration Successful");
      reset();
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.page} relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-300`}
    >
      {/* Background blurs */}
      <div
        className={`absolute top-0 left-0 w-72 h-72 ${theme.blur1} blur-[120px] transition-colors duration-300`}
      />
      <div
        className={`absolute bottom-0 right-0 w-72 h-72 ${theme.blur2} blur-[120px] transition-colors duration-300`}
      />

      <div className="w-full max-w-xl relative z-10">
        {/* Card */}
        <div
          className={`backdrop-blur-xl ${theme.card} border rounded-3xl shadow-2xl p-8 transition-colors duration-300`}
        >
          {/* Logo + Theme Toggle */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  Z
                </div>
                <span
                  className={`font-bold text-lg tracking-wide ${theme.logo}`}
                >
                  ZENVORA
                </span>
              </div>
              <p className={`text-xs ${theme.tagline}`}>
                Innovate. Integrate. Elevate.
              </p>
            </div>

            <button
              type="button"
              onClick={toggle}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${theme.toggleBtn}`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className={`text-4xl font-bold mb-2 ${theme.heading}`}>
              Create Account
            </h2>
            <p className={theme.subtext}>Join Zenvora and start your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.fullName.message}
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
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
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className={`text-sm mb-2 block ${theme.label}`}>
                Role
              </label>
              <div className="relative">
                <select
                  {...register("role", { required: "Please select a role" })}
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
              {errors.role && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.role.message}
                </p>
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    onChange: (e) => setPasswordValue(e.targetheme.value),
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

              {/* Password Strength */}
              {passwordValue && (
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
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === passwordValue || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${theme.eyeBtn}`}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  {...register("agreeTerms", {
                    required: "You must agree to the terms",
                  })}
                  type="checkbox"
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
              {errors.agreeTerms && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Creating Accountheme..."
              ) : (
                <>
                  Create Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
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
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            {
              icon: <ShieldCheck size={20} />,
              title: "Secure & Safe",
              desc: "Your data is 100% secure with us",
            },
            {
              icon: <Zap size={20} />,
              title: "Lightning Fast",
              desc: "Experience ultra fast performance",
            },
            {
              icon: <Cloud size={20} />,
              title: "Cloud Sync",
              desc: "Access your data anywhere",
            },
            {
              icon: <Headphones size={20} />,
              title: "24/7 Support",
              desc: "We're here to help anytime",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className={`${theme.featureCard} border rounded-2xl p-4 hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className="text-purple-500 mb-2">{icon}</div>
              <h3 className={`font-semibold text-sm ${theme.featureTitle}`}>
                {title}
              </h3>
              <p className={`text-xs ${theme.featureDesc}`}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-6 text-xs ${theme.bottomBar}`}
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-purple-500" /> 256-bit SSL
            Encryption
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-purple-500" /> GDPR Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <Cloud size={12} className="text-purple-500" /> Regular Backups
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-purple-500"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Trusted by 10,000+ Users
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
