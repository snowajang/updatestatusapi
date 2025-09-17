import { UpdateStatusRequest } from "./model";
import { generateAccessKey2, validateAccessKey } from "./tools";

import type { Express, Request, Response } from "express";

export async function runapp(app: Express) {
    app.get("/app2/auth", generateAccessKey2);
    app.post("/app2", validateAccessKey, receiveData);
}

const statusApp = Number(process.env.STATUS_APP_2 || "408");
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Recieve data and process as your requirement
async function receiveData(req: Request, res: Response): Promise<Response> {
    // Data receive from request body
    const updateStatusRequest: UpdateStatusRequest = req.body;
    await sleep(6000);
    console.log("Received from update status request:", updateStatusRequest);
    // Response status 204
    return res.status(statusApp).json({  }).end();
};
