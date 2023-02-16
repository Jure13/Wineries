import React, { useState, useEffect, useContext } from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "./UserContext";

const roles = ["zaposlenik", "kupac"]
const SearchParams = () => {
    const [tvrtke, setTvrtke] = useState([]);
    const { korisnik, setKorisnik } = useContext(UserContext);
    const [proizvodi, setProizvodi] = useState([]);
    const [admin, setAdmin] = useState(false);
    console.log("Korisnik je ", korisnik);

    const [korisnici, setKorisnici] = useState([]);

    const func = (e, k) => {
        const raw = {
            uloga: e.target.value,
            ime: k.ime,
        }
        fetch("http://localhost:5012/api/korisnici/update", {
            method: "POST",
            body: JSON.stringify(raw),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        })
            .then((resp) => resp.json())

    }


    useEffect(() => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        const isAdmin = localStorage.getItem("uloga") == "admin" ? true : false;
        setAdmin(isAdmin);

        fetch("http://localhost:5012/api/tvrtka", options)
            .then((response) => response.json())
            .then((tvrtke) => {
                console.log("Email od ", korisnik);
                tvrtke = tvrtke.sort((a, b) => (a.nazivTvrtke.toLowerCase() > b.nazivTvrtke.toLowerCase()) ? 1 : -1);
                setTvrtke(tvrtke)
            });
        fetch("http://localhost:5012/api/proizvodi")
            .then((response) => response.json())
            .then((proizvodi) => {
                proizvodi = proizvodi.sort((a, b) => (a.nazivProizvoda.toLowerCase() > b.nazivProizvoda.toLowerCase()) ? 1 : -1);
                setProizvodi(proizvodi)
            });

        fetch("http://localhost:5012/api/korisnici")
            .then((response) => response.json())
            .then((korisnici) => {
                console.log(korisnici)
                let sortirani = korisnici.sort((a, b) => (a.ime.toLowerCase() > b.ime.toLowerCase()) ? 1 : -1);
                console.log(sortirani)
                setKorisnici(sortirani)
            });

    }, []);

    console.log(korisnici);

    return (
        <div className="search-params">
            {korisnik ?
                <button onClick={() => navigate('/logout')}>Odjava</button> :
                <div>
                    <button onClick={() => navigate('/login')}>Prijava</button>
                    <button onClick={() => navigate('/register')}>Registracija</button>
                </div>
            }
            {admin && <div>
                <button onClick={() => navigate('/stvoriProizvod')}>Unesi proizvod</button>
                <button onClick={() => navigate('/stvoriTvrtku')}>Unesi tvrtku</button>
            </div>
            }
            <button onClick={() => navigate('/proizvodi')}>Proizvodi</button><br />

            <table>
                <thead>
                    <tr>
                        <th>Vinarija</th>
                        <th>Zemlja</th>
                        <th>Godina osnutka</th>
                    </tr>
                </thead>
                <tbody>
                    {tvrtke && tvrtke.map(firma =>
                        <tr key={firma.nazivTvrtke}>
                            <Link to={"/tvrtka/detaljiTvrtke/" + firma.nazivTvrtke}>
                                <td className="nazivTvrtke">{firma.nazivTvrtke}</td>
                            </Link>
                            <td>{firma.zemlja}</td>
                            <td>{firma.godinaOsnutka}</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
                            <td>{p.nazivTvrtke}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Korisnik</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {admin && <tbody>
                    {korisnici && korisnici.map(k =>
                        <tr key={k.ime}>
                            <td><Link to={`/korisnik/${k.ime}`}>{k.ime}</Link></td>
                            <td>
                                <select
                                    defaultValue={k.uloga}
                                    selected={k.uloga}
                                    onChange={(e) => func(e, k)}
                                >
                                    {roles.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                                <h1>{k.uloga}</h1>
                            </td>
                        </tr>
                    )}
                </tbody>
                }
            </table>
        </div>
    );
}

export default SearchParams;