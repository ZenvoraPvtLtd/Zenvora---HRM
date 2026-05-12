import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Zap, Cloud, Headphones, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const { isDark, toggle } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
  };

  // Theme tokens
  const t = {
    page:        isDark ? "bg-[#070B34]"                          : "bg-slate-100",
    blur1:       isDark ? "bg-purple-600/30"                      : "bg-purple-300/40",
    blur2:       isDark ? "bg-blue-600/30"                        : "bg-blue-300/40",
    card:        isDark ? "bg-white/5 border-white/10"            : "bg-white border-slate-200 shadow-xl",
    logo:        isDark ? "text-white"                            : "text-slate-800",
    tagline:     isDark ? "text-gray-400"                         : "text-slate-500",
    toggleBtn:   isDark ? "bg-white/5 border-white/10 text-gray-400 hover:text-white" : "bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-800",
    heading:     isDark ? "text-white"                            : "text-slate-800",
    subtext:     isDark ? "text-gray-400"                         : "text-slate-500",
    label:       isDark ? "text-gray-300"                         : "text-slate-600",
    input:       isDark ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-slate-50 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-purple-500",
    inputIcon:   isDark ? "text-gray-400"                         : "text-slate-400",
    eyeBtn:      isDark ? "text-gray-400 hover:text-white"        : "text-slate-400 hover:text-slate-700",
    dividerLine: isDark ? "bg-white/10"                           : "bg-slate-200",
    dividerText: isDark ? "text-gray-400"                         : "text-slate-400",
    checkLabel:  isDark ? "text-gray-300"                         : "text-slate-600",
    forgotLink:  "text-purple-500 hover:text-purple-400",
    badge:       isDark ? "text-gray-400"                         : "text-slate-500",
    footerText:  isDark ? "text-gray-400"                         : "text-slate-500",
    signupLink:  "text-purple-500 hover:text-purple-400",
    featureCard: isDark ? "bg-white/5 border-white/10 backdrop-blur-lg" : "bg-white border-slate-200 shadow-sm",
    featureTitle:isDark ? "text-white"                            : "text-slate-700",
    featureDesc: isDark ? "text-gray-400"                         : "text-slate-500",
    bottomBar:   isDark ? "text-gray-500"                         : "text-slate-400",
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
            <h2 className={`text-4xl font-bold mb-2 ${t.heading}`}>Welcome Back! 👋</h2>
            <p className={t.subtext}>Login to continue to your account</p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="bg-white text-black rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>

            <button
              type="button"
              className="bg-white text-black rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#7FBA00" d="M13 1h10v10H13z" />
                <path fill="#00A4EF" d="M1 13h10v10H1z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
              Sign in with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex-1 h-px ${t.dividerLine}`} />
            <span className={`text-sm ${t.dividerText}`}>OR</span>
            <div className={`flex-1 h-px ${t.dividerLine}`} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className={`text-sm mb-2 block ${t.label}`}>Email Address</label>
              <div className="relative">
                <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${t.input}`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-sm ${t.label}`}>Password</label>
                <Link to="/forgot-password" className={`text-sm font-medium ${t.forgotLink}`}>Forgot?</Link>
              </div>
              <div className="relative">
                <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.inputIcon}`} />
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register("rememberMe")} type="checkbox" className="w-4 h-4 rounded accent-purple-500" />
                <span className={`text-sm ${t.checkLabel}`}>Remember me</span>
              </label>
              <Link to="/forgot-password" className={`text-sm font-medium ${t.forgotLink}`}>Forgot Password?</Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {/* Security Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {["Secure Login", "Privacy Protected", "Data Encrypted"].map((label) => (
              <div key={label} className={`flex items-center gap-1.5 text-xs ${t.badge}`}>
                <ShieldCheck size={14} className="text-green-500" />
                {label}
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className={`text-center mt-6 text-sm ${t.footerText}`}>
            Don't have an account?{" "}
            <Link to="/register" className={`font-semibold ${t.signupLink}`}>Sign up here</Link>
          </p>

          {/* Shield Illustration */}
          <div className="flex justify-center mt-8">
            <svg viewBox="0 0 120 120" className="w-32 h-32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="60" rx="55" ry="20" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
              <ellipse cx="60" cy="60" rx="55" ry="20" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" transform="rotate(60 60 60)" />
              <ellipse cx="60" cy="60" rx="55" ry="20" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" transform="rotate(120 60 60)" />
              <path d="M60 18 L88 30 L88 58 C88 76 74 90 60 96 C46 90 32 76 32 58 L32 30 Z" fill="url(#shieldGrad)" opacity="0.9" />
              <rect x="50" y="56" width="20" height="15" rx="2" fill="white" opacity="0.9" />
              <path d="M54 56 L54 51 C54 47.5 66 47.5 66 51 L66 56" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="60" cy="63" r="2" fill="#6366f1" />
              <circle cx="15" cy="60" r="3" fill="#818cf8" opacity="0.8" />
              <circle cx="105" cy="45" r="2.5" fill="#60a5fa" opacity="0.8" />
              <circle cx="80" cy="102" r="2.5" fill="#818cf8" opacity="0.8" />
              <defs>
                <linearGradient id="shieldGrad" x1="32" y1="18" x2="88" y2="96" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: <ShieldCheck size={20} />, title: "Secure & Safe",   desc: "Your data is 100% secure with us" },
            { icon: <Zap size={20} />,         title: "Lightning Fast",  desc: "Experience ultra fast performance" },
            { icon: <Cloud size={20} />,        title: "Cloud Sync",     desc: "Access your data anywhere" },
            { icon: <Headphones size={20} />,   title: "24/7 Support",   desc: "We're here to help anytime" },
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

export default Login;
