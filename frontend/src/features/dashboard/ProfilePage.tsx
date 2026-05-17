import React, { useState } from 'react';
import { Pencil, User, Mail, Phone, MapPin, Briefcase, Calendar, Check, X } from 'lucide-react';

const InputField = ({ label, name, type = "text", value, isEditing, onChange }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>{label}</label>
    {isEditing ? (
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange}
        style={{ 
          width: '100%', padding: '0.625rem', borderRadius: '0.5rem', 
          border: '1px solid var(--accent)', background: 'rgba(99, 102, 241, 0.05)', 
          color: 'var(--text-primary)', outline: 'none', fontSize: '0.875rem'
        }} 
      />
    ) : (
      <div style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', padding: '0.5rem 0', fontWeight: '500' }}>
        {value}
      </div>
    )}
  </div>
);

export default function Profile() {
  const storedName = localStorage.getItem('userName') || 'HR Admin';
  const storedEmail = localStorage.getItem('userEmail') || 'admin@zenvora.com';
  
  const nameParts = storedName.trim().split(' ');
  const initialFirstName = nameParts[0] || 'HR';
  const initialLastName = nameParts.slice(1).join(' ') || 'Admin';
  
  const rawRole = (localStorage.getItem('userRole') || '').toLowerCase();
  let displayRole = '';
  let displayDept = '';
  let displayBio = '';
  switch (rawRole) {
    case 'candidate':
      displayRole = 'Candidate';
      displayDept = 'Recruitment Pool';
      displayBio = 'Actively seeking new opportunities and excited to grow my career.';
      break;
    case 'hr':
      displayRole = 'HR';
      displayDept = 'Human Resources';
      displayBio = 'Passionate about building great HR tech tools and ensuring smooth system operations.';
      break;
    case 'admin':
      displayRole = 'Admin';
      displayDept = 'Administration';
      displayBio = 'Managing system-wide settings and overseeing operations.';
      break;
    case 'employee':
      displayRole = 'Employee';
      displayDept = 'Operations';
      displayBio = 'Contributing to the company’s success through daily tasks.';
      break;
    default:
      displayRole = 'User';
      displayDept = '';
      displayBio = '';
  }

  const [userInfo, setUserInfo] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: storedEmail,
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    role: displayRole,
    department: displayDept,
    joinDate: '12 Jan 2024',
    bio: displayBio
  });

  const [editMode, setEditMode] = useState({
    personal: false,
    contact: false,
  });

  const [tempInfo, setTempInfo] = useState({ ...userInfo });

  const handleEdit = (section: 'personal' | 'contact') => {
    setTempInfo({ ...userInfo });
    setEditMode({ ...editMode, [section]: true });
  };

  const handleSave = (section: 'personal' | 'contact') => {
    setUserInfo({ ...tempInfo });
    setEditMode({ ...editMode, [section]: false });
    
    if (section === 'personal' || section === 'contact') {
      const newName = `${tempInfo.firstName} ${tempInfo.lastName}`.trim();
      localStorage.setItem('userName', newName);
      localStorage.setItem('userEmail', tempInfo.email);
      // Dispatching a custom event could tell Layout to re-render, but a page reload is usually fine
      window.dispatchEvent(new Event('storage')); 
    }
  };

  const handleCancel = (section: 'personal' | 'contact') => {
    setEditMode({ ...editMode, [section]: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTempInfo({ ...tempInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      

      {/* Profile Header Card */}
      <div className="card profile-header-card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', marginBottom: '2rem', borderTop: '4px solid var(--accent)' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', 
            background: 'var(--logo-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'white', fontWeight: 'bold', fontSize: '2.5rem', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
          </div>
          <div style={{ 
            position: 'absolute', bottom: '0', right: '0', width: '32px', height: '32px', 
            borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)'
          }} className="hover-effect">
            <Pencil size={14} />
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>{userInfo.firstName} {userInfo.lastName}</h2>
          <div className="display-flex-badges" style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-purple)', fontSize: '0.875rem', fontWeight: '500', justifyContent: 'inherit' }}>
              <Briefcase size={16} /> {userInfo.role}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.875rem', justifyContent: 'inherit' }}>
              <MapPin size={16} /> {userInfo.location}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Personal Info Card */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <User size={18} style={{ color: 'var(--accent)' }}/> Personal Information
            </h3>
            {!editMode.personal ? (
              <button 
                onClick={() => handleEdit('personal')}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '50%', display: 'flex', cursor: 'pointer' }}
                title="Edit Personal Info"
              >
                <Pencil size={16} />
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleSave('personal')} style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                  <Check size={14} /> Save
                </button>
                <button onClick={() => handleCancel('personal')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                  <X size={14} /> Cancel
                </button>
              </div>
            )}
          </div>
          
          <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <InputField label="First Name" name="firstName" value={editMode.personal ? tempInfo.firstName : userInfo.firstName} isEditing={editMode.personal} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={editMode.personal ? tempInfo.lastName : userInfo.lastName} isEditing={editMode.personal} onChange={handleChange} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Bio</label>
            {editMode.personal ? (
              <textarea 
                name="bio" 
                value={tempInfo.bio} 
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '0.625rem', borderRadius: '0.5rem', 
                  border: '1px solid var(--accent)', background: 'rgba(99, 102, 241, 0.05)', 
                  color: 'var(--text-primary)', outline: 'none', fontSize: '0.875rem', minHeight: '80px', resize: 'vertical'
                }} 
              />
            ) : (
              <div style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', padding: '0.5rem 0', lineHeight: '1.5' }}>
                {userInfo.bio}
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Contact & Job */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Contact Info Card */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Phone size={18} style={{ color: 'var(--accent)' }}/> Contact Info
              </h3>
              {!editMode.contact ? (
                <button 
                  onClick={() => handleEdit('contact')}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '50%', display: 'flex', cursor: 'pointer' }}
                  title="Edit Contact Info"
                >
                  <Pencil size={16} />
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleSave('contact')} style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                    <Check size={14} />
                  </button>
                  <button onClick={() => handleCancel('contact')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}><Mail size={18} /></div>
                <div style={{ flex: 1 }}><InputField label="Email Address" name="email" type="email" value={editMode.contact ? tempInfo.email : userInfo.email} isEditing={editMode.contact} onChange={handleChange} /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}><Phone size={18} /></div>
                <div style={{ flex: 1 }}><InputField label="Phone Number" name="phone" value={editMode.contact ? tempInfo.phone : userInfo.phone} isEditing={editMode.contact} onChange={handleChange} /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}><MapPin size={18} /></div>
                <div style={{ flex: 1 }}><InputField label="Location" name="location" value={editMode.contact ? tempInfo.location : userInfo.location} isEditing={editMode.contact} onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* Job Details Card (Read Only usually) */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <Briefcase size={18} style={{ color: 'var(--text-purple)' }}/> Employment Details
            </h3>
            
            <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Department</label>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', padding: '0.5rem 0', fontWeight: '500' }}>{userInfo.department}</div>
              </div>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Date of Join</label>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', padding: '0.5rem 0', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Calendar size={14} color="var(--text-secondary)" /> {userInfo.joinDate}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
