function Card({ imageUrl, alt, title }) {
  return (
    <div>
      <img src={imageUrl} alt={alt} />
      <p>{title}</p>
    </div>
  );
}

export default Card;
