"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get(req, res, __) {
    res.send(JSON.stringify({ testMessage: "Message" }));
}
module.exports = { get: get };
