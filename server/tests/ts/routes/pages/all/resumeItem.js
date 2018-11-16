"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var resume_1 = tslib_1.__importDefault(require("../../../models/resume"));
var HttpError = require('../../../error/index').HttpError;
function get(req, res, next) {
    resume_1.default.findById(req.params.id, function (resume) {
        if (!resume)
            return next(new HttpError(404, "Резюме не найдено"));
        if (req.query.admin && req.query.admin === 'true' && req.user && req.user.id == resume.creator_id)
            res.render("pages/user/createResume", {
                resume: resume,
                buttonText: 'Update',
                actionForm: 'update'
            });
        else
            res.render("pages/all/resumeItem", {
                resume: resume
            });
    });
}
module.exports = { get: get };
