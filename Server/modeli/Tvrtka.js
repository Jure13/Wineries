import mongoose from "mongoose";


const tvrtka = new mongoose.Schema({
    nazivTvrtke: {type: String},
    godinaOsnutka: {type: Number},
    zemlja: {type: String},
    opis: {type: String},
});

export const Tvrtka = mongoose.model("Tvrtka", tvrtka);
