function Card({ imageUrl, alt, title, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={imageUrl} alt={alt} />
      <p>{title}</p>
    </div>
  );
}

export default Card;
