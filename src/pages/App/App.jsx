import { useState, useEffect } from 'react';
import '../../styles/index.css';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import Card from '../../components/Card/Card';
import { shuffle } from '../../modules/utils/shuffle';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=12',
        );
        const data = await response.json();

        // Transform API data to card format
        const pokemonCards = data.results.map((pokemon, index) => ({
          id: index + 1,
          title: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          alt: pokemon.name,
        }));

        setCards(pokemonCards);
      } catch (err) {
        setError('Error loading cards. Please try again later.');
      } finally {
        setLoading(false);
      }
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
      ) : error ? (
        <div>{error}</div>
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
