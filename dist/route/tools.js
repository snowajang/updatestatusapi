"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessKey1 = generateAccessKey1;
exports.generateAccessKey2 = generateAccessKey2;
exports.generateAccessKey3 = generateAccessKey3;
exports.hasAccessKeyInDataStore = hasAccessKeyInDataStore;
exports.deleteAccessKey = deleteAccessKey;
exports.validateAccessKey = validateAccessKey;
const config_1 = require("../config");
// Generate accessKey for request authentication from external
function generateAccessKey1(req, res) {
    const accessKey = createAccessKey1();
    saveAccessKey(accessKey);
    // Response status 200 with accessKey
    res.status(200).json({
        accessKey
    });
    return;
}
;
// Generate accessKey for request authentication from external
function generateAccessKey2(req, res) {
    const accessKey = createAccessKey2();
    saveAccessKey(accessKey);
    // Response status 200 with accessKey
    res.status(200).json({
        accessKey
    });
    return;
}
;
// Generate accessKey for request authentication from external
function generateAccessKey3(req, res) {
    const accessKey = createAccessKey3();
    saveAccessKey(accessKey);
    // Response status 200 with accessKey
    res.status(200).json({
        accessKey
    });
    return;
}
;
function createAccessKey1() {
    const apiKeyExample = config_1.acceptedAPIKeyExample1;
    const passwordExample = generateRandomPassword();
    return Buffer.from(`${apiKeyExample}:${passwordExample}`, "utf-8").toString("base64");
}
;
function createAccessKey2() {
    const apiKeyExample = config_1.acceptedAPIKeyExample2;
    const passwordExample = generateRandomPassword();
    return Buffer.from(`${apiKeyExample}:${passwordExample}`, "utf-8").toString("base64");
}
;
function createAccessKey3() {
    const apiKeyExample = config_1.acceptedAPIKeyExample3;
    const passwordExample = generateRandomPassword();
    return Buffer.from(`${apiKeyExample}:${passwordExample}`, "utf-8").toString("base64");
}
;
function generateRandomPassword() {
    return "randomly"; // FIXME: Change to your logic
}
// TODO: Implement logic to store accessKey to external
function saveAccessKey(accessKey) {
    globalThis.accessKeyStore.push(accessKey);
    return true;
}
// TODO: Implement check for accessKey has in external storage
function hasAccessKeyInDataStore(accessKey) {
    let accessKeyStore = globalThis.accessKeyStore;
    let acc = accessKeyStore.find((value) => value === accessKey);
    if (acc) {
        return true;
    }
    else {
        return false;
    }
}
// TODO: Implement delete accessKey from external storage
function deleteAccessKey(accessKey) {
    const index = globalThis.accessKeyStore.indexOf(accessKey);
    if (index > -1) { // only splice array when item is found
        globalThis.accessKeyStore.splice(index, 1); // 2nd parameter means remove one item only
    }
}
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
