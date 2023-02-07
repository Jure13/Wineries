import React, { useContext, useEffect, useState } from "react";
import {navigate, Link} from "@reach/router";
import { UserContext } from "../UserContext";


const Proizvodi = (props) => {
    const [proizvodi, setProizvodi] = useState([]);
    const [admin, setAdmin] = useState(false);
    const {korisnik, setKorisnik} = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/proizvodiTvrtke/" + props.nazivTvrtke)
        .then((response) => response.json())
        .then((vino) => {
            check()
            setProizvodi(vino)});
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

    return(
        <div>
            <h2>Proizvodi od {props.nazivTvrtke}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vino</th>
                        <th>Vrsta</th>
                        <th>Vinarija</th>
                        <th>Cijena</th>
                        <th>Postotak alkohola</th>
                        <th>Radnje</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi && proizvodi.map(p => 
                        <tr key={p.nazivProizvoda}>
                            <td className="name">{p.nazivProizvoda}</td>
                            <td>{p.vrsta}</td>
                            <td>{p.nazivTvrtke}</td>
                            <td>${p.cijena}</td>
                            <td>{p.postotakAlkohola}</td>
                            <td>
                                {admin ? 
                                    <div>
                                        <button onClick={() => brisiProizvod(p.nazivProizvoda)}>Briši</button>
                                        <Link to={"/proizvod/update/" + p.nazivProizvoda}>
                                            <button>Update</button>
                                        </Link>
                                    </div>
                                    :
                                    <div>
                                    </div>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default Proizvodi;