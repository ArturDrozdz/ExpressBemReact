"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = tslib_1.__importDefault(require("../../../models/user"));
var base_1 = require("../../../models/base");
var index_1 = require("../../../error/index");
var checkValid = require('../../../middleware/checkAuth').checkValid;
function get(_, res, __) {
    res.render("pages/authorize/register", {
        title: 'Register'
    });
}
function post(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var nick = req.body.nick;
    var passwordRep = req.body.password_repeat;
    var message = checkValid({ nick: nick, password: password, password_repeat: passwordRep, email: email });
    if (message)
        return next(new index_1.HttpError(400, message));
    user_1.default.register(nick, email, password, function (err, user) {
        if (err) {
            if (err instanceof base_1.authError) {
                return next(new index_1.HttpError(403, err.message));
            }
            else {
                return next(err);
            }
        }
        if (user)
            req.session.user = { id: user.id, email: user.email };
        res.redirect('/');
    });
}
module.exports = { get: get, post: post };
