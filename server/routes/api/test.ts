import express = require('express');
import {_RequestSettUser} from "../interfaces";

function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    res.send(JSON.stringify({testMessage: "Message"}));
}

module.exports = {get};
