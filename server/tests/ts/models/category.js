"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Category = (function () {
    function Category() {
    }
    Category.create = function (name) {
        base_1.pool.query({
            text: 'INSERT INTO Category (name) VALUES($1);',
            values: [name],
        }, function (err, result) {
            if (err)
                console.log(err);
        });
    };
    Category.createSub = function (name, id_parent) {
        base_1.pool.query({
            text: 'INSERT INTO Category (name, id_parent) VALUES($1, $2);',
            values: [name, id_parent],
        }, function (err, result) {
            if (err)
                console.log(err);
        });
    };
    Category.showAll = function (callback) {
        base_1.pool.query('SELECT *FROM Category WHERE id_parent IS NULL;', function (err, result) {
            if (err)
                console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null);
        });
    };
    Category.showAllSub = function (id_parent, callback) {
        base_1.pool.query({
            text: 'SELECT *FROM Category WHERE id_parent = $1;',
            values: [id_parent]
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null);
        });
    };
    return Category;
}());
exports.default = Category;
