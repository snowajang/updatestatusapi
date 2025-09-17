"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllApps = runAllApps;
var app1 = require("./app1");
var app2 = require("./app2");
var app3 = require("./app3");
function runAllApps(app) {
    app1.runapp(app);
    app2.runapp(app);
    app3.runapp(app);
}
