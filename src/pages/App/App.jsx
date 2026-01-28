import { useState } from 'react';
import '../../styles/index.css';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import Card from '../../components/Card/Card';

function App() {
  const [score, setScore] = useState(0);

  // Hardcoded cards data
  // TODO: replace with API data later
  const cards = [
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
  ];

  return (
    <>
      <Scoreboard score={score} />
      {cards.map((card) => (
        <Card
          key={card.id}
          imageUrl={card.imageUrl}
          alt={card.alt}
          title={card.title}
        />
      ))}
    </>
  );
}

export default App;
