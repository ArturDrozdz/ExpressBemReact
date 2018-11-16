"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var category_1 = tslib_1.__importDefault(require("../../models/category"));
function get(req, res, __) {
    if (req.query.category_id)
        category_1.default.showAllSub(req.query.category_id, function (arr) {
            res.send(JSON.stringify({ arr: arr }));
        });
    else {
        category_1.default.showAll(function (arr) {
            res.send(JSON.stringify({ arr: arr }));
        });
    }
}
module.exports = { get: get };
