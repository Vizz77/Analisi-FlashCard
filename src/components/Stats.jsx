import React from 'react';

const Stats = ({ totalCards, stats }) => {
    // stats: { [cardId]: { interval, repetition, ef, dueDate } }

    let newCards = 0;
    let learning = 0;
    let review = 0;
    let mature = 0;

    // Anki logic approximation:
    // New: repetition = 0
    // Learning: repetition > 0 && interval < 21 days
    // Mature: interval >= 21 days

    // "Review" usually means currently Due, but here we can categorise by status.
    // Let's stick to status buckets.

    const now = Date.now();

    if (stats) {
        // Iterate over all known cards in stats
        // Note: totalCards might be larger if we haven't touched some cards yet
        // but stats only contains touched cards usually unless we init all.
        // We need to account for untouched cards as New.

        const trackedIds = Object.keys(stats);
        const trackedCount = trackedIds.length;

        // Count tracked
        trackedIds.forEach(id => {
            const s = stats[id];
            if (s.repetition === 0) {
                newCards++;
            } else if (s.interval >= 21) {
                mature++;
            } else {
                learning++;
            }
        });

        // Add untouched to new
        newCards += (totalCards - trackedCount);
    } else {
        newCards = totalCards;
    }

    return (
        <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '600px',
            flexWrap: 'wrap',
            gap: '1rem'
        }}>
            <StatItem label="New" value={newCards} color="var(--text-secondary)" />
            <StatItem label="Learning" value={learning} color="orange" />
            <StatItem label="Mature" value={mature} color="var(--success)" />
        </div>
    );
};

const StatItem = ({ label, value, color }) => (
    <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: color }}>{value}</div>
    </div>
);

export default Stats;
