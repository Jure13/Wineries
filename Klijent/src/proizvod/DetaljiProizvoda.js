import { Link, navigate, useParams } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


const DetaljiProizvoda = (props) => {
    const [proizvod, setProizvod] = useState([]);
    const {korisnik, setKorisnik} = useContext(UserContext);
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        fetch("http://localhost:5000/api/proizvodi/" + props.nazivProizvoda)
        .then((response) => response.json())
        .then((vino) => { 
            check()
            setProizvod(vino)});
    }, []);

    function check() {
        if(korisnik) {
            fetch("http://localhost:5000/api/check/" + korisnik)
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
    }

    function brisiProizvod(nazivProizvoda) {
        fetch("http://localhost:5000/api/proizvod/" + nazivProizvoda, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({nazivProizvoda})
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

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Vino</th>
                        <th>Vrsta</th>
                        <th>Vinarija</th>
                        <th>Cijena</th>
                        <th>Postotak alkohola</th>
                        {admin ? <th>Radnje</th> : <th></th> }
                    </tr>
                </thead>
                <tbody>
                    {proizvod && proizvod.map(p => 
                        <tr key={p.nazivProizvoda}>
                            <td className="naziv">{p.nazivProizvoda}</td>
                            <td>{p.vrsta}</td>
                            <td>{p.nazivProizvoda}</td>
                            <td>${p.cijena}</td>
                            <td>{p.postotakAlkohola}</td>
                            <td>
                                { admin ? <div>
                                    <button onClick={() => brisiProizvod(p.nazivProizvoda)}>Briši</button>
                                    <Link to={"/proizvod/update/" + p.nazivProizvoda}>
                                        <button>Update</button>
                                    </Link>
                                    <Link to={"/" }>
                                        <button>Početna</button>
                                    </Link>
                                </div> : 
                                <div>
                                    <Link to={"/" }>
                                        <button>Početna</button>
                                    </Link>
                                </div>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DetaljiProizvoda;