import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";


const DashboardPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const jwt = Cookies.get("jwt");

        // s'il existe pas, ça veut que l'utilisateur n'est pas connecté
        // on le redirige vers la page de login
        if (!jwt) {
            navigate("/login");
        }

        // on décode le jwt
        const user = jwtDecode(jwt);

        // si l'utilisateur a le rôle user
        // on le redirige vers l'accueil public
        if (user.data.role === 1) {
            navigate("/");
        }

    }, []);


    return (
        <>
            <HeaderAdmin />
            <p>Bienvenue sur votre Dashboard</p>;
        </>
    )
};

export default DashboardPage;