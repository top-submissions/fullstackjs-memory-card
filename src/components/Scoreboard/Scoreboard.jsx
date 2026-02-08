import styles from './Scoreboard.module.css';

function Scoreboard({ score = 0, bestScore = 0 }) {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.scoreItem}>
        <span className={styles.label}>Score</span>
        <span className={styles.value}>{score}</span>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.label}>Best Score</span>
        <span className={styles.value}>{bestScore}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
