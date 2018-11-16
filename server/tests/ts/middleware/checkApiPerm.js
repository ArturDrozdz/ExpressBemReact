"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('../config/config.json');
function check(req, res, next) {
    var host = req.header('host');
    if (host === config.host || host === "localhost:" + config.port || req.query.companiom_token)
        next();
    else
        res.send(JSON.stringify({ status: 400, message: "Not Found Permission" }));
}
module.exports = check;
