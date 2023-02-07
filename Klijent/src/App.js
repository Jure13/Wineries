import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import {Router, navigate} from "@reach/router";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

import Proizvodi from "./proizvod/Proizvodi";
import StvoriProizvod from "./proizvod/StvoriProizvod";
import StvoriTvrtku from "./tvrtka/StvoriTvrtku";
import DetaljiProizvoda from "./proizvod/DetaljiProizvoda";
import DetaljiTvrtke from "./tvrtka/DetaljiTvrtke";
import UpdateProizvoda from "./proizvod/UpdateProizvoda";
import UpdateTvrtke from "./tvrtka/UpdateTvrtke";
import ProizvodiTvrtke from "./proizvod/ProizvodiTvrtke";
import { UserContext } from "./UserContext";



const App = () => {
    const [korisnik, setKorisnik] = useState("");
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");

    function zaEmail(e) {
        setEmail(e.target.value);
    }
    
    function zaLozinku(e) {
        setLozinka(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
    
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                lozinka: lozinka
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                setKorisnik(email);
                navigate('/proizvodi');
            } else {
                console.log("Authentication error");
            }
        })
        .catch((err)=>console.log(err));
    }

    return(
        <div>
            <UserContext.Provider value={{korisnik, setKorisnik}}>
                <Router>
                    <SearchParams path="/" />
                    <Login path="/login" />
                    <Proizvodi path="/proizvodi" />
                    <StvoriProizvod path="/stvoriProizvod" />
                    <StvoriTvrtku path="/stvoriTvrtku" />
                    <DetaljiProizvoda path={"/proizvod/detaljiProizvoda/:nazivProizvoda"} />
                    <DetaljiTvrtke path={"/tvrtka/detaljiTvrtke/:nazivTvrtke"} />
                    <UpdateProizvoda path={"/proizvod/update/:nazivProizvoda"} />
                    <UpdateTvrtke path={"/tvrtka/update/:nazivTvrtke"} />
                    <ProizvodiTvrtke path={"/proizvodi/:nazivTvrtke"} />
                    <Register path="/register" />
                    <Logout path="/logout" />
                </Router>
            </UserContext.Provider>
        </div>
    );
}

render(<App/>, document.getElementById("root"));
