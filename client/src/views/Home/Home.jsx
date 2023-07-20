import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVideoGames } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Pagination/Pagination";
import style from "../Home/Home.module.css";
import FilterByName from "../../components/FilterByName/FilterByName"
import FiltersByGenreAndSource from "../../components/FiltersByGenreAndSource/FiltersByGenreAndSource"
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector((state) => state.videoGames);
  const [filtered, setFiltered] = useState(videoGames);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [displayedVideoGames, setDisplayedVideoGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getVideoGames())
    .then(()=>setLoading(false))
    .catch((error)=>{
      console.error('Error fetching video games:', error);
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedItems = filtered.slice(startIndex, endIndex);

    setDisplayedVideoGames(displayedItems);
  }, [currentPage, filtered]);

  if (loading) {
    // Render a loading spinner or loading message while data is being fetched
    return <LoadingSpinner />;
  }
  
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
