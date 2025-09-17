import type { Request, Response, NextFunction } from "express";
import { UpdateStatusRequest } from "./model";
import { acceptedAPIKeyExample1, acceptedAPIKeyExample2, acceptedAPIKeyExample3 } from "../config";


// Generate accessKey for request authentication from external
export function generateAccessKey1(req: Request, res: Response): void {
    const accessKey: string = createAccessKey1();

    saveAccessKey(accessKey);

    // Response status 200 with accessKey
    res.status(200).json({
        accessKey
    });

    return;
};

// Generate accessKey for request authentication from external
export function generateAccessKey2(req: Request, res: Response): void {
    const accessKey: string = createAccessKey2();

    saveAccessKey(accessKey);

    // Response status 200 with accessKey
    res.status(200).json({
        accessKey
    });

    return;
};

// Generate accessKey for request authentication from external
export function generateAccessKey3(req: Request, res: Response): void {
    const accessKey: string = createAccessKey3();

    saveAccessKey(accessKey);

    // Response status 200 with accessKey
    res.status(200).json({
        accessKey
    });

    return;
};
function createAccessKey1(): string {
    const apiKeyExample: string = acceptedAPIKeyExample1;
    const passwordExample: string = generateRandomPassword();

    return Buffer.from(`${apiKeyExample}:${passwordExample}`, "utf-8").toString("base64");
};

function createAccessKey2(): string {
    const apiKeyExample: string = acceptedAPIKeyExample2;
    const passwordExample: string = generateRandomPassword();

    return Buffer.from(`${apiKeyExample}:${passwordExample}`, "utf-8").toString("base64");
};

function createAccessKey3(): string {
    const apiKeyExample: string = acceptedAPIKeyExample3;
    const passwordExample: string = generateRandomPassword();

    return Buffer.from(`${apiKeyExample}:${passwordExample}`, "utf-8").toString("base64");
};

export function generateRandomPassword(): string {
    return "randomly"; // FIXME: Change to your logic
}


// TODO: Implement logic to store accessKey to external
export function saveAccessKey(accessKey: string): boolean {
    globalThis.accessKeyStore.push(accessKey);
    console.log("AccessKey saved to external store:", accessKey);
    return true;
}


// TODO: Implement check for accessKey has in external storage
export function hasAccessKeyInDataStore(accessKey: string): boolean {
    let accessKeyStore: string[] = globalThis.accessKeyStore;
    let acc = accessKeyStore.find((value) => value === accessKey);
    if (acc) {
        return true;
    } else {    
        return false;
    }
}

// TODO: Implement delete accessKey from external storage
export function deleteAccessKey(accessKey: string): void {
    const index = globalThis.accessKeyStore.indexOf(accessKey);
    if (index > -1) { // only splice array when item is found
        globalThis.accessKeyStore.splice(index, 1); // 2nd parameter means remove one item only
    }
}

export function validateAccessKey(req: Request, res: Response, next: NextFunction): void {
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
