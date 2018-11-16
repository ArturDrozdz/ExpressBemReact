"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var History = (function () {
    function History() {
    }
    History.add = function (is_favorite, id_user, id_vacancy, id_resume) {
        base_1.pool.query({
            text: 'INSERT INTO History (is_favorite, id_user, id_vacancy ,id_resume) VALUES($1, $2, $3, $4)',
            values: [is_favorite ? 1 : 0, id_user, id_vacancy, id_resume]
        }, function (err, _) {
            if (err) {
                if (err.code == 23505)
                    console.log('Duplicate History');
                else
                    console.log(err);
            }
        });
    };
    History.getHistory = function (id_user, t_vacancy_f_resume, callback) {
        base_1.pool.query({
            text: "SELECT *FROM History WHERE is_favorite = $1 AND id_user = " + id_user + " AND id_vacancy = $2",
            values: [0, t_vacancy_f_resume ? 1 : 0]
        }, function (err, result) {
            if (err)
                console.log(err);
            callback(result);
        });
    };
    History.getFavorites = function (id_user, vacancy_or_resume, callback) {
        base_1.pool.query({
            text: "SELECT *FROM History WHERE is_favorite = $1 AND id_user = " + id_user,
            values: [1]
        }, function (err, result) {
            if (err)
                console.log(err);
            callback(result);
        });
    };
    return History;
}());
exports.History = History;
