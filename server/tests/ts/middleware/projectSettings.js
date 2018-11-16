"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverSettings_1 = require("../models/mongodb/serverSettings");
var baseSettings = { myId: 0, vacancy: { days: 30, count: 10 }, resume: { days: 30, count: 10 } };
module.exports = function (req, res, next) {
    serverSettings_1.ServerSettings.getOne(function (settings) {
        if (settings)
            req.server_settings = settings;
        else {
            req.server_settings = baseSettings;
            serverSettings_1.ServerSettings.create(baseSettings);
        }
        next();
    });
};
