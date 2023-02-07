import React, { useContext, useEffect, useState } from "react";
import {navigate, useParams} from "@reach/router";
import { UserContext } from "../UserContext";


const UpdateTvrtke = (props) => {
    const [id, setId] = useState("");
    const [nazivTvrtke, setNazivTvrtke] = useState("");
    const [godinaOsnutka, setGodinuOsnutka] = useState("");
    const [zemlja, setZemlja] = useState("");
    const [opis, setOpis] = useState("");
    const {korisnik, setKorisnik} = useContext(UserContext);


    useEffect(() => {
        fetch("http://localhost:5000/api/tvrtka/" + props.nazivTvrtke)
        .then((response) => response.json())
        .then((firma) => {
            setId(firma[0]._id)
            setNazivTvrtke(firma[0].nazivTvrtke)
            setGodinuOsnutka(firma[0].godinaOsnutka)
            setZemlja(firma[0].zemlja)
            setOpis(firma[0].opis)});
    }, []);

    function zaNaziv(e) {
        setNazivTvrtke(e.target.value);
    }

    function zaOpis(e) {
        setOpis(e.target.value);
    }

    function zaZemlju(e) {
        setZemlja(e.target.value);
    }

    function zaGodOsnutka(e) {
        setGodinuOsnutka(e.target.value);
    }


    const handleUpdated = (e) => {
        e.preventDefault();
    
        fetch("http://localhost:5000/api/tvrtka/update/" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
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
            <form onSubmit={(e) => handleUpdated(e)}>
                <label htmlFor="nazivTvrtke">Naziv</label>
                    <input type="text"
                        value={nazivTvrtke}
                        onChange={zaNaziv}>
                    </input>
                    <br/>
                    <label htmlFor="godinaOsnutka">Godina osnutka</label>
                    <input type="text"
                        value={godinaOsnutka}
                        onChange={zaGodOsnutka}
                        onBlur={zaGodOsnutka}>
                    </input>
                    <br/>
                    <label htmlFor="zemlja">Zemlja</label>
                    <input type="text"
                        value={zemlja}
                        onChange={zaZemlju}
                        onBlur={zaZemlju}>
                    </input>
                    <br/>
                    <label htmlFor="opis">Opis</label>
                    <input type="text"
                        value={opis}
                        onChange={zaOpis}
                        onBlur={zaOpis}>
                    </input>
                    <br/>
                    
                <button type="submit">Update</button>
            </form>
            <button onClick={() => navigate('/')}>Početna</button>
        </div>
    );
}

export default UpdateTvrtke;