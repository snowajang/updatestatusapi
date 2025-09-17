import { UpdateStatusRequest } from "./model";
import { generateAccessKey1, validateAccessKey } from "./tools";

import type { Express, Request, Response } from "express";

export function runapp(app: Express) {
    app.get("/app1/auth", generateAccessKey1);
    app.post("/app1", validateAccessKey, receiveData);
}

const statusApp = Number(process.env.STATUS_APP_1 || "200");
// Recieve data and process as your requirement
function receiveData(req: Request, res: Response): Response {
    // Data receive from request body
    const updateStatusRequest: UpdateStatusRequest = req.body;

    console.log("Received from update status request:", updateStatusRequest);

    // Response status 204
    return res.status(statusApp).json({  }).end();
};
