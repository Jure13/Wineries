import React, {useContext, useEffect, useState} from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "../UserContext";


const Proizvodi = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const {korisnik, setKorisnik} = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/proizvodi")
        .then((response) => response.json())
        .then((proizvodi) => { 
            proizvodi = proizvodi.sort((a, b) =>(a.productName.toLowerCase() > b.productName.toLowerCase()) ? 1 : -1);
            setProizvodi(proizvodi) });
    },[]);

    return(
        <div className="search-params">
            <div>
                { !korisnik ?
                   <div>
                        <button onClick={() => navigate('/login')}>Prijava</button>
                        <button onClick={() => navigate('/register')}>Registracija</button>
                    </div> :
                    <div>
                        <button onClick={() => navigate('/logout')}>Odjava</button>
                    </div>
                }
                <button onClick={() => navigate('/')}>Početna</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Vino</th>
                        <th>Vrsta</th>
                        <th>Vinarija</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi && proizvodi.map(p => 
                        <tr key={p.nazivProizvoda}>
                            <Link to={"/proizvod/detaljiProizvoda/" + p.nazivProizvoda}>
                                <td className="naziv">{p.nazivProizvoda}</td>
                            </Link>
                            <td>{p.vrsta}</td>
                            <td>{p.vinarija}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Proizvodi;