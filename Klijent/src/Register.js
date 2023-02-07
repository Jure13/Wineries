import React, { useEffect, useState } from "react";
import {navigate} from "@reach/router";


export const Register = () =>{
    const [email, setEmail] = useState("");
    const [naziv, setNaziv] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [temp, setTemp] = useState("");

    function zaNaziv(e) {
        setNaziv(e.target.value);
    }

    function zaEmail(e) {
        setEmail(e.target.value);
    }
    
    function zaLozinku(e) {
        setLozinka(e.target.value);
    }

    function zaTemp(e) {
        setTemp(e.target.value);
    }
    
    function handleLogin(e) {
        e.preventDefault();
    
        if (password !== temp) {
           alert("Lozinka se ne podudara!");
            return;
        }

        fetch("http://localhost:5000/api/register", {
            method: "POST",
            body: JSON.stringify({
                naziv: naziv,
                email: email,
                lozinka: lozinka
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Registriran!");
            navigate('/login'); 
        })
        .catch((err)=>console.log(err));
    }

    return(
    <div>
        <form onSubmit={(e) => {handleLogin(e);}}>
        <label htmlFor="naziv">Naziv</label>
            <input
                type="text"
                value={naziv}
                onChange={zaNaziv}
                onBlur={zaNaziv}
            ></input>
            
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

            <label htmlFor="ponoviLozinku">Ponovi lozinku</label>
            <input
                type="password"
                value={temp}
                onChange={setTemp}
                onBlur={setTemp}
            ></input>

            <button type="submit">Registriraj se</button>
        </form>
    </div>
    )
};

export default Register;