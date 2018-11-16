"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function post(req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            return next(err);
        res.redirect('/');
    });
}
module.exports = { post: post };
