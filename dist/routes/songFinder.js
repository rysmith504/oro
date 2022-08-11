"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var songFinderRouter = (0, express_1.Router)();
songFinderRouter.post('/', function (req, res) {
    // console.log(req.body);
    res.send(req.body);
});
exports.default = songFinderRouter;
