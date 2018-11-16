"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
var mongoose = require('../../lib/mongoose'), Schema = mongoose.Schema;
var schema = new Schema({
    myId: { type: Number, required: true, unique: true },
    vacancy: { type: Object, required: true },
    resume: { type: Object, required: true }
});
schema.statics.create = function (data, callback) {
    var Vacancy = this;
    async.waterfall([
        function (callback) {
            var vacancy = new Vacancy(data);
            vacancy.save(function (err) {
                if (err)
                    return callback(err);
                callback(vacancy);
            });
        }
    ], callback);
};
schema.statics.getOne = function (callback) {
    var ServerSettings = this;
    async.waterfall([
        function (callback) {
            ServerSettings.findOne({ myId: 0 }, function (err, result) {
                callback(result);
            });
        }
    ], callback);
};
schema.statics.UpdateOne = function (sett, callback) {
    var ServerSettings = this;
    async.waterfall([
        function (callback) {
            ServerSettings.updateOne({ myId: 0 }, sett, function (err) {
                callback(sett);
            });
        }
    ], callback);
};
exports.ServerSettings = mongoose.model('ServerSettings', schema);
module.exports = { ServerSettings: exports.ServerSettings };
