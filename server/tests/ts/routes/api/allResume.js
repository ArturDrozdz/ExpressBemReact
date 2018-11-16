"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var resume_1 = tslib_1.__importDefault(require("../../models/resume"));
function get(req, res, __) {
    resume_1.default.getAllPublicQuery(req.query, req.server_settings.vacancy.count, function (arr, countPages) {
        res.send(JSON.stringify({ arr: arr, countPages: countPages }));
    });
}
module.exports = { get: get };
