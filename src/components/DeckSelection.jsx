import React from 'react';
import { BookOpen, Code, ScrollText } from 'lucide-react';

const DeckSelection = ({ onSelectDeck }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            gap: '2rem'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                marginBottom: '1rem',
                background: 'linear-gradient(to right, var(--text-primary), var(--accent-color, #00fa9a))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
            }}>
                Select a Deck
            </h1>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={() => onSelectDeck('calculus')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '200px',
                        height: '250px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid rgba(0, 250, 154, 0.3)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: 'var(--text-primary)'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#00fa9a';
                        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 250, 154, 0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(0, 250, 154, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <BookOpen size={48} color="#00fa9a" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Calculus</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Math & Analysis</p>
                </button>

                <button
                    onClick={() => onSelectDeck('theoremAnalysis')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '200px',
                        height: '250px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid rgba(245, 197, 66, 0.3)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: 'var(--text-primary)'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#f5c542';
                        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(245, 197, 66, 0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(245, 197, 66, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <ScrollText size={48} color="#f5c542" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.25rem', lineHeight: 1.2, margin: 0, textAlign: 'center' }}>Solo Teoremi Analisi</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Analysis Theorems</p>
                </button>

                <button
                    onClick={() => onSelectDeck('lpp')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '200px',
                        height: '250px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid rgba(50, 150, 255, 0.3)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: 'var(--text-primary)'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#3296ff';
                        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(50, 150, 255, 0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(50, 150, 255, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <Code size={48} color="#3296ff" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>LPP</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Prog. Languages</p>
                </button>

                <button
                    onClick={() => onSelectDeck('so')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '200px',
                        height: '250px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid rgba(50, 150, 255, 0.3)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: 'var(--text-primary)'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#ff6b35';
                        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(255, 107, 53, 0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <Code size={48} color="#ff6b35" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>SO</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Prog. Languages</p>
                </button>



            </div>
        </div>
    );
};

export default DeckSelection;
