import { Client, Intents } from "discord.js";

import SlashLib from "../lib";

import commandList from "./testCommands";
import doSetup from "./utils/doSetup";
import sleep from "./utils/sleep";
import runTest from "./utils/runTest";

doSetup();

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

bot.login(process.env.DISCORD_TOKEN);

bot.on("ready", async () => {
  console.log("Connected! running tests");

  let results: any = {};

  //test basic command
  results.basic = await runTest(commandList.basic, bot);

  //test options
  results.options = await runTest(commandList.options, bot);

  //test option choices
  results.choices = await runTest(commandList.choices, bot);

  //test subcommands
  results.subcommand = await runTest(commandList.subcommand, bot);

  //test subcommandgroups
  results.subcommandGroup = await runTest(commandList.subcommandGroup, bot);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < Object.keys(results).length; i++) {
    if (results[Object.keys(results)[i]]) {
      passed++;
    } else {
      failed++;
    }
  }

  let msg =
    `Passed ${passed} of ${Object.keys(results).length} tests` +
    ` \nFailed ${failed} of ${Object.keys(results).length} tests`;

  console.log(msg);

  if (failed > 0) {
    console.log("Testing failed");
    bot.destroy();
    process.exit(1);
  } else {
    console.log("Testing passed");
    bot.destroy();
    process.exit();
  }
});
