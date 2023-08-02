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

        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
                <Link class="navbar-brand" to={"/"}>Accueil</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <p className="nav-link active">Bonjour : {decodeUser.data.username} </p>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link active" href="#" onClick={handleGetout}>Se déconnecter</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default HeaderPublic;