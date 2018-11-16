"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../error/index");
var user_1 = tslib_1.__importDefault(require("../models/user"));
var log = require('../lib/log')(module);
var cookie = require('cookie');
var async = require('async');
var config = require('../config/config.json');
var sessionStore = require('../lib/sessionsStore').sessionStore;
var cookieParser = require('cookie-parser');
module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:' + config.port);
    io.set('logger', log);
    io.set('authorization', function (handshake, callback) {
        async.waterfall([
            function (callback) {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.session.key];
                var sid = cookieParser.signedCookie(sidCookie, config.session.secret);
                loadSession(sid, callback);
            },
            function (session, callback) {
                if (session === null || !session)
                    callback(new index_1.HttpError(401, "No session"));
                else {
                    handshake.session = session;
                    loadUser(session, callback);
                }
            },
            function (user, callback) {
                if (!user)
                    callback(new index_1.HttpError(403, "Anonymous session may not connect"));
                handshake.user = user;
                callback(null);
            },
        ], function (err) {
            if (!err)
                return callback(null, true);
            if (err instanceof index_1.HttpError)
                return callback(null, false);
            callback(err);
        });
    });
    io.sockets.on('sessionReload', function (sid) {
        var clients = io.sockets.clients();
        clients.forEach(function (client) {
            if (client.handshake.session.id !== sid)
                return;
            loadSession(sid, function (err, session) {
                if (err) {
                    client.emit("error", "server error");
                    client.disconnect();
                    return;
                }
                if (!session) {
                    client.emit("logout");
                    client.disconnect();
                    return;
                }
                client.handshake.session = session;
            });
        });
    });
    io.sockets.on('connection', function (socket) {
        var username = socket.client.request.user.nick;
        socket.broadcast.emit('join', username);
        socket.on('message', function (text, cb) {
            io.sockets.emit('message', username, text);
            cb && cb();
        });
    });
    return io;
};
function loadSession(sid, callback) {
    sessionStore.load(sid, function (err, session) {
        if (session === undefined || session.user === undefined)
            return callback(null, null);
        else
            return callback(null, session);
    });
}
function loadUser(session, callback) {
    if (!session.user) {
        log.debug("Session %s is anonymous", session.id);
        return callback(null, null);
    }
    log.debug("retrieving user ", session.user);
    user_1.default.findById(session.user.id, function (err, user) {
        if (err)
            return callback(err);
        if (!user)
            return callback(null, null);
        log.debug("user findbyId result: " + user);
        callback(null, user);
    });
}
