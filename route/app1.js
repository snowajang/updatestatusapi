"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runapp = runapp;
var tools_1 = require("./tools");
function runapp(app) {
    app.get("/app1/run200/auth", tools_1.generateAccessKey1);
    app.post("/app1/run200", tools_1.validateAccessKey, receiveData);
}
var statusApp = Number(process.env.STATUS_APP_1 || "200");
// Recieve data and process as your requirement
function receiveData(req, res) {
    // Data receive from request body
    var updateStatusRequest = req.body;
    console.log("Received from update status request:", updateStatusRequest);
    // Response status 204
    return res.status(statusApp).json({}).end();
}
;
