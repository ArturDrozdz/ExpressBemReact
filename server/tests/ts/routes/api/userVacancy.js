"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vacancy_1 = tslib_1.__importDefault(require("../../models/vacancy"));
function get(req, res, __) {
    var query = req.query;
    if (req.user && query.admin && query.admin == "true")
        vacancy_1.default.getAllPublicQuery({ creator_id: req.user.id }, req.server_settings.vacancy.count, function (arr, countPages) {
            res.send(JSON.stringify(arr));
        });
    else if (req.query.companiom_token && req.query.id_companion) {
        vacancy_1.default.checkCompanionToken(req.query.id_companion, req.query.companiom_token, function (result) {
            if (result.id)
                vacancy_1.default.getAllPublicQuery({
                    creator_id: result.id,
                    companion: { is_public: 1 }
                }, req.server_settings.vacancy.count, function (arr, countPages) {
                    res.send(JSON.stringify({ arr: arr, countPages: countPages }));
                });
            else
                res.send(JSON.stringify("Fuck You"));
        });
    }
    else
        res.send(JSON.stringify("Fuck You"));
}
module.exports = { get: get };
