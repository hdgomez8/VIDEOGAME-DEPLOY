import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { getVideoGames } from "../../redux/actions";
import style from "../Home/Home.module.css";
import FilterByName from "../../components/FilterByName/FilterByName"
import FiltersByGenreAndSource from "../../components/FiltersByGenreAndSource/FiltersByGenreAndSource"

const Home = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector((state) => state.videoGames);
  const [filtered, setFiltered] = useState(videoGames);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [displayedVideoGames, setDisplayedVideoGames] = useState([]);

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedItems = filtered.slice(startIndex, endIndex);

    setDisplayedVideoGames(displayedItems);
  }, [currentPage, filtered]);

  return (
    <div className={style.body}>
      <FilterByName videoGames={videoGames} setFiltered={setFiltered} />
      <FiltersByGenreAndSource videoGames={videoGames} setFiltered={setFiltered} />
      <CardsContainer filtered={displayedVideoGames} />
      <Pagination
        totalVideoGames={filtered.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
