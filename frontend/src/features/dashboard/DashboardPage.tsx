import {
  FileX,
  Calendar,
  Clock,
  UserPlus,
  BarChart3,
  MoreHorizontal,
  Briefcase,
  Search,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Dashboard() {
  const { isDark, toggle } = useTheme();
  const userName = localStorage.getItem("userName") || "HR";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto py-4 sm:py-6">

      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between gap-2 mb-4 sm:mb-8 rounded-2xl p-3 sm:p-4"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        {/* Left: icon + title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--text-purple)" }} />
          </div>
          <h1 className="text-base sm:text-2xl font-bold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>
            Dashboard
          </h1>
        </div>

        {/* Right: search + bell + avatar + theme toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search bar — hidden on mobile */}
          <div className="relative hidden sm:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
            <input
              type="text"
              placeholder="Search candidates, jobs..."
              className="pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none"
              style={{ width: "260px", background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            />
          </div>

          {/* Bell */}
          <button title="Notifications" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", padding: "4px" }}>
            <Bell size={18} />
          </button>

          {/* Welcome + avatar — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Welcome, <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{userName}</span>
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "var(--text-purple)" }}
            >
              {avatarLetter}
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer" }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden rounded-2xl border mb-4 sm:mb-8 p-5 sm:p-10"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div className="absolute top-0 left-0 w-56 h-56 pointer-events-none" style={{ background: "rgba(124,58,237,0.25)", filter: "blur(100px)" }} />
        <div className="absolute bottom-0 right-0 w-56 h-56 pointer-events-none" style={{ background: "rgba(79,70,229,0.2)", filter: "blur(100px)" }} />
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Welcome back, <span style={{ color: "var(--text-purple)" }}>{userName}</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
            Here's an overview of your recruitment metrics.
          </p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
        {[
          { label: "Total Candidates", value: "352", change: "+15%", positive: true },
          { label: "Interviews Scheduled", value: "22", change: "-10%", positive: false },
          { label: "New Hires", value: "32", change: "+12%", positive: true },
          { label: "Acceptance Rate", value: "82%", change: "-11%", positive: false },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl p-4 sm:p-6 relative"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <div className="text-xs sm:text-sm mb-1 pr-10" style={{ color: "var(--text-secondary)" }}>{card.label}</div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{card.value}</div>
            <div className="absolute right-4 top-4 text-xs sm:text-sm font-semibold" style={{ color: card.positive ? "#10b981" : "#f87171" }}>
              {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
        {/* Total Applications Donut */}
        <div className="rounded-2xl p-4 sm:p-6 flex flex-col" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-base font-semibold mb-4 sm:mb-6" style={{ color: "var(--text-primary)" }}>Total Applications</div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-1">
            <div style={{ position: "relative", width: "160px", height: "160px", flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "conic-gradient(#a855f7 0deg 183deg, #10b981 183deg 271deg, #f59e0b 271deg 303deg, #3b82f6 303deg 360deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="rounded-full flex flex-col items-center justify-center" style={{ width: "116px", height: "116px", background: "var(--bg-primary)" }}>
                  <span className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>507</span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Total</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              {[
                { label: "Applications", value: 258, percent: "50.9%", color: "#a855f7" },
                { label: "Shortlisted", value: 124, percent: "24.5%", color: "#10b981" },
                { label: "On-hold", value: 45, percent: "8.9%", color: "#f59e0b" },
                { label: "Rejected", value: 80, percent: "15.7%", color: "#3b82f6" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Upcoming Interviews</div>
            <span className="text-xs font-medium cursor-pointer" style={{ color: "var(--text-purple)" }}>View all</span>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { name: "Arjun Mehta", role: "Frontend Developer", date: "15 May, 2026", time: "10:00 AM" },
              { name: "Priya Singh", role: "HR Executive", date: "15 May, 2026", time: "02:00 PM" },
              { name: "Rahul Verma", role: "Backend Developer", date: "17 May, 2026", time: "11:00 AM" },
              { name: "Sneha Kapoor", role: "UI/UX Designer", date: "17 May, 2026", time: "03:30 PM" },
            ].map((interview) => (
              <div key={interview.name} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
                    {interview.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{interview.name}</div>
                    <div className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>{interview.role}</div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs flex items-center gap-1 justify-end" style={{ color: "var(--text-purple)" }}>
                    <Calendar size={12} /> {interview.date.split(",")[0]}
                  </div>
                  <div className="text-xs flex items-center gap-1 justify-end mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    <Clock size={12} /> {interview.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
        {/* Recent Activity */}
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Recent Activity</div>
            <span className="text-xs font-medium cursor-pointer" style={{ color: "var(--text-purple)" }}>View all</span>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: <UserPlus size={16} />, text: "Aman Sharma was hired", time: "2m", color: "#10b981" },
              { icon: <Calendar size={16} />, text: "Interview with Priya Singh", time: "10m", color: "#a855f7" },
              { icon: <BarChart3 size={16} />, text: "Rahul moved to Technical", time: "20m", color: "#f59e0b" },
              { icon: <FileX size={16} />, text: "Mohit Patel was rejected", time: "30m", color: "#ef4444" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div style={{ width: "36px", height: "36px", borderRadius: "0.5rem", background: `${activity.color}20`, color: activity.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {activity.icon}
                  </div>
                  <span className="text-sm truncate" style={{ color: "var(--text-primary)" }}>{activity.text}</span>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--text-secondary)" }}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Progress Table */}
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-base font-semibold mb-4 sm:mb-6 flex justify-between items-center" style={{ color: "var(--text-primary)" }}>
            Recruitment progress
            <MoreHorizontal size={18} className="cursor-pointer" style={{ color: "var(--text-secondary)" }} />
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table style={{ width: "100%", minWidth: "420px", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr className="text-xs" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "0.625rem 0", fontWeight: 500 }}>Name</th>
                  <th style={{ padding: "0.625rem 0 0.625rem 1rem", fontWeight: 500 }}>Department</th>
                  <th style={{ padding: "0.625rem 0 0.625rem 1rem", fontWeight: 500 }}>Type</th>
                  <th style={{ padding: "0.625rem 0", fontWeight: 500, textAlign: "right" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Dan Sibley", dept: "DevOps", type: "Tech interview", status: "Pending", color: "#f59e0b" },
                  { name: "Joe Root", dept: "UX/UI Designer", type: "Resume review", status: "In Progress", color: "#7c3aed" },
                  { name: "Zak Crawley", dept: ".Net developer", type: "Final interview", status: "Completed", color: "#10b981" },
                ].map((row) => (
                  <tr key={row.name} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.875rem 0" }}>
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.name}</span>
                    </td>
                    <td style={{ padding: "0.875rem 0 0.875rem 1rem" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{row.dept}</span>
                    </td>
                    <td style={{ padding: "0.875rem 0 0.875rem 1rem" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{row.type}</span>
                    </td>
                    <td style={{ padding: "0.875rem 0", textAlign: "right" }}>
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "0.75rem", fontSize: "0.75rem", background: `${row.color}20`, color: row.color, fontWeight: 600, display: "inline-block", whiteSpace: "nowrap" }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
