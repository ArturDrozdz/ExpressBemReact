"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vacancy_1 = tslib_1.__importDefault(require("../../../models/vacancy"));
var history_1 = require("../../../models/history");
var HttpError = require('../../../error/index').HttpError;
function get(req, res, next) {
    vacancy_1.default.findById(req.params.id, function (vacancy) {
        if (!vacancy)
            return next(new HttpError(404, "Вакансия не найдена"));
        if (req.user && vacancy.id)
            history_1.History.add(false, req.user.id, vacancy.id, null);
        if ((req.query.admin && req.query.admin === 'true' && req.user && req.user.id == vacancy.creator_id) ||
            (vacancy.token && req.query.token == vacancy.token))
            res.render("pages/user/createVacancy", {
                vacancy: vacancy,
                buttonText: 'Update',
                actionForm: 'update'
            });
        else
            res.render("pages/all/vacancyItem", {
                vacancy: vacancy
            });
    });
}
module.exports = { get: get };
