type JobLogoProps = {
  letter?: string;
  bg?: string;
  size?: number;
};

export const JobLogo = ({ letter = 'Z', bg = 'var(--accent)', size = 44 }: JobLogoProps) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        borderRadius: '0.75rem',
        background: bg,
        color: 'var(--accent-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: `${Math.max(14, Math.floor(size * 0.4))}px`,
        boxShadow: '0 10px 20px rgba(0,0,0,0.18)',
      }}
    >
      {letter.charAt(0).toUpperCase()}
    </div>
  );
};
