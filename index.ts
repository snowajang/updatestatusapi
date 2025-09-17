import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { runAllApps } from "./route/app";
import { acceptedAPIKeyExample1, acceptedAPIKeyExample2, acceptedAPIKeyExample3 } from "./config";
import dotenv from "dotenv";
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
        console.log("Missing User Agent header");

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
        console.log("Missing User Agent header");

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

runAllApps(app);

app.listen(3000, () => {
    console.log(`Server running on port: 3000`);
});
