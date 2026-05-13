export default function Interviews() {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Interviews</h1>
      <p className="page-subtitle">Schedule and conduct candidate interviews.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        <div className="card" style={{ minHeight: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Upcoming Schedule</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Calendar or list of scheduled interviews.</p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Interviewers</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Availability of team members.</p>
        </div>
      </div>
    </div>
  );
}
