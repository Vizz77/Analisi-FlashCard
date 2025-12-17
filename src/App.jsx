import React, { useState, useEffect } from 'react';
import { parseCSV } from './utils/csv';
import { getNextCard, updateWeight, initialWeights } from './utils/spacedRepetition';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import Stats from './components/Stats';
import { Loader2 } from 'lucide-react';
import cardsCSV from '../cards_calculus.csv?raw'; // Vite trick to load raw file content

function App() {
  const [cards, setCards] = useState([]);
  const [weights, setWeights] = useState({});
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ mastered: 0 }); // Simplified stats

  useEffect(() => {
    const loadData = async () => {
      try {
        const parsedCards = await parseCSV(cardsCSV);
        setCards(parsedCards);

        // Load weights from local storage or init
        const savedWeights = localStorage.getItem('flashcard_weights');
        let initialW = {};
        if (savedWeights) {
          initialW = JSON.parse(savedWeights);
          // Ensure all new cards are in weights
          const brandingW = initialWeights(parsedCards);
          initialW = { ...brandingW, ...initialW };
        } else {
          initialW = initialWeights(parsedCards);
        }

        setWeights(initialW);
        setLoading(false);
        setCurrentCard(getNextCard(parsedCards, initialW));
      } catch (error) {
        console.error("Failed to load cards:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRate = (info) => {
    if (!currentCard) return;

    // info is boolean: true (correct/easy), false (wrong/hard)
    const newWeights = updateWeight(weights, currentCard.id, info);
    setWeights(newWeights);
    localStorage.setItem('flashcard_weights', JSON.stringify(newWeights));

    // Update stats (simple counter for 'passes' just for visual, although spaced repetition implies mastery is complex)
    if (info) {
      setStats(s => ({ ...s, mastered: s.mastered + 1 }));
    }

    // Pick next card
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard(getNextCard(cards, newWeights));
    }, 200); // Slight delay for animation if needed, though flip reset is instant
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--accent-green)" />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading your FlashCards...</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return <div>No cards found in CSV.</div>;
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, var(--text-primary), var(--accent-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
          FlashLearn
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Calculus Edition</p>
      </header>

      <Flashcard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />

      {/* Only show controls if flipped? Or always? Usually always visible or after flip. Let's show after flip to encourage thinking. */}
      <div style={{ opacity: isFlipped ? 1 : 0.3, pointerEvents: isFlipped ? 'all' : 'none', transition: 'opacity 0.3s' }}>
        <Controls onRate={handleRate} disabled={!isFlipped} />
      </div>

      <Stats totalCards={cards.length} cardsMastered={stats.mastered} />
    </div>
  );
}

export default App;
