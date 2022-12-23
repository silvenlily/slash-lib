"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __importDefault(require("../../lib"));
const compareCommands_1 = __importDefault(require("../../functions/compareCommands"));
const sleep_1 = __importDefault(require("./sleep"));
function testHandler(interaction) {
    if (interaction.isCommand()) {
        interaction.reply("This is a test command used by slash-lib's CI/CD testing and has no actual output");
    }
}
async function runTest(command, bot) {
    try {
        const slashLib = new lib_1.default(bot, process.env.DEBUG_SERVER);
        slashLib.createCommand(command, testHandler);
        await slashLib.registerCommands();
        let currentCommand = (await slashLib.manager.fetch(undefined, {
            guildId: process.env.DEBUG_SERVER,
        })).first();
        if ((0, compareCommands_1.default)(currentCommand, command)) {
            console.log(`Test passed: ${command.name}`);
            (0, sleep_1.default)(500);
            return true;
        }
        else {
            console.log(`Test failed: ${command.name}`);
            (0, sleep_1.default)(500);
            return false;
        }
    }
    catch (error) {
        console.log(`Error while running test: ${command.name} \n${error}`);
        (0, sleep_1.default)(500);
        return false;
    }
}
exports.default = runTest;
