"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const testCommands_1 = __importDefault(require("./testCommands"));
const doSetup_1 = __importDefault(require("./utils/doSetup"));
const runTest_1 = __importDefault(require("./utils/runTest"));
(0, doSetup_1.default)();
const bot = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS],
});
bot.login(process.env.DISCORD_TOKEN);
bot.on("ready", async () => {
    console.log("Connected! running tests");
    let results = {};
    //test basic command
    results.basic = await (0, runTest_1.default)(testCommands_1.default.basic, bot);
    //test options
    results.options = await (0, runTest_1.default)(testCommands_1.default.options, bot);
    //test option choices
    results.choices = await (0, runTest_1.default)(testCommands_1.default.choices, bot);
    //test subcommands
    results.subcommand = await (0, runTest_1.default)(testCommands_1.default.subcommand, bot);
    //test subcommandgroups
    results.subcommandGroup = await (0, runTest_1.default)(testCommands_1.default.subcommandGroup, bot);
    let passed = 0;
    let failed = 0;
    for (let i = 0; i < Object.keys(results).length; i++) {
        if (results[Object.keys(results)[i]]) {
            passed++;
        }
        else {
            failed++;
        }
    }
    let msg = `Passed ${passed} of ${Object.keys(results).length} tests` +
        ` \nFailed ${failed} of ${Object.keys(results).length} tests`;
    console.log(msg);
    if (failed > 0) {
        console.log("Testing failed");
        bot.destroy();
        process.exit(1);
    }
    else {
        console.log("Testing passed");
        bot.destroy();
        process.exit();
    }
});
