"use strict";
var mongoose;
(function (mongoose_1) {
    var mongoose = require('mongoose');
    var config = require('../config/config.json');
    mongoose.connect(config.mongodb.db.uri, config.mongoose.options);
    module.exports = mongoose;
})(mongoose || (mongoose = {}));
