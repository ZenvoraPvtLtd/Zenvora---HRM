export const JobLogo = ({ letter, bg, size = 48 }: { letter: string; bg: string; size?: number }) => (
  <div
    className="job-logo"
    style={{
      width: size,
      height: size,
      borderRadius: '0.625rem',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 700,
      fontSize: size * 0.375,
      flexShrink: 0,
    }}
  >
    {letter}
  </div>
);
