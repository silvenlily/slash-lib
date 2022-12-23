"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sleep(time) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}
exports.default = sleep;
