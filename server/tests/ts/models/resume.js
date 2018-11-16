"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Resume = (function () {
    function Resume() {
    }
    Resume.create = function (data) {
        base_1.pool.query(base_1.getQueryInsert('Resume', data), function (err, result) {
            if (err)
                console.log(err);
        });
    };
    Resume.getAllPublicQuery = function (query, countInPage, callback) {
        var queryStr = 'SELECT *FROM Resume WHERE ';
        var queryVal = [];
        if (query.creator_id) {
            queryStr += 'creator_id = $1';
            queryVal.push(query.creator_id);
        }
        else {
            queryStr += 'is_public = $1';
            queryVal.push(1);
        }
        base_1.pool.query({
            text: queryStr + ';',
            values: queryVal,
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result) {
                base_1.pool.query('SELECT COUNT(*) FROM Resume;', function (err, count) {
                    callback(result.rows, Math.ceil(count.rows[0].count / countInPage));
                });
            }
            else
                callback([], 0);
        });
    };
    Resume.findById = function (id, callback) {
        base_1.pool.query({
            text: 'SELECT *FROM Resume WHERE id = $1;',
            values: [id],
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result && result.rows.length > 0)
                callback(result.rows[0]);
            else
                callback(null);
        });
    };
    Resume.updateOne = function (id, data) {
        base_1.pool.query({
            text: 'UPDATE Resume SET name = $1 , surname = $2 , age = $3 , type = $4 , position = $5 , city_id = $6 , ' +
                'description = $7 , is_public = $8 WHERE id = $9;',
            values: [data.name, data.surname, data.age, data.type,
                data.position, data.city_id, data.description,
                data.is_public, id],
        }, function (err, result) {
            if (err)
                console.log(err);
            console.log(result);
        });
    };
    Resume.deleteOne = function (id, creator_id) {
        base_1.pool.query({
            text: 'DELETE FROM Resume WHERE id = $1 AND creator_id = $2;',
            values: [id, creator_id],
        }, function (err, result) {
            if (err)
                console.log(err);
        });
    };
    return Resume;
}());
exports.default = Resume;
