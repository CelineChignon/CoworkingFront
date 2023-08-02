import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const HeaderAdmin = () => {

    const navigate = useNavigate()

    // rajout d'un onclick sur le lien se deconnecter pour vider les cookies et renvoyer vers la page de connexion
    const handleGetout = () => {
        Cookies.remove("jwt");
        navigate("/login")
    }
    const jwt = Cookies.get("jwt")
    const decodeUser = jwtDecode(jwt);
    console.log(decodeUser)
    // je rajoute une variable qui lit le cookies utiliser par le navigateur, ensuite je rajoute une variable qui utilise la librairie jwtDecode qui sert à décripter le token du username cela renvoit un objet avec le username 

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
                        <p>Vous connectez en tant que : {decodeUser.data} </p>
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