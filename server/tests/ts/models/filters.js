"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Filters = (function () {
    function Filters() {
    }
    Filters.add = function (id_user, obj) {
        var str1 = 'id_user';
        var str2 = '$1, ';
        var values = [id_user];
        var count = 1;
        for (var key in obj) {
            str1 += ", " + key;
            str2 += ", " + count;
            values.push(obj[key]);
        }
        base_1.pool.query({
            text: "INSERT INTO Filters (" + str1 + ") VALUES(" + str2 + ")",
            values: values
        }, function (err, _) {
            if (err)
                console.log(err);
        });
    };
    Filters.getFilters = function (id_user, t_vacancy_f_resume, callback) {
        base_1.pool.query({
            text: "SELECT *FROM Filters WHERE id_user = $1 AND id_user = " + id_user + " AND type = $2",
            values: [id_user, t_vacancy_f_resume ? 1 : 0]
        }, function (err, result) {
            if (err)
                console.log(err);
            callback(result);
        });
    };
    return Filters;
}());
exports.Filters = Filters;
