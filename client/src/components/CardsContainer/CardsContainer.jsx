import Card from "../Card/Card";
import style from "../CardsContainer/CardsContainer.module.css";
import { Link } from 'react-router-dom';


const CardsContainer = ({ filtered }) => {

  const renderNoResultsMessage = () => {
    if (filtered.length === 0) {
      return <div className={style.noResults}>No results found.</div>;
    }
    return null;
  }; 

  return (
    <div className={style.container}>
      {filtered.map((videoGame) => {
        return (
          <Link to={`/detail/${videoGame.id}`} key={videoGame.id} className={style.linkNoUnderline}>
            <Card
              name={videoGame.name}
              platforms={videoGame.platforms}
              image={videoGame.image}
              releaseDate={videoGame.releaseDate}
              rating={videoGame.rating}
              genres={videoGame.genres}
            />
          </Link>
        );
      })}
      {renderNoResultsMessage()}
    </div>
  );
};

export default CardsContainer;
