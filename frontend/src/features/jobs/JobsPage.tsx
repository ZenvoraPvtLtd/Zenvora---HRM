import React, { useState } from 'react';
import { JobSearch } from './components/JobSearch';
import { JobCard } from './components/JobCard';
import { JobDetail } from './components/JobDetail';
import { JobForm } from './components/JobForm';
import { JobApplicationForm } from './components/JobApplicationForm';

const initialJobsData = [
  {
    id: 1,
    title: 'Illustrator Director',
    company: 'Spotify',
    logoLetter: 'S',
    logoBg: '#1db954',
    posted: 'Posted 2 hours ago',
    location: 'California, USA',
    experience: '4-5 Years',
    salary: '$100,000 /Month',
    tags: ['Fulltime', 'UI Design', 'Designer'],
    field: 'Entertainment',
    description: 'Good understanding of front-end optimization techniques, cross-browser compatibility and Responsive web design. Must have worked on photoshop conceptualizing, designing and prototyping new features for Company websites. Develop illustrations, templates for mailers and websites, logos, and other designs using the design software. Proficiency in Photoshop and Illustrator, Figma, or other visual design tools. Proficiency in HTML, CSS, JavaScript and basic PHP. Proficiency in J Query, Bootstrap and other designing platforms.',
    responsibilities: [
      'Community engagement to ensure that is supported and actively represented online',
      'Focus on social media content development and publication',
      'Marketing and strategy support',
      'Stay on top of trends on social media platforms, and suggest content ideas to the team',
      'Engage with online communities'
    ],
    whoYouAre: [
      'You get energy from people and building the ideal work environment',
      'You have a sense for beautiful spaces and office experiences',
      'You are a confident office manager, ready for added responsibilities',
      'You\'re detail-oriented and creative',
      'You\'re a growth-marketer and know how to run campaigns'
    ]
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Mailchimp',
    logoLetter: 'M',
    logoBg: '#ffe01b',
    posted: 'Posted 5 hours ago',
    location: 'New York, USA',
    experience: '4-5 Years',
    salary: '$100,000 /Month',
    tags: ['Fulltime', 'UI Design', 'Designer'],
    field: 'Technology',
    description: 'We are looking for a skilled frontend developer to join our dynamic team to build highly responsive, performant user interfaces.',
    responsibilities: ['Develop new user-facing features', 'Build reusable code and libraries', 'Optimize application for maximum speed and scalability'],
    whoYouAre: ['Passionate about coding', 'Team player', 'Detail oriented']
  },
  {
    id: 3,
    title: 'Senior Product Designer',
    company: 'Google',
    logoLetter: 'G',
    logoBg: '#ea4335',
    posted: 'Posted 1 day ago',
    location: 'California, USA',
    experience: '4-5 Years',
    salary: '$100,000 /Month',
    tags: ['Fulltime', 'UI Design', 'Designer'],
    field: 'Technology',
    description: 'Join Google as a Senior Product Designer to shape the future of our products. You will lead design for complex, large-scale systems.',
    responsibilities: ['Lead design initiatives', 'Mentor junior designers', 'Collaborate with cross-functional teams'],
    whoYouAre: ['Visionary designer', 'Excellent communicator', 'User-centric mindset']
  },
  {
    id: 4,
    title: 'UI Ux Designer',
    company: 'Paypal',
    logoLetter: 'P',
    logoBg: '#003087',
    posted: 'Posted 2 days ago',
    location: 'California, USA',
    experience: 'Fresher',
    salary: '$100,000 /Month',
    tags: ['Fulltime', 'UI Design', 'Designer'],
    field: 'Finance',
    description: 'Design seamless financial experiences for millions of users worldwide. Help make money simpler for everyone.',
    responsibilities: ['Create wireframes and prototypes', 'Conduct user research', 'Define user flows'],
    whoYouAre: ['Empathetic designer', 'Data-driven', 'Creative problem solver']
  },
  {
    id: 5,
    title: 'Product Marketing',
    company: 'Shopify',
    logoLetter: 'S',
    logoBg: '#95bf47',
    posted: 'Posted 3 days ago',
    location: 'Remote',
    experience: '4-5 Years',
    salary: '$100,000 /Month',
    tags: ['Fulltime', 'Marketing', 'Product'],
    field: 'E-commerce',
    description: 'Drive the go-to-market strategy for Shopify\'s new product lines. Connect merchants with the tools they need to succeed.',
    responsibilities: ['Develop product positioning', 'Create marketing campaigns', 'Analyze market trends'],
    whoYouAre: ['Strategic thinker', 'Creative marketer', 'Results-oriented']
  },
  {
    id: 6,
    title: 'Illustrator Director',
    company: 'Spotify',
    logoLetter: 'S',
    logoBg: '#1db954',
    posted: 'Posted 4 days ago',
    location: 'California, USA',
    experience: '4-5 Years',
    salary: '$100,000 /Month',
    tags: ['Fulltime', 'UI Design', 'Designer'],
    field: 'Entertainment',
    description: 'Another illustrator role at Spotify for our growing design team.',
    responsibilities: ['Design beautiful album covers', 'Create marketing assets'],
    whoYouAre: ['Creative', 'Loves music']
  }
];

export default function JobsPage({ isCandidateView = false }: { isCandidateView?: boolean }) {
  const [jobs, setJobs] = useState(initialJobsData);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [applyingForJobId, setApplyingForJobId] = useState<number | null>(null);

  const [newJob, setNewJob] = useState({
    title: '', company: '', location: '', experience: 'Fresher', salary: '', field: '', description: ''
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJobId) {
      setJobs(jobs.map(j => j.id === editingJobId ? { ...j, ...newJob } : j));
      setEditingJobId(null);
    } else {
      const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
      const jobToAdd = {
        id: newId,
        title: newJob.title || 'Untitled Job',
        company: newJob.company || 'Zenvora',
        logoLetter: newJob.company ? newJob.company.charAt(0).toUpperCase() : 'Z',
        logoBg: '#a855f7',
        posted: 'Posted just now',
        location: newJob.location || 'Remote',
        experience: newJob.experience,
        salary: newJob.salary || 'Competitive',
        tags: ['Fulltime', newJob.field || 'General'],
        field: newJob.field || 'Other',
        description: newJob.description || 'No description provided.',
        responsibilities: ['Responsibility 1', 'Responsibility 2'],
        whoYouAre: ['Requirement 1', 'Requirement 2']
      };
      setJobs([jobToAdd, ...jobs]);
    }
    setIsCreatingJob(false);
    setNewJob({ title: '', company: '', location: '', experience: 'Fresher', salary: '', field: '', description: '' });
  };

  const handleDeleteJob = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const handleEditJob = (id: number) => {
    const jobToEdit = jobs.find(j => j.id === id);
    if (jobToEdit) {
      setNewJob({
        title: jobToEdit.title,
        company: jobToEdit.company,
        location: jobToEdit.location,
        experience: jobToEdit.experience,
        salary: jobToEdit.salary,
        field: jobToEdit.field,
        description: jobToEdit.description
      });
      setEditingJobId(id);
      setIsCreatingJob(true);
    }
  };

  const closeJobForm = (val: boolean) => {
    if (!val) {
      setEditingJobId(null);
      setNewJob({ title: '', company: '', location: '', experience: 'Fresher', salary: '', field: '', description: '' });
    }
    setIsCreatingJob(val);
  };

  if (isCreatingJob) {
    return (
      <JobForm 
        newJob={newJob} 
        setNewJob={setNewJob} 
        handleCreateJob={handleCreateJob} 
        setIsCreatingJob={closeJobForm} 
        isEditing={!!editingJobId}
      />
    );
  }

  if (applyingForJobId !== null) {
    return (
      <JobApplicationForm 
        jobId={applyingForJobId} 
        jobs={jobs} 
        onCancel={() => setApplyingForJobId(null)} 
      />
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <JobSearch />

      {!selectedJobId ? (
        // GRID VIEW
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>All Jobs</h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Showing {jobs.length} results</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Sort by: <strong style={{ color: 'var(--text-primary)' }}>Most relevant</strong>
              </div>
              {!isCandidateView && (
                <button 
                  onClick={() => setIsCreatingJob(true)}
                  style={{ background: 'var(--text-purple)', color: 'white', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  + Create Job
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {jobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                isAdmin={!isCandidateView}
                onClick={() => setSelectedJobId(job.id)} 
                onApply={() => setApplyingForJobId(job.id)}
                onEdit={() => handleEditJob(job.id)}
                onDelete={() => handleDeleteJob(job.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        // DETAIL VIEW
        <JobDetail 
          jobs={jobs} 
          selectedJobId={selectedJobId} 
          setSelectedJobId={setSelectedJobId} 
          onApply={() => setApplyingForJobId(selectedJobId)}
        />
      )}
    </div>
  );
}
