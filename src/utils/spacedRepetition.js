/**
 * Spaced Repetition Logic (SM-2 Algorithm similar to Anki)
 * 
 * References:
 * - https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm
 */

// Default values for a new card
const DEFAULT_INTERVAL = 0;
const DEFAULT_REPETITION = 0;
const DEFAULT_EF = 2.5; // Easiness Factor

/**
 * Calculates the next review data based on the grade.
 * 
 * @param {Object} prevStats - { interval: number, repetition: number, ef: number }
 * @param {number} grade - 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
 * Note: Anki uses 1-4 buttons typically mapped to grades.
 * We will map our UI buttons:
 *  Again (Fail) -> Grade 0 or 1. Let's use standard SM-2 0-5 scale mapped:
 *  - Again/Fail: 0
 *  - Hard: 3
 *  - Good: 4
 *  - Easy: 5
 *  (Skipping 1 and 2 for simplicity as we have 4 buttons)
 */
export const calculateNextReview = (prevStats, grade) => {
    let { interval, repetition, ef } = prevStats || {
        interval: DEFAULT_INTERVAL,
        repetition: DEFAULT_REPETITION,
        ef: DEFAULT_EF
    };

    let nextInterval;
    let nextRepetition;
    let nextEf;

    if (grade < 3) {
        // Correct response but hard, or wrong response
        // If grade is 0 (Fail), reset reps.
        nextRepetition = 0;
        nextInterval = 1; // 1 day
        // EF remains same or decreases slightly? SM-2 says EF stays same for q<3 but we reset interval.
        // Let's stick to standard recursive version:
        nextEf = ef;
    } else {
        // Correct response
        if (repetition === 0) {
            nextInterval = 1;
        } else if (repetition === 1) {
            nextInterval = 6;
        } else {
            nextInterval = Math.round(interval * ef);
        }
        nextRepetition = repetition + 1;

        // Update EF
        // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        nextEf = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    }

    if (nextEf < 1.3) nextEf = 1.3;

    return {
        interval: nextInterval,
        repetition: nextRepetition,
        ef: nextEf,
        dueDate: Date.now() + (nextInterval * 24 * 60 * 60 * 1000)
    };
};

/**
 * Sorts cards to find the best candidate for review.
 * Priority: 
 * 1. Due cards (dueDate <= now)
 * 2. New cards (never seen)
 * 3. If all reviewed/future, maybe show earliest due anyway or random study?
 *    For strict SRS, we stop. For this app, let's show "Review Ahead" or fallback.
 */
export const getNextCard = (cards, progressData) => {
    if (!cards || cards.length === 0) return null;

    const now = Date.now();

    // Filter due cards
    const dueCards = cards.filter(card => {
        const stats = progressData[card.id];
        if (!stats) return true; // New card (treat as due immediately)
        return stats.dueDate <= now;
    });

    if (dueCards.length > 0) {
        // Sort by due date (overdue first) or random among due?
        // Let's return random among due to avoid order bias if batch imported.
        const randomIndex = Math.floor(Math.random() * dueCards.length);
        return dueCards[randomIndex];
    }

    // If no cards are strictly due, implementing a "Study Ahead" or "Cram" mode logic
    // OR just return null/done. Anki says "Congratulations".
    // User requested "full sow 10 times" implies a grind. 
    // Let's return the card with the earliest due date if user wants to keep going,
    // OR return null to indicate "Done for now".
    // For a simple app, let's keep showing cards but maybe prioritize by lowest interval (Hardest)

    // Let's return a "Review Ahead" card (earliest absolute due date)
    const sortedByDate = [...cards].sort((a, b) => {
        const statsA = progressData[a.id] || { dueDate: 0 };
        const statsB = progressData[b.id] || { dueDate: 0 };
        return statsA.dueDate - statsB.dueDate;
    });

    return sortedByDate[0];
};

export const initialProgress = () => {
    return {}; // Empty map of cardId -> stats
};
