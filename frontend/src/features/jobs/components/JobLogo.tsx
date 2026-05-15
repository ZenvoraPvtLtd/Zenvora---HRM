

export const JobLogo = ({ letter, bg, size = 40 }: { letter: string, bg: string, size?: number }) => (
  <div style={{ 
    width: `${size}px`, height: `${size}px`, borderRadius: '50%', 
    background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', 
    color: bg === '#ffe01b' ? '#000' : '#fff', fontWeight: 'bold', fontSize: `${size * 0.5}px` 
  }}>
    {letter}
  </div>
);
