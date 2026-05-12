import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Mail, Lock, User, Phone, Eye, EyeOff,
  ShieldCheck, Zap, Cloud, Headphones, ChevronDown, Sun, Moon,
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
    return { label: "", color: "", segments: ["bg-white/10", "bg-white/10", "bg-white/10"] };
  if (password.length < 6)
    return { label: "Weak", color: "text-red-400", segments: ["bg-red-500", "bg-white/10", "bg-white/10"] };
  if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
    return { label: "Medium", color: "text-yellow-400", segments: ["bg-yellow-400", "bg-yellow-400", "bg-white/10"] };
  return { label: "Strong", color: "text-green-400", segments: ["bg-green-500", "bg-green-500", "bg-green-500"] };
}

const Register = () => {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormInputs>({
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

  // Theme tokens
  const t = {
    page:        isDark ? "bg-[#070B34]"                        : "bg-slate-100",
    blur1:       isDark ? "bg-purple-600/30"                    : "bg-purple-300/40",
    blur2:       isDark ? "bg-blue-600/30"                      : "bg-blue-300/40",
    card:        isDark ? "bg-white/5 border-white/10"          : "bg-white border-slate-200 shadow-xl",
    logo:        isDark ? "text-white"                          : "text-slate-800",
    tagline:     isDark ? "text-gray-400"                       : "text-slate-500",
    toggleBtn:   isDark ? "bg-white/5 border-white/10 text-gray-400 hover:text-white" : "bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-800",
    heading:     isDark ? "text-white"                          : "text-slate-800",
    subtext:     isDark ? "text-gray-400"                       : "text-slate-500",
    label:       isDark ? "text-gray-300"                       : "text-slate-600",
    input:       isDark ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-slate-50 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-purple-500",
    inputIcon:   isDark ? "text-gray-400"                       : "text-slate-400",
    eyeBtn:      isDark ? "text-gray-400 hover:text-white"      : "text-slate-400 hover:text-slate-700",
    select:      isDark ? "bg-[#0B102F] border-white/10 text-white focus:border-purple-500" : "bg-slate-50 border-slate-300 text-slate-800 focus:border-purple-500",
    selectOption:isDark ? "bg-[#0B102F]"                        : "bg-white",
    strengthBg:  isDark ? "bg-white/10"                         : "bg-slate-200",
    termsText:   isDark ? "text-gray-300"                       : "text-slate-600",
    footerText:  isDark ? "text-gray-400"                       : "text-slate-500",
    featureCard: isDark ? "bg-white/5 border-white/10 backdrop-blur-lg" : "bg-white border-slate-200 shadow-sm",
    featureTitle:isDark ? "text-white"                          : "text-slate-700",
    featureDesc: isDark ? "text-gray-400"                       : "text-slate-500",
    bottomBar:   isDark ? "text-gray-500"                       : "text-slate-400",
  };

  return (
    <div className={`min-h-screen ${t.page} relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-300`}>
      {/* Background blurs */}
      <div className={`absolute top-0 left-0 w-72 h-72 ${t.blur1} blur-[120px] transition-colors duration-300`} />
      <div className={`absolute bottom-0 right-0 w-72 h-72 ${t.blur2} blur-[120px] transition-colors duration-300`} />

      <div className="w-full max-w-xl relative z-10">
        {/* Card */}
        <div className={`backdrop-blur-xl ${t.card} border rounded-3xl shadow-2xl p-8 transition-colors duration-300`}>

          {/* Logo + Theme Toggle */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  Z
                </div>
                <span className={`font-bold text-lg tracking-wide ${t.logo}`}>ZENVORA</span>
              </div>
              <p className={`text-xs ${t.tagline}`}>Innovate. Integrate. Elevate.</p>
            </div>

            <button
              type="button"
              onClick={toggle}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${t.toggleBtn}`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className={`text-4xl font-bold mb-2 ${t.heading}`}>Create Account</h2>
            <p className={t.subtext}>Join Zenvora and start your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Full Name</label>
              <div className="relative">
                <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("fullName", { required: "Full name is required" })}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${t.input}`}
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Email Address</label>
              <div className="relative">
                <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${t.input}`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Phone Number</label>
              <div className="relative">
                <Phone size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${t.input}`}
                />
              </div>
              {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Role */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Role</label>
              <div className="relative">
                <select
                  {...register("role", { required: "Please select a role" })}
                  className={`w-full appearance-none border rounded-xl px-4 py-3 outline-none transition-all cursor-pointer ${t.select}`}
                  style={{ colorScheme: isDark ? "dark" : "light" }}
                >
                  <option value="" disabled className={t.selectOption}>Select your role</option>
                  <option value="hr" className={t.selectOption}>HR</option>
                  <option value="employee" className={t.selectOption}>Employee</option>
                  <option value="admin" className={t.selectOption}>Admin</option>
                  <option value="candidate" className={t.selectOption}>Candidate</option>
                </select>
                <ChevronDown size={18} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${t.inputIcon}`} />
              </div>
              {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Password</label>
              <div className="relative">
                <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    onChange: (e) => setPasswordValue(e.target.value),
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${t.input}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${t.eyeBtn}`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}

              {/* Password Strength */}
              {passwordValue && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${t.label}`}>Password strength:</span>
                    <span className={`text-xs font-medium ${strength.color}`}>{strength.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {strength.segments.map((seg, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          seg === "bg-white/10" ? t.strengthBg : seg
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Confirm Password</label>
              <div className="relative">
                <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => val === passwordValue || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${t.input}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${t.eyeBtn}`}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  {...register("agreeTerms", { required: "You must agree to the terms" })}
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded accent-purple-500 shrink-0"
                />
                <span className={`text-sm ${t.termsText}`}>
                  I agree to the{" "}
                  <span className="text-purple-500 hover:text-purple-400 cursor-pointer">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-purple-500 hover:text-purple-400 cursor-pointer">Privacy Policy</span>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-400 text-xs mt-1">{errors.agreeTerms.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : (
                <>
                  Create Account
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className={`text-center mt-6 text-sm ${t.footerText}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 hover:text-purple-400 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: <ShieldCheck size={20} />, title: "Secure & Safe",  desc: "Your data is 100% secure with us" },
            { icon: <Zap size={20} />,         title: "Lightning Fast", desc: "Experience ultra fast performance" },
            { icon: <Cloud size={20} />,        title: "Cloud Sync",    desc: "Access your data anywhere" },
            { icon: <Headphones size={20} />,   title: "24/7 Support",  desc: "We're here to help anytime" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={`${t.featureCard} border rounded-2xl p-4 hover:-translate-y-0.5 transition-all duration-300`}>
              <div className="text-purple-500 mb-2">{icon}</div>
              <h3 className={`font-semibold text-sm ${t.featureTitle}`}>{title}</h3>
              <p className={`text-xs ${t.featureDesc}`}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-wrap items-center justify-center gap-6 mt-6 text-xs ${t.bottomBar}`}>
          <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-purple-500" /> 256-bit SSL Encryption</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-purple-500" /> GDPR Compliant</span>
          <span className="flex items-center gap-1.5"><Cloud size={12} className="text-purple-500" /> Regular Backups</span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Trusted by 10,000+ Users
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
