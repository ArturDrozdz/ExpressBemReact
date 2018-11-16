"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../routes/interfaces");
function notFoundPage(req, res, next) {
    var err = new interfaces_1._ErrorStatus('Not Found');
    err.status = 404;
    next(err);
}
function serverError(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.status + " " + err.message,
    });
}
module.exports = { notFoundPage: notFoundPage, serverError: serverError };
