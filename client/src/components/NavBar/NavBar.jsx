import { Link } from "react-router-dom"
import style from "./NavBar.module.css"

const NavBar = ({ handleChange, handleSubmit, handleGenreFilter, handleSourceFilter, handleSort  }) => {
    return (
        <div className={style.navbar}>
            <div className={style.navbarleft}>
                <ul className={style.navbarnav}>
                    <li><Link to="/" className={style.customlink}>LANDING</Link></li>
                    <li><Link to="/home" className={style.customlink}>HOME</Link></li>
                    <li><Link to="/form" className={style.customlink}>CREATE VIDEOGAME</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar;