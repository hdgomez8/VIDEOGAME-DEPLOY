import { useState } from "react";
import styles from './FilterByName.module.css';

function FilterByName({ videoGames, setFiltered }) {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    setSearchString(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = videoGames.filter((videoGame) =>
      videoGame.name.toLowerCase().includes(searchString)
    );
    setFiltered(filtered);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchString}
          onChange={handleChange}
          placeholder="Search by name"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}

export default FilterByName;
