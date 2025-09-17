import { UpdateStatusRequest } from "./model";
import { generateAccessKey2, validateAccessKey } from "./tools";

import type { Express, Request, Response } from "express";

export function runapp(app: Express) {
    app.get("/app3/auth", generateAccessKey2);
    app.post("/app3", validateAccessKey, receiveData);
}

const statusApp = Number(process.env.STATUS_APP_3 || "500");

// Recieve data and process as your requirement
async function receiveData(req: Request, res: Response): Promise<Response> {
    // Data receive from request body
    const updateStatusRequest: UpdateStatusRequest = req.body;

    console.log("Received from update status request:", updateStatusRequest);
    // Response status 204
    return res.status(statusApp).json({  }).end();
};