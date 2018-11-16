"use strict";
var session;
(function (session_1) {
    var mongoose = require('../lib/mongoose');
    var config = require('../config/config.json');
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);
    var connection = mongoose.createConnection(config.mongodb.db.uri);
    var sessionStore = new MongoStore({ mongooseConnection: connection });
    var sessionOptions = session({
        secret: config.session.secret,
        key: config.session.key,
        cookie: config.session.cookie,
        store: sessionStore
    });
    module.exports = { sessionOptions: sessionOptions, sessionStore: sessionStore };
})(session || (session = {}));
