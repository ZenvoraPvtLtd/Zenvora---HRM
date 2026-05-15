import { useState } from 'react';
import { MoreHorizontal, Plus, Search, Calendar as CalendarIcon, Filter, CheckSquare, Settings2, Users } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  date: string;
  assignee: string;
  isDone?: boolean;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'idea',
    title: 'IDEA',
    tasks: [
      { id: 'SCRUM-1', title: 'Task 1', date: 'May 18, 2026', assignee: 'SJ' }
    ]
  },
  { id: 'todo', title: 'TO DO', tasks: [] },
  { id: 'inprogress', title: 'IN PROGRESS', tasks: [] },
  { id: 'view', title: 'VIEW', tasks: [] },
  { id: 'testing', title: 'TESTING', tasks: [] },
  {
    id: 'done',
    title: 'DONE',
    tasks: [
      { id: 'SCRUM-2', title: 'Task 2', date: 'May 23, 2026', assignee: 'SJ', isDone: true }
    ]
  }
];

export default function FollowUpPage() {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Header Area */}
      <div style={{ padding: '1.5rem 1rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '0.25rem', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            PM
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>My PM Team</h1>
          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="followup-tabs" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', minWidth: 'max-content' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, paddingBottom: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>Summary</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, paddingBottom: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>Backlog</span>
            <span style={{ color: 'var(--text-purple)', borderBottom: '2px solid var(--text-purple)', fontWeight: 600, paddingBottom: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>Board</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, paddingBottom: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>Calendar</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, paddingBottom: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>Timeline</span>
          </div>
        </div>

        <div className="followup-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', flex: 1 }} className="search-input">
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search board" 
                className="search-input"
                style={{ 
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)', 
                  padding: '0.4rem 0.75rem 0.4rem 2rem', borderRadius: '0.25rem', 
                  color: 'var(--text-primary)', outline: 'none', width: '200px', fontSize: '0.875rem' 
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, zIndex: 2, border: '2px solid var(--bg-primary)' }}>SJ</div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, border: '2px solid var(--border)', marginLeft: '-0.5rem' }}>
                <Users size={14} />
              </div>
            </div>

            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              <Filter size={16} /> Filter
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              Complete sprint
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              Group <span style={{ fontSize: '0.75rem' }}>▼</span>
            </button>
            <button style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.4rem', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Settings2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ overflowX: 'auto', padding: '1.5rem 1rem', display: 'flex', gap: '1rem' }}>
        {columns.map(col => (
          <div key={col.id} style={{ flex: '1 1 0', minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', padding: '0.5rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0, letterSpacing: '0.05em' }}>
                {col.title} <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>{col.tasks.length}</span>
              </h3>
              {col.id === 'done' && <CheckSquare size={16} style={{ color: '#10b981' }} />}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {col.tasks.map(task => (
                <div key={task.id} className="hover-effect" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '0.375rem', padding: '1rem', cursor: 'grab', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>{task.title}</div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    <CalendarIcon size={14} /> {task.date}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {task.isDone ? (
                        <CheckSquare size={16} color="var(--accent)" />
                      ) : (
                        <div style={{ width: '16px', height: '16px', borderRadius: '0.125rem', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>✓</span>
                        </div>
                      )}
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 500 }}>{task.id}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600 }}>
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {col.id === 'idea' && (
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', borderRadius: '0.25rem' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Plus size={16} /> Create
                </button>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
