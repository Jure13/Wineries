import mongoose from "mongoose";


const korisnik = new mongoose.Schema(
    {
    ime:{type:String},
    lozinka:{type:String, required: true},
    email:{type:String, unique: true, dropDups: true, required:true},
    uloga:{type: String, default: 'kupac'},
    }
);

export const Korisnik = mongoose.model("Korisnik", korisnik);