"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require('path');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var PORT = process.env.PORT || 5000;
if (cluster.isMaster) {
    console.error("Node cluster master " + process.pid + " is running");
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.error("Node cluster worker " + worker.process.pid + " exited: code " + code + ", signal " + signal);
    });
}
else {
    var app = express();
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
    app.get('/api', function (req, res) {
        res.set('Content-Type', 'application/json');
        res.send('{"message":"Hello from the custom server!"}');
    });
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
    app.listen(PORT, function () {
        console.error("Node cluster worker " + process.pid + ": listening on port " + PORT);
    });
}
