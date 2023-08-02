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

        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
                <Link class="navbar-brand" to={"/"}>Accueil</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/admin/coworkings"}>Liste des coworkings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/admin/coworkings/create"}>Ajouter un coworking</Link>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link active">Bonjour : {decodeUser.data.username} </p>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={handleGetout}>Se déconnecter</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default HeaderAdmin;