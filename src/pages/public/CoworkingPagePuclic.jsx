import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HeaderPublic from "../../components/public/HeaderPublic";
const CoworkingsPagePublic = () => {
    const navigate = useNavigate()
    const [coworkings, setCoworkings] = useState([])
    const [deleteCoworkingMessage, setDeleteCoworkingMessage] = useState(null);

    const fetchApiCoworkings = async () => {

        const repApiCoworkings = await fetch(`http://localhost:3010/api/coworkings?nosort=true`)
        const repApiCoworkingsJson = await repApiCoworkings.json()
        setCoworkings(repApiCoworkingsJson.data)
    }
    //Je passe la variable deleteCoworkingMessage dans la fonction useEffect, à chaque utilisation de cette variable par un utilisateur la liste des coworkings sera mise à jour
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


        fetchApiCoworkings();
    }, [deleteCoworkingMessage])
    // Rajout d'une condition, si les cookies jwt sont vident alors on redirige l'utlisateur vers la page de login 

    // je créer une variable pour stocker le cookies et si l'utilisateur est connecté, Authorization (rajouté dans headers) va verifier que le cookie du navigateur a bien un token valide 
    const token = Cookies.get("jwt");
    //Je rajoute la méthode Delete, car un appel vers une api est automatiquement un GET donc pour indiquer à React se que je souhaite faire je rajoute une méthode.
    const handleDeleteCoworking = async (coworkingId) => {
        const repDeleteCoworking = await fetch(`http://localhost:3010/api/coworkings/${coworkingId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const repDeleteCoworkingJson = await repDeleteCoworking.json()
        setDeleteCoworkingMessage(repDeleteCoworkingJson.message)
    }


    return (

        <div>
            <HeaderPublic />
            <h1>Liste de nos Coworkings:</h1>
            {deleteCoworkingMessage && <p>{deleteCoworkingMessage}</p>}
            {coworkings.map((coworking) => (
                <div key={coworking.id}>
                    <h2>{coworking.name}</h2>
                    <p>
                        Address :{coworking.address.number}  {` `}
                        {coworking.address.street} -{` `}
                        {coworking.address.postcode}
                        {coworking.address.city}

                    </p>

                    <Link to={`/admin/coworkings/${coworking.id}/update`}>Mettre à jour le coworking</Link>
                    <button onClick={() => handleDeleteCoworking(coworking.id)}>Supprimer le Coworking</button>
                </div>
            ))}
        </div>
    );
};

export default CoworkingsPagePublic;