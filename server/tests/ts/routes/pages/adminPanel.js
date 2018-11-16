"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var serverSettings_1 = require("../../models/mongodb/serverSettings");
var location_1 = tslib_1.__importDefault(require("../../models/location"));
var category_1 = tslib_1.__importDefault(require("../../models/category"));
function get(req, res, __) {
    res.render("pages/adminPanel", {
        server_settings: req.server_settings ? req.server_settings : { vacancy: {}, resume: {} }
    });
}
function post(req, res, __) {
    switch (req.query.action) {
        case 'settings':
            var countV = parseInt(req.body.ss_vacancy_count);
            var countR = parseInt(req.body.ss_resume_count);
            var daysV = parseInt(req.body.ss_vacancy_days);
            var daysR = parseInt(req.body.ss_resume_days);
            var settings = {
                myId: 0,
                vacancy: {
                    count: countV >= 1 && countV <= 40 ? countV : 10,
                    days: daysV >= 7 && daysV <= 30 ? daysV : 15,
                },
                resume: {
                    count: countR >= 3 && countR <= 40 ? countR : 10,
                    days: daysR >= 7 && daysR <= 30 ? daysR : 15,
                }
            };
            serverSettings_1.ServerSettings.updateOne(settings, function (err) { });
            break;
        case 'country':
            if (req.body.country_name)
                location_1.default.createCountry(req.body.country_name);
            break;
        case 'city':
            if (req.body.city_name && req.body.country_id)
                location_1.default.createCity(req.body.city_name, req.body.country_id);
            break;
        case 'category':
            if (req.body.category_name)
                category_1.default.create(req.body.category_name);
            break;
        case 'sub_category':
            if (req.body.sub_category_name && req.body.category_id)
                category_1.default.createSub(req.body.sub_category_name, req.body.category_id);
            break;
    }
    res.redirect('/admin_panel');
}
module.exports = { get: get, post: post };
