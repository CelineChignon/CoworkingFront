import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        const repApiLogin = await fetch("http://localhost:3010/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        if (repApiLogin.status === 200) {
            const loginData = await repApiLogin.json();
            const jwt = loginData.data;
            Cookies.set("jwt", jwt);
            navigate("/admin/");
        }
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />

                <label htmlFor="password">Password</label>
                <input type="text" name="password" />

                <button type="submit">Connexion</button>
            </form>

        </>
    )
};

export default LoginPage;