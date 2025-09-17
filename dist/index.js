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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const tools_1 = require("./route/tools");
// For demo external store purposes only, Replace with database or external store
dotenv_1.default.config({ path: ".env" });
if (!globalThis.accessKeyStore) {
    globalThis.accessKeyStore = [];
}
// Create API from express framework, Learn more https://expressjs.com/
const app = (0, express_1.default)();
const acceptedUserAgentPrefix = "Update Status/";
// TODO: Change to your API key from update status admin
const acceptedAPIKeyExample = "3d6a9d3b37b0b845904e043340fdb240";
// TODO: Implement this to your algorithm for create password randomly and securely
// Created access key as base64(apiKey:randomly) use for basic authentication
function validateUserAgentMiddleware(req, res, next) {
    // Check if user agent header not present
    if (req.headers["user-agent"] === undefined) {
        console.log("Missing User Agent header", JSON.stringify(req.headers));
        res.status(400).json({
            info: "Bad Request"
        });
        return;
    }
    const userAgent = req.headers["user-agent"];
    // Check if user agent header isn't matches with accepted user agent
    // if (!userAgent.startsWith(acceptedUserAgentPrefix)) {
    //     console.log("Invalid User Agent header:", userAgent);
    //     res.status(401).json({
    //         info: "Unauthorized"
    //     });
    //     return;
    // } 
    // Call next to pass control to the next middleware
    next();
}
function validateAPIKeyMiddleware(req, res, next) {
    // Check if API key not present
    if (req.headers["x-api-key"] === undefined) {
        console.log("Missing Api header", JSON.stringify(req.headers));
        res.status(400).json({
            info: "Bad Request"
        });
        return;
    }
    const apiKey = req.headers["x-api-key"];
    // Check if API key is matches with accepted API key
    // if (apiKey !== acceptedAPIKeyExample1 && apiKey !== acceptedAPIKeyExample2 && apiKey !== acceptedAPIKeyExample3) {
    //     console.log("Invalid API Key:", apiKey, acceptedAPIKeyExample1, acceptedAPIKeyExample2, acceptedAPIKeyExample3);
    //     res.status(401).json({
    //         info: "Unauthorized"
    //     });
    //     return;
    // }
    next();
}
// Middleware to automatically parse incoming JSON request bodies, It makes JSON data available as a JavaScript object in request body
app.use(express_1.default.json());
// Custom middleware to check if the User-Agent and X-API-Key header in the request is valid
app.use(validateUserAgentMiddleware);
app.use(validateAPIKeyMiddleware);
function validateAccessKey(req, res, next) {
    // Check if authorization header isn't present
    if (req.headers["authorization"] === undefined) {
        console.log("Missing authorization header");
        res.status(400).json({
            info: "Bad Request"
        });
        return;
    }
    const authentication = req.headers["authorization"];
    // Check if authentication header not start with Basic
    if (!authentication.startsWith("Basic ")) {
        console.log("Prefix authorization header not statrt with `Basic `");
        res.status(400).json({
            info: "Bad Request"
        });
        return;
    }
    const accessKey = authentication.slice(6);
    // Check if accessKey not exist in external store
    if (!(0, tools_1.hasAccessKeyInDataStore)(accessKey)) {
        console.log("Invalid AccessKey");
        res.status(401).json({
            info: "Unauthorized"
        });
        return;
    }
    // AccessKey is one time used
    (0, tools_1.deleteAccessKey)(accessKey);
    next();
}
const statusApp1 = Number(process.env.STATUS_APP_1 || "200");
// Recieve data and process as your requirement
function receiveData1(req, res) {
    // Data receive from request body
    const updateStatusRequest = req.body;
    console.log("Received from update status request:", updateStatusRequest);
    // Response status 204
    return res.status(statusApp1).json({}).end();
}
;
app.get("/app1/auth", tools_1.generateAccessKey1);
app.post("/app1", validateAccessKey, receiveData1);
const statusApp2 = Number(process.env.STATUS_APP_2 || "408");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Recieve data and process as your requirement
function receiveData2(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Data receive from request body
        const updateStatusRequest = req.body;
        yield sleep(6000);
        console.log("Received from update status request:", updateStatusRequest);
        // Response status 204
        return res.status(statusApp2).json({}).end();
    });
}
;
app.get("/app2/auth", tools_1.generateAccessKey2);
app.post("/app2", validateAccessKey, receiveData2);
const statusApp3 = Number(process.env.STATUS_APP_3 || "500");
// Recieve data and process as your requirement
function receiveData3(req, res) {
    // Data receive from request body
    const updateStatusRequest = req.body;
    console.log("Received from update status request:", updateStatusRequest);
    // Response status 204
    return res.status(statusApp3).json({}).end();
}
;
app.get("/app3/auth", tools_1.generateAccessKey3);
app.post("/app3", validateAccessKey, receiveData3);
const expressListEndpoints = require("express-list-endpoints");
console.log(expressListEndpoints(app));
app.listen(3000, () => {
    console.log(`Server running on port: http://localhost:3000`);
});
