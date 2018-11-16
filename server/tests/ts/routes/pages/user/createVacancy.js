"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vacancy_1 = tslib_1.__importDefault(require("../../../models/vacancy"));
var randToken = require('rand-token');
function get(req, res, next) {
    res.render("pages/user/createVacancy", {
        vacancy: {
            state: "Actual",
            email: req.user.email
        },
        buttonText: 'Create',
        actionForm: 'create'
    });
}
function post(req, res, _) {
    var data;
    if (req.user) {
        if (req.query.action != 'delete')
            data = getDataFromReq(req);
        switch (req.query.action) {
            case 'delete':
                vacancy_1.default.deleteOne(req.query.id, req.user.id);
                break;
            case 'update':
                vacancy_1.default.updateOne(req.body.cv_id, data);
                break;
            case 'create':
                vacancy_1.default.create(data);
                break;
        }
    }
    res.redirect('/user_page');
}
function getDataFromReq(req) {
    return {
        company: req.body.cv_company,
        type: req.body.cv_type,
        logo: req.body.cv_logo,
        url: req.body.cv_url,
        position: req.body.cv_position,
        city_id: req.body.cv_city_id ? parseInt(req.body.cv_city_id) : null,
        category_id: req.body.cv_category_id ? parseInt(req.body.cv_category_id) : null,
        description: req.body.cv_description,
        is_public: req.body.cv_is_public === 'on' ? 1 : 0,
        creator_id: req.user.id,
        token: req.body.cv_generate_token == 'on' ? randToken.generate(16) : ''
    };
}
module.exports = { get: get, post: post, getDataFromReq: getDataFromReq };
