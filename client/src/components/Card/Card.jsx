import style from "../Card/Card.module.css";

const Card = (videoGames) => {
  return (
    <div className={style.card}>
      <p>{videoGames.name}</p>
      <img src={videoGames.image} width="300" height="200"></img>
      {videoGames.genres.map((genre, index) => (
        <p key={index}>{genre}</p>
      ))}
    </div>
  );
};

export default Card;
