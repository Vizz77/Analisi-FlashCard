import React from 'react';

const Stats = ({ totalCards, cardsMastered }) => {
    const percentage = totalCards > 0 ? Math.round((cardsMastered / totalCards) * 100) : 0;

    return (
        <div style={{
            marginTop: '3rem',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '400px'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Mastery</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>{percentage}%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cards Reviewed</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{cardsMastered} / {totalCards}</div>
            </div>
        </div>
    );
};

export default Stats;
