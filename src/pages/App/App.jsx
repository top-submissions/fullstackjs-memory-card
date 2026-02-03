import { useState, useEffect } from 'react';
import '../../styles/index.css';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import Card from '../../components/Card/Card';
import { shuffle } from '../../modules/utils/shuffle';

function App() {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Pikachu',
      imageUrl: 'https://example.com/pikachu.jpg',
      alt: 'Pikachu',
    },
    {
      id: 2,
      title: 'Charmander',
      imageUrl: 'https://example.com/charmander.jpg',
      alt: 'Charmander',
    },
    {
      id: 3,
      title: 'Bulbasaur',
      imageUrl: 'https://example.com/bulbasaur.jpg',
      alt: 'Bulbasaur',
    },
  ]);

  useEffect(() => {
    async function fetchCards() {
      // Simulate data loading completion
      setLoading(false);
    }
    fetchCards();
  }, []);

  const handleCardClick = (cardId) => {
    // Check if card was already clicked (lose condition)
    if (clickedCards.includes(cardId)) {
      setScore(0);
      setClickedCards([]);
      setCards(shuffle(cards));
      return;
    }

    // Card not clicked before, increment score
    const newScore = score + 1;
    setScore(newScore);
    setClickedCards([...clickedCards, cardId]);

    // Update best score if new score exceeds it
    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    setCards(shuffle(cards));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Scoreboard score={score} bestScore={bestScore} />
          {cards.map((card) => (
            <Card
              key={card.id}
              imageUrl={card.imageUrl}
              alt={card.alt}
              title={card.title}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </>
      )}
    </>
  );
}

export default App;
