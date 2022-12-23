"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// setup
function doSetup() {
    try {
        require("dotenv").config();
    }
    catch { }
    if (!process.env.DISCORD_TOKEN) {
        throw "Missing required enviorment varable: DISCORD_TOKEN";
    }
    if (!process.env.DEBUG_SERVER) {
        throw "Missing required enviorment varable: DEBUG_SERVER";
    }
}
exports.default = doSetup;
