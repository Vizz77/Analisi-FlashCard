import React from 'react';
import { X, Check } from 'lucide-react';

const Controls = ({ onRate, disabled }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
                onClick={() => onRate(0)} // fail
                disabled={disabled}
                style={{
                    backgroundColor: 'rgba(255, 77, 77, 0.1)',
                    color: 'var(--danger)',
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--danger)',
                    borderRadius: '8px',
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                Again
            </button>

            <button
                onClick={() => onRate(3)} // hard
                disabled={disabled}
                style={{
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    color: 'orange',
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    border: '1px solid orange',
                    borderRadius: '8px',
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                Hard
            </button>

            <button
                onClick={() => onRate(4)} // good
                disabled={disabled}
                style={{
                    backgroundColor: 'rgba(0, 250, 154, 0.1)',
                    color: 'var(--success)',
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--success)',
                    borderRadius: '8px',
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                Good
            </button>

            <button
                onClick={() => onRate(5)} // easy
                disabled={disabled}
                style={{
                    backgroundColor: 'rgba(0, 191, 255, 0.1)',
                    color: 'deepskyblue',
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    border: '1px solid deepskyblue',
                    borderRadius: '8px',
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                Easy
            </button>
        </div>
    );
};

export default Controls;
