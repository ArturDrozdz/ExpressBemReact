"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var location_1 = tslib_1.__importDefault(require("../../models/location"));
function get(req, res, __) {
    var country_id = req.query.country_id;
    if (country_id)
        location_1.default.showAllCitysFromCountry(req.query.country_id, function (arr) {
            res.send(JSON.stringify({ arr: arr }));
        });
    else
        location_1.default.showAllCountrys(function (arr) {
            res.send(JSON.stringify({ arr: arr }));
        });
}
module.exports = { get: get };
