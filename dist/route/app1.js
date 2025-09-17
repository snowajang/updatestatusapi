"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runapp = runapp;
const tools_1 = require("./tools");
function runapp(app) {
    app.get("/app1/auth", tools_1.generateAccessKey1);
    app.post("/app1", tools_1.validateAccessKey, receiveData);
}
const statusApp = Number(process.env.STATUS_APP_1 || "200");
// Recieve data and process as your requirement
function receiveData(req, res) {
    // Data receive from request body
    const updateStatusRequest = req.body;
    console.log("Received from update status request:", updateStatusRequest);
    // Response status 204
    return res.status(statusApp).json({}).end();
}
;
