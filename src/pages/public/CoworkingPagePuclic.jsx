import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import HeaderPublic from "../../components/public/HeaderPublic";


const CoworkingsPagePublic = () => {
    const [coworkings, setCoworkings] = useState([])

    // cette variable est un booleen pour indiquer si un utilisateur et connecté ou pas
    let isUserConnected = false;

    // je créer une variable pour stocker le cookies si l'utilisateur est connecté, l'api va verifier que le cookie du navigateur a bien un token valide 
    const jwt = Cookies.get("jwt");

    //j'utilise decode pour décoder le cookie JWT si celui si est l'une des 3 roles alors isUserConnected et vrai et donc le formulaire est accessible sinon le formulaire est caché 
    if (jwt) {
        const decodedJwt = jwtDecode(jwt);
        const role = decodedJwt.data.role;

        if (role === 1 || role === 2 || role === 3) {
            isUserConnected = true;
        }
    }

    const fetchApiCoworkings = async () => {

        const repApiCoworkings = await fetch(`http://localhost:3010/api/coworkings`)
        const repApiCoworkingsJson = await repApiCoworkings.json()
        setCoworkings(repApiCoworkingsJson.data)
    }

    useEffect(() => {
        fetchApiCoworkings();
    }, [])

    const handleCreateReview = async (event, coworkingId) => {
        event.preventDefault();

        const content = event.target.content.value;
        const rating = event.target.rating.value;

        const reviewData = {
            content: content,
            rating: parseInt(rating)
        }

        const responseCreateReview = await fetch(`http://localhost:3010/api/reviews/${coworkingId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(reviewData),
        });

        const responseCreateReviewJson = await responseCreateReview.json();

        console.log(responseCreateReviewJson)
    }

    return (

        <div>
            <HeaderPublic />
            <div className="headerBanniere">
                <h1>Liste de nos Coworkings:</h1>
            </div>
            {coworkings.map((coworking) => (
                <div key={coworking.id}>
                    <h2>{coworking.name}</h2>
                    <p>
                        Address :{coworking.address.number}  {` `}
                        {coworking.address.street} -{` `}
                        {coworking.address.postcode}
                        {coworking.address.city}

                    </p>
                    {isUserConnected && (
                        <form onSubmit={(event) => handleCreateReview(event, coworking.id)} action="review">
                            <label htmlFor="content">Votre commentaire :</label>
                            <textarea name="content" rows="4" cols="50"></textarea>

                            <label htmlFor="rating">Votre note: </label>
                            <input type="number" name="rating" min="0" max="5" />

                            <p><input type="submit" /></p>
                        </form>
                    )}
                </div>
            ))}
        </div>

    );
};

export default CoworkingsPagePublic;