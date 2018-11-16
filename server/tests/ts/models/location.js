"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Location = (function () {
    function Location() {
    }
    Location.createCity = function (name, idCountry) {
        if (name && idCountry)
            base_1.pool.query({
                text: 'INSERT INTO City (name, country_id) VALUES($1, $2);',
                values: [name, idCountry],
            }, function (err, result) {
                if (err)
                    console.log(err);
            });
        else
            console.error('create city error');
    };
    Location.createCountry = function (name) {
        if (name)
            base_1.pool.query({
                text: 'INSERT INTO Country (name) VALUES($1);',
                values: [name],
            }, function (err, result) {
                if (err)
                    console.log(err);
            });
        else
            console.error('createCountry error');
    };
    Location.showAllCitysFromCountry = function (idCountry, callback) {
        base_1.pool.query({
            text: 'SELECT *FROM City WHERE country_id = $1;',
            values: [idCountry]
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null);
        });
    };
    Location.showAllCountrys = function (callback) {
        base_1.pool.query('SELECT *FROM Country;', function (err, result) {
            if (err)
                console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null);
        });
    };
    return Location;
}());
exports.default = Location;
