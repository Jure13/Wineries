import React, { useContext } from "react";
import { navigate, Redirect } from "@reach/router";
import { UserContext } from "./UserContext";


const Logout = () => {
    const { korisnik, setKorisnik } = useContext(UserContext);
    localStorage.removeItem("token");
    setKorisnik("");
    navigate('/')
    return <div></div>
};

export default Logout;