"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var resume_1 = tslib_1.__importDefault(require("../../../models/resume"));
function get(req, res, __) {
    res.render("pages/user/createResume", {
        resume: {
            email: req.user.email
        },
        buttonText: 'Create',
        actionForm: 'create'
    });
}
function post(req, res, _) {
    if (req.user) {
        var data = void 0;
        if (req.query.action != 'delete')
            data = getDataFromReq(req);
        switch (req.query.action) {
            case 'delete':
                resume_1.default.deleteOne(req.query.id, req.user.id);
                break;
            case 'update':
                resume_1.default.updateOne(req.body.rm_id, data);
                break;
            case 'create':
                resume_1.default.create(data);
                break;
        }
    }
    res.redirect('/user_page');
}
function getDataFromReq(req) {
    return {
        name: req.body.rm_name,
        surname: req.body.rm_surname,
        age: parseInt(req.body.rm_age),
        type: req.body.rm_type,
        position: req.body.rm_position,
        city_id: req.body.rm_city_id ? parseInt(req.body.rm_city_id) : null,
        category_id: req.body.rm_category_id ? parseInt(req.body.rm_category_id) : null,
        description: req.body.rm_description,
        is_public: req.body.rm_is_public === 'on' ? 1 : 0,
        creator_id: req.user.id
    };
}
module.exports = { get: get, post: post, getDataFromReq: getDataFromReq };
