import { ViewTransition } from 'react'

export const Item = ({ item, toggleStatus, removeItem, viewTransitionEnabled }) => {
    const content = (
        <div
            className="card"
            style={{
                background: item.color,
                padding: '1.5rem',
                borderRadius: '12px',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                opacity: item.status === 'done' ? 0.6 : 1,
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <h3 style={{ margin: '0 0 1rem 0' }}>
                {item.title}
            </h3>
            <div style={{ 
                fontSize: '0.9rem', 
                marginBottom: '1rem',
                textDecoration: item.status === 'done' ? 'line-through' : 'none'
            }}>
                Status: {item.status === 'done' ? '✅ Done' : '⏳ Todo'}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                onClick={() => toggleStatus(item.id)}
                style={{ 
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    fontWeight: 'bold'
                }}
                >
                Toggle
                </button>
                <button 
                    onClick={() => removeItem(item.id)}
                    style={{ 
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: 'rgba(0,0,0,0.3)',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                ❌
                </button>
            </div>
        </div>
    );

    if (viewTransitionEnabled) {
        return (
            <ViewTransition>
                {content}
            </ViewTransition>
        );
    }
    
    return content;
}