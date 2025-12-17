import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const Flashcard = ({ card, isFlipped, onFlip }) => {
    // Parsing content to detect LaTeX vs normal text could be complex.
    // For this simplified version, we assume the content is mixed. 
    // We can use a regex to split by $...$ for inline math.

    const renderContent = (text) => {
        if (!text) return "";
        // text might contain $...$ for latex. 
        // We split by '$' and assume odd indices are math.
        // NOTE: This is a basic parser.
        const parts = text.split('$');
        return (
            <>
                {parts.map((part, index) => {
                    if (index % 2 === 1) {
                        // It's math
                        return <InlineMath key={index}>{part}</InlineMath>;
                    } else {
                        // It's text
                        return <span key={index}>{part}</span>;
                    }
                })}
            </>
        );
    };

    return (
        <div className="flashcard-container" style={{ perspective: 1000, height: '300px', width: '100%', cursor: 'pointer' }} onClick={onFlip}>
            <motion.div
                className="flashcard-inner"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 30px -5px rgba(0, 250, 154, 0.1)',
                    borderRadius: '16px',
                }}
            >
                {/* Front */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                }}>
                    <h3 style={{ color: 'var(--accent-green)', marginBottom: '1.5rem', marginTop: 0, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px', opacity: 0.8 }}>Front</h3>
                    <div style={{ lineHeight: '1.6' }}>{renderContent(card.front)}</div>
                </div>

                {/* Back */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    borderRadius: '16px',
                    border: '1px solid var(--accent-green)',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                }}>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', marginTop: 0, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px', opacity: 0.8 }}>Back</h3>
                    <div style={{ lineHeight: '1.6' }}>{renderContent(card.back)}</div>
                </div>
            </motion.div>
        </div>
    );
};

export default Flashcard;
