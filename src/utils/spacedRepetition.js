/**
 * Spaced Repetition Logic (Weighted Random Selection)
 * 
 * Logic:
 * - Each card has a weight (default 1).
 * - "Fail" / "Hard" -> greatly increase weight (more likely to see again).
 * - "Pass" / "Easy" -> decrease weight (less likely to see again).
 * - Weights are bounded to prevent cards from disappearing entirely.
 */

const MIN_WEIGHT = 0.5;
const MAX_WEIGHT = 10;
const FAIL_MULTIPLIER = 2.0;
const PASS_MULTIPLIER = 0.5;

export const initialWeights = (cards) => {
    const weights = {};
    cards.forEach(card => {
        weights[card.id] = 1;
    });
    return weights;
};

export const getNextCard = (cards, weights) => {
    if (!cards || cards.length === 0) return null;

    // Calculate total weight
    let totalWeight = 0;
    cards.forEach(card => {
        totalWeight += (weights[card.id] || 1);
    });

    // Random value between 0 and totalWeight
    let random = Math.random() * totalWeight;

    // Find the card corresponding to the random value
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const weight = weights[card.id] || 1;
        if (random < weight) {
            return card;
        }
        random -= weight;
    }

    // Fallback (should rarely happen due to float precision)
    return cards[cards.length - 1];
};

export const updateWeight = (currentWeights, cardId, isCorrect) => {
    const oldWeight = currentWeights[cardId] || 1;
    let newWeight = oldWeight * (isCorrect ? PASS_MULTIPLIER : FAIL_MULTIPLIER);

    // Clamp weight
    newWeight = Math.max(MIN_WEIGHT, Math.min(MAX_WEIGHT, newWeight));

    return {
        ...currentWeights,
        [cardId]: newWeight
    };
};
