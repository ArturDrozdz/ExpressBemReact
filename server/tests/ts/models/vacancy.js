"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Vacancy = (function () {
    function Vacancy() {
    }
    Vacancy.create = function (data) {
        base_1.pool.query(base_1.getQueryInsert('Vacancy', data), function (err, result) {
            if (err)
                console.log(err);
        });
    };
    Vacancy.getAllPublicQuery = function (query, countInPage, callback) {
        var country = query.country_id;
        var city = query.city_id;
        var category = query.category_id;
        var sub_category = query.sub_category_id;
        var where = '';
        var queryValues = [];
        if (query.creator_id)
            where += "WHERE creator_id = " + query.creator_id;
        else {
            where += "WHERE is_public = $1";
            queryValues.push('1');
        }
        if (sub_category)
            where += " AND " + base_1.InOrEqualArrQuery('category_id', sub_category);
        else if (category)
            where += " AND category_id IN (SELECT id FROM Category WHERE " + base_1.InOrEqualArrQuery('category_id', category) + ")";
        if (city)
            where += " AND " + base_1.InOrEqualArrQuery('city_id', city);
        else if (country)
            where += " AND city_id IN (SELECT id FROM City WHERE " + base_1.InOrEqualArrQuery('country_id', country) + ")";
        var limitOffset = query.page ? " LIMIT " + countInPage + " OFFSET " + query.page * countInPage : '';
        var join = 'INNER JOIN Client ON v.creator_id = Client.id';
        join +=
            ' LEFT JOIN Category AS SubCategory ON v.category_id = SubCategory.id' +
                ' LEFT JOIN Category Category ON SubCategory.id_parent = Category.id';
        join +=
            ' LEFT JOIN City ON v.city_id = City.id' +
                ' LEFT JOIN Country ON City.country_id = Country.id';
        var select = 'v.company, v.type, v.logo, v.url, v.position, v.description, v.is_public, ' +
            'v.created, v.phone, v.category_id,  ' +
            'SubCategory.name as sub_category_name, Category.name as category_name, ' +
            'City.name as city_name, City.id as city_id, Country.name as country_name, Country.id as country_id, Client.email, v.id';
        var order = 'ORDER BY v.id';
        base_1.pool.query({
            text: "SELECT " + select + " FROM Vacancy AS v " + join + " " + where + " " + order + " " + limitOffset + ";",
            values: queryValues,
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result) {
                base_1.pool.query({
                    text: "SELECT COUNT(*) FROM Vacancy " + where + ";",
                    values: queryValues
                }, function (err, result2) {
                    if (err)
                        console.log(err);
                    callback(result.rows, Math.ceil(result2.rows[0].count / countInPage));
                });
            }
            else {
                callback([], 0);
            }
        });
    };
    Vacancy.findById = function (id, callback) {
        base_1.pool.query({
            text: 'SELECT *FROM Vacancy WHERE id = $1;',
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
    Vacancy.updateOne = function (id, data) {
        base_1.pool.query({
            text: 'UPDATE Vacancy SET company = $1 , type = $2 , url = $3 , logo = $4 , position = $5 , city_id = $6 , ' +
                'description = $7 , is_public = $8 , phone = $9 , token = $10  WHERE id = $11;',
            values: [data.company, data.type, data.url, data.logo,
                data.position, data.city_id, data.description,
                data.is_public, data.phone, data.token, id],
        }, function (err, result) {
            if (err)
                console.log(err);
        });
    };
    Vacancy.deleteOne = function (id, creator_id) {
        base_1.pool.query({
            text: 'DELETE FROM Vacancy WHERE id = $1 AND creator_id = $2;',
            values: [id, creator_id],
        }, function (err, result) {
            if (err)
                console.log(err);
        });
    };
    Vacancy.checkCompanionToken = function (id_companion, token, callback) {
        base_1.pool.query({
            text: 'SELECT id_user FROM Companion WHERE id_companion = $1 AND token = $2;',
            values: [id_companion, token],
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result && result.rows.length > 0)
                callback(result.rows[0]);
            else
                callback(null);
        });
    };
    return Vacancy;
}());
exports.default = Vacancy;
