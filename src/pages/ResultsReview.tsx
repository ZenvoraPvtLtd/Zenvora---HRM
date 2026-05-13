export default function ResultsReview() {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Results Review</h1>
      <p className="page-subtitle">Evaluate candidate performance and make decisions.</p>

      <div className="card" style={{ minHeight: '400px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Pending Evaluations</h3>
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>John Doe</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Frontend Developer Role</p>
            </div>
            <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
              Review Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
