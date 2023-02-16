import React, { useContext, useEffect, useState } from "react";
import { navigate, useParams } from "@reach/router";
import { UserContext } from "../UserContext";


const UpdateProizvoda = (props) => {
    const [id, setId] = useState("");
    const [cijena, setCijena] = useState("");
    const [postotakAlkohola, setPostotakAlkohola] = useState("");
    const [nazivProizvoda, setNazivProizvoda] = useState("");
    const [vrsta, setVrsta] = useState("");
    const [nazivTvrtke, setNazivTvrtke] = useState("");


    useEffect(() => {
        fetch("http://localhost:5012/api/proizvodi/" + props.nazivProizvoda)
            .then((response) => response.json())
            .then((vino) => {
                setId(vino._id)
                setCijena(vino.cijena)
                setPostotakAlkohola(vino.postotakAlkohola)
                setNazivProizvoda(vino.nazivProizvoda)
                setNazivTvrtke(vino.nazivTvrtke)
                setVrsta(vino.vrsta)
            });
    }, []);

    const handleUpdated = (e) => {
        e.preventDefault();

        fetch("http://localhost:5012/api/proizvod/update/" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                cijena: cijena,
                postotakAlkohola: postotakAlkohola,
                nazivProizvoda: nazivProizvoda,
                vrsta: vrsta,
                nazivTvrtke: nazivTvrtke
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err)
                navigate('/')
            });
    }

    function zaNazivProizvoda(e) {
        setNazivProizvoda(e.target.value);
    }

    function zaVrstu(e) {
        setVrsta(e.target.value);
    }

    function zaNazivTvrtke(e) {
        setNazivTvrtke(e.target.value);
    }

    function zaPostotakAlkohola(e) {
        setPostotakAlkohola(e.target.value);
    }

    function zaCijenu(e) {
        setCijena(e.target.value);
    }

    console.log(cijena)
    return (
        <div>
            <form onSubmit={(e) => handleUpdated(e)}>
                <label htmlFor="naziv">Vino</label>
                <input type="text"
                    value={nazivProizvoda}
                    onChange={zaNazivProizvoda}>
                </input>
                <br />
                <label htmlFor="vrsta">Vrsta</label>
                <input type="text"
                    value={vrsta}
                    onChange={zaVrstu}
                    onBlur={zaVrstu}>
                </input>
                <br />
                <label htmlFor="tvrtka">Vinarija</label>
                <input type="text"
                    value={nazivTvrtke}
                    onChange={zaNazivTvrtke}
                    onBlur={zaNazivTvrtke}>
                </input>
                <br />
                <label htmlFor="postotakAlkohola">Postotak alkohola</label>
                <input type="text"
                    value={postotakAlkohola}
                    onChange={zaPostotakAlkohola}
                    onBlur={zaPostotakAlkohola}>
                </input><br />
                <label htmlFor="cijena">Cijena</label>
                <input type="text"
                    value={cijena}
                    onChange={zaCijenu}
                    onBlur={zaCijenu}>
                </input><br />
                <button type="submit">Update</button>
            </form>
            <button onClick={() => navigate('/')}>Početna</button>
        </div>
    );
}

export default UpdateProizvoda;