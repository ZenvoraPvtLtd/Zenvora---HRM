import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobForm, type JobFormData } from './JobForm';
import {
  createJob,
  createEmptyJobForm,
} from './jobStore';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState<JobFormData>(createEmptyJobForm());
  const [apiError, setApiError] = useState<string | null>(null);

  const handleCreateJob = async (event: FormEvent) => {
    event.preventDefault();
    setApiError(null);

    try {
      await createJob(newJob);
      navigate('/jobs', { replace: true });
    } catch (error: any) {
      setApiError(error.message || 'Failed to create job');
    }
  };

  return (
    <>
      {apiError && (
        <div style={{ maxWidth: '900px', margin: '0 auto 1rem', padding: '0 0.5rem' }}>
          <div className="card" style={{ padding: '1rem', color: '#ef4444' }}>
            {apiError}
          </div>
        </div>
      )}
      <JobForm
        newJob={newJob}
        setNewJob={setNewJob}
        handleCreateJob={handleCreateJob}
        setIsCreatingJob={() => navigate('/createjobs')}
      />
    </>
  );
}
