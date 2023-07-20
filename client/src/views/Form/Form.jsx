import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { postVideoGame } from '../../redux/actions';
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  const [genresOptions, setGenresOptions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Función para obtener los géneros disponibles
  const fetchGenres = async () => {
    try {
      const response = await axios.get('/genres');
      setGenresOptions(response.data);
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const [form, setForm] = useState({
    name: "",
    image: "",
    platforms: [],
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    platforms: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
  };

  const validate = (form) => {
    let isValid = true;
    const newErrors = {};

    for (const key in form) {
      if (typeof form[key] === "string" && form[key].trim() === "") {
        newErrors[key] = `${key} vacío`;
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    setErrors({ ...errors, ...newErrors });
    return isValid;
  };


  const handleGenresChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedOptions);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (validate(form) && selectedGenres.length > 0) {
      const videoGameData = { ...form, genres: selectedGenres };
      dispatch(postVideoGame(videoGameData));
      // Limpiar el formulario después del envío
      setForm({
        name: "",
        image: "",
        platforms: [],
        description: "",
        releaseDate: "",
        rating: "",
        genres: [],
      });
      setSelectedGenres([]);
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>name:</label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
          className={styles.formInput}
        />
        <span className={styles.formError}>{errors.name}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>image:</label>
        <input
          type="text"
          value={form.image}
          onChange={changeHandler}
          name="image"
          className={styles.formInput}
        />
        <span className={styles.formError}>{errors.image}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>platforms:</label>
        <input
          type="text"
          value={form.platforms}
          onChange={changeHandler}
          name="platforms"
          className={styles.formInput}
        />
        <span className={styles.formError}>{errors.platforms}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>description:</label>
        <input
          type="text"
          value={form.description}
          onChange={changeHandler}
          name="description"
          className={styles.formInput}
        />
        <span className={styles.formError}>{errors.description}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>releaseDate:</label>
        <input
          type="text"
          value={form.releaseDate}
          onChange={changeHandler}
          name="releaseDate"
          className={styles.formInput}
        />
        <span className={styles.formError}>{errors.releaseDate}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>rating:</label>
        <input
          type="text"
          value={form.rating}
          onChange={changeHandler}
          name="rating"
          className={styles.formInput}
        />
        <span className={styles.formError}>{errors.rating}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>genres:</label>
        <select
          value={selectedGenres}
          onChange={handleGenresChange}
          name="genres"
          className={styles.formInput}
          multiple
        >
          {genresOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <span className={styles.formError}>{errors.genres}</span>
      </div>
      <button type="submit" className={styles.formButton}>
        Create VideoGame
      </button>
    </form>
  );
};

export default Form;
