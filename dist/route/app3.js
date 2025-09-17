"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runapp = runapp;
const tools_1 = require("./tools");
function runapp(app) {
    app.get("/app3/auth", tools_1.generateAccessKey2);
    app.post("/app3", tools_1.validateAccessKey, receiveData);
}
const statusApp = Number(process.env.STATUS_APP_3 || "500");
// Recieve data and process as your requirement
function receiveData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Data receive from request body
        const updateStatusRequest = req.body;
        console.log("Received from update status request:", updateStatusRequest);
        // Response status 204
        return res.status(statusApp).json({}).end();
    });
}
;
