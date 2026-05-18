import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Award, ArrowLeft, CheckCircle2, Target } from "lucide-react";

const jobsData = [
  {
    id: 1,
    title: "MERN Stack Developer",
    company: "Zenvora Tech",
    salary: "₹12LPA",
    location: "Bangalore, India",
    type: "Full Time",
    level: "Mid Level",
    desc: "Build cutting-edge web applications from start to finish, utilizing your expertise in both front-end and back-end technologies.",
    fullDescription:
      "We are looking for a talented MERN Stack Developer to join our team. You will work on modern web applications using MongoDB, Express, React, and Node.js. You'll collaborate with cross-functional teams to deliver high-quality solutions.",
    responsibilities: [
      "Develop and maintain responsive web applications using React.js",
      "Build robust backend APIs using Node.js and Express",
      "Design and optimize MongoDB databases",
      "Collaborate with UI/UX designers to implement designs",
      "Participate in code reviews and maintain code quality",
      "Deploy and manage applications on cloud platforms",
    ],
    requirements: [
      "4+ years of professional experience in web development",
      "Strong proficiency in JavaScript and ES6+",
      "Experience with React.js and state management (Redux/Context API)",
      "Knowledge of Node.js and Express.js",
      "Experience with MongoDB or other NoSQL databases",
      "Git and version control expertise",
      "Understanding of RESTful APIs and HTTP protocols",
      "Good problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance",
      "Remote work options",
      "Professional development allowance",
      "Flexible working hours",
      "Annual performance bonus",
    ],
    postedDate: "2024-05-01",
    deadline: "2024-06-15",
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    company: "Zenvora Tech",
    salary: "₹18LPA",
    location: "Hyderabad, India",
    type: "Full Time",
    level: "Senior",
    desc: "Design and implement machine learning models and AI pipelines to solve complex real-world problems at scale.",
    fullDescription:
      "Join our AI/ML team to work on cutting-edge machine learning projects. You will design, build, and deploy ML models that process large-scale data and drive business decisions.",
    responsibilities: [
      "Design and develop machine learning models",
      "Build and optimize deep learning architectures",
      "Create data pipelines for model training",
      "Evaluate model performance and implement improvements",
      "Deploy models to production environments",
      "Research and implement latest ML techniques",
      "Mentor junior ML engineers",
    ],
    requirements: [
      "6+ years of experience in machine learning",
      "Strong background in Python, TensorFlow, and PyTorch",
      "Experience with NLP, Computer Vision, or LLMs",
      "Knowledge of data preprocessing and feature engineering",
      "Understanding of statistical methods",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Published research papers preferred",
    ],
    benefits: [
      "Top-tier salary",
      "Stock options",
      "Health and wellness benefits",
      "Research collaboration opportunities",
      "Conference attendance allowance",
      "Flexible work arrangements",
    ],
    postedDate: "2024-04-20",
    deadline: "2024-06-30",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Zenvora Tech",
    salary: "₹10LPA",
    location: "Pune, India",
    type: "Full Time",
    level: "Mid Level",
    desc: "Craft intuitive and visually stunning user interfaces that delight users and drive engagement across platforms.",
    fullDescription:
      "We're seeking a talented UI/UX Designer to create beautiful and user-centric digital experiences for our products.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Develop design systems and component libraries",
      "Collaborate with product and engineering teams",
      "Implement design best practices and accessibility standards",
      "Iterate based on user feedback",
    ],
    requirements: [
      "4+ years of UI/UX design experience",
      "Proficiency in Figma or Adobe XD",
      "Strong portfolio with design case studies",
      "Understanding of user research methodologies",
      "Knowledge of responsive design principles",
      "HTML/CSS knowledge beneficial",
      "Excellent communication skills",
    ],
    benefits: [
      "Competitive salary",
      "Design tools and resources",
      "Flexible work schedule",
      "Professional courses budget",
      "Health insurance",
      "Team outings and events",
    ],
    postedDate: "2024-05-05",
    deadline: "2024-06-20",
  },
  {
    id: 4,
    title: "Frontend React Developer",
    company: "Zenvora Tech",
    salary: "₹11LPA",
    location: "Chennai, India",
    type: "Full Time",
    level: "Mid Level",
    desc: "Build performant, accessible React applications with a keen eye for design and seamless user experiences.",
    fullDescription:
      "Build high-performance React applications that users love. We're looking for developers who care about code quality and user experience.",
    responsibilities: [
      "Develop and maintain React components",
      "Optimize application performance",
      "Implement responsive designs",
      "Write unit tests and integration tests",
      "Collaborate with backend developers",
      "Ensure cross-browser compatibility",
      "Participate in sprint planning and reviews",
    ],
    requirements: [
      "3+ years of React.js experience",
      "Strong JavaScript fundamentals",
      "Experience with state management (Redux/Context)",
      "Knowledge of CSS and responsive design",
      "Experience with testing libraries (Jest, React Testing Library)",
      "Git proficiency",
      "Understanding of web performance optimization",
    ],
    benefits: [
      "Competitive salary",
      "Health benefits",
      "Flexible working hours",
      "Learning budget",
      "Remote work options",
      "Performance bonuses",
    ],
    postedDate: "2024-05-03",
    deadline: "2024-06-18",
  },
  {
    id: 5,
    title: "Backend Node.js Engineer",
    company: "Zenvora Tech",
    salary: "₹14LPA",
    location: "Noida, India",
    type: "Full Time",
    level: "Senior",
    desc: "Architect and maintain robust server-side systems, APIs, and microservices powering high-traffic products.",
    fullDescription:
      "Design and build scalable backend systems using Node.js. Work with microservices architecture and handle high-traffic applications.",
    responsibilities: [
      "Design and build RESTful and GraphQL APIs",
      "Implement microservices architecture",
      "Manage databases and data pipelines",
      "Optimize database queries and API performance",
      "Implement security best practices",
      "Set up monitoring and logging solutions",
      "Lead technical discussions and code reviews",
    ],
    requirements: [
      "6+ years of Node.js development",
      "Strong JavaScript and asynchronous programming knowledge",
      "Experience with Express.js or similar frameworks",
      "Database expertise (SQL and NoSQL)",
      "Knowledge of microservices and API design",
      "Experience with Docker and Kubernetes",
      "Understanding of system design principles",
    ],
    benefits: [
      "Premium salary package",
      "Stock options",
      "Health and wellness coverage",
      "Professional development fund",
      "Flexible location",
      "Annual bonus",
    ],
    postedDate: "2024-04-28",
    deadline: "2024-06-25",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "Zenvora Tech",
    salary: "₹8LPA",
    location: "Mumbai, India",
    type: "Full Time",
    level: "Junior",
    desc: "Drive brand growth through data-driven campaigns, content strategy, and digital marketing initiatives.",
    fullDescription:
      "Join our marketing team to drive brand growth and customer acquisition. You'll work on digital marketing campaigns and content strategy.",
    responsibilities: [
      "Plan and execute digital marketing campaigns",
      "Create engaging content for multiple platforms",
      "Analyze campaign performance and optimize",
      "Manage social media presence",
      "Conduct market research and competitor analysis",
      "Collaborate with sales and product teams",
      "Track marketing metrics and KPIs",
    ],
    requirements: [
      "2+ years of digital marketing experience",
      "Knowledge of marketing analytics tools",
      "Strong communication and writing skills",
      "Experience with social media platforms",
      "Understanding of SEO and SEM",
      "Proficiency in Google Analytics",
      "Creative thinking and problem-solving",
    ],
    benefits: [
      "Competitive salary",
      "Marketing tools and resources",
      "Remote work flexibility",
      "Team events and outings",
      "Professional development",
      "Health insurance",
    ],
    postedDate: "2024-05-02",
    deadline: "2024-06-22",
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Zenvora Tech",
    salary: "₹9LPA",
    location: "Delhi, India",
    type: "Full Time",
    level: "Mid Level",
    desc: "Lead talent acquisition, employee engagement, and HR operations to build a thriving workplace culture.",
    fullDescription:
      "Build and nurture our team. We're looking for an HR Manager to lead recruitment, employee engagement, and organizational development.",
    responsibilities: [
      "Recruit and onboard talent",
      "Manage employee relations and performance",
      "Develop HR policies and procedures",
      "Conduct training and development programs",
      "Handle compensation and benefits",
      "Maintain HR compliance",
      "Foster company culture",
    ],
    requirements: [
      "4+ years of HR management experience",
      "Knowledge of HR laws and regulations",
      "Experience in recruitment and talent management",
      "Strong interpersonal skills",
      "HR information systems experience",
      "Understanding of employment contracts",
      "Project management abilities",
    ],
    benefits: [
      "Competitive salary",
      "Health benefits",
      "Flexible working hours",
      "Professional HR courses",
      "Remote work options",
      "Performance incentives",
    ],
    postedDate: "2024-05-04",
    deadline: "2024-06-19",
  },
  {
    id: 8,
    title: "AI Research Intern",
    company: "Zenvora Tech",
    salary: "₹35K/month",
    location: "Remote, India",
    type: "Internship",
    level: "Entry",
    desc: "Explore cutting-edge AI research topics, assist with experiments, and contribute to published work.",
    fullDescription:
      "Join our research team as an intern to work on cutting-edge AI projects. This is a great opportunity to contribute to published research.",
    responsibilities: [
      "Assist with AI/ML research projects",
      "Conduct literature reviews",
      "Implement research papers",
      "Prepare datasets and run experiments",
      "Contribute to research publications",
      "Present findings and results",
    ],
    requirements: [
      "Strong background in machine learning",
      "Python programming proficiency",
      "Understanding of deep learning concepts",
      "Research paper reading experience",
      "Currently pursuing relevant degree",
      "Self-motivated and curious",
    ],
    benefits: [
      "Monthly stipend",
      "Research publication opportunity",
      "Mentorship from senior researchers",
      "Remote work flexibility",
      "Letter of recommendation",
    ],
    postedDate: "2024-05-06",
    deadline: "2024-07-15",
  },
  {
    id: 9,
    title: "Full Stack Intern",
    company: "Zenvora Tech",
    salary: "₹30K/month",
    location: "Remote, India",
    type: "Internship",
    level: "Entry",
    desc: "Gain hands-on experience building full-stack features alongside senior engineers in an agile environment.",
    fullDescription:
      "Work on real projects with our experienced engineering team. Build end-to-end features using modern technologies.",
    responsibilities: [
      "Develop full-stack features",
      "Write unit and integration tests",
      "Participate in code reviews",
      "Debug and fix production issues",
      "Contribute to documentation",
      "Attend daily standups",
    ],
    requirements: [
      "Knowledge of HTML, CSS, JavaScript",
      "Understanding of backend concepts",
      "Basic Git knowledge",
      "Willingness to learn",
      "Good communication skills",
      "Currently pursuing relevant degree",
    ],
    benefits: [
      "Monthly stipend",
      "Hands-on training",
      "Mentorship from engineers",
      "Remote work",
      "Letter of recommendation",
    ],
    postedDate: "2024-05-07",
    deadline: "2024-07-20",
  },
  {
    id: 10,
    title: "DevOps Engineer",
    company: "Zenvora Tech",
    salary: "₹15LPA",
    location: "Gurgaon, India",
    type: "Full Time",
    level: "Senior",
    desc: "Streamline CI/CD pipelines, manage cloud infrastructure, and ensure platform reliability at scale.",
    fullDescription:
      "Build and maintain infrastructure for high-scale applications. You'll work with cloud platforms and containerization technologies.",
    responsibilities: [
      "Design and maintain CI/CD pipelines",
      "Manage cloud infrastructure",
      "Monitor application performance",
      "Implement security best practices",
      "Automate deployment processes",
      "Handle incident response",
      "Mentor junior engineers",
    ],
    requirements: [
      "5+ years of DevOps experience",
      "Strong Docker and Kubernetes expertise",
      "AWS, GCP, or Azure experience",
      "CI/CD tools knowledge (Jenkins, GitLab CI)",
      "Scripting skills (Bash, Python)",
      "Monitoring and logging expertise",
      "Linux system administration",
    ],
    benefits: [
      "Premium salary",
      "Stock options",
      "Health and wellness",
      "Learning budget",
      "Flexible work arrangement",
      "Annual bonus",
    ],
    postedDate: "2024-04-25",
    deadline: "2024-06-28",
  },
  {
    id: 11,
    title: "Product Manager",
    company: "Zenvora Tech",
    salary: "₹20LPA",
    location: "Bangalore, India",
    type: "Full Time",
    level: "Senior",
    desc: "Own the product roadmap, collaborate with cross-functional teams, and ship features users love.",
    fullDescription:
      "Lead product strategy and development. You'll define the roadmap, work with design and engineering, and drive product success.",
    responsibilities: [
      "Define product vision and strategy",
      "Manage product roadmap",
      "Conduct user research and analytics",
      "Work with design and engineering teams",
      "Launch features and campaigns",
      "Monitor product metrics",
      "Lead product reviews and standups",
    ],
    requirements: [
      "6+ years of product management",
      "Experience with B2B or B2C products",
      "Data-driven decision making",
      "Strong communication skills",
      "Technical understanding",
      "Knowledge of agile methodology",
      "Experience with analytics tools",
    ],
    benefits: [
      "Premium salary package",
      "Stock options",
      "Health and wellness coverage",
      "Professional development fund",
      "Flexible work location",
      "Annual bonus",
    ],
    postedDate: "2024-04-22",
    deadline: "2024-06-10",
  },
  {
    id: 12,
    title: "Graphic Designer",
    company: "Zenvora Tech",
    salary: "₹7LPA",
    location: "Ahmedabad, India",
    type: "Full Time",
    level: "Junior",
    desc: "Create compelling visual assets for digital and print media that communicate brand identity effectively.",
    fullDescription:
      "Design visual content that tells our brand story. You'll create graphics for various platforms and campaigns.",
    responsibilities: [
      "Design marketing materials",
      "Create social media graphics",
      "Develop brand guidelines",
      "Produce video animations",
      "Collaborate with marketing team",
      "Design UI elements",
      "Ensure brand consistency",
    ],
    requirements: [
      "2+ years of graphic design experience",
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio with design examples",
      "Understanding of typography and color theory",
      "Knowledge of web design principles",
      "Excellent attention to detail",
      "Time management skills",
    ],
    benefits: [
      "Competitive salary",
      "Design tools and subscriptions",
      "Flexible working hours",
      "Professional training",
      "Remote work options",
      "Team events",
    ],
    postedDate: "2024-05-08",
    deadline: "2024-06-23",
  },
];

export const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobsData.find((j) => j.id === parseInt(id || "0"));

  const card = { background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" };

  if (!job) {
    return (
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        <p style={{ color: "var(--text-primary)" }}>Job not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
      {/* Back */}
      <button
        onClick={() => navigate("/candidatedashboard/jobs")}
        className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
        style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-purple)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      {/* Header Card */}
      <div style={{ ...card, marginBottom: "1.5rem" }}>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="shrink-0">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white font-bold text-4xl sm:text-5xl"
              style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
            >
              Z
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{job.title}</h1>
            <p className="text-base sm:text-lg mb-4" style={{ color: "var(--text-secondary)" }}>{job.company}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: <DollarSign className="w-4 h-4" style={{ color: "#10b981" }} />, label: "Salary", value: job.salary },
                { icon: <MapPin className="w-4 h-4" style={{ color: "#f97316" }} />, label: "Location", value: job.location },
                { icon: <Briefcase className="w-4 h-4" style={{ color: "var(--text-purple)" }} />, label: "Type", value: job.type },
                { icon: <Award className="w-4 h-4" style={{ color: "#22d3ee" }} />, label: "Level", value: job.level },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  {icon}
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</p>
                    <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* About */}
        <div style={card}>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5" style={{ color: "var(--text-purple)" }} />
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>About the Role</h2>
          </div>
          <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>{job.fullDescription}</p>
        </div>

        {/* Responsibilities */}
        <div style={card}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: "var(--text-purple)" }} />
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Responsibilities</h2>
          </div>
          <ul className="flex flex-col gap-3">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#10b981" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div style={card}>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5" style={{ color: "var(--text-purple)" }} />
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Requirements</h2>
          </div>
          <ul className="flex flex-col gap-3">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#3b82f6" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Overview */}
        <div style={card}>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5" style={{ color: "var(--text-purple)" }} />
            <h3 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>About Zenvora Tech</h3>
          </div>
          <p className="text-sm leading-6 mb-4" style={{ color: "var(--text-secondary)" }}>
            Zenvora Tech is a leading technology company specializing in innovative solutions for digital transformation. We're committed to fostering a culture of excellence, creativity, and continuous learning.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Founded", value: "2015" },
              { label: "Team Size", value: "500+" },
              { label: "Headquarters", value: "India" },
              { label: "Status", value: "Growing", green: true },
            ].map(({ label, value, green }) => (
              <div key={label} className="p-3 rounded-xl" style={{ background: "var(--bg-hover)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{label}</p>
                <p className="font-semibold" style={{ color: green ? "#10b981" : "var(--text-primary)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Join Us */}
        <div style={card}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: "var(--text-purple)" }} />
            <h3 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Why Join Us?</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["Work with cutting-edge technologies", "Collaborative and inclusive culture", "Career growth and development", "Innovation-focused environment", "Competitive compensation", "Flexible work arrangements"].map((reason, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#3b82f6" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
