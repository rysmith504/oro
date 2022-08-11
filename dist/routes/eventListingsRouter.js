"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = require("express");
require('dotenv').config();
var eventListingsRouter = (0, express_1.Router)();
eventListingsRouter.get('/list', function (req, res) {
    // console.log(req.query)
    // const punctuationless = req.query.keyword
    // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    // .replace(/\s{1,}/g, "+")
    // .toLowerCase();
    var keyword = req.query.keyword;
    // console.log('KEYWROD',keyword);
    axios_1.default.get("https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=".concat(keyword, "&apikey=").concat(process.env.TICKETMASTER_API_KEY))
        .then(function (responseObj) {
        var dates = responseObj.data._embedded.events.filter(function (event) {
            return event.dates.start;
        }).map(function (event) {
            return ([event.id, event.dates.start]);
        });
        // console.log('DATES12' , dates);
        // console.log('RESPONSE OBJ GET', responseObj.data._embedded)
        res.send({});
        res.sendStatus(200);
    })
        .catch(function (err) { return console.error(err); });
});
exports.default = eventListingsRouter;
