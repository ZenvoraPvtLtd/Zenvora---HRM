export default function Jobs() {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title text-purple">Jobs</h1>
      <p className="page-subtitle text-purple">Manage job postings and descriptions.</p>

      <div className="card" style={{ minHeight: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3>Open Positions</h3>
          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
            + Create Job
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>Job postings will be displayed here.</p>
      </div>
    </div>
  );
}
