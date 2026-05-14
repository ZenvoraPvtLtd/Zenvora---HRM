import { darkTheme, lightTheme } from '../../styles/theme';
import { useTheme } from '../../context/ThemeContext';
import AuthLayout from '../../pages/auth/AuthLayout';
import Button from '../button/Button';

const jobs = [
  { id: 1,  
    title: "MERN Stack Developer",   
     company: "Zenvora Tech",
      salary: "₹12LPA",    
       location: "Bangalore, India", 
       logo: "/logo.png", 
       type: "Full Time",  
       level: "Mid Level", 
       desc: "Build cutting-edge web applications from start to finish, utilizing your expertise in both front-end and back-end technologies." },

  { id: 2,  title: "AI/ML Engineer",           company: "Zenvora Tech", salary: "₹18LPA",     location: "Hyderabad, India", logo: "/logo.png", type: "Full Time",  level: "Senior",    desc: "Design and implement machine learning models and AI pipelines to solve complex real-world problems at scale." },
  { id: 3,  title: "UI/UX Designer",           company: "Zenvora Tech", salary: "₹10LPA",     location: "Pune, India",      logo: "/logo.png", type: "Full Time",  level: "Mid Level", desc: "Craft intuitive and visually stunning user interfaces that delight users and drive engagement across platforms." },
  { id: 4,  title: "Frontend React Developer", company: "Zenvora Tech", salary: "₹11LPA",     location: "Chennai, India",   logo: "/logo.png", type: "Full Time",  level: "Mid Level", desc: "Build performant, accessible React applications with a keen eye for design and seamless user experiences." },
  { id: 5,  title: "Backend Node.js Engineer", company: "Zenvora Tech", salary: "₹14LPA",     location: "Noida, India",     logo: "/logo.png", type: "Full Time",  level: "Senior",    desc: "Architect and maintain robust server-side systems, APIs, and microservices powering high-traffic products." },
  { id: 6,  title: "Marketing Specialist",     company: "Zenvora Tech", salary: "₹8LPA",      location: "Mumbai, India",    logo: "/logo.png", type: "Full Time",  level: "Junior",    desc: "Drive brand growth through data-driven campaigns, content strategy, and digital marketing initiatives." },
  { id: 7,  title: "HR Manager",               company: "Zenvora Tech", salary: "₹9LPA",      location: "Delhi, India",     logo: "/logo.png", type: "Full Time",  level: "Mid Level", desc: "Lead talent acquisition, employee engagement, and HR operations to build a thriving workplace culture." },
  { id: 8,  title: "AI Research Intern",        company: "Zenvora Tech", salary: "₹35K/month", location: "Remote, India",    logo: "/logo.png", type: "Internship", level: "Entry",     desc: "Explore cutting-edge AI research topics, assist with experiments, and contribute to published work." },
  { id: 9,  title: "Full Stack Intern",         company: "Zenvora Tech", salary: "₹30K/month", location: "Remote, India",    logo: "/logo.png", type: "Internship", level: "Entry",     desc: "Gain hands-on experience building full-stack features alongside senior engineers in an agile environment." },
  { id: 10, title: "DevOps Engineer",           company: "Zenvora Tech", salary: "₹15LPA",     location: "Gurgaon, India",   logo: "/logo.png", type: "Full Time",  level: "Senior",    desc: "Streamline CI/CD pipelines, manage cloud infrastructure, and ensure platform reliability at scale." },
  { id: 11, title: "Product Manager",           company: "Zenvora Tech", salary: "₹20LPA",     location: "Bangalore, India", logo: "/logo.png", type: "Full Time",  level: "Senior",    desc: "Own the product roadmap, collaborate with cross-functional teams, and ship features users love." },
  { id: 12, title: "Graphic Designer",          company: "Zenvora Tech", salary: "₹7LPA",      location: "Ahmedabad, India", logo: "/logo.png", type: "Full Time",  level: "Junior",    desc: "Create compelling visual assets for digital and print media that communicate brand identity effectively." },
];

// const BookmarkIcon = ({ filled }: { filled: boolean }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16" height="16"
//     viewBox="0 0 24 24"
//     fill={filled ? 'currentColor' : 'none'}
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
//   </svg>
// );

export const JobRecommendations = () => {
  // isDark from context, theme object from styles/theme.ts directly
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  // const [saved, setSaved] = useState<number[]>([]);

  // const toggleSave = (id: number) =>
  //   setSaved(prev =>
  //     prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  //   );

  return (
    <AuthLayout fullWidth>
      <div className="px-6 py-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-bold ${theme.heading}`}>
            Job Recommendations{' '}
            
          </h1>

         
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => {
            // const isSaved = saved.includes(job.id);

            return (
              <div
                key={job.id}
                className={`border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.featureCard}`}
              >
                {/* Logo + Bookmark */}
                <div className="flex items-start justify-between">

                  {/* Logo */}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center p-2 border ${theme.toggleBtn}`}>
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="h-full w-full object-contain"
                    />
                  </div>

                
                </div>

                {/* Title */}
                <h2 className={`text-lg font-bold leading-snug ${theme.featureTitle}`}>
                  {job.title}
                </h2>

                {/* Description */}
                <p className={`text-sm leading-relaxed line-clamp-3 ${theme.featureDesc}`}>
                  {job.desc}
                </p>

                {/* Salary + Location */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${theme.label}`}>
                    {job.salary}
                  </span>
                  <span className={`text-xs ${theme.subtext}`}>
                    📍 {job.location}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${theme.toggleBtn}`}>
                    {job.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${theme.toggleBtn}`}>
                    {job.level}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-3 mt-auto">
                  {/* Details */}
                  <Button
                    className={`shadow-none! hover:scale-100! border from-transparent! to-transparent! ${!isDark ? 'text-black!' : ''} ${theme.toggleBtn}`}
                  >
                    Details
                  </Button>

                  {/* Apply Now */}
                  <Button>
                    Apply Now
                  </Button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </AuthLayout>
  );
};