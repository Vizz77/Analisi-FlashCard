import React from 'react';
import { motion as Motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import './Flashcard.css';

const Flashcard = ({ card, isFlipped, onFlip }) => {
    // Parsing content to detect LaTeX vs normal text could be complex.
    // For this simplified version, we assume the content is mixed. 
    // We can use a regex to split by $...$ for inline math.

    const renderTextWithBreaks = (text, keyPrefix) => {
        return text.split(/<br\s*\/?>/i).map((line, index, lines) => (
            <React.Fragment key={`${keyPrefix}-${index}`}>
                {line}
                {index < lines.length - 1 && <br />}
            </React.Fragment>
        ));
    };

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
                        return <span key={index}>{renderTextWithBreaks(part, index)}</span>;
                    }
                })}
            </>
        );
    };

    return (
        <div className="flashcard-container" onClick={onFlip}>
            <Motion.div
                className="flashcard-inner"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front */}
                <div className="flashcard-face flashcard-face--front">
                    <h3 className="flashcard-title flashcard-title--front">Front</h3>
                    <div className="flashcard-content">{renderContent(card.front)}</div>
                </div>

                {/* Back */}
                <div className="flashcard-face flashcard-face--back">
                    <h3 className="flashcard-title flashcard-title--back">Back</h3>
                    <div className="flashcard-content">{renderContent(card.back)}</div>
                </div>
            </Motion.div>
        </div>
    );
};

export default Flashcard;
