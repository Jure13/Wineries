import React, {useState, useEffect, useContext} from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "./UserContext";


const SearchParams = () => {
    const [tvrtke, setTvtke] = useState([]);
    const {korisnik, setKorisnik} = useContext(UserContext);
    const [admin, setAdmin] = useState(false);
    const [vrsta, setVrsta] = useState("");
    const [dropdown, setDropdown] = useState("");

    
    useEffect(() => {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

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

        fetch("http://localhost:5000/api/tvrtka", options)
        .then((response) => response.json())
        .then((tvrtke) => {
            console.log("Email od ", korisnik);
            tvrtke = tvrtke.sort((a, b) =>(a.nazivTvrtke.toLowerCase() > b.nazivTvrtke.toLowerCase()) ? 1 : -1);
            setTvtke(tvrtke)
        });
    },[]);

    function handleVrsta(e) {
        e.preventDefault();
    }

    function zaVrstu(e) {
        setVrsta(e.target.value);
    }

    return(
        <div className="search-params">
            {korisnik ? 
                <button onClick={() => navigate('/logout')}>Odjava</button> : 
                <div>
                    <button onClick={() => navigate('/login')}>Prijava</button>
                    <button onClick={() => navigate('/register')}>Registracija</button>
                </div>
            }
            {admin ? <div>
                    <button onClick={() => navigate('/stvoriProizvod')}>Unesi proizvod</button>
                    <button onClick={() => navigate('/stvoriTvrtku')}>Unesi tvrtku</button>
                </div> : 
                <div>        
                </div>
            }
            <button onClick={() => navigate('/proizvodi')}>Proizvodi</button><br/>

            <form onSubmit={(e) => {handleVrsta(e);}}>
            <label htmlFor="vrsta">Vrsta</label>
            <input
                type="text"
                value={vrsta}
                onChange={zaVrstu}
                onBlur={zaVrstu}
            ></input>
            <button onClick={() => navigate('/vrsta/' + vrsta)}>Vrsta</button>
            </form>

            <select 
                onChange={(e) => {
                    setDropdown(e.target.value)
                }}
                >
                    <option value="">Prikaz</option>
                    {tvrtke.map((firma) => 
                        <option key={firma.nazivTvrtke} value={firma.nazivTvrtke}>{firma.nazivTvrtke}</option>     
                    )}
                </select>

  
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
        </div>
    );
}

export default SearchParams;