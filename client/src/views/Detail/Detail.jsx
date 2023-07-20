import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/videogames/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Juego Con ID = {id}</h1>
      {data && (
        <div>
          <h2 className={styles.subtitle}>{data.name}</h2>
          {data.background_image ? (
            <img src={data.background_image} className={styles.image} alt={data.name} />
          ) : (
            <img src={data.image} className={styles.image} alt={data.name} />
          )}
          <h2 className={styles.sectionTitle}>Descripción:</h2>
          <p className={styles.description}>{data.description}</p>
          <h2 className={styles.sectionTitle}>Fecha Lanzamiento:</h2>
          <p className={styles.releaseDate}>{data.released}</p>
          <h2 className={styles.sectionTitle}>Plataformas:</h2>
          {Array.isArray(data.platforms) ? (
            data.platforms.map((platform, index) => (
              <p key={index} className={styles.platform}>{platform.platform.name}</p>
            ))
          ) : (
            <span className={styles.noPlatforms}>No platforms available</span>
          )}
          <h2 className={styles.sectionTitle}>Rating:</h2>
          <p className={styles.rating}>{data.rating}</p>
          <h2 className={styles.sectionTitle}>Géneros:</h2>
          {data.genres.map((genre, index) => (
            <p key={index} className={styles.genre}>{genre.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Detail;