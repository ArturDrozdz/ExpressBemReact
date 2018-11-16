"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res, next) {
    res.sendHttpError = function (error) {
        res.status(error.status);
        if (res.req && res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        }
        else {
            res.render("error", {
                error: error,
                title: 'Error'
            });
        }
    };
    next();
};
