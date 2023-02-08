import { navigate, useParams, Link } from "@reach/router";
import React, { Component, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


const detaljiTvrtke = (props) => {
    const [tvrtka, setTvrtka] = useState([]);
    const { korisnik, setKorisnik } = useContext(UserContext);
    const [admin, setAdmin] = useState(false);

console.log(props.nazivTvrtke);
    useEffect(() => {
        const isAdmin = localStorage.getItem("uloga") == "admin" ? true : false;
        setAdmin(isAdmin);
        fetch("http://localhost:5012/api/tvrtka/" + props.nazivTvrtke)
            .then((response) => response.json())
            .then((firma) => {
                setTvrtka(firma)
            });
    }, []);

    function brisiTvrtku(nazivTvrtke) {
        fetch("http://localhost:5012/api/provjeriProizvod/" + nazivTvrtke)
            .then(response => response.json())
            .then(vino => {
                if (vino.error) {
                    alert(product.error);
                }
                else {
                    if (vino.length == 0) {
                        fetch("http://localhost:5012/api/tvrtka/" + nazivTvrtke, {
                            method: "DELETE",
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token"),
                                "Content-type": "application/json;charset=UTF-8"
                            },
                            body: JSON.stringify({ nazivTvrtke })
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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Godina osnutka</th>
                        <th>Zemlja</th>
                        <th>Opis</th>
                        {admin ? <th>Radnje</th> : <th></th>}
                    </tr>
                </thead>
                <tbody>
                        <tr key={tvrtka.nazivTvrtke}>
                            <td className="nazivTvrtke">{tvrtka.nazivTvrtke}</td>
                            <td>{tvrtka.godinaOsnutka}</td>
                            <td>{tvrtka.zemlja}</td>
                            <td>{tvrtka.opis}</td>
                            <td>
                                <Link to={"/"}>
                                    <button>Početna</button>
                                </Link>
                                {admin ? <div>
                                    <button onClick={() => brisiTvrtku(tvrtka.nazivTvrtke)}>Briši</button>
                                    <Link to={"/tvrtka/update/" + tvrtka.nazivTvrtke}>
                                        <button>Update</button>
                                    </Link>
                                </div> :
                                    <div>
                                    </div>
                                }
                                <Link to={"/proizvodi/" + tvrtka.nazivTvrtke}>
                                    <button>Sva vina</button>
                                </Link>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}

export default detaljiTvrtke;