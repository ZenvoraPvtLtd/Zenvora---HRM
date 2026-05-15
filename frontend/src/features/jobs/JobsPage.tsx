import React, { useState, useEffect } from 'react';
import { JobSearch } from './components/JobSearch';
import { JobCard } from './components/JobCard';
import { JobDetail } from './components/JobDetail';
import { JobForm, type JobFormData } from './components/JobForm';
import { JobApplicationForm } from './components/JobApplicationForm';

const initialJobsData: any[] = [];

export default function JobsPage({ isCandidateView = false }: { isCandidateView?: boolean }) {
  const [jobs, setJobs] = useState(initialJobsData);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [applyingForJobId, setApplyingForJobId] = useState<number | null>(null);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('zenvora_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    if (jobs.length > 0 || localStorage.getItem('zenvora_jobs')) {
      localStorage.setItem('zenvora_jobs', JSON.stringify(jobs));
    }
  }, [jobs]);

  const [newJob, setNewJob] = useState<JobFormData>({
    title: '', 
    department: '', 
    location: '', 
    jobType: 'Full-time', 
    experienceLevel: '', 
    salaryMin: '', 
    salaryMax: '', 
    description: '',
    skills: '',
    responsibilities: '',
    qualifications: '',
    openings: '1',
    status: 'Open',
    applicationDeadline: ''
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
        ...newJob,
        logoLetter: newJob.title ? newJob.title.charAt(0).toUpperCase() : 'Z',
        logoBg: '#a855f7',
        posted: 'Posted just now',
        tags: ['Fulltime', newJob.department || 'General'],
        // Mock data for split arrays if needed by detail view
        skillsList: newJob.skills.split(',').map(s => s.trim()),
        responsibilitiesList: newJob.responsibilities.split('\n').map(s => s.trim()),
        qualificationsList: newJob.qualifications.split('\n').map(s => s.trim()),
      };
      setJobs([jobToAdd, ...jobs]);
    }
    setIsCreatingJob(false);
    setNewJob({ 
      title: '', department: '', location: '', jobType: 'Full-time', 
      experienceLevel: '', salaryMin: '', salaryMax: '', description: '',
      skills: '', responsibilities: '', qualifications: '', openings: '1',
      status: 'Open', applicationDeadline: ''
    });
  };

  const handleDeleteJob = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const updatedJobs = jobs.filter(j => j.id !== id);
      setJobs(updatedJobs);
      localStorage.setItem('zenvora_jobs', JSON.stringify(updatedJobs));
    }
  };

  const handleEditJob = (id: number) => {
    const jobToEdit = jobs.find(j => j.id === id);
    if (jobToEdit) {
      setNewJob({
        title: jobToEdit.title,
        department: jobToEdit.department,
        location: jobToEdit.location,
        jobType: jobToEdit.jobType,
        experienceLevel: jobToEdit.experienceLevel,
        salaryMin: jobToEdit.salaryMin,
        salaryMax: jobToEdit.salaryMax,
        description: jobToEdit.description,
        skills: jobToEdit.skills,
        responsibilities: jobToEdit.responsibilities,
        qualifications: jobToEdit.qualifications,
        openings: jobToEdit.openings,
        status: jobToEdit.status,
        applicationDeadline: jobToEdit.applicationDeadline
      });
      setEditingJobId(id);
      setIsCreatingJob(true);
    }
  };

  const closeJobForm = (val: boolean) => {
    if (!val) {
      setEditingJobId(null);
      setNewJob({ 
        title: '', department: '', location: '', jobType: 'Full-time', 
        experienceLevel: '', salaryMin: '', salaryMax: '', description: '',
        skills: '', responsibilities: '', qualifications: '', openings: '1',
        status: 'Open', applicationDeadline: ''
      });
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
          isAdmin={!isCandidateView}
        />
      )}
    </div>
  );
}
