"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var async = require('async');
var User = (function () {
    function User() {
    }
    User.register = function (nick, email, password, callback) {
        async.waterfall([
            function (callback) {
                base_1.cbQuery({
                    text: 'SELECT *FROM Client WHERE email = $1',
                    values: [email],
                }, callback);
            },
            function (user, callback) {
                if (user.length != 0) {
                    callback(new base_1.authError("Пользователь уже существует"));
                }
                else {
                    base_1.cbQuery({
                        text: 'INSERT INTO Client(nick, email, hashed_password, salt) VALUES($1, $2, $3, $4)',
                        values: [nick, email, password, 'salt']
                    }, function () {
                        base_1.cbQuery({
                            text: 'SELECT *FROM Client WHERE email = $1',
                            values: [email],
                        }, function (err, result) {
                            if (result.length > 0)
                                callback(null, result[0]);
                            else
                                callback(new base_1.authError('Ошибка!'));
                        });
                    });
                }
            }
        ], callback);
    };
    User.authorize = function (email, password, callback) {
        async.waterfall([
            function (callback) {
                base_1.cbQuery({
                    text: 'SELECT *FROM Client WHERE email = $1',
                    values: [email],
                }, callback);
            },
            function (user, callback) {
                if (user && user.length > 0) {
                    if (user[0].hashed_password == password)
                        callback(null, user[0]);
                    else
                        callback(new base_1.authError("Пароль неверен"));
                }
                else
                    callback(new base_1.authError("Пользователь не найден"));
            }
        ], callback);
    };
    User.findById = function (id, callback) {
        base_1.pool.query({
            text: 'SELECT *FROM Client WHERE id = $1',
            values: [id],
        }, function (err, result) {
            if (err)
                console.log(err);
            if (result) {
                if (result.rows.length > 0)
                    callback(null, result.rows[0]);
                else
                    callback(null);
            }
            else
                callback(null);
        });
    };
    return User;
}());
exports.default = User;
