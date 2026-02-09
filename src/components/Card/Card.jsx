import styles from './Card.module.css';

function Card({ imageUrl, cardBackUrl, alt, title, onClick, isFlipped }) {
  const displayImage = isFlipped ? cardBackUrl : imageUrl;

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      onClick={onClick}
    >
      <img src={displayImage} alt={alt} className={styles.image} />
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;
