import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const HeaderAdmin = () => {

    const navigate = useNavigate()

    // rajout d'un onclick sur le lien se deconnecter pour vider les cookies et renvoyer vers la page de connexion
    const handleGetout = () => {
        Cookies.remove("jwt");
        navigate("/login")
    }
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Accueil</Link>
                    </li>
                    <li>
                        <Link to={"/admin/coworkings"}>Liste des coworkings</Link>
                    </li>
                    <li>
                        <Link to={"/admin/coworkings/create"}>Ajouter un coworking</Link>
                    </li>
                    <li>
                        <a href="#" onClick={handleGetout}>Se déconnecter</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderAdmin;