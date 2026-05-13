export default function Candidates() {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Candidates</h1>
      <p className="page-subtitle">Manage and track your applicant pool.</p>

      <div className="card" style={{ minHeight: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3>Candidate List</h3>
          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
            + Add Candidate
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>Candidate data table will be displayed here.</p>
      </div>
    </div>
  );
}
