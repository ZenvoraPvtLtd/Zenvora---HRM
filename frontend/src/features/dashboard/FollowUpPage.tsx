import { Search, Download, Check, X } from "lucide-react";
import { useState } from "react";

const mockData = [
  {
    id: "SCRUM-1",
    task: { title: "Follow up with John Doe", description: "Regarding frontend role offer", avatarColor: "#3b82f6" },
    date: "24 July, 10:00 AM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Email",
    status: "pending",
  },
  {
    id: "SCRUM-2",
    task: { title: "Send contract to Jane Smith", description: "Backend developer", avatarColor: "#f59e0b" },
    date: "22 August, 02:00 PM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Call",
    status: "completed",
  },
  {
    id: "SCRUM-3",
    task: { title: "Review portfolio of Alex", description: "UI/UX Designer", avatarColor: "#10b981" },
    date: "01 August, 11:30 AM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Review",
    status: "pending",
  },
];

export default function FollowUpPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = mockData.filter((r) => {
    const matchTab = activeTab === "all" || r.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q || r.task.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const tabStyle = (key: string) => ({
    borderBottomColor: activeTab === key ? "var(--text-purple)" : "transparent",
    color: activeTab === key ? "var(--text-purple)" : "var(--text-secondary)",
  });

  return (
    <div className="animate-fade-in px-2 sm:px-4">
      <h1
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Follow Up Tasks
      </h1>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        {/* Tabs */}
        <div
          className="flex overflow-x-auto gap-4 sm:gap-10 px-4 sm:px-8"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {[
            { key: "all", label: "All Tasks", count: mockData.length },
            { key: "pending", label: "Pending", count: mockData.filter((r) => r.status === "pending").length },
            { key: "completed", label: "Completed", count: mockData.filter((r) => r.status === "completed").length },
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="py-4 shrink-0 cursor-pointer text-sm font-medium border-b-2 flex items-center gap-2 transition-colors"
              style={tabStyle(tab.key)}
            >
              {tab.label}
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: activeTab === tab.key ? "rgba(168,85,247,0.1)" : "var(--bg-hover)",
                  color: activeTab === tab.key ? "var(--text-purple)" : "var(--text-secondary)",
                }}
              >
                {tab.count}
              </span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              background: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Export CSV <Download size={15} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-4 sm:px-8 pb-6">
          <table className="w-full text-left border-collapse" style={{ minWidth: "560px" }}>
            <thead>
              <tr
                className="text-xs font-semibold"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                <th className="py-3 px-2">ID</th>
                <th className="py-3 px-2">Task</th>
                <th className="py-3 px-2">Date & Time</th>
                <th className="py-3 px-2">Assignee</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, index) => (
                <tr
                  key={index}
                  className="text-sm transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="py-4 px-2" style={{ color: "var(--text-secondary)" }}>{row.id}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-semibold text-sm text-white"
                        style={{ background: row.task.avatarColor }}
                      >
                        {row.task.title.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>
                          {row.task.title}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {row.task.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-medium" style={{ color: "var(--text-primary)" }}>{row.date}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs"
                        style={{ background: row.assignee.avatarColor }}
                      >
                        {row.assignee.initials}
                      </div>
                      <span className="text-xs hidden sm:inline" style={{ color: "var(--text-secondary)" }}>
                        {row.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm" style={{ color: "var(--text-secondary)" }}>{row.type}</td>
                  <td className="py-4 px-2">
                    {row.status === "pending" && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                          style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "transparent", cursor: "pointer" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          Complete <Check size={13} />
                        </button>
                        <button
                          className="p-1.5 rounded-full transition-colors"
                          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "transparent", cursor: "pointer" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    {row.status === "completed" && (
                      <div className="flex items-center justify-center gap-1.5 text-xs font-medium" style={{ color: "#10b981" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Completed
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
