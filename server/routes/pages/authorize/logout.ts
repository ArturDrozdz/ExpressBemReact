import express = require('express')
import {_RequestSession} from "../../interfaces";

function post(req: _RequestSession, res: express.Response, next: express.NextFunction) {
    req.session.destroy((err: Error) => {
        if (err) return next(err);
        res.redirect('/');
    });
}

module.exports = {post};
