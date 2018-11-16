"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var history_1 = require("../../../models/history");
function get(req, res, __) {
    if (req.user)
        history_1.History.getHistory(req.user.id, true, function (result) {
            console.log(result.rows);
        });
    if (req.user)
        history_1.History.getFavorites(req.user.id, true, function (result) {
            console.log(result.rows);
        });
    res.render("pages/user/historySearch", {});
}
module.exports = { get: get };
