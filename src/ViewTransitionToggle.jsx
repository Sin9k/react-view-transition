export function ViewTransitionToggle({ enabled, onChange }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      marginBottom: '1.5rem' 
    }}>
      <label style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1rem',
        background: '#f8f9fa',
        border: '2px solid #e9ecef',
        borderRadius: '12px',
        color: '#495057',
        fontSize: '0.95rem',
        fontWeight: '500',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#ffffff';
        e.currentTarget.style.borderColor = '#667eea';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#f8f9fa';
        e.currentTarget.style.borderColor = '#e9ecef';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
      }}
      >
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            accentColor: '#667eea',
          }}
        />
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          ✨ <span>View Transition API</span>
        </span>
      </label>
    </div>
  );
}

