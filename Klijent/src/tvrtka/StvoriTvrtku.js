import React, { useContext, useEffect, useState } from "react";
import {navigate} from "@reach/router";
import { UserContext } from "../UserContext";


const StvoriTvrtku = () => {
    const [nazivTvrtke, setNaziv] = useState("");
    const [godinaOsnutka, setGodinaOsnutka] = useState("");
    const [zemlja, setZemlja] = useState("");
    const [opis, setOpis] = useState("");


    function zaOpis(e) {
        setOpis(e.target.value);
    }

    function zaZemlju(e) {
        setZemlja(e.target.value);
    }

    function zaGodinuOsnutka(e) {
        setGodinaOsnutka(e.target.value);
    }

    function zaNaziv(e) {
        setNaziv(e.target.value);
    }
    
    const handleAdd = (e) => {
        e.preventDefault();

        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        
        fetch("http://localhost:5012/api/tvrtka", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify({
                nazivTvrtke: nazivTvrtke,
                godinaOsnutka: godinaOsnutka,
                zemlja: zemlja,
                opis: opis
            }),
            
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/'); 
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <h2>Stvori tvrtku</h2>
            <form onSubmit={(e) => handleAdd(e)}>

            <label htmlFor="nazivTvrtke">Naziv</label>
            <input
                type="text"
                value={nazivTvrtke}
                onChange={zaNaziv}
                onBlur={zaNaziv}
            ></input>
            <br/>

            <label htmlFor="godinaOsnutka">Godina osnutka</label>
            <input
                type="text"
                value={godinaOsnutka}
                onChange={zaGodinuOsnutka}
                onBlur={zaGodinuOsnutka}
            ></input><br/>

            <label htmlFor="zemlja">Zemlja</label>
            <input
                type="text"
                value={zemlja}
                onChange={zaZemlju}
                onBlur={zaZemlju}
            ></input>
            <br/>

            <label htmlFor="opis">Opis</label>
            <input
                type="text"
                value={opis}
                onChange={zaOpis}
                onBlur={zaOpis}
            ></input>
            <br/><br/>

            <button type="unesi">Unesi</button>
            </form>
            <br/>
            <button onClick={() => navigate('/')}>Početna</button>
        </div>
    );
}

export default StvoriTvrtku;