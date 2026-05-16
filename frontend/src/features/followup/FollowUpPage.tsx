import { Search, Download, Check, X, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

const mockData = [
  {
    id: "SCRUM-1",
    task: { title: "Follow up with John Doe", description: "Regarding frontend role offer", avatarColor: "#3b82f6" },
    date: "24 July, 10:00 AM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Email",
    status: "pending"
  },
  {
    id: "SCRUM-2",
    task: { title: "Send contract to Jane Smith", description: "Backend developer", avatarColor: "#f59e0b" },
    date: "22 August, 02:00 PM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Call",
    status: "completed"
  },
  {
    id: "SCRUM-3",
    task: { title: "Review portfolio of Alex", description: "UI/UX Designer", avatarColor: "#10b981" },
    date: "01 August, 11:30 AM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Review",
    status: "pending"
  },
  {
    id: "SCRUM-4",
    task: { title: "Schedule onboarding for Mark", description: "DevOps Engineer", avatarColor: "#8b5cf6" },
    date: "15 August, 09:00 AM",
    assignee: { name: "Sarah Jenkins", initials: "SJ", avatarColor: "#ef4444" },
    type: "Onboarding",
    status: "pending"
  }
];

export default function FollowUpPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="animate-fade-in px-2 sm:px-4">
      <h1 className="page-title text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Follow Up Tasks</h1>

      <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-4 sm:gap-10 border-b border-white/10 px-4 sm:px-8">
          <div 
            onClick={() => setActiveTab('all')}
            className={`py-4 flex-shrink-0 cursor-pointer text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'all' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            All Tasks <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'all' ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-gray-400'}`}>15</span>
          </div>
          <div 
            onClick={() => setActiveTab('pending')}
            className={`py-4 flex-shrink-0 cursor-pointer text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'pending' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Pending
          </div>
          <div 
            onClick={() => setActiveTab('completed')}
            className={`py-4 flex-shrink-0 cursor-pointer text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'completed' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Completed
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-[320px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>
          
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/5 transition-colors">
            Export CSV <Download size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-4 sm:px-8 pb-6">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-xs font-semibold">
                <th className="py-3 px-2">ID</th>
                <th className="py-3 px-2">Task</th>
                <th className="py-3 px-2">Date & Time</th>
                <th className="py-3 px-2">Assignee</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/2 transition-colors text-sm">
                  <td className="py-4 px-2 text-gray-400">{row.id}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm" style={{ background: row.task.avatarColor }}>
                        {row.task.title.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white mb-0.5">{row.task.title}</div>
                        <div className="text-xs text-gray-400">{row.task.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-white font-medium">{row.date}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xs" style={{ background: row.assignee.avatarColor }}>
                        {row.assignee.initials}
                      </div>
                      <span className="text-gray-300 text-xs hidden sm:inline">{row.assignee.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-gray-400">{row.type}</td>
                  <td className="py-4 px-2">
                    {row.status === 'pending' && (
                      <div className="flex items-center justify-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-full text-white text-xs font-medium hover:bg-white/5 transition-colors">
                          Complete <Check size={14} />
                        </button>
                        <button className="p-1.5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {row.status === 'completed' && (
                      <div className="flex items-center justify-center gap-1.5 text-green-500 text-xs font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Completed
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
