import mongoose from "mongoose";


const proizvod = new mongoose.Schema({
    cijena: {type: Number},
    postotakAlkohola: {type: Number},
    nazivProizvoda : {type: String},
    vrsta: {type: String},
    nazivTvrtke: {type: String},
});

export const Proizvod = mongoose.model("Proizvod", proizvod);