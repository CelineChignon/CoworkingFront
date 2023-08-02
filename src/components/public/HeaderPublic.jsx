import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const HeaderPublic = () => {
    const navigate = useNavigate()
    const handleGetout = () => {
        Cookies.remove("jwt");
        navigate("/login")
    }
    const jwt = Cookies.get("jwt")
    const decodeUser = jwtDecode(jwt);
    console.log(decodeUser)
    return (
        <header className="containerHeader">
            <nav className="containerNavbar">
                <ul className="navBarre">
                    <li>
                        <Link to={"/"}>Accueil</Link>
                    </li>

                    <li>
                        <p >Vous connectez en tant que : {decodeUser.data.username} </p>
                    </li>
                    <li>
                        <a href="#" onClick={handleGetout}>Se déconnecter</a>
                    </li>
                </ul>
            </nav>
        </header>);
};

export default HeaderPublic;