"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../error/index");
function checkAuth(req, res, next) {
    if (!req.user) {
        return next(new index_1.HttpError(401, "Вы не авторизованы"));
    }
    next();
}
function checkValid(obj) {
    var message;
    for (var key in obj) {
        if (key === "email")
            message = checkEmailValid(obj[key]);
        else
            message = checkOtherValid(obj[key], key);
        if (message)
            return message;
    }
    if (obj.password && obj.password_repeat)
        if (obj.password !== obj.password_repeat)
            return "Password Not Equals";
    return "";
}
function checkEmailValid(text) {
    if (!text.match(/[a-z0-9_]+@[a-z]{2,8}.[a-z]{2,8}$/i))
        return "Email is Not Valid";
    else if (text.split('@')[0].length < 5)
        return "Email is short, need len > 4";
    else if (text.split('@')[0].length > 12)
        return "Email is big, need len < 12";
    return "";
}
function checkOtherValid(text, key) {
    if (!text)
        return;
    if (!text.match(/[a-z0-9_]+$/i))
        return key + " is Not Valid";
    else if (text.length < 5)
        return key + " is short, need len > 4";
    else if (text.length > 12)
        return key + " is big, need len < 12";
    return "";
}
module.exports = { checkValid: checkValid, checkAuth: checkAuth };
