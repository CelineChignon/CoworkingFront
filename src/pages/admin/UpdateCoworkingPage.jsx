import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";


const UpdateCoworkingPage = () => {
    //const { id } = useParams()  sert à récupérer l'id de l'url
    const { id } = useParams()
    const navigate = useNavigate()

    const [coworking, setCoworking] = useState(null)


    const fetchUpdateApi = async () => {
        const repUpdateApi = await fetch(`http://localhost:3010/api/coworkings/${id}`)
        const repUpdateApiJson = await repUpdateApi.json()

        setCoworking(repUpdateApiJson.data)
    }



    const handleSubmitUpdate = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const superficy = event.target.superficy.value;
        const capacity = event.target.capacity.value;
        const price_hour = event.target.price_hour.value;
        const price_day = event.target.price_day.value;
        const price_month = event.target.price_month.value;
        const address_number = event.target.address_number.value;
        const address_street = event.target.address_street.value;
        const address_postcode = event.target.address_postcode.value;
        const address_city = event.target.address_city.value;

        //création de l'objet coworkingData au format attendu par la  base de données. Je rajoute des condition ex si price_hour est renseigné on prend la donné sinon en indique null
        const coworkingData = {
            name: name,
            price: {
                hour: price_hour ? parseInt(price_hour) : null,
                day: price_day ? parseInt(price_day) : null,
                month: price_month ? parseInt(price_month) : null,
            },
            superficy: superficy ? parseInt(superficy) : null,
            capacity: capacity ? parseInt(capacity) : null,
            address: {
                number: address_number ? parseInt(address_number) : null,
                street: address_street,
                postCode: address_postcode ? parseInt(address_postcode) : null,
                city: address_city,
            },


        };
        // je créer une variable pour stocker le cookies et si l'utilisateur est connecté, Authorization (rajouté dans headers) va verifier que le cookie du navigateur a bien un token valide 
        const token = Cookies.get("jwt");
        const responseApiUpdate = await fetch(`http://localhost:3010/api/coworkings/${id}`, {
            method: "PUT",
            body: JSON.stringify(coworkingData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const responseApiUpdateJson = responseApiUpdate.json()



        if (responseApiUpdate.status === 200) {
            navigate("/admin/coworkings");
        }
    }
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
        fetchUpdateApi();
    }, []);
    // Rajout d'une condition, si les cookies jwt sont vident alors on redirige l'utlisateur vers la page de login 
    return (
        <>
            <HeaderAdmin />
            <form onSubmit={handleSubmitUpdate}>
                <h1>Update a coworking </h1>
                <p>Created the : {coworking && coworking.createdAt}</p>

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={coworking && coworking.name} />
                </div>
                <div>
                    <label htmlFor="superficy">Superficy</label>
                    <input type="number" name="superficy" defaultValue={coworking && coworking.superficy} />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" name="capacity" defaultValue={coworking && coworking.capacity} />
                </div>
                <div>
                    <h3>Price:</h3>
                    <div>
                        <label htmlFor="price_hour">Price by hour</label>
                        <input type="number" name="price_hour" defaultValue={coworking && coworking.price.hour} />
                    </div>

                    <div>
                        <label htmlFor="price_day">Price by day</label>
                        <input type="number" name="price_day" defaultValue={coworking && coworking.price.day} />
                    </div>

                    <div>
                        <label htmlFor="price_month">Price by month</label>
                        <input type="number" name="price_month" defaultValue={coworking && coworking.price.month} />
                    </div>
                </div>

                <div>
                    <h3>Address:</h3>
                    <div>
                        <label htmlFor="address_number">Address number</label>
                        <input type="text" name="address_number" defaultValue={coworking && coworking.address.number} />
                    </div>

                    <div>
                        <label htmlFor="address_street">Address street</label>
                        <input type="text" name="address_street" defaultValue={coworking && coworking.address.street} />
                    </div>

                    <div>
                        <label htmlFor="address_postcode">Address zipcode</label>
                        <input type="number" name="address_postcode" defaultValue={coworking && coworking.address.postCode} />
                    </div>

                    <div>
                        <label htmlFor="address_city">Address city</label>
                        <input type="text" name="address_city" defaultValue={coworking && coworking.address.city} />
                    </div>


                </div>
                <p><button>Modifier</button></p>


            </form>

        </>
    )

};

export default UpdateCoworkingPage;