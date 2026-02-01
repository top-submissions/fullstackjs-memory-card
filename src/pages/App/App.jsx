import { useState } from 'react';
import '../../styles/index.css';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import Card from '../../components/Card/Card';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
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

  const handleCardClick = () => {
    const newScore = score + 1;
    setScore(newScore);

    // Update best score if new score exceeds it
    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    // Shuffle cards using Fisher-Yates algorithm
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
  };

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      {cards.map((card) => (
        <Card
          key={card.id}
          imageUrl={card.imageUrl}
          alt={card.alt}
          title={card.title}
          onClick={handleCardClick}
        />
      ))}
    </>
  );
}

export default App;
