import { useState } from 'react';
import { Search, XCircle, Clock, UserCheck, MessageSquare, Briefcase, Award } from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    name: 'Eleanor Pena',
    role: 'Senior Product Designer',
    avatar: 'https://i.pravatar.cc/150?u=24',
    interviewDate: 'May 13, 2026',
    evaluator: 'Jane Doe (Head of Design)',
    scores: {
      technical: 92,
      communication: 88,
      problemSolving: 95,
      cultureFit: 90
    },
    overallScore: 91,
    recommendation: 'Hire',
    notes: 'Outstanding portfolio. Showed great empathy in the design exercise. Strong fit for our team. Demonstrated excellent understanding of our core user demographic.'
  },
  {
    id: 2,
    name: 'Ralph Edwards',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?u=36',
    interviewDate: 'May 12, 2026',
    evaluator: 'Mike Smith (Engineering Manager)',
    scores: {
      technical: 65,
      communication: 75,
      problemSolving: 70,
      cultureFit: 85
    },
    overallScore: 73,
    recommendation: 'Hold',
    notes: 'Good team fit but struggled slightly with the advanced React rendering optimization questions. Maybe suitable for a mid-level role, but need to compare with other candidates.'
  },
  {
    id: 3,
    name: 'Courtney Henry',
    role: 'UI Ux Designer',
    avatar: 'https://i.pravatar.cc/150?u=50',
    interviewDate: 'May 11, 2026',
    evaluator: 'Jane Doe (Head of Design)',
    scores: {
      technical: 40,
      communication: 60,
      problemSolving: 50,
      cultureFit: 55
    },
    overallScore: 51,
    recommendation: 'Reject',
    notes: 'Basic understanding of design systems but lacks the deep experience required for this specific fast-paced role. Did not perform well in the whiteboard session.'
  }
];

function ResultsReviewPage() {
  const [reviews] = useState(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const getRecStyle = (rec: string) => {
    switch (rec) {
      case 'Hire': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', icon: <UserCheck size={16} /> };
      case 'Hold': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', icon: <Clock size={16} /> };
      case 'Reject': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: <XCircle size={16} /> };
      default: return { bg: 'var(--icon-accent-bg)', color: 'var(--text-primary)', icon: null };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10b981';
    if (score >= 65) return '#f59e0b';
    return '#ef4444';
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || r.recommendation === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title">Interview Results Review</h1>
          <p className="page-subtitle">Post-interview evaluations, AI scoring, and final hiring decisions.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search candidate or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '0.5rem', border: '1px solid var(--border)',
              background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Hire', 'Hold', 'Reject'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                background: filterType === type ? 'var(--accent)' : 'transparent',
                color: filterType === type ? 'var(--accent-text)' : 'var(--text-secondary)',
                border: `1px solid ${filterType === type ? 'var(--accent)' : 'var(--border)'}`,
                padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '1.5rem' }}>
        {filteredReviews.map(review => {
          const recStyle = getRecStyle(review.recommendation);

          return (
            <div key={review.id} className="card hover-effect" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={review.avatar} alt={review.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{review.name}</h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase size={14} /> {review.role}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: getScoreColor(review.overallScore), lineHeight: 1 }}>{review.overallScore}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Overall Score</div>
                </div>
              </div>

              {/* Status Ribbon */}
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Evaluated By</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>{review.evaluator}</div>
                </div>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '2rem', background: recStyle.bg, color: recStyle.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  {recStyle.icon} Recommendation: {review.recommendation}
                </div>
              </div>

              {/* Score Breakdowns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {Object.entries(review.scores).map(([skill, score]) => (
                  <div key={skill}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{score}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden' }}>
                      <div style={{ width: `${score}%`, height: '100%', background: getScoreColor(score), borderRadius: '1rem' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Evaluator Notes */}
              <div style={{ marginTop: 'auto', background: 'var(--bg-hover)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--accent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                  <MessageSquare size={14} /> Evaluator Notes
                </div>
                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  "{review.notes}"
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                {review.recommendation === 'Hire' && (
                  <button className="btn-primary" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Award size={16} /> Send Offer Letter
                  </button>
                )}
                {review.recommendation === 'Hold' && (
                  <button style={{ flex: 1, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                    Move to Talent Pool
                  </button>
                )}
                {review.recommendation === 'Reject' && (
                  <button style={{ flex: 1, background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                    Send Rejection Email
                  </button>
                )}
                <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  Full Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ResultsReviewPage;