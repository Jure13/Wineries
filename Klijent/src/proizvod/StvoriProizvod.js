import React, { useContext, useState } from "react";
import {navigate} from "@reach/router";
import { UserContext } from "../UserContext";


const CreateProduct = () => {
    const [cijena, setCijena] = useState("");
    const [nazivProizvoda, setNazivProizvoda] = useState("");
    const [vrsta, setVrsta] = useState("");
    const [postotakAlkohola, setPostotakAlkohola] = useState("");
    const [nazivTvrtke, setNazivTvrtke] = useState("");
    const {korisnik, setKorisnik} = useContext(UserContext);


    function zaVrstu(e) {
        setVrsta(e.target.value);
    }

    function zaNazivTvrtke(e) {
        setNazivTvrtke(e.target.value);
    }

    function zaNazivProizvoda(e) {
        setNazivProizvoda(e.target.value);
    }

    function zaCijenu(e) {
        setCijena(e.target.value);
    }

    function zaPostotakAlkohola(e) {
        setPostotakAlkohola(e.target.value);
    }
    
    const handleAdd = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:5000/api/proizvod", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                cijena: cijena,
                nazivProizvoda: nazivProizvoda,
                vrsta: vrsta,
                postotakAlkohola: postotakAlkohola,
                nazivTvrtke: nazivTvrtke
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
            <h2>Stvori proizvod</h2>
            <form onSubmit={(e) => handleAdd(e)}>
            <label htmlFor="cijena">Cijena</label>
            <input
                type="text"
                value={cijena}
                onChange={zaCijenu}
                onBlur={zaCijenu}
            ></input>
            <br/>

            <label htmlFor="nazivProizvoda">Naziv proizvoda</label>
            <input
                type="text"
                value={nazivProizvoda}
                onChange={zaNazivProizvoda}
                onBlur={zaNazivProizvoda}
            ></input><br/>

            <label htmlFor="postotakAlkohola">Postotak alkohola</label>
            <input
                type="text"
                value={postotakAlkohola}
                onChange={zaPostotakAlkohola}
                onBlur={zaPostotakAlkohola}
            ></input>
            <br/>

            <label htmlFor="vrsta">Vrsta</label>
            <input
                type="text"
                value={vrsta}
                onChange={zaVrstu}
                onBlur={zaVrstu}
            ></input>
            <br/>

            <label htmlFor="nazivTvrtke">Vinarija</label>
            <input
                type="text"
                value={nazivTvrtke}
                onChange={zaNazivTvrtke}
                onBlur={zaNazivTvrtke}
            ></input><br/><br/>

            <button type="unesi">Unesi</button>
            </form>
            <br/>
            <button onClick={() => navigate('/')}>Početna</button>
        </div>
    );
}

export default CreateProduct;