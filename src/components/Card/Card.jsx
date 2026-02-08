import styles from './Card.module.css';

function Card({ imageUrl, alt, title, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={alt} className={styles.image} />
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;
