function Scoreboard({ score = 0, bestScore = 0 }) {
  return (
    <div>
      <div>Score: {score}</div>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}

export default Scoreboard;
