import React, { useState, useEffect } from 'react';
import { parseCSV } from './utils/csv';
import { getNextCard, calculateNextReview, initialProgress } from './utils/spacedRepetition';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import Stats from './components/Stats';
import DeckSelection from './components/DeckSelection';
import { Loader2, ArrowLeft } from 'lucide-react';

// Import raw CSVs
import calculusCSV from '../cards_calculus.csv?raw';
import lppCSV from '../cards_lpp.csv?raw';

function App() {
  const [currentDeck, setCurrentDeck] = useState(null); // 'calculus' or 'lpp'
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState({});
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false); // Only loading when switching decks

  // Theme management
  useEffect(() => {
    const root = document.documentElement;
    if (currentDeck === 'lpp') {
      root.style.setProperty('--accent-green', '#3296ff'); // Blue for LPP
      root.style.setProperty('--accent-color', '#3296ff');
    } else {
      root.style.setProperty('--accent-green', '#00fa9a'); // Green for Calculus (default)
      root.style.setProperty('--accent-color', '#00fa9a');
    }
  }, [currentDeck]);

  const loadDeck = async (deckName) => {
    setLoading(true);
    setCurrentDeck(deckName);
    setIsFlipped(false);

    try {
      const csvContent = deckName === 'lpp' ? lppCSV : calculusCSV;
      const parsedCards = await parseCSV(csvContent);
      setCards(parsedCards);

      // Load progress specific to this deck
      const storageKey = `flashcard_progress_${deckName}`;
      const savedProgress = localStorage.getItem(storageKey);
      let loadedProgress = savedProgress ? JSON.parse(savedProgress) : initialProgress();

      setProgress(loadedProgress);
      setCurrentCard(getNextCard(parsedCards, loadedProgress));

    } catch (error) {
      console.error("Failed to load deck:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = (grade) => {
    if (!currentCard) return;

    // grade: 0 (Again), 3 (Hard), 4 (Good), 5 (Easy)
    const cardId = currentCard.id;
    const oldStats = progress[cardId];

    const newStats = calculateNextReview(oldStats, grade);

    const updatedProgress = {
      ...progress,
      [cardId]: newStats
    };

    setProgress(updatedProgress);
    localStorage.setItem(`flashcard_progress_${currentDeck}`, JSON.stringify(updatedProgress));

    setIsFlipped(false);

    // Delay for animation?
    setTimeout(() => {
      setCurrentCard(getNextCard(cards, updatedProgress));
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!currentDeck) {
    return <DeckSelection onSelectDeck={loadDeck} />;
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--accent-color)" />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading Deck...</p>
      </div>
    );
  }

  // No cards loaded yet or empty deck
  if (cards.length === 0) {
    return <div style={{ color: 'white', padding: 20 }}>No cards found in this deck. <button onClick={() => setCurrentDeck(null)}>Go Back</button></div>;
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '100vh', padding: '20px' }}>

      {/* Header with Back Button */}
      <header style={{ marginBottom: '2rem', textAlign: 'center', position: 'relative', width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={() => setCurrentDeck(null)}
          style={{
            position: 'absolute',
            left: 0,
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <ArrowLeft size={20} />
          Decks
        </button>

        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, var(--text-primary), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            FlashLearn
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.9rem', textTransform: 'capitalize' }}>
            {currentDeck === 'lpp' ? 'LPP / Func. Prog.' : 'Calculus'} Edition
          </p>
        </div>
      </header>

      {/* Main Flashcard Check */}
      {currentCard ? (
        <>
          <Flashcard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />

          <div style={{ opacity: isFlipped ? 1 : 0.3, pointerEvents: isFlipped ? 'all' : 'none', transition: 'opacity 0.3s' }}>
            <Controls onRate={handleRate} disabled={!isFlipped} />
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-primary)' }}>
          <h2>All caught up!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>You have no more cards due for review right now.</p>
          <button
            onClick={() => setCurrentDeck(null)}
            style={{
              marginTop: '2rem',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--accent-color)',
              background: 'transparent',
              color: 'var(--accent-color)',
              cursor: 'pointer'
            }}
          >
            Choose another deck
          </button>
        </div>
      )}

      <Stats totalCards={cards.length} stats={progress} />
    </div>
  );
}

export default App;
