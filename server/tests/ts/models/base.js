"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
var Pool = require('pg').Pool;
var config = require('../config/config.json');
var connectionString = config.postgresSql;
var pool = new Pool({
    connectionString: connectionString,
    ssl: true
});
exports.pool = pool;
var DB = (function () {
    function DB() {
    }
    DB.showAllTables = function () {
        return new Promise(function (resolve, reject) {
            pool.query("SELECT table_name  FROM information_schema.tables WHERE table_schema='public'", function (err, result) {
                if (err)
                    console.log(err);
                resolve(result.rows);
            });
        });
    };
    DB.createAllTables = function () {
        console.log("Start create tables!");
        var query = "";
        query += "CREATE TABLE IF NOT EXISTS Country(\n        id SERIAL PRIMARY KEY,\n        name varchar(100) UNIQUE\n        );";
        query += "CREATE TABLE IF NOT EXISTS City(\n        id SERIAL PRIMARY KEY,\n        name varchar(100) UNIQUE,\n        country_id bigint NOT NULL,\n        FOREIGN KEY(country_id) REFERENCES Country(id) ON DELETE CASCADE\n        );";
        query += "CREATE TABLE IF NOT EXISTS Client (\n        id SERIAL PRIMARY KEY,\n        nick varchar(20) NOT NULL UNIQUE,\n        email varchar(40) NOT NULL UNIQUE,\n        hashed_password varchar(50) NOT NULL,\n        salt varchar(100) NOT NULL,\n        created timestamp DEFAULT CURRENT_TIMESTAMP\n        );";
        query += "CREATE TABLE IF NOT EXISTS Category(\n        id SERIAL PRIMARY KEY,\n        name varchar(50)  NOT NULL,\n        id_parent bigint,\n        FOREIGN KEY(id_parent) REFERENCES Category(id) ON DELETE CASCADE\n        );";
        query += "CREATE TABLE IF NOT EXISTS Vacancy(\n        id SERIAL PRIMARY KEY,\n        company varchar(50),\n        type varchar(30),\n        logo varchar(1000),\n        url varchar(1000),\n        position varchar(100),\n        description text,\n        is_public BIT NOT NULL,\n        phone varchar(100),\n        price bigint,\n        token varchar(50),\n        created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n        creator_id bigint  NOT NULL,\n        FOREIGN KEY(creator_id) REFERENCES Client(id) ON DELETE CASCADE,\n        category_id bigint,\n        FOREIGN KEY(category_id) REFERENCES Category(id) ON DELETE SET NULL,\n        city_id bigint,\n        FOREIGN KEY(city_id) REFERENCES City(id) ON DELETE SET NULL\n        );";
        query += "CREATE TABLE IF NOT EXISTS Resume(\n        id SERIAL PRIMARY KEY,\n        name varchar(50),\n        surname varchar(50),\n        age smallint,\n        type varchar(50),\n        position varchar(100),\n        description text,\n        is_public BIT NOT NULL,\n        city_id bigint,\n        FOREIGN KEY(city_id) REFERENCES City(id) ON DELETE SET NULL,\n        category_id bigint,\n        creator_id bigint NOT NULL UNIQUE,\n        FOREIGN KEY(creator_id) REFERENCES Client(id) ON DELETE CASCADE\n        );";
        query += "CREATE TABLE IF NOT EXISTS History(\n        id SERIAL PRIMARY KEY,\n        is_favorite BIT NOT NULL,\n        id_user bigint NOT NULL,\n        FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n        id_vacancy bigint,\n        FOREIGN KEY(id_vacancy) REFERENCES Vacancy(id) ON DELETE CASCADE,\n        id_resume bigint,\n        FOREIGN KEY(id_resume) REFERENCES Resume(id) ON DELETE CASCADE\n        );";
        query += "CREATE TABLE IF NOT EXISTS Filters(\n        id SERIAL PRIMARY KEY,\n        id_user bigint NOT NULL,\n        FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n        type BIT NOT NULL,\n        city_id bigint,\n        country_id bigint,\n        category_id bigint,\n        price_from bigint,\n        price_to bigint\n        );";
        query += "CREATE TABLE IF NOT EXISTS Companion(\n        id SERIAL PRIMARY KEY,\n        id_user bigint NOT NULL,\n        FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n        id_companion bigint NOT NULL,\n        FOREIGN KEY(id_companion) REFERENCES Client(id) ON DELETE CASCADE,\n        token varchar(50)\n        );";
        query += "ALTER TABLE History\n        ADD CONSTRAINT HistoryVacancy UNIQUE(id_user, id_vacancy, is_favorite);";
        query += "ALTER TABLE History\n        ADD CONSTRAINT HistoryResume UNIQUE(id_user, id_resume, is_favorite);";
        pool.query(query, function (err, _) {
            if (err)
                console.log(err);
            console.log("All tables created!");
            DB.showAllTables()
                .then(function (result) {
                console.log(result);
            });
        });
    };
    return DB;
}());
exports.DB = DB;
function getQueryInsert(tableName, obj) {
    var str1 = "";
    var str2 = "";
    var values = [];
    var i = 2;
    for (var key in obj) {
        if (str1 !== "") {
            str1 += ", " + key;
            str2 += ", $" + i;
            i++;
        }
        else {
            str1 = key;
            str2 = "$1";
        }
        values.push(obj[key]);
    }
    return { text: "INSERT INTO " + tableName + " (" + str1 + ") VALUES (" + str2 + ");", values: values };
}
exports.getQueryInsert = getQueryInsert;
function cbQuery(query, callback) {
    pool.query(query, function (err, result) {
        if (err)
            console.log(err);
        callback(null, result.rows);
    });
}
exports.cbQuery = cbQuery;
function InOrEqualArrQuery(find, query) {
    if (query && query.length > 0 && query[0] === '[' && query[query.length - 1] === ']')
        return " " + find + " IN (" + query.substring(1, query.length - 1) + ") ";
    else
        return " " + find + " = " + query + " ";
}
exports.InOrEqualArrQuery = InOrEqualArrQuery;
var authError = function (message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, authError);
    this.message = message;
};
exports.authError = authError;
util.inherits(authError, Error);
authError.prototype.name = 'authError';
