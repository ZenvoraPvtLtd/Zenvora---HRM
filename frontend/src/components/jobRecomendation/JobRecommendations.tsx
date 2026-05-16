import { Briefcase, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { darkTheme, lightTheme } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";
import { AuthLayout } from "../../pages/auth/AuthLayout";
import Button from "../button/Button";
import { ASSETS } from "../../constants/assets";
import { JobSearch } from "./JobSearch";
import { JobApplicationForm } from "./JobApplicationForm";

const jobs = [
  {
    id: 1,
    title: "MERN Stack Developer",
    company: "Zenvora Tech",
    salary: "₹12LPA",
    location: "Bangalore, India",
    logo: ASSETS.ZENVORA_LOGO,
    type: "Full Time",
    level: "Mid Level",
    desc: "Build cutting-edge web applications from start to finish, utilizing your expertise in both front-end and back-end technologies.",
  },

  {
    id: 2,
    title: "AI/ML Engineer",
    company: "Zenvora Tech",
    salary: "₹18LPA",
    location: "Hyderabad, India",
    logo: ASSETS.ZENVORA_LOGO,
    type: "Full Time",
    level: "Senior",
    desc: "Design and implement machine learning models and AI pipelines to solve complex real-world problems at scale.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Zenvora Tech",
    salary: "₹10LPA",
    location: "Pune, India",
    logo: ASSETS.ZENVORA_LOGO,
    type: "Full Time",
    level: "Mid Level",
    desc: "Craft intuitive and visually stunning user interfaces that delight users and drive engagement across platforms.",
  },
  {
    id: 4,
    title: "Frontend React Developer",
    company: "Zenvora Tech",
    salary: "₹11LPA",
    location: "Chennai, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Mid Level",
    desc: "Build performant, accessible React applications with a keen eye for design and seamless user experiences.",
  },
  {
    id: 5,
    title: "Backend Node.js Engineer",
    company: "Zenvora Tech",
    salary: "₹14LPA",
    location: "Noida, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Senior",
    desc: "Architect and maintain robust server-side systems, APIs, and microservices powering high-traffic products.",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "Zenvora Tech",
    salary: "₹8LPA",
    location: "Mumbai, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Junior",
    desc: "Drive brand growth through data-driven campaigns, content strategy, and digital marketing initiatives.",
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Zenvora Tech",
    salary: "₹9LPA",
    location: "Delhi, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Mid Level",
    desc: "Lead talent acquisition, employee engagement, and HR operations to build a thriving workplace culture.",
  },
  {
    id: 8,
    title: "AI Research Intern",
    company: "Zenvora Tech",
    salary: "₹35K/month",
    location: "Remote, India",
    logo: "/logo.png",
    type: "Internship",
    level: "Entry",
    desc: "Explore cutting-edge AI research topics, assist with experiments, and contribute to published work.",
  },
  {
    id: 9,
    title: "Full Stack Intern",
    company: "Zenvora Tech",
    salary: "₹30K/month",
    location: "Remote, India",
    logo: "/logo.png",
    type: "Internship",
    level: "Entry",
    desc: "Gain hands-on experience building full-stack features alongside senior engineers in an agile environment.",
  },
  {
    id: 10,
    title: "DevOps Engineer",
    company: "Zenvora Tech",
    salary: "₹15LPA",
    location: "Gurgaon, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Senior",
    desc: "Streamline CI/CD pipelines, manage cloud infrastructure, and ensure platform reliability at scale.",
  },
  {
    id: 11,
    title: "Product Manager",
    company: "Zenvora Tech",
    salary: "₹20LPA",
    location: "Bangalore, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Senior",
    desc: "Own the product roadmap, collaborate with cross-functional teams, and ship features users love.",
  },
  {
    id: 12,
    title: "Graphic Designer",
    company: "Zenvora Tech",
    salary: "₹7LPA",
    location: "Ahmedabad, India",
    logo: "/logo.png",
    type: "Full Time",
    level: "Junior",
    desc: "Create compelling visual assets for digital and print media that communicate brand identity effectively.",
  },
];

export const JobRecommendations = () => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const [applyingForJobId, setApplyingForJobId] = useState<number | null>(null);

  const applicationJobs = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
  }));

  return (
    <AuthLayout fullWidth>
      <div
        className={`px-6 py-10 max-w-7xl mx-auto rounded-xl ${theme.page} ${theme.heading}`}
      >
        {applyingForJobId !== null ? (
          <JobApplicationForm
            jobId={applyingForJobId}
            jobs={applicationJobs}
            onCancel={() => setApplyingForJobId(null)}
          />
        ) : (
          <>
            <button
              type="button"
              onClick={() => navigate("/candidate")}
              className={`mb-6 flex items-center gap-2 text-sm font-semibold transition-colors ${theme.subtext} hover:text-purple-400`}
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <JobSearch />

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
                  <Briefcase className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h1
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${theme.heading}`}
                >
                  Job Recommendations
                </h1>
              </div>
            </div>

            {/* ── Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => {
                return (
                  <div
                    key={job.id}
                    className={`${theme.card} rounded-3xl p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_40px_rgba(124,58,237,0.08)] border border-purple-500/20`}
                  >
                    {/* Logo */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        Z
                      </div>
                    </div>

                    {/* Title */}
                    <h2
                      className={`text-lg font-bold leading-snug ${theme.heading}`}
                    >
                      {job.title}
                    </h2>

                    {/* Company */}
                    <p className={`text-sm ${theme.subtext}`}>{job.company}</p>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed line-clamp-3 ${theme.label}`}
                    >
                      {job.desc}
                    </p>

                    {/* Salary + Location */}
                    <div className="flex items-center justify-between pt-2">
                      <span
                        className={`text-sm font-semibold ${theme.heading}`}
                      >
                        {job.salary}
                      </span>
                      <span className={`text-xs ${theme.subtext}`}>
                        📍 {job.location}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border bg-purple-500/10 border-purple-500/20 text-purple-300`}
                      >
                        {job.type}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border bg-purple-500/10 border-purple-500/20 text-purple-300`}
                      >
                        {job.level}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-3 mt-auto">
                      {/* Details */}
                      <Button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className={`shadow-none! hover:scale-100! border from-transparent! to-transparent! ${!isDark ? "text-black!" : ""} border-purple-500/20 bg-purple-500/10`}
                      >
                        Details
                      </Button>

                      {/* Apply Now */}
                      <Button onClick={() => setApplyingForJobId(job.id)}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};
