import { useState } from "react";
import styles from './FiltersByGenreAndSource.module.css';

function FiltersByGenreAndSource({ videoGames, setFiltered }) {
  const [genre, setGenre] = useState("All");
  const [source, setSource] = useState("All");
  const [sort, setSort] = useState("name asc");

  const handleGenreFilter = (e) => {
    setGenre(e.target.value);
    filterVideoGames(e.target.value, source, sort);
  };

  const handleSourceFilter = (e) => {
    setSource(e.target.value);
    filterVideoGames(genre, e.target.value, sort);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterVideoGames(genre, source, e.target.value);
  };

  const filterVideoGames = (selectedGenre, selectedSource, selectedSort) => {
    let filtered = videoGames;

    if (selectedGenre !== "All") {
      filtered = filtered.filter((videoGame) =>
        videoGame.genres.includes(selectedGenre)
      );
    }

    if (selectedSource !== "All") {
      filtered = filtered.filter((videoGame) => {
        if (selectedSource === "db") {
          return videoGame.created === true;
        } else if (selectedSource === "api") {
          return videoGame.created === "false";
        } else {
          return true;
        }
      });
    }


    filtered.sort((a, b) => {
      if (selectedSort === "name asc") {
        return a.name.localeCompare(b.name);
      } else if (selectedSort === "name desc") {
        return b.name.localeCompare(a.name);
      } else if (selectedSort === "rating asc") {
        return a.rating - b.rating;
      } else if (selectedSort === "rating desc") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFiltered(filtered);
  };

  const genreOptions = [
    "All",
    "Action",
    "Adventure",
    "Arcade",
    "Board Games",
    "Card",
    "Casual",
    "Educational",
    "Family",
    "Fighting",
    "Indie",
    "Massively Multiplayer",
    "Platformer",
    "Puzzle",
    "Racing",
    "RPG",
    "Shooter",
    "Simulation",
    "Sports",
    "Strategy",
  ];

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.selectContainer}>
        <span className={styles.selectLabel}>Filtrar por género:</span>
        <select value={genre} onChange={handleGenreFilter} className={styles.selectBox}>
          {genreOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.selectContainer}>
        <span className={styles.selectLabel}>Filtrar por fuente:</span>
        <select value={source} onChange={handleSourceFilter} className={styles.selectBox}>
          <option value="All">Todos</option>
          <option value="api">API</option>
          <option value="db">Base de datos</option>
        </select>
      </div>
      <div className={styles.selectContainer}>
        <span className={styles.selectLabel}>Ordenar por:</span>
        <select value={sort} onChange={handleSort} className={`${styles.selectBox} ${styles.sortSelectBox}`}>
          <option value="name asc">Nombre ascendente</option>
          <option value="name desc">Nombre descendente</option>
          <option value="rating asc">Rating ascendente</option>
          <option value="rating desc">Rating descendente</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersByGenreAndSource;
