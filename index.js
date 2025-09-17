"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app_1 = require("./route/app");
if (!globalThis.accessKeyStore) {
    globalThis.accessKeyStore = [];
}
// Create API from express framework, Learn more https://expressjs.com/
var app = (0, express_1.default)();
var acceptedUserAgentPrefix = "Update Status/";
// TODO: Change to your API key from update status admin
var acceptedAPIKeyExample = "3d6a9d3b37b0b845904e043340fdb240";
// TODO: Implement this to your algorithm for create password randomly and securely
// Created access key as base64(apiKey:randomly) use for basic authentication
function validateUserAgentMiddleware(req, res, next) {
    // Check if user agent header not present
    if (req.headers["user-agent"] === undefined) {
        console.log("Missing User Agent header");
        res.status(400).json({
            info: "Bad Request"
        });
        return;
    }
    var userAgent = req.headers["user-agent"];
    // Check if user agent header isn't matches with accepted user agent
    if (!userAgent.startsWith(acceptedUserAgentPrefix)) {
        console.log("Invalid User Agent header:", userAgent);
        res.status(401).json({
            info: "Unauthorized"
        });
        return;
    }
    // Call next to pass control to the next middleware
    next();
}
function validateAPIKeyMiddleware(req, res, next) {
    // Check if API key not present
    if (req.headers["x-api-key"] === undefined) {
        console.log("Missing User Agent header");
        res.status(400).json({
            info: "Bad Request"
        });
        return;
    }
    var apiKey = req.headers["x-api-key"];
    // Check if API key is matches with accepted API key
    if (apiKey !== acceptedAPIKeyExample) {
        console.log("Invalid API Key:", apiKey);
        res.status(401).json({
            info: "Unauthorized"
        });
        return;
    }
    next();
}
// Middleware to automatically parse incoming JSON request bodies, It makes JSON data available as a JavaScript object in request body
app.use(express_1.default.json());
// Custom middleware to check if the User-Agent and X-API-Key header in the request is valid
app.use(validateUserAgentMiddleware);
app.use(validateAPIKeyMiddleware);
(0, app_1.runAllApps)(app);
app.listen(3000, function () {
    console.log("Server running on port: 3000");
});
