import style from "../Landing/Landing.module.css";
import {Link} from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.landing}>
      <div className={style.topRight}>
        <Link to="/home" className={style.gamersButton}>Ingresar</Link>
      </div>
    </div>
  );
};

export default Landing;
