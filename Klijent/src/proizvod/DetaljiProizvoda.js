import { Link, navigate, useParams } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


const DetaljiProizvoda = (props) => {
    const [proizvod, setProizvod] = useState([]);
    const { korisnik, setKorisnik } = useContext(UserContext);
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        fetch("http://localhost:5012/api/proizvodi/" + props.nazivProizvoda)
            .then((response) => response.json())
            .then((vino) => {
                check()
                setProizvod(vino)
            });
    }, []);

    function check() {
        const isAdmin = localStorage.getItem("uloga") == "admin" ? true : false;
        setAdmin(isAdmin);
    }

    function brisiProizvod(nazivProizvoda) {
        fetch("http://localhost:5012/api/proizvod/" + nazivProizvoda, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ nazivProizvoda })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    alert(response.error);
                } else {
                    alert("Podattttci izbrisani!");
                    navigate("/");
                }
            });
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Vino</th>
                        <th>Vrsta</th>
                        <th>Vinarija</th>
                        <th>Cijena</th>
                        <th>Postotak alkohola</th>
                        {admin ? <th>Radnje</th> : <th></th>}
                    </tr>
                </thead>
                <tbody>
                        <tr key={proizvod.nazivProizvoda}>
                            <td className="naziv">{proizvod.nazivProizvoda}</td>
                            <td>{proizvod.vrsta}</td>
                            <td>{proizvod.nazivTvrtke}</td>
                            <td>${proizvod.cijena}</td>
                            <td>{proizvod.postotakAlkohola}</td>
                            <td>
                                {admin ? <div>
                                    <button onClick={() => brisiProizvod(proizvod.nazivProizvoda)}>Briši</button>
                                    <Link to={"/proizvod/update/" + proizvod.nazivProizvoda}>
                                        <button>Update</button>
                                    </Link>
                                    <Link to={"/"}>
                                        <button>Početna</button>
                                    </Link>
                                </div> :
                                    <div>
                                        <Link to={"/"}>
                                            <button>Početna</button>
                                        </Link>
                                    </div>
                                }
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DetaljiProizvoda;