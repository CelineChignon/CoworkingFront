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


    let isUserConnected = false;

    let decodedJwt = null


    if (jwt) {
        decodedJwt = jwtDecode(jwt);
        const role = decodedJwt.data.role;

        if (role === 1 || role === 2 || role === 3) {
            isUserConnected = true;
        }
    }
    return (

        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>Accueil</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/coworkings"}>Liste des coworkings</Link>
                        </li>
                        {isUserConnected &&
                            <>
                                <li className="nav-item">
                                    <p className="nav-link active">Bonjour : {decodedJwt.data.username} </p>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link active" href="#" onClick={handleGetout}>Se déconnecter</a>
                                </li>
                            </>
                        }
                        <li>
                            <Link className="nav-link active" to={"/login"}>Se connecter</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default HeaderPublic;