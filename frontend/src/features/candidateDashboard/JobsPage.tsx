import { Briefcase, ChevronLeft, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobApplicationForm } from "./JobApplicationForm";

const jobs = [
  { id: 1, title: "MERN Stack Developer", company: "Zenvora Tech", salary: "₹12LPA", location: "Bangalore, India", type: "Full Time", level: "Mid Level", desc: "Build cutting-edge web applications from start to finish, utilizing your expertise in both front-end and back-end technologies." },
  { id: 2, title: "AI/ML Engineer", company: "Zenvora Tech", salary: "₹18LPA", location: "Hyderabad, India", type: "Full Time", level: "Senior", desc: "Design and implement machine learning models and AI pipelines to solve complex real-world problems at scale." },
  { id: 3, title: "UI/UX Designer", company: "Zenvora Tech", salary: "₹10LPA", location: "Pune, India", type: "Full Time", level: "Mid Level", desc: "Craft intuitive and visually stunning user interfaces that delight users and drive engagement across platforms." },
  { id: 4, title: "Frontend React Developer", company: "Zenvora Tech", salary: "₹11LPA", location: "Chennai, India", type: "Full Time", level: "Mid Level", desc: "Build performant, accessible React applications with a keen eye for design and seamless user experiences." },
  { id: 5, title: "Backend Node.js Engineer", company: "Zenvora Tech", salary: "₹14LPA", location: "Noida, India", type: "Full Time", level: "Senior", desc: "Architect and maintain robust server-side systems, APIs, and microservices powering high-traffic products." },
  { id: 6, title: "Marketing Specialist", company: "Zenvora Tech", salary: "₹8LPA", location: "Mumbai, India", type: "Full Time", level: "Junior", desc: "Drive brand growth through data-driven campaigns, content strategy, and digital marketing initiatives." },
  { id: 7, title: "HR Manager", company: "Zenvora Tech", salary: "₹9LPA", location: "Delhi, India", type: "Full Time", level: "Mid Level", desc: "Lead talent acquisition, employee engagement, and HR operations to build a thriving workplace culture." },
  { id: 8, title: "AI Research Intern", company: "Zenvora Tech", salary: "₹35K/month", location: "Remote, India", type: "Internship", level: "Entry", desc: "Explore cutting-edge AI research topics, assist with experiments, and contribute to published work." },
  { id: 9, title: "Full Stack Intern", company: "Zenvora Tech", salary: "₹30K/month", location: "Remote, India", type: "Internship", level: "Entry", desc: "Gain hands-on experience building full-stack features alongside senior engineers in an agile environment." },
  { id: 10, title: "DevOps Engineer", company: "Zenvora Tech", salary: "₹15LPA", location: "Gurgaon, India", type: "Full Time", level: "Senior", desc: "Streamline CI/CD pipelines, manage cloud infrastructure, and ensure platform reliability at scale." },
  { id: 11, title: "Product Manager", company: "Zenvora Tech", salary: "₹20LPA", location: "Bangalore, India", type: "Full Time", level: "Senior", desc: "Own the product roadmap, collaborate with cross-functional teams, and ship features users love." },
  { id: 12, title: "Graphic Designer", company: "Zenvora Tech", salary: "₹7LPA", location: "Ahmedabad, India", type: "Full Time", level: "Junior", desc: "Create compelling visual assets for digital and print media that communicate brand identity effectively." },
];

export const JobsPage = () => {
  const navigate = useNavigate();
  const [applyingForJobId, setApplyingForJobId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const applicationJobs = jobs.map((j) => ({ id: j.id, title: j.title, company: j.company, location: j.location }));
  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    return !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.type.toLowerCase().includes(q);
  });

  if (applyingForJobId !== null) {
    return (
      <JobApplicationForm
        jobId={applyingForJobId}
        jobs={applicationJobs}
        onCancel={() => setApplyingForJobId(null)}
      />
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
      {/* Header bar */}
      <div
        className="flex items-center justify-between gap-3 mb-6 rounded-2xl p-3 sm:p-4"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--text-purple)" }} />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Job Recommendations
          </h1>
        </div>
        <button
          onClick={() => navigate("/candidatedashboard")}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}
        >
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
        <input
          type="text"
          placeholder="Search jobs by title, location, type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
      </div>

      {/* Job count */}
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        Showing <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong> jobs
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            {/* Logo */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}>
              Z
            </div>

            {/* Title + company */}
            <div>
              <h2 className="text-base font-bold leading-snug mb-1" style={{ color: "var(--text-primary)" }}>{job.title}</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{job.company}</p>
            </div>

            {/* Desc */}
            <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>{job.desc}</p>

            {/* Salary + Location */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{job.salary}</span>
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <MapPin size={12} /> {job.location}
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {[job.type, job.level].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", color: "var(--text-purple)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => navigate(`/candidatedashboard/jobs/${job.id}`)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{ border: "1px solid var(--border)", background: "var(--bg-hover)", color: "var(--text-primary)", cursor: "pointer" }}
              >
                Details
              </button>
              <button
                onClick={() => setApplyingForJobId(job.id)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(to right, #a855f7, #3b82f6)", border: "none", cursor: "pointer" }}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
