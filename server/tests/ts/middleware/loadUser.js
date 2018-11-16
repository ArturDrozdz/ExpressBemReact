"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = tslib_1.__importDefault(require("../models/user"));
module.exports = function (req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.user)
        return next();
    user_1.default.findById(req.session.user.id, function (err, user) {
        if (err)
            return next(err);
        if (user)
            req.user = res.locals.user = user;
        next();
    });
};
