import type { JobFormData } from './components/JobForm';

export const createEmptyJobForm = (): JobFormData => ({
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
  applicationDeadline: '',
});

const authHeaders = () => {
  const token = localStorage.getItem('accessToken');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const splitLines = (value: string) => {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
};

const splitCommaList = (value: string) => {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const formatSalary = (salaryMin?: string | number, salaryMax?: string | number) => {
  if (salaryMin && salaryMax) return `${salaryMin} - ${salaryMax}`;
  if (salaryMin) return `From ${salaryMin}`;
  if (salaryMax) return `Up to ${salaryMax}`;
  return 'Not disclosed';
};

const formatDateForInput = (value?: string) => {
  return value ? new Date(value).toISOString().slice(0, 10) : '';
};

export const buildJobPayload = (form: JobFormData) => ({
  title: form.title,
  department: form.department,
  location: form.location,
  jobType: form.jobType,
  experienceLevel: form.experienceLevel,
  salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
  salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
  description: form.description,
  skills: splitCommaList(form.skills),
  responsibilities: splitLines(form.responsibilities),
  qualifications: splitLines(form.qualifications),
  openings: form.openings ? Number(form.openings) : 1,
  status: form.status,
  applicationDeadline: form.applicationDeadline || undefined,
});

export const mapApiJobToCard = (job: any) => {
  const id = job._id || job.id;
  const skills = Array.isArray(job.skills) ? job.skills : [];
  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : [];
  const qualifications = Array.isArray(job.qualifications) ? job.qualifications : [];

  return {
    id,
    _id: id,
    ...job,
    logoLetter: job.title ? job.title.charAt(0).toUpperCase() : 'Z',
    logoBg: '#a855f7',
    posted: job.createdAt ? `Posted ${new Date(job.createdAt).toLocaleDateString()}` : 'Posted recently',
    company: 'Zenvora',
    field: job.department || 'General',
    experience: job.experienceLevel || 'Freshers',
    salary: formatSalary(job.salaryMin, job.salaryMax),
    tags: [job.jobType, job.department || 'General', job.status || 'Open'].filter(Boolean),
    skillsList: skills,
    responsibilities,
    responsibilitiesList: responsibilities,
    qualificationsList: qualifications,
    whoYouAre: qualifications,
  };
};

export const toJobFormData = (job: any): JobFormData => ({
  title: job.title || '',
  department: job.department || '',
  location: job.location || '',
  jobType: job.jobType || 'Full-time',
  experienceLevel: job.experienceLevel || job.experience || '',
  salaryMin: job.salaryMin ? String(job.salaryMin) : '',
  salaryMax: job.salaryMax ? String(job.salaryMax) : '',
  description: job.description || '',
  skills: Array.isArray(job.skills) ? job.skills.join(', ') : '',
  responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : '',
  qualifications: Array.isArray(job.qualifications) ? job.qualifications.join('\n') : '',
  openings: job.openings ? String(job.openings) : '1',
  status: job.status || 'Open',
  applicationDeadline: formatDateForInput(job.applicationDeadline),
});

const parseJobResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Job request failed');
  }

  return data;
};

export const fetchJobs = async () => {
  const response = await fetch('/api/jobs', {
    headers: authHeaders(),
  });
  const data = await parseJobResponse(response);
  return (data.jobs || []).map(mapApiJobToCard);
};

export const createJob = async (form: JobFormData) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(buildJobPayload(form)),
  });
  const data = await parseJobResponse(response);
  return mapApiJobToCard(data.job);
};

export const updateJob = async (id: string | number, form: JobFormData) => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(buildJobPayload(form)),
  });
  const data = await parseJobResponse(response);
  return mapApiJobToCard(data.job);
};

export const deleteJob = async (id: string | number) => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await parseJobResponse(response);
};
