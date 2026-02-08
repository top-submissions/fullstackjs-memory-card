import { useState, useEffect } from 'react';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import Card from '../../components/Card/Card';
import { shuffle } from '../../modules/utils/shuffle';
import styles from './App.module.css';

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
    if (clickedCards.includes(cardId)) {
      setScore(0);
      setClickedCards([]);
      setCards(shuffle(cards));
      return;
    }

    const newScore = score + 1;
    setScore(newScore);
    setClickedCards([...clickedCards, cardId]);

    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    setCards(shuffle(cards));
  };

  return (
    <div className={styles.app}>
      {loading ? (
        <div className={styles.loading}>Loading Pokemon...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <Scoreboard score={score} bestScore={bestScore} />
          <div className={styles.cardGrid}>
            {cards.map((card) => (
              <Card
                key={card.id}
                imageUrl={card.imageUrl}
                alt={card.alt}
                title={card.title}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
