import React, { useContext, useState } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "./UserContext";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const { korisnik, setKorisnik } = useContext(UserContext);

    function zaEmail(e) {
        setEmail(e.target.value);
    }

    function zaLozinku(e) {
        setLozinka(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();

        fetch("http://localhost:5012/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                lozinka: lozinka
            }),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.accessToken) {
                    localStorage.setItem("token", data.accessToken);
                    localStorage.setItem("uloga", data.uloga);
                    localStorage.setItem("email", data.korisnik);
                    navigate('/');
                } else {
                    console.log("Authentication error");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <form onSubmit={(e) => { handleLogin(e); }}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={zaEmail}
                    onBlur={zaEmail}
                ></input>

                <label htmlFor="lozinka">Lozinka</label>
                <input
                    type="password"
                    value={lozinka}
                    onChange={zaLozinku}
                    onBlur={zaLozinku}
                ></input>

                <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login;