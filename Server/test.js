import assert from 'assert';
import mongoose from 'mongoose';
import { Tvrtka } from './modeli/Tvrtka.js';

describe('Nesting records', function() {

    if('Tvrtka stvorena', function(done) {
        var pat = new Tvrtka({
            nazivTvrtke: "Pelješac",
            godinaOsnutka: 1990,
            zemlja: "Hrvatska",
            opis: "Najbolje vino južno od Hvara",
            proizvod: [{
                cijena: 10,
                postotakAlkohola: 12.0,
                vrsta: "crno"
            }]
        })
    });

    pat.save().then(function() {
        findOne({name:"Pelješac"}).then(function(record) {
            assert(record.product.length === 1)
            done()
        })
    })
});