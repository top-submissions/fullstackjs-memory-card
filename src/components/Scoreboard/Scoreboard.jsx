import styles from './Scoreboard.module.css';

function Scoreboard({ score = 0, bestScore = 0 }) {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.scoreItem}>
        <span className={styles.value}>Score: {score}</span>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.value}>Best Score: {bestScore}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
