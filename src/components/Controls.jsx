import React from 'react';
import { X, Check } from 'lucide-react';

const Controls = ({ onRate, disabled }) => {
    return (
        <div style={{ display: 'flex', gap: '20px', marginTop: '2rem', justifyContent: 'center' }}>
            <button
                onClick={() => onRate(false)}
                disabled={disabled}
                style={{
                    backgroundColor: 'rgba(255, 77, 77, 0.1)',
                    color: 'var(--danger)',
                    padding: '12px 32px',
                    fontSize: '1rem',
                    border: '1px solid var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: disabled ? 0.5 : 1
                }}
            >
                <X size={20} />
                Fail / Hard
            </button>

            <button
                onClick={() => onRate(true)}
                disabled={disabled}
                style={{
                    backgroundColor: 'rgba(0, 250, 154, 0.1)',
                    color: 'var(--success)',
                    padding: '12px 32px',
                    fontSize: '1rem',
                    border: '1px solid var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: disabled ? 0.5 : 1
                }}
            >
                <Check size={20} />
                Pass / Easy
            </button>
        </div>
    );
};

export default Controls;
