import { navigate, useParams, Link } from "@reach/router";
import React, { Component, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


const detaljiTvrtke = (props) => {
    const [tvrtka, setTvrtka] = useState([]);
    const {korisnik, setKorisnik} = useContext(UserContext);
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        if(korisnik) {
            fetch("http://localhost:5000/api/provjera/" + korisnik)
            .then((response) => response.json())
            .then((email) => {
                email.map((mail) => {
                    console.log(mail.role)
                    if(mail.role == "admin") {
                        setAdmin(true);
                    }
                })
            })
        }

        fetch("http://localhost:5000/api/tvrtka/" + props.nazivTvrtke)
        .then((response) => response.json())
        .then((firma) => {
            setTvrtka(firma)});
    }, []);

    function brisiTvrtku(nazivTvrtke) {
       fetch("http://localhost:5000/api/provjeriProizvod/" + nazivTvrtke)
        .then(response => response.json())
        .then(vino => {
            if(vino.error) {
                alert(product.error);
            }
            else {
                if(vino.length == 0) {
                    fetch("http://localhost:5000/api/tvrtka/" + nazivTvrtke, {
                        method: "DELETE",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                            "Content-type": "application/json;charset=UTF-8"},
                        body: JSON.stringify({nazivTvrtke})
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.error) {
                            alert(response.error);
                        } else {
                            alert("Podatci izbrisani!");
                            navigate("/");
                        }  
                    });
                }
                else {
                    alert("Nešto ne valja, ne može se obrisati...");
                }
            }
        })
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Godina osnutka</th>
                        <th>Zemlja</th>
                        <th>Opis</th>
                        {admin ? <th>Radnje</th> : <th></th> }
                    </tr>
                </thead>
                <tbody>
                    {tvrtka && tvrtka.map(t => 
                        <tr key={t.nazivTvrtke}>
                            <td className="nazivTvrtke">{t.nazivTvrtke}</td>
                            <td>{t.godinaOsnutka}</td>
                            <td>{t.zemlja}</td>
                            <td>{t.opis}</td>
                            <td>
                                <Link to={"/" }>
                                    <button>Početna</button>
                                </Link>
                                {admin ? <div>
                                        <button onClick={() => brisiTvrtku(t.nazivTvrtke)}>Briši</button>
                                        <Link to={"/tvrtka/update/" + t.nazivTvrtke}>
                                            <button>Update</button>
                                        </Link>
                                    </div> :
                                <div>
                                </div>
                                }
                                <Link to={"/proizvodi/" + t.nazivTvrtke}>
                                    <button>Sva vina</button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default detaljiTvrtke;