import express, { Router } from 'express';
import mongoose from "mongoose";
import urlencoded from 'body-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { Korisnik } from './modeli/Korisnik.js';
import { Tvrtka } from './modeli/Tvrtka.js';
import { Proizvod } from './modeli/Proizvod.js';


const app = express();

mongoose.connect("mongodb+srv://jure:1234@cluster0.sjpfno2.mongodb.net/Wineries?retryWrites=true&w=majority")
const port = 5012;

const craftProducts = express.Router();
const userRouter = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", userRouter);
app.use("/api", craftProducts);

// localhost:5012/api/

//npm start app.js

app.get('/', (req, res) => {
    res.send("Dobrodošli!");
})


// Korisnik

function signJwt1(user_id) {
    const token = jwt.sign({ sub: user_id }, process.env.SECRET);
    if (!token) return false;
    return token;
}

function verifyJwt1(req, res, next) {
    const authorization = req.header('Authorization');
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err || !payload.sub) {
            return res.status(401).send("Unauthorized");
        }
        return next();
    })
}

userRouter.route("/login").post((req, res) => {
    Korisnik.find({ email: req.body.email }, function (error, korisnici) {
        if (error || korisnici.length === 0) {
            return res.send(error);
        }
        if (req.body.lozinka !== korisnici[0].lozinka) {
            return res.send("Pogrešna lozinka!")
        }
        const token = signJwt1(korisnici[0]._id);
        return res.json({ accessToken: token, korisnik: korisnici[0].email, uloga: korisnici[0].uloga });
    })
});

userRouter.post("/korisnici/update", (req, res) => {
    Korisnik.findOneAndUpdate({ime:    req.body.ime}, { uloga: req.body.uloga }, (err, korisnik) => {
        return res.json(korisnik);
    });

});
userRouter.route('/register').post((req, res) => {
    Korisnik.find({ email: req.body.email }, function (error, korisnici) {
        if (error || korisnici.length > 0) {
            console.log(korisnici.length);
            return res.send(error);
        }
        let korisnik = new Korisnik({ ime: req.body.ime, email: req.body.email, lozinka: req.body.lozinka, uloga: req.body.uloga });
        korisnik.save();
        return res.json(korisnik);
    })
});

userRouter.route('/korisnici').get((req, res) => {
    Korisnik.find((err, korisnici) => {
        if (err) {
            res.send(err);
        }
        else {
            const filter = korisnici.filter(korisnik => korisnik.uloga !== "admin");
            return res.json(filter);
        }
    })
});

userRouter.route('/korisnik/:ime').get((req, res) => {
    Korisnik.findOne({ ime: req.params.ime }, (err, korisnik) => {
        if (err) {
            res.send(err);

        }
        else {
            return res.json(korisnik);
        }
    });
});

// Create

craftProducts.route('/tvrtka').post(verifyJwt1, (req, res) => {
    const tvrtka = new Tvrtka(req.body);
    tvrtka.save();
    return res.status(201).json(tvrtka);
});

craftProducts.route('/proizvod').post(verifyJwt1, (req, res) => {
    const proizvod = new Proizvod(req.body);
    proizvod.save();
    return res.status(201).json(proizvod);
});

// Read

craftProducts.route('/tvrtka').get((req, res) => {
    Tvrtka.find((err, proizvodi) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(proizvodi);
        }
    });
})

craftProducts.get('/tvrtka/:nazivTvrtke', (req, res) => {
    Tvrtka.findOne({ nazivTvrtke: req.params.nazivTvrtke }, (err, nazivTvrtke) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(nazivTvrtke);
        }
    });
});

craftProducts.route('/proizvodiTvrtke/:nazivTvrtke').get((req, res) => {
    Proizvod.find({ nazivTvrtke: req.params.nazivTvrtke }, (err, proizvodi) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(proizvodi);
        }
    });
});

craftProducts.route('/vrsta/:boja').get((req, res) => {
    Proizvod.find({ vrsta: req.params.vrsta }, (err, proizvod) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(proizvod);
        }
    });
});

craftProducts.route('/proizvodi').get((req, res) => {
    Proizvod.find((err, proizvodi) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(proizvodi);
        }
    })
});

craftProducts.get('/proizvodi/:nazivProizvoda', (req, res) => {
    Proizvod.findOne({ nazivProizvoda: req.params.nazivProizvoda }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(data);
        }
    });
});

// Update

craftProducts.route('/tvrtka/update/:id').put(verifyJwt1, (req, res) => {
    try {
        const nazivTvrtke = req.params.id;
        const update = req.body;
        const options = { new: true };

        Tvrtka.findByIdAndUpdate(nazivTvrtke, update, options, (err, firma) => {
            if (err) {
                res.send(err);
            } else {
                res.json(firma);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

craftProducts.route('/proizvod/update/:nazivProizvoda').put(verifyJwt1, (req, res) => {
    try {
        const nazivProizvoda = req.params.nazivProizvoda;
        const update = req.body;
        const options = { new: true };

        Proizvod.findByIdAndUpdate(nazivProizvoda, update, options, (err, vino) => {
            if (err) {
                res.send(err);
            } else {
                res.json(vino);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Delete

craftProducts.get('/provjeriProizvod/:nazivTvrtke', (req, res) => {
    Proizvod.find({ nazivTvrtke: req.params.nazivTvrtke }, (err, firma) => {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(firma);
        }
    });
});

craftProducts.route('/tvrtka/:nazivTvrtke').delete(verifyJwt1, (req, res) => {
    Tvrtka.remove({ naziv: req.params.nazivTvrtke }, (err, firma) => {
        if (err) {
            res.send(err);
        } else {
            res.json(firma);
        }
    });
});

craftProducts.route('/proizvod/:nazivProizvoda').delete(verifyJwt1, (req, res) => {
    console.log(req.params.nazivProizvoda);
    Proizvod.remove({ nazivProizvoda: req.params.nazivProizvoda }, (err, proizvod) => {
        if (err) {
            res.send(err);
        } else {
            res.json(proizvod);
        }
    });
});


app.listen(port, () => {
    console.log("Running on port " + port);
});