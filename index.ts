import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { runAllApps } from "./route/app";
import { acceptedAPIKeyExample1, acceptedAPIKeyExample2, acceptedAPIKeyExample3 } from "./config";
import dotenv from "dotenv";
import * as app1 from "./route/app1";
import { deleteAccessKey, generateAccessKey1, generateAccessKey2, generateAccessKey3, hasAccessKeyInDataStore } from "./route/tools";
import { UpdateStatusRequest } from "./route/model";
// For demo external store purposes only, Replace with database or external store
dotenv.config({ path: ".env" });

// Declare accessKeyStore on globalThis with proper typing
declare global {
    // eslint-disable-next-line no-var
    var accessKeyStore: string[];
}

if (!globalThis.accessKeyStore) {
    globalThis.accessKeyStore = [];
}

// Create API from express framework, Learn more https://expressjs.com/
const app: Express = express();

const acceptedUserAgentPrefix: string = "Update Status/";

// TODO: Change to your API key from update status admin
const acceptedAPIKeyExample: string = "3d6a9d3b37b0b845904e043340fdb240";

// TODO: Implement this to your algorithm for create password randomly and securely


// Created access key as base64(apiKey:randomly) use for basic authentication



function validateUserAgentMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Check if user agent header not present
    if (req.headers["user-agent"] === undefined) {
        console.log("Missing User Agent header", JSON.stringify(req.headers));

        res.status(400).json({
            info: "Bad Request"
        });

        return;
    }

    const userAgent: string = req.headers["user-agent"];

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

function validateAPIKeyMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Check if API key not present
    if (req.headers["x-api-key"] === undefined) {
        console.log("Missing Api header", JSON.stringify(req.headers));

        res.status(400).json({
            info: "Bad Request"
        });

        return;
    }

    const apiKey: string | string[] = req.headers["x-api-key"];

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
app.use(express.json());
// Custom middleware to check if the User-Agent and X-API-Key header in the request is valid
app.use(validateUserAgentMiddleware);
app.use(validateAPIKeyMiddleware);
function validateAccessKey(req: Request, res: Response, next: NextFunction): void {
    // Check if authorization header isn't present
    if (req.headers["authorization"] === undefined) {
        console.log("Missing authorization header");

        res.status(400).json({
        info: "Bad Request"
        });

        return;
    }

    const authentication: string = req.headers["authorization"];

    // Check if authentication header not start with Basic
    if (!authentication.startsWith("Basic ")) {
        console.log("Prefix authorization header not statrt with `Basic `");

        res.status(400).json({
            info: "Bad Request"
        });

        return;
    }

    const accessKey: string = authentication.slice(6);

    // Check if accessKey not exist in external store
    if (!hasAccessKeyInDataStore(accessKey)) {
        console.log("Invalid AccessKey");

        res.status(401).json({
            info: "Unauthorized"
        });

        return;
    }

    // AccessKey is one time used
    deleteAccessKey(accessKey);

    next();
}
const statusApp1 = Number(process.env.STATUS_APP_1 || "200");
// Recieve data and process as your requirement
function receiveData1(req: Request, res: Response): Response {
    // Data receive from request body
    const updateStatusRequest: UpdateStatusRequest = req.body;

    console.log("Received from update status request:", updateStatusRequest);

    // Response status 204
    return res.status(statusApp1).json({  }).end();
};
app.get("/app1/auth", generateAccessKey1);
app.post("/app1", validateAccessKey, receiveData1);


const statusApp2 = Number(process.env.STATUS_APP_2 || "408");
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Recieve data and process as your requirement
async function receiveData2(req: Request, res: Response): Promise<Response> {
    // Data receive from request body
    const updateStatusRequest: UpdateStatusRequest = req.body;
    await sleep(6000);
    console.log("Received from update status request:", updateStatusRequest);

    // Response status 204
    return res.status(statusApp2).json({  }).end();
};
app.get("/app2/auth", generateAccessKey2);
app.post("/app2", validateAccessKey, receiveData2);


const statusApp3 = Number(process.env.STATUS_APP_3 || "500");
// Recieve data and process as your requirement
function receiveData3(req: Request, res: Response): Response {
    // Data receive from request body
    const updateStatusRequest: UpdateStatusRequest = req.body;

    console.log("Received from update status request:", updateStatusRequest);

    // Response status 204
    return res.status(statusApp3).json({  }).end();
};
app.get("/app3/auth", generateAccessKey3);
app.post("/app3", validateAccessKey, receiveData3);



const expressListEndpoints = require("express-list-endpoints");
console.log(expressListEndpoints(app));

app.listen(3000, () => {
    console.log(`Server running on port: http://localhost:3000`);
});
