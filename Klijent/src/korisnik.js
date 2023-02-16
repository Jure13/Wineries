import { Link, useParams } from "@reach/router";
import React, { useEffect, useState } from "react";


const DetaljiKorisnika = (props) => {
const [user, setUser] = useState()
    const { ime } = useParams();
    console.log(ime)
    useEffect(() => {
        fetch("http://localhost:5012/api/korisnik/2222")
            .then((response) => response.json())
            .then((user) => {
setUser(user)
            });
    }, [ime]);
    console.log(user)

    return user ? (
        <h1>{user.ime}</h1>
    ) : (
        <h1>Loading...</h1>
    )

}

export default DetaljiKorisnika;