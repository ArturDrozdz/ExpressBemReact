"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vacancy_1 = tslib_1.__importDefault(require("../../models/vacancy"));
function get(req, res, __) {
    vacancy_1.default.getAllPublicQuery(req.query, req.server_settings.vacancy.count, function (arr, countPages) {
        res.send(JSON.stringify({ arr: arr, countPages: countPages }));
    });
}
module.exports = { get: get };
