"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var visits = {};
function Counter(req, res, next) {
    var key = req.path;
    if (visits[key])
        visits[key]++;
    else
        visits[key] = 1;
    next();
}
module.exports = { Counter: Counter, visits: visits };
