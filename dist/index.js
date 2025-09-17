"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./route/app");
const dotenv_1 = __importDefault(require("dotenv"));
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
        console.log("Missing User Agent header");
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
        console.log("Missing User Agent header");
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
(0, app_1.runAllApps)(app);
app.listen(3000, () => {
    console.log(`Server running on port: 3000`);
});
