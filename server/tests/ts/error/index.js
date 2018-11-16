"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
var http = require('http');
var HttpError = function (status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
};
exports.HttpError = HttpError;
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';
