export default function Profile() {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Manage your account settings and preferences.</p>

      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '2px solid var(--border)' }}></div>
          <div>
            <h2 style={{ margin: 0 }}>Admin User</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>admin@zenvora.com</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Full Name</label>
            <input type="text" value="Admin User" readOnly style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email Address</label>
            <input type="email" value="admin@zenvora.com" readOnly style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
