import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobSearch } from './components/JobSearch';
import { JobCard } from './components/JobCard';
import { JobDetail } from './components/JobDetail';
import { JobForm, type JobFormData } from './components/JobForm';
import { JobApplicationForm } from './components/JobApplicationForm';
import {
  createEmptyJobForm,
  deleteJob,
  fetchJobs,
  toJobFormData,
  updateJob,
} from './jobStore';

const initialJobsData: any[] = [];

export default function JobsPage({ isCandidateView = false }: { isCandidateView?: boolean }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(initialJobsData);
  const [selectedJobId, setSelectedJobId] = useState<string | number | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | number | null>(null);
  const [applyingForJobId, setApplyingForJobId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setApiError(null);

      try {
        const apiJobs = await fetchJobs();
        setJobs(apiJobs);
      } catch (error: any) {
        setApiError(error.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const [newJob, setNewJob] = useState<JobFormData>(createEmptyJobForm());

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingJobId) return;

    try {
      const updatedJob = await updateJob(editingJobId, newJob);
      setJobs(jobs.map(j => j.id === editingJobId ? updatedJob : j));
      setEditingJobId(null);
      setIsCreatingJob(false);
      setNewJob(createEmptyJobForm());
    } catch (error: any) {
      setApiError(error.message || 'Failed to update job');
    }
  };

  const handleDeleteJob = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(j => j.id !== id));
        if (selectedJobId === id) {
          setSelectedJobId(null);
        }
      } catch (error: any) {
        setApiError(error.message || 'Failed to delete job');
      }
    }
  };

  const handleEditJob = (id: string | number) => {
    const jobToEdit = jobs.find(j => j.id === id);
    if (jobToEdit) {
      setNewJob(toJobFormData(jobToEdit));
      setEditingJobId(id);
      setIsCreatingJob(true);
    }
  };

  const closeJobForm = (val: boolean) => {
    if (!val) {
      setEditingJobId(null);
      setNewJob(createEmptyJobForm());
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
      {apiError && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1rem', color: '#ef4444' }}>
          {apiError}
        </div>
      )}

      {!selectedJobId ? (
        // GRID VIEW
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>All Jobs</h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {loading ? 'Loading jobs...' : `Showing ${jobs.length} results`}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Sort by: <strong style={{ color: 'var(--text-primary)' }}>Most relevant</strong>
              </div>
              {!isCandidateView && (
                <button 
                  onClick={() => navigate('/jobs/create')}
                  style={{ background: 'var(--text-purple)', color: 'white', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  + Create Job
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {!loading && jobs.map(job => (
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
            {!loading && jobs.length === 0 && (
              <div className="card" style={{ padding: '2rem', color: 'var(--text-secondary)', gridColumn: '1 / -1', textAlign: 'center' }}>
                No jobs created yet.
              </div>
            )}
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
