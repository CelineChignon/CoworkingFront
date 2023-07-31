import { useNavigate } from "react-router-dom";

const CreateCoworkingPage = () => {
    const navigate = useNavigate()

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        //preventDefault est une fonction qui évite la réactualisation de la page une fois le submit du formualaire effectué 
        //Récupération des valeurs inscrit par l'utilisateur avec le target.value
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

        //création de l'objet coworkingData pour envoyer la requête auprès de la base de données.
        const coworkingData = {
            name: name,
            price: {
                hour: parseInt(price_hour),
                day: parseInt(price_day),
                month: parseInt(price_month),
            },
            superficy: parseInt(superficy),
            capacity: parseInt(capacity),
            address: {
                number: parseInt(address_number),
                street: address_street,
                postCode: parseInt(address_postcode),
                city: address_city,
            },

        };
        console.log(coworkingData)
        //méthode Post pour effectuer des requêtes de création vers l'api, on renvoit dans le body les valeurs récuperées dans coworkingData
        //la requête s'effectue sous le format JSON
        const responseCreate = await fetch("http://localhost:3010/api/coworkings", {
            method: "POST",
            body: JSON.stringify(coworkingData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseCreateJson = responseCreate.json()
        navigate("/coworkings");
    }
    // Utilisation de navigate pour rediriger l'utilisateur sur la liste des coworkings après rajout de la création
    return (
        <form onSubmit={handleSubmitCreate} >
            <h1>Creating a coworking </h1>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" />
            </div>
            <div>
                <label htmlFor="superficy">Superficy</label>
                <input type="number" name="superficy" />
            </div>
            <div>
                <label htmlFor="capacity">capacity</label>
                <input type="number" name="capacity" />
            </div>
            <div>
                <h3>Price:</h3>
                <div>
                    <label htmlFor="price_hour">Price by hour</label>
                    <input type="number" name="price_hour" />
                </div>

                <div>
                    <label htmlFor="price_day">Price by day</label>
                    <input type="number" name="price_day" />
                </div>

                <div>
                    <label htmlFor="price_month">Price by month</label>
                    <input type="number" name="price_month" />
                </div>
            </div>

            <div>
                <h3>Address:</h3>
                <div>
                    <label htmlFor="address_number">Address number</label>
                    <input type="number" name="address_number" />
                </div>

                <div>
                    <label htmlFor="address_street">Address street</label>
                    <input type="text" name="address_street" />
                </div>

                <div>
                    <label htmlFor="address_postcode">Address zipcode</label>
                    <input type="number" name="address_postcode" />
                </div>

                <div>
                    <label htmlFor="address_city">Address city</label>
                    <input type="text" name="address_city" />
                </div>


            </div>
            <p><input type="submit" /></p>


        </form>
    )
}

export default CreateCoworkingPage