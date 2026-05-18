import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  UserCircle,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navSections = [
  {
    label: "MAIN",
    items: [
      { to: "/candidatedashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard", exact: true },
      { to: "/candidatedashboard/jobs", icon: <Briefcase size={18} />, label: "Jobs" },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  userName?: string;
  userEmail?: string;
  isLoggedIn?: boolean;
  onLogout: () => void;
  onNavClick?: () => void;
}

const CandidateSidebar = ({
  isCollapsed,
  setIsCollapsed,
  userName,
  userEmail,
  isLoggedIn,
  onLogout,
  onNavClick,
}: SidebarProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { isDark, toggle } = useTheme();
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : "G";

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: isCollapsed ? "center" : "flex-start",
    gap: isCollapsed ? "0" : "0.625rem",
    padding: isCollapsed ? "0.75rem 0.5rem" : "0.65rem 0.75rem",
    borderRadius: "0.5rem",
    marginBottom: "0.25rem",
    textDecoration: "none",
    fontSize: "0.9375rem",
    fontWeight: isActive ? 700 : 500,
    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
    background: isActive ? "var(--bg-hover)" : "transparent",
    transition: "all 0.15s ease",
  });

  return (
    <aside
      style={{
        width: "100%",
        height: "100%",
        background: "var(--bg-secondary)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo + collapse toggle */}
      <div
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          padding: isCollapsed ? "0" : "0 1.25rem",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}
      >
        {!isCollapsed ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: "2rem", height: "2rem",
                  background: "var(--logo-bg)",
                  borderRadius: "0.5rem", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "var(--logo-text)", fontWeight: 700,
                  fontSize: "0.875rem", flexShrink: 0,
                }}
              >
                Z
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", color: "var(--text-primary)" }}>
                ZENVORA
              </span>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              title="Collapse sidebar"
              style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", padding: "0.5rem", borderRadius: "0.5rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <PanelLeftClose size={20} />
            </button>
          </>
        ) : (
          isLogoHovered ? (
            <button
              onClick={() => setIsCollapsed(false)}
              title="Expand sidebar"
              style={{ background: "var(--bg-hover)", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", padding: "0.5rem", borderRadius: "0.5rem" }}
            >
              <PanelLeftOpen size={20} />
            </button>
          ) : (
            <div
              style={{
                width: "2rem", height: "2rem",
                background: "var(--logo-bg)",
                borderRadius: "0.5rem", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--logo-text)", fontWeight: 700, fontSize: "0.875rem",
              }}
            >
              Z
            </div>
          )
        )}
      </div>

      {/* Mobile: user profile strip */}
      {isLoggedIn && (
        <div className="mobile-only" style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div
              style={{
                width: "38px", height: "38px", borderRadius: "50%",
                background: "var(--icon-accent-bg)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0,
              }}
            >
              {avatarLetter}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</div>
            </div>
          </div>
          <button
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "0.625rem",
              padding: "0.5rem 0.75rem", background: "var(--bg-hover)", border: "none",
              borderRadius: "0.5rem", color: "var(--text-secondary)", fontSize: "0.875rem", cursor: "pointer",
            }}
          >
            <Bell size={16} /> Notifications
          </button>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem" }}>
        {navSections.map((section) => (
          <div key={section.label} style={{ marginBottom: "1rem" }}>
            {!isCollapsed ? (
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)", padding: "0 0.5rem", marginBottom: "0.5rem", opacity: 0.7 }}>
                {section.label}
              </p>
            ) : (
              <div style={{ height: "1px", background: "var(--border)", margin: "0.75rem 0.25rem", opacity: 0.5 }} />
            )}

            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={onNavClick}
                style={navLinkStyle}
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <span style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)", flexShrink: 0, display: "flex" }}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom: theme toggle + profile + logout */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <button
          onClick={toggle}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            display: "flex", alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: isCollapsed ? "0" : "0.625rem",
            padding: isCollapsed ? "0.75rem 0.5rem" : "0.625rem 0.75rem",
            borderRadius: "0.5rem", width: "100%",
            background: "transparent", border: "none",
            fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-secondary)", cursor: "pointer", marginBottom: "0.25rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ flexShrink: 0, display: "flex" }}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</span>
          {!isCollapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <NavLink
          to="/candidatedashboard/profile"
          onClick={onNavClick}
          style={navLinkStyle}
          title={isCollapsed ? "Profile" : undefined}
        >
          {({ isActive }) => (
            <>
              <span style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)", flexShrink: 0, display: "flex" }}>
                <UserCircle size={18} />
              </span>
              {!isCollapsed && <span>Profile</span>}
            </>
          )}
        </NavLink>

        <button
          onClick={onLogout}
          title={isCollapsed ? "Logout" : undefined}
          style={{
            display: "flex", alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: isCollapsed ? "0" : "0.625rem",
            padding: isCollapsed ? "0.75rem 0.5rem" : "0.625rem 0.75rem",
            borderRadius: "0.5rem", width: "100%",
            background: "transparent", border: "none",
            fontSize: "0.9375rem", fontWeight: 500, color: "#ef4444", cursor: "pointer", marginTop: "0.25rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ flexShrink: 0, display: "flex" }}><LogOut size={18} /></span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

const CandidateLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "candidate@zenvora.com");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Candidate");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem("userName") || "Candidate");
      setUserEmail(localStorage.getItem("userEmail") || "candidate@zenvora.com");
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="app-container">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay active" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <CandidateSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          userName={userName}
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNavClick={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main content */}
      <div
        className="main-wrapper"
        style={{
          marginLeft: isSidebarCollapsed ? "72px" : "240px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          minWidth: 0,
        }}
      >
        {/* Mobile top bar */}
        <div
          className="mobile-topbar"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "1.75rem", height: "1.75rem",
                background: "var(--logo-bg)",
                borderRadius: "0.375rem", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--logo-text)", fontWeight: 700, fontSize: "0.75rem",
              }}
            >
              Z
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", color: "var(--text-primary)" }}>
              ZENVORA
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "var(--bg-hover)", border: "1px solid var(--border)",
              borderRadius: "0.5rem", color: "var(--text-primary)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px",
            }}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
